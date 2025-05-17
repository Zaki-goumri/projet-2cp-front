import ReactMarkdown from 'react-markdown';
import { useInternshipDetails } from '../hooks/useInternshipDetails';
import { Opportunity } from '../types/opportunity.types';

interface InternshipDetailsProps {
  opportunity: Opportunity;
}

const InternshipDetails = ({ opportunity }: InternshipDetailsProps) => {
  const { markdownText } = useInternshipDetails(opportunity);

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h2 className="mb-4 text-xl font-semibold">Details</h2>
      <div className="prose max-w-none">
        <ReactMarkdown>{markdownText}</ReactMarkdown>
      </div>
    </div>
  );
};

export default InternshipDetails;
