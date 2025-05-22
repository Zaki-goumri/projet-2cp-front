import { useEffect, useRef, useState, useCallback } from 'react';
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

interface IntersectionOptions {
  rootMargin?: string;
  threshold?: number | number[];
  root?: Element | null;
}

const useIntersectionObserver = (options: IntersectionOptions = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        rootMargin: '100px 0px',
        threshold: 0.1,
        ...options,
      }
    );

    const currentTarget = targetRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [options]);

  return [targetRef, isIntersecting] as const;
};

const useInfiniteScroll = (
  onLoadMore: () => void,
  hasMore: boolean,
  isLoading: boolean
) => {
  const [loadMoreRef, isIntersecting] = useIntersectionObserver({
    rootMargin: '200px 0px',
    threshold: 0.1,
  });

  useEffect(() => {
    if (isIntersecting && hasMore && !isLoading) {
      onLoadMore();
    }
  }, [isIntersecting, hasMore, isLoading, onLoadMore]);

  return loadMoreRef;
};

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
  const prevScrollTopRef = useRef<number>(0);

  const loadMoreRef = useInfiniteScroll(
    () => {
      if (onLoadMore) {
        // Store current scroll position before loading more messages
        const container = containerRef.current;
        if (container) {
          prevScrollHeightRef.current = container.scrollHeight;
          prevScrollTopRef.current = container.scrollTop;
        }
        onLoadMore();
      }
    },
    hasMoreMessages || false,
    loadingMore || false
  );

  useEffect(() => {
    const container = containerRef.current;
    if (container && prevScrollHeightRef.current) {
      const newScrollHeight = container.scrollHeight;
      const scrollDiff = newScrollHeight - prevScrollHeightRef.current;
      container.scrollTop = prevScrollTopRef.current + scrollDiff;
      prevScrollHeightRef.current = 0;
      prevScrollTopRef.current = 0;
    }
  }, [messages]);

  // Scroll to bottom on initial load
  useEffect(() => {
    if (messages.length > 0 && !loadingMore) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages.length, loadingMore]);

  if (!activeConversation) {
    return (
      <div className="flex h-full items-center justify-center text-gray-500">
        Select a conversation to start chatting
      </div>
    );
  }

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
    <div ref={containerRef} className="h-full overflow-y-auto p-4">
      {loadingMore && (
        <div className="flex justify-center py-2">
          <div className="loader">Loading...</div>
        </div>
      )}

      {/* Load more trigger element */}
      {hasMoreMessages && <div ref={loadMoreRef} className="h-4" />}

      <div className="mb-6 flex items-center justify-center">
        <div className="text-center">
          <div className="relative mx-auto mb-2 h-16 w-16">
            <img
              src={activeConversation.avatar?.link || ''}
              alt={activeConversation.name}
              className="h-full w-full rounded-full"
            />
          </div>
          <h3 className="text-lg font-semibold">{activeConversation.name}</h3>
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
                      src={activeConversation.avatar?.link || ''}
                      alt={activeConversation.name}
                      className="h-8 w-8 rounded-full"
                    />
                  </div>
                )}

                <div
                  className={`max-w-[70%] rounded-lg px-4 py-2 ${
                    isSentByCurrentUser
                      ? 'bg-primary rounded-br-none text-white'
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
                      src={currentUser?.profilepic?.link || ''}
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
    </div>
  );
};

export default ChatMessages;
