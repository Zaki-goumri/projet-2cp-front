import { Conversation } from '../types';
import { EmailIcon } from '@/modules/shared/icons';

interface ChatDetailsProps {
  contact: Conversation;
}

const ChatDetails = ({ contact }: ChatDetailsProps) => {
  return (
    <div className="flex h-full flex-col p-4">
      <div className="mb-6 text-center">
        <h2 className="mb-2 text-xl font-semibold">{contact.name}</h2>

        <div className="relative mx-auto mb-4 h-28 w-28">
          <img
            src={contact.avatar || '/default-avatar.png'}
            alt={contact.name}
            className="h-full w-full rounded-full"
          />
        </div>
      </div>

      <div className="flex-1">
        <div className="mb-6">
          <h3 className="mb-3 text-sm font-medium text-gray-500">
            Contact Information
          </h3>
          {contact.email && (
            <div className="mb-3 flex items-center">
              <EmailIcon className="mr-3 h-5 w-5 text-gray-500" />
              <span className="text-sm text-gray-700">{contact.email}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatDetails;
