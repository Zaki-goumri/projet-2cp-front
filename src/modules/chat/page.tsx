import { lazy, useState } from 'react';
import { useChat } from './hooks/useChat';

const ChatSidebar = lazy(() => import('./components/ChatSidebar'));
const ChatMessages = lazy(() => import('./components/ChatMessages'));
const ChatInput = lazy(() => import('./components/ChatInput'));
const ChatDetails = lazy(() => import('./components/ChatDetails'));

const ChatPage = () => {
  const { 
    messages, 
    conversations, 
    activeConversation, 
    sendMessage, 
    selectConversation 
  } = useChat();

  return (
    <div className="flex h-screen">
      {/* Chat Sidebar */}
      <div className="w-[280px] border-r border-gray-200">
        <ChatSidebar 
          conversations={conversations} 
          activeConversation={activeConversation}
          onSelectConversation={selectConversation}
        />
      </div>
      
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          <ChatMessages 
            messages={messages} 
            activeConversation={activeConversation}
          />
        </div>
        <div className="p-4 border-t border-gray-200">
          <ChatInput onSendMessage={sendMessage} />
        </div>
      </div>
      
      {/* Contact Details */}
      {activeConversation && (
        <div className="w-[280px] border-l ">
          <ChatDetails contact={activeConversation} />
        </div>
      )}
    </div>
  );
};

export default ChatPage; 