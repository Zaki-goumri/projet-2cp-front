import { useState } from 'react';
import { Conversation } from '../types';
import { Search } from 'lucide-react';

interface ChatSidebarProps {
  conversations: Conversation[] | null;
  activeConversation: Conversation | null;
  onSelectConversation: (conversation: Conversation) => void;
}

const ChatSidebar = ({
  conversations,
  activeConversation,
  onSelectConversation,
}: ChatSidebarProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredConversations = conversations?.filter((conversation) =>
    conversation.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getMessageText = (lastMessage: string | { message: string }) => {
    if (!lastMessage) return 'No messages yet';

    if (typeof lastMessage === 'string') {
      return lastMessage.length > 30
        ? `${lastMessage.substring(0, 25)}...`
        : lastMessage;
    }

    if (typeof lastMessage === 'object' && lastMessage.message) {
      return lastMessage.message.length > 30
        ? `${lastMessage.message.substring(0, 25)}...`
        : lastMessage.message;
    }

    return 'No messages yet';
  };
  return (
    <div className="flex h-full flex-col rounded-2xl bg-white shadow-lg">
      <div className="border-b border-gray-200 bg-white p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search messages"
            className="w-full rounded-md bg-gray-100 px-3 py-2 pl-10 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute top-1/2 left-2 -translate-y-1/2 transform text-gray-500" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredConversations && filteredConversations?.length > 0 ? (
          <ul>
            {filteredConversations?.map((conversation) => (
              <li
                key={conversation.id}
                className={`cursor-pointer border-b border-gray-100 px-4 py-3 ${
                  activeConversation?.id === conversation.id
                    ? 'bg-gray-100'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => onSelectConversation(conversation)}
              >
                <div className="flex items-center">
                  <div className="relative">
                    <img
                      src={conversation.avatar || '/default-avatar.png'}
                      alt={conversation.name}
                      className="h-12 w-12 rounded-full"
                    />
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex justify-between">
                      <h3 className="text-sm font-medium">
                        {conversation.name}
                      </h3>
                      {conversation.lastMessage && (
                        <span className="text-xs text-gray-500">
                          {new Date(
                            conversation.lastMessage.sentTime
                          ).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 truncate text-xs text-gray-500">
                      {getMessageText(conversation.lastMessage || '')}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex h-full items-center justify-center text-gray-500">
            No conversations found
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;
