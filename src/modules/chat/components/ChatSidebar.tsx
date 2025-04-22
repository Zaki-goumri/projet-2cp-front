import { useState } from 'react';
import { Conversation } from '../types';
import { Search } from 'lucide-react';

interface ChatSidebarProps {
  conversations: Conversation[];
  activeConversation: Conversation | null;
  onSelectConversation: (conversation: Conversation) => void;
}

const ChatSidebar = ({
  conversations,
  activeConversation,
  onSelectConversation,
}: ChatSidebarProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredConversations = conversations.filter((conversation) =>
    conversation.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-gray-200 p-4">
        <h2 className="mb-4 text-xl font-semibold">Messages</h2>
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
        {filteredConversations.length > 0 ? (
          <ul>
            {filteredConversations.map((conversation) => (
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
                    {conversation.isOnline && (
                      <span className="absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-white bg-green-500"></span>
                    )}
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex justify-between">
                      <h3 className="text-sm font-medium">
                        {conversation.name}
                      </h3>
                      {conversation.lastMessageTime && (
                        <span className="text-xs text-gray-500">
                          {new Date(
                            conversation.lastMessageTime
                          ).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 truncate text-xs text-gray-500">
                      {conversation.lastMessage
                        ? conversation.lastMessage.length > 30
                          ? `${conversation.lastMessage.substring(0, 25)}...`
                          : conversation.lastMessage
                        : 'No messages yet'}
                    </p>
                  </div>
                  {conversation.unreadCount ? (
                    <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs text-white">
                      {conversation.unreadCount}
                    </span>
                  ) : null}
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
