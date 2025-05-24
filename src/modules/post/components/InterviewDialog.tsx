import { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { postInterviewService } from '../services/interview.service';
import { toast } from 'react-toastify';
import { Mic, MicOff, X } from 'lucide-react';

interface InterviewDialogProps {
  isOpen: boolean;
  onClose: () => void;
  postDescription: string;
}

export default function InterviewDialog({ isOpen, onClose, postDescription }: InterviewDialogProps) {
  const [isListening, setIsListening] = useState(false);
  const [conversation, setConversation] = useState<Array<{ speaker: 'ai' | 'user', text: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentTranscript, setCurrentTranscript] = useState(''); 
  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null); 

  useEffect(() => {
    if (isOpen) {
      startInterview();
    } else {
      stopListening(); 
      setConversation([]); 
      setCurrentTranscript(''); 
    }

    return () => {
      stopListening();
    };
  }, [isOpen]); 

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      recognitionRef.current = new (window as any).webkitSpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        setCurrentTranscript(interimTranscript)

        if (finalTranscript) {
          handleUserResponse(finalTranscript);
          setCurrentTranscript(''); 
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        if (isOpen) {
           toast.error('Error with speech recognition. Please try again.');
        }
        setIsListening(false);
      };

       recognitionRef.current.onend = () => {
        if (isOpen && !isLoading) {
          startListening();
        }
      };

    } else {
      if (isOpen) {
         toast.error('Speech recognition is not supported in your browser.');
      }
    }

  }, []); 
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [conversation]); 

  const startInterview = async () => {
    setIsLoading(true);
    setConversation([]); 
    setCurrentTranscript(''); 
    try {
      const response = await postInterviewService.startPostInterview(postDescription);
      setConversation([{ speaker: 'ai', text: response }]);
    } catch (error) {
      toast.error('Failed to start interview session');
    } finally {
      setIsLoading(false);
    }
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) { 
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) { 
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const handleUserResponse = async (userAnswer: string) => {
    if (!userAnswer.trim()) {
        setIsLoading(false);
        return;
    }
    setConversation(prev => [...prev, { speaker: 'user', text: userAnswer }]);
    setIsLoading(true);

    try {
      const context = conversation.map(msg => msg.text).join(' '); 
      const response = await postInterviewService.evaluateAnswer(userAnswer, context, postDescription);
      setConversation(prev => [...prev, { speaker: 'ai', text: response }]);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl !bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>AI Interview Session</span>
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          <div className="max-h-[400px] overflow-y-auto rounded-lg bg-gray-50 p-4">
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
            {currentTranscript && ( 
              <div className="mb-4 text-gray-500">
                <strong>Listening:</strong> {currentTranscript}
              </div>
            )}
            <div ref={messagesEndRef} className='mt-10'/>
          </div>

          <div className="flex justify-center">
            <Button
              onClick={isListening ? stopListening : startListening}
              className={`flex items-center gap-2 ${
                isListening
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-green-500 hover:bg-green-600'
              }`}
              disabled={isLoading} 
            >
              {isListening ? (
                <>
                  <MicOff className="h-4 w-4" />
                  Stop Listening
                </>
              ) : (
                <>
                  <Mic className="h-4 w-4" />
                  Start Listening
                </>
              )}
            </Button>
          </div>

          {isLoading && (
            <div className="text-center text-sm text-gray-500">
              Processing...
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
} 