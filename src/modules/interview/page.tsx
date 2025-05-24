import { useState, useEffect, useRef } from 'react';
import { interviewService } from './services/interview.service';
import { toast } from 'react-toastify';

export default function InterviewPage() {
  const [isListening, setIsListening] = useState(false);
  const [interviewTopic, setInterviewTopic] = useState('');
  const [conversation, setConversation] = useState<Array<{ speaker: 'ai' | 'user', text: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window) {
      recognitionRef.current = new (window as any).webkitSpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result: any) => result.transcript)
          .join('');

        if (event.results[0].isFinal) {
          handleUserResponse(transcript);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        toast.error('Error with speech recognition. Please try again.');
        setIsListening(false);
      };
    } else {
      toast.error('Speech recognition is not supported in your browser.');
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startInterview = async () => {
    if (!interviewTopic) {
      toast.error('Please enter an interview topic');
      return;
    }

    setIsLoading(true);
    try {
      const response = await interviewService.startInterviewSession(interviewTopic);
      setConversation([{ speaker: 'ai', text: response }]);
      startListening();
    } catch (error) {
      toast.error('Failed to start interview session');
    } finally {
      setIsLoading(false);
    }
  };

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleUserResponse = async (userAnswer: string) => {
    setConversation(prev => [...prev, { speaker: 'user', text: userAnswer }]);
    setIsLoading(true);

    try {
      const context = conversation.map(msg => msg.text).join(' ');
      const response = await interviewService.respondToAnswer(userAnswer, context);
      setConversation(prev => [...prev, { speaker: 'ai', text: response }]);
    } catch (error) {
      toast.error('Failed to process response');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">AI Interview Preparation</h1>
      
      {conversation.length === 0 ? (
        <div className="mb-6">
          <input
            type="text"
            value={interviewTopic}
            onChange={(e) => setInterviewTopic(e.target.value)}
            placeholder="Enter interview topic (e.g., Software Engineering, Data Science)"
            className="w-full p-2 border rounded"
          />
          <button
            onClick={startInterview}
            disabled={isLoading}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            Start Interview
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            {conversation.map((msg, index) => (
              <div
                key={index}
                className={`mb-4 ${
                  msg.speaker === 'ai' ? 'text-blue-600' : 'text-green-600'
                }`}
              >
                <strong>{msg.speaker === 'ai' ? 'AI Interviewer' : 'You'}:</strong>
                <p>{msg.text}</p>
              </div>
            ))}
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={isListening ? stopListening : startListening}
              className={`px-4 py-2 rounded ${
                isListening
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-green-500 hover:bg-green-600'
              } text-white`}
            >
              {isListening ? 'Stop Listening' : 'Start Listening'}
            </button>
            
            <button
              onClick={() => {
                setConversation([]);
                setInterviewTopic('');
                stopListening();
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              End Interview
            </button>
          </div>
        </div>
      )}
      
      {isLoading && (
        <div className="mt-4 text-center text-gray-600">
          Processing...
        </div>
      )}
    </div>
  );
} 