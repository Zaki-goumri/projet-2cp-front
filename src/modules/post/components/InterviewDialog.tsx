import { useState, useEffect, useRef, useCallback } from 'react';
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
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const [voiceOptions, setVoiceOptions] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null); 

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

  // Initialize speech synthesis
  useEffect(() => {
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
      
      // Get available voices
      const getVoices = () => {
        // Cancel any ongoing speech first to avoid multiple voices
        if (synthRef.current?.speaking) {
          synthRef.current.cancel();
        }
        
        const voices = synthRef.current?.getVoices() || [];
        
        // Filter to find ONE good American English voice
        // Looking specifically for a clear American accent
        const americanVoices = voices.filter(voice => 
          // Only get voices with US English set as language
          voice.lang === 'en-US' &&
          // Look for high quality voices
          (voice.name.includes('Google') || 
           voice.name.includes('Samantha') || 
           voice.name.includes('Natural') ||
           voice.name.includes('Premium'))
        );
        
        // Fallback to any English voice if no American ones
        const englishVoices = voices.filter(voice => 
          voice.lang?.startsWith('en')
        );
        
        // Use American voices if available, otherwise fall back to any English voices
        const preferredVoices = americanVoices.length > 0 ? americanVoices : englishVoices;
        
        setVoiceOptions(preferredVoices.length > 0 ? preferredVoices : voices);
        
        // Just pick ONE voice to avoid duplications
        if (preferredVoices.length > 0) {
          setSelectedVoice(preferredVoices[0]);
          console.log('Selected voice:', preferredVoices[0].name);
        } else if (voices.length > 0) {
          setSelectedVoice(voices[0]);
          console.log('Fallback voice:', voices[0].name);
        }
      };

      // Chrome loads voices asynchronously
      if (synthRef.current.onvoiceschanged !== undefined) {
        synthRef.current.onvoiceschanged = getVoices;
      }
      
      getVoices();
    }
    
    return () => {
      if (synthRef.current && synthRef.current.speaking) {
        synthRef.current.cancel();
      }
    };
  }, []);
  
  // Speech recognition setup
  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      recognitionRef.current = new (window as any).webkitSpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      // Stop any speech synthesis when user starts speaking
      // This prevents the AI voice and recognition from overlapping
      recognitionRef.current.onstart = () => {
        if (synthRef.current && synthRef.current.speaking) {
          synthRef.current.cancel();
        }
      };

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

        // Always update the current transcript to show what's being captured
        setCurrentTranscript(interimTranscript);

        if (finalTranscript) {
          // Stop the AI from speaking when user input is final
          if (synthRef.current && synthRef.current.speaking) {
            synthRef.current.cancel();
          }
          
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

  // Function to speak text using selected voice with natural patterns
  const speakText = useCallback((text: string) => {
    if (!synthRef.current) return;
    
    // Stop recording while AI is speaking to prevent feedback loops
    if (isListening) {
      stopListening();
    }
    
    // Cancel any ongoing speech
    if (synthRef.current.speaking) {
      synthRef.current.cancel();
    }
    
    // Process text to add fillers and make it more conversational with American speech patterns
    let processedText = text
      // Add breathing sounds at natural points
      .replace(/^([A-Z][^.,!?]{20,})([.,])\s/gm, '$1$2 <breath> ')
      // Add American filler words and phrases
      .replace(/^([A-Z][^.,!?]*)(?=\s*[.,!?]\s*$)/gm, (match) => {
        // Only add hesitation about 30% of the time with American fillers
        const americanFillers = ['like', 'you know', 'I mean', 'uh', 'um', 'so'];
        const filler = americanFillers[Math.floor(Math.random() * americanFillers.length)];
        return Math.random() < 0.3 ? match + ', ' + filler : match;
      })
      // Add American expressions and speech patterns
      .replace(/^([A-Z][^.,!?]*)(\s*,)\s*([^.,!?]*[.,!?])$/gm, (match, p1, p2, p3) => {
        // American filler expressions
        const americanisms = [
          ", basically, ",
          ", actually, ",
          ", totally, ",
          ", honestly, "
        ];
        const americanism = americanisms[Math.floor(Math.random() * americanisms.length)];
        return Math.random() < 0.4 ? p1 + americanism + p3 : match;
      })
      .replace(/^(I think|In my opinion)/gm, 'You know, $1')
      .replace(/^(Yes|No|Sure|Of course)([.,!?])/gm, '$1, absolutely$2')
      // Add typical American contractions and slang
      .replace(/going to/g, 'gonna')
      .replace(/want to/g, 'wanna')
      .replace(/kind of/g, 'kinda')
      .replace(/sort of/g, 'sorta')
      .replace(/got to/g, 'gotta')
      // Add occasional repetition (stuttering) on first word (only ~10% of sentences)
      .replace(/^(\w+)\b/gm, (match) => {
        return Math.random() < 0.1 ? match + '- ' + match : match;
      })
      // Convert to American conversational style
      .replace(/it is/g, "it's")
      .replace(/cannot/g, "can't")
      .replace(/will not/g, "won't")
      .replace(/should not/g, "shouldn't")
      .replace(/that is/g, "that's")
      .replace(/would not/g, "wouldn't")
      .replace(/do not/g, "don't")
      .replace(/could not/g, "couldn't")
      .replace(/have not/g, "haven't")
      .replace(/has not/g, "hasn't")
      .replace(/had not/g, "hadn't")
      // Add self-correction occasionally
      .replace(/\b(should|could|would|must)\b/gi, (match) => {
        return Math.random() < 0.15 ? match + '— I mean, ' + match : match;
      })
      // Add emphasis on key words
      .replace(/(important|excellent|great|perfect)/gi, '<emphasis>$1</emphasis>')
      // Add slight pauses for thinking
      .replace(/(\. |\? |! )([A-Z])/g, '$1<break time="300ms"/>$2');
      
    // Break text into sentences for more natural pauses
    const sentences = processedText.match(/[^.!?]+[.!?]+/g) || [processedText];
    
    // Add very slight random variations to rate and pitch for each sentence
    sentences.forEach((sentence, index) => {
      // Small delay between sentences to create natural pauses
      setTimeout(() => {
        if (!synthRef.current) return;
        
        const utterance = new SpeechSynthesisUtterance(sentence.trim());
        
        // Set voice if available
        if (selectedVoice) {
          utterance.voice = selectedVoice;
        }
        
        // Add slight random variations to make it sound more natural
        const randomRate = 0.85 + (Math.random() * 0.15); // Rate between 0.85-1.0
        const randomPitch = 1.0 + (Math.random() * 0.1); // Pitch between 1.0-1.1
        
        // Vary pitch and rate even more between sentences for natural speech patterns
        const sentenceLength = sentence.length;
        // Longer sentences tend to be spoken more quickly
        const lengthFactor = Math.min(1.1, Math.max(0.9, 1 + (sentenceLength - 50) / 100));
        // Apply the length factor to the rate
        const adjustedRate = randomRate * lengthFactor;
        
        // Make the voice more American
        utterance.rate = adjustedRate * 1.05; // Americans tend to speak slightly faster
        utterance.pitch = randomPitch * 0.98; // Slightly lower pitch
        utterance.volume = 1.0;
        
        // Set American English as the language
        utterance.lang = 'en-US';
        
        // Process each sentence for SSML-like effects
        let processedSentence = sentence
          .replace(/<breath>/g, () => {
            // Insert a small pause for breath sound
            const currentUtterance = utterance;
            setTimeout(() => {
              if (!synthRef.current) return;
              // Create subtle breath sound effect
              const breathUtterance = new SpeechSynthesisUtterance(',');
              breathUtterance.volume = 0.1; // Very quiet
              breathUtterance.rate = 0.5;  // Slow rate for breath
              if (selectedVoice) {
                breathUtterance.voice = selectedVoice;
              }
              synthRef.current.speak(breathUtterance);
              
              // Resume with a small pause
              setTimeout(() => {}, 150);
            }, 100);
            return '';
          })
          .replace(/<emphasis>(.*?)<\/emphasis>/g, (match, p1) => {
            // For emphasized words, increase pitch slightly
            utterance.pitch = randomPitch * 1.1;
            return p1;
          })
          .replace(/<break time="(\d+)ms"\/>/, (match, time) => {
            // Create actual pauses
            setTimeout(() => {}, parseInt(time));
            return '';
          });
          
        // Replace the sentence with the processed version
        utterance.text = processedSentence;
        
        // Add natural pauses with commas
        utterance.onboundary = (event) => {
          if (event.name === 'word' && /,$/.test(event.utterance.text.substr(0, event.charIndex+1))) {
            // Small pause at commas
            setTimeout(() => {}, 250);
          }
        };
        
        // Add emotion cues based on content
        if (sentence.includes('?')) {
          // Questions should have rising intonation
          utterance.pitch = randomPitch * 1.1;
          utterance.rate = randomRate * 0.95; // Slightly slower for questions
        } else if (sentence.includes('!')) {
          // Exclamations with more emphasis
          utterance.volume = 1.2;
        }
        
        // Add random voice cracks/pitch shifts rarely (about 5% of sentences)
        if (Math.random() < 0.05) {
          // Create pitch shift event at random word
          utterance.onboundary = (event) => {
            // Original onboundary behavior for commas
            if (event.name === 'word' && /,$/.test(event.utterance.text.substr(0, event.charIndex+1))) {
              setTimeout(() => {}, 250);
            }
            
            // Random chance for slight voice crack on words
            if (event.name === 'word' && Math.random() < 0.2) {
              const originalPitch = utterance.pitch;
              utterance.pitch = originalPitch * 1.2; // Brief pitch increase
              setTimeout(() => {
                utterance.pitch = originalPitch;
              }, 50);
            }
          };
        }
        
        synthRef.current.speak(utterance);
      }, index * 250); // 250ms pause between sentences
    });
    
    // Restart listening automatically handled by the startListening function
    return () => {
      // No cleanup needed here - moved logic to after startListening is defined
    };
  }, [selectedVoice, isListening, isOpen, isLoading]);

  const startInterview = async () => {
    setIsLoading(true);
    setConversation([]); 
    setCurrentTranscript(''); 
    try {
      const response = await postInterviewService.startPostInterview(postDescription);
      setConversation([{ speaker: 'ai', text: response }]);
      speakText(response);
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
  
  // Check if AI has finished speaking and restart listening if needed
  useEffect(() => {
    if (!synthRef.current || !isOpen || isLoading) return;
    
    const checkSpeechEnd = setInterval(() => {
      if (!synthRef.current?.speaking && !isListening && isOpen && !isLoading) {
        startListening();
        clearInterval(checkSpeechEnd);
      }
    }, 500);
    
    return () => clearInterval(checkSpeechEnd);
  }, [isListening, isOpen, isLoading]);

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
      speakText(response);
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