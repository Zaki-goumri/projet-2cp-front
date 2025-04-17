import { useState } from 'react';
import { Conversation } from '../types';
import { Search } from 'lucide-react';

interface ChatSidebarProps {
  conversations: Conversation[];
  activeConversation: Conversation | null;
  onSelectConversation: (conversation: Conversation) => void;
}

const ChatSidebar = ({ conversations, activeConversation, onSelectConversation }: ChatSidebarProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredConversations = conversations.filter(conversation => 
    conversation.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full ">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Messages</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search messages"
            className="w-full px-3 py-2 pl-10 bg-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length > 0 ? (
          <ul>
            {filteredConversations.map((conversation) => (
                  <li 
                key={conversation.id}
                className={`px-4 py-3 border-b border-gray-100 cursor-pointer ${
                  activeConversation?.id === conversation.id ? 'bg-gray-100' : 'hover:bg-gray-50'
                }`}
                onClick={() => onSelectConversation(conversation)}
              >
                <div className="flex items-center">
                  <div className="relative">
                    <img 
                      src={conversation.avatar || '/default-avatar.png'} 
                      alt={conversation.name}
                      className="w-12 h-12 rounded-full"
                    />
                    {conversation.isOnline && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                    )}
                  </div>
                  <div className="ml-3 flex-1">
                    <div className="flex justify-between">
                      <h3 className="text-sm font-medium">{conversation.name}</h3>
                      {conversation.lastMessageTime && (
                        <span className="text-xs text-gray-500">
                          {new Date(conversation.lastMessageTime).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 truncate mt-1">
                      {conversation.lastMessage 
                        ? conversation.lastMessage.length > 30 
                          ? `${conversation.lastMessage.substring(0, 25)}...`
                          : conversation.lastMessage
                        : 'No messages yet'}
                    </p>
                  </div>
                  {conversation.unreadCount ? (
                    <span className="ml-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {conversation.unreadCount}
                    </span>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            No conversations found
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSidebar; 