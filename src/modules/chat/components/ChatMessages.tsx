import { useEffect, useRef, useCallback } from 'react';
import { Message, Conversation } from '../types';

interface ChatMessagesProps {
  messages: Message[];
  activeConversation: Conversation | null;
  currentUser?: {
    id: number;
    email: string;
    name: string;
    type: string;
    profilepic: string | null;
  } | null;
  hasMoreMessages?: boolean;
  loadingMore?: boolean;
  onLoadMore?: () => void;
}

const ChatMessages = ({
  messages,
  activeConversation,
  currentUser,
  hasMoreMessages,
  loadingMore,
  onLoadMore,
}: ChatMessagesProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const prevScrollHeightRef = useRef<number>(0);
  const bottom =
    useRef <
    useEffect(() => {
      if (messages.length > 0) {
        const container = containerRef.current;
        if (container) {
          // Only auto-scroll if we're already near the bottom
          const isNearBottom =
            container.scrollHeight -
              container.scrollTop -
              container.clientHeight <
            100;
          if (isNearBottom) {
            messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    }, [messages]);

  const bottomOnLoad = useRef(null);

  useEffect(() => {
    bottomOnLoad.current?.scrollIntoView({ behavior: 'auto' });
  }, []);

  // Handle infinite scroll
  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container || !hasMoreMessages || loadingMore) return;

    // If we're near the top (100px threshold), load more messages
    if (container.scrollTop < 100) {
      prevScrollHeightRef.current = container.scrollHeight;
      onLoadMore?.();
    }
  }, [hasMoreMessages, loadingMore, onLoadMore]);

  // Maintain scroll position when loading more messages
  useEffect(() => {
    const container = containerRef.current;
    if (container && prevScrollHeightRef.current) {
      const newScrollHeight = container.scrollHeight;
      const scrollDiff = newScrollHeight - prevScrollHeightRef.current;
      container.scrollTop = scrollDiff;
      prevScrollHeightRef.current = 0;
    }
  }, [messages]);

  if (!activeConversation) {
    return (
      <div className="flex h-full items-center justify-center text-gray-500">
        Select a conversation to start chatting
      </div>
    );
  }

  // Group messages by date
  const groupedMessages = messages.reduce<Record<string, Message[]>>(
    (groups, message) => {
      const date = new Date(message.sentTime).toLocaleDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
      return groups;
    },
    {}
  );

  return (
    <div
      ref={containerRef}
      className="h-full overflow-y-auto p-4"
      onScroll={handleScroll}
    >
      {loadingMore && (
        <div className="flex justify-center py-2">
          <div className="loader">Loading...</div>
        </div>
      )}

      <div className="mb-6 flex items-center justify-center">
        <div className="text-center">
          <div className="relative mx-auto mb-2 h-16 w-16">
            <img
              src={activeConversation.avatar || '/default-avatar.png'}
              alt={activeConversation.name}
              className="h-full w-full rounded-full"
            />
          </div>
          <h3 className="text-lg font-semibold">{activeConversation.name}</h3>
          <p className="text-sm text-gray-500">{activeConversation.userType}</p>
        </div>
      </div>

      {Object.keys(groupedMessages).map((date) => (
        <div key={date}>
          <div className="my-4 flex justify-center">
            <span className="rounded-full bg-gray-200 px-3 py-1 text-xs text-gray-600">
              {date}
            </span>
          </div>

          {groupedMessages[date].map((message) => {
            const isSentByCurrentUser = currentUser?.id === message.sender;
            const messageKey = `${message.sender}-${message.message}-${new Date(message.sentTime).getTime()}`;
            return (
              <div
                className={`mb-4 flex ${isSentByCurrentUser ? 'justify-end' : 'justify-start'}`}
                key={messageKey}
              >
                {!isSentByCurrentUser && (
                  <div className="mr-2 flex-shrink-0">
                    <img
                      src={activeConversation.avatar || ''}
                      alt={activeConversation.name}
                      className="h-8 w-8 rounded-full"
                    />
                  </div>
                )}

                <div
                  className={`max-w-[70%] rounded-lg px-4 py-2 ${
                    isSentByCurrentUser
                      ? 'rounded-br-none bg-blue-500 text-white'
                      : 'rounded-bl-none bg-gray-200 text-gray-800'
                  }`}
                >
                  {!isSentByCurrentUser && (
                    <p className="mb-1 text-xs font-medium text-gray-600">
                      {activeConversation.name}
                    </p>
                  )}
                  <p>{message.message}</p>
                  <div
                    className={`mt-1 text-xs ${
                      isSentByCurrentUser ? 'text-blue-100' : 'text-gray-500'
                    }`}
                  >
                    {new Date(message.sentTime).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>

                {isSentByCurrentUser && (
                  <div className="ml-2 flex-shrink-0">
                    <img
                      src={currentUser.profilepic || '/default-avatar.png'}
                      alt={currentUser?.name || 'Me'}
                      className="h-8 w-8 rounded-full"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}

      <div ref={messagesEndRef} />
      <div ref={bottomOnLoad} />
    </div>
  );
};

export default ChatMessages;
