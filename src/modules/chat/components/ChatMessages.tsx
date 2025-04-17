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
      <div className="flex items-center justify-center h-full text-gray-500">
        Select a conversation to start chatting
      </div>
    );
  }

  // Group messages by date
  const groupedMessages: { [key: string]: Message[] } = {};
  messages.forEach(message => {
    const date = new Date(message.timestamp).toLocaleDateString();
    if (!groupedMessages[date]) {
      groupedMessages[date] = [];
    }
    groupedMessages[date].push(message);
  });

  return (
    <div className="p-4 h-full overflow-y-auto">
      <div className="flex items-center justify-center mb-6">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-2 relative">
            <img 
              src={activeConversation.avatar || '/default-avatar.png'} 
              alt={activeConversation.name}
              className="w-full h-full rounded-full"
            />
            {activeConversation.isOnline && (
              <span className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
            )}
          </div>
          <h2 className="text-lg font-semibold">{activeConversation.name}</h2>
          <p className="text-sm text-gray-500">
            {activeConversation.isOnline ? 'Online' : 'Offline'}
          </p>
        </div>
      </div>

      {Object.keys(groupedMessages).map(date => (
        <div key={date}>
          <div className="flex justify-center my-4">
            <span className="text-xs bg-gray-200 text-gray-600 px-3 py-1 rounded-full">
              {date}
            </span>
          </div>
          
          {groupedMessages[date].map(message => {
            const isCurrentUser = message.senderId === 'current-user-id';
            
            return (
              <div 
                key={message.id} 
                className={`flex mb-4 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isCurrentUser && (
                  <div className="mr-2 flex-shrink-0">
                    <img 
                      src={activeConversation.avatar || '/default-avatar.png'} 
                      alt={activeConversation.name}
                      className="w-8 h-8 rounded-full"
                    />
                  </div>
                )}
                
                <div 
                  className={`max-w-[70%] px-4 py-2 rounded-lg ${
                    isCurrentUser 
                      ? 'bg-blue-500 text-white rounded-br-none' 
                      : 'bg-gray-200 text-gray-800 rounded-bl-none'
                  }`}
                >
                  <p>{message.content}</p>
                  <div 
                    className={`text-xs mt-1 ${
                      isCurrentUser ? 'text-blue-100' : 'text-gray-500'
                    }`}
                  >
                    {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
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