import { useEffect, useRef } from 'react';
import { Message, Conversation, User } from '../types';

interface ChatMessagesProps {
  messages: Message[];
  activeConversation: Conversation | null;
  currentUser?: User | null;
}

const ChatMessages = ({
  messages,
  activeConversation,
  currentUser,
}: ChatMessagesProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on initial load
  useEffect(() => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages.length]);

  if (!activeConversation) {
    return (
      <div className="flex h-full items-center justify-center text-gray-500">
        Select a conversation to start chatting
      </div>
    );
  }

  // Sort messages by date and group them
  const sortedMessages = [...messages].sort((a, b) => 
    new Date(a.sentTime).getTime() - new Date(b.sentTime).getTime()
  );

  const groupedMessages = sortedMessages.reduce<Record<string, Message[]>>(
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
    <div className="h-full overflow-y-auto p-4">
      <div className="mb-6 flex items-center justify-center">
        <div className="text-center">
          <div className="relative mx-auto mb-2 h-16 w-16">
            <img
              src={activeConversation.avatar || ''}
              alt={activeConversation.name}
              className="h-full w-full rounded-full"
            />
          </div>
          <h3 className="text-lg font-semibold">{activeConversation.name}</h3>
        </div>
      </div>

      {Object.entries(groupedMessages).map(([date, messages]) => (
        <div key={date}>
          <div className="my-4 flex justify-center">
            <span className="rounded-full bg-gray-200 px-3 py-1 text-xs text-gray-600">
              {date}
            </span>
          </div>

          {messages.map((message) => {
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
                      src={currentUser?.profilepic || ''}
                      alt={currentUser?.username || 'Me'}
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
