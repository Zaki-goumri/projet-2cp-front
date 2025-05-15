import { useState } from 'react';
import { Conversation, User } from '../types';
import { UserSearchInput } from './UserSearchInput';
import { useUserSearch } from '../hooks/useUserSearch';
import { LoaderIcon } from '@/modules/shared/icons';
import { Link } from 'react-router';

interface ChatSidebarProps {
  conversations: Conversation[] | null;
  activeConversation: Conversation | null;
  onSelectConversation: (conversation: Conversation) => void;
  onStartNewChat?: (user: User) => void;
  isCreatingChat?: boolean;
}

const ChatSidebar = ({
  conversations,
  activeConversation,
  onStartNewChat,
  isCreatingChat = false,
}: ChatSidebarProps) => {
  const [showSearch, setShowSearch] = useState(false);
  const {
    users,
    isLoading,
    searchTerm,
    handleSearch,
  } = useUserSearch();

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
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-semibold">
            {showSearch ? 'Search Companies' : 'Messages'}
          </h2>
          <button
            onClick={() => setShowSearch(!showSearch)}
            className="text-sm text-primary hover:text-primary/80"
          >
            {showSearch ? 'Back to Messages' : 'New Chat'}
          </button>
        </div>
        {showSearch && (
          <UserSearchInput
            value={searchTerm}
            onChange={handleSearch} onTypeChange={function (type: string): void {
              throw new Error('Function not implemented.');
            } } selectedType={''}          />
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        {showSearch ? (
          <div className="divide-y divide-gray-100">
            {isLoading || isCreatingChat ? (
              <div className="flex items-center justify-center py-8">
                <LoaderIcon className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : users.length > 0 ? (
              users.map((user:User) => (
                <button
                  key={user.id}
                  onClick={() => onStartNewChat?.(user)}
                  className="w-full px-4 py-3 hover:bg-gray-50 flex items-center gap-3"
                  disabled={isCreatingChat}
                >
                  <img
                    src={user.profilepic || '/default-avatar.png'}
                    alt={user.username}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <p className="font-medium">{user.username}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </button>
              ))
            ) : searchTerm ? (
              <div className="py-8 text-center text-gray-500">
                No companies found
              </div>
            ) : null}
          </div>
        ) : conversations && conversations.length > 0 ? (
          <ul>
            {conversations.map((conversation) => (
              <li
                key={conversation.id}
                className={`cursor-pointer border-b border-gray-100 px-4 py-3 ${
                  activeConversation?.id === conversation.id
                    ? 'bg-gray-100'
                    : 'hover:bg-gray-50'
                }`}
              >
              <Link to={`/chat/${conversation.id}`}>

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
                </Link>
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
