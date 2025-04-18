import ReactMarkdown from 'react-markdown';
import { useInternshipDetails } from '../hooks/useInternshipDetails';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { useNavigate, useParams } from 'react-router';

const InternshipDetails = () => {
  const { markdownText, isLoading, error } = useInternshipDetails();
  const navigate = useNavigate();
  const { id } = useParams();

  const handleContactOrganizer = () => {
    // Navigate to the chat page with the organizer ID as a parameter
    navigate(`/chat/${id}`);
  };

  if (isLoading) {
    return (
      <div className="mx-auto rounded-lg bg-white p-6 shadow flex justify-center">
        <p>Loading internship details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto rounded-lg bg-white p-6 shadow text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto space-y-4 rounded-lg bg-white p-6 shadow">
      <ReactMarkdown>{markdownText}</ReactMarkdown>
      
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
        <div>
          <h3 className="font-medium">Contact The organisers</h3>
        </div>
        <Button 
          onClick={handleContactOrganizer}
          className="bg-[#65C97A] hover:bg-[#52B86A] text-white flex items-center gap-2 px-4 py-2 rounded-md"
        >
          <Send className="h-4 w-4" />
          Send a Message
        </Button>
      </div>
    </div>
  );
};

export default InternshipDetails;
