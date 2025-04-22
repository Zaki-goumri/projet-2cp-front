import { useEffect, useRef } from 'react';
import { Message, Conversation } from '../types';

interface ChatMessagesProps {
  messages: Message[];
  activeConversation: Conversation | null;
}

const ChatMessages = ({ messages, activeConversation }: ChatMessagesProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!activeConversation) {
    return (
      <div className="flex h-full items-center justify-center text-gray-500">
        Select a conversation to start chatting
      </div>
    );
  }

  // Group messages by date
  const groupedMessages: { [key: string]: Message[] } = {};
  messages.forEach((message) => {
    const date = new Date(message.timestamp).toLocaleDateString();
    if (!groupedMessages[date]) {
      groupedMessages[date] = [];
    }
    groupedMessages[date].push(message);
  });

  return (
    <div className="h-full overflow-y-auto p-4">
      <div className="mb-6 flex items-center justify-center">
        <div className="text-center">
          <div className="relative mx-auto mb-2 h-16 w-16">
            <img
              src={activeConversation.avatar || '/default-avatar.png'}
              alt={activeConversation.name}
              className="h-full w-full rounded-full"
            />
            {activeConversation.isOnline && (
              <span className="absolute right-0 bottom-0 h-4 w-4 rounded-full border-2 border-white bg-green-500"></span>
            )}
          </div>
          <h2 className="text-lg font-semibold">{activeConversation.name}</h2>
          <p className="text-sm text-gray-500">
            {activeConversation.isOnline ? 'Online' : 'Offline'}
          </p>
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
            const isCurrentUser = message.senderId === 'current-user-id';

            return (
              <div
                key={message.id}
                className={`mb-4 flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isCurrentUser && (
                  <div className="mr-2 flex-shrink-0">
                    <img
                      src={activeConversation.avatar || '/default-avatar.png'}
                      alt={activeConversation.name}
                      className="h-8 w-8 rounded-full"
                    />
                  </div>
                )}

                <div
                  className={`max-w-[70%] rounded-lg px-4 py-2 ${
                    isCurrentUser
                      ? 'rounded-br-none bg-blue-500 text-white'
                      : 'rounded-bl-none bg-gray-200 text-gray-800'
                  }`}
                >
                  <p>{message.content}</p>
                  <div
                    className={`mt-1 text-xs ${
                      isCurrentUser ? 'text-blue-100' : 'text-gray-500'
                    }`}
                  >
                    {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}

      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default ChatMessages;
