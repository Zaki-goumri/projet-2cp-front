import { lazy, useEffect, Suspense } from 'react';
import { useChat } from './hooks/useChat';
import { useParams } from 'react-router';

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
    selectConversation,
    startNewConversation,
    currentUser,
    loading,
    error
  } = useChat();
  const { id } = useParams();

  useEffect(() => {
    if (id && conversations) {
      const existingConversation = conversations.find((conv) => conv.id === parseInt(id));
      if (existingConversation) {
        selectConversation(existingConversation);
      } else {
        startNewConversation(parseInt(id));
      }
    }
  }, [id, conversations, selectConversation, startNewConversation]);

  if (loading) {
    return (
      <div className="flex h-[calc(100vh-100px)] w-full items-center justify-center bg-primary/30">
        <div className="text-lg">Loading conversations...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[calc(100vh-100px)] w-full items-center justify-center bg-primary/30">
        <div className="text-lg text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-primary/30 flex h-[calc(100vh-100px)] w-full text-gray-900">
      {/* Sidebar */}
      <aside className="m-2 hidden w-full max-w-xs flex-col overflow-hidden rounded-2xl rounded-l-2xl bg-white/80 shadow-lg md:flex">
        <div className="sticky top-0 z-10 border-b border-gray-100 bg-white/80 p-4">
          <h2 className="text-lg font-semibold">Messages</h2>
        </div>
        <div className="scrollbar-thin scrollbar-thumb-gray-200 flex-1 overflow-y-auto">
          <Suspense fallback={<div className="p-4">Loading conversations...</div>}>
            <ChatSidebar
              conversations={conversations}
              activeConversation={activeConversation}
              onSelectConversation={selectConversation}
            />
          </Suspense>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="m-2 flex flex-1 flex-col overflow-hidden rounded-2xl bg-white shadow-lg">
        {/* Chat header (sticky) */}
        <div className="sticky top-0 z-10 flex min-h-[64px] items-center gap-3 border-b border-gray-100 bg-white/80 p-4">
          {activeConversation && (
            <>
              <img
                src={activeConversation.avatar || '/assets/servicesOfsignup/profilePicTemp.png'}
                alt="avatar"
                className="h-10 w-10 rounded-full border object-cover"
              />
              <div>
                <div className="font-semibold">{activeConversation.name}</div>
                <div className="text-xs text-green-500">Online</div>
              </div>
            </>
          )}
        </div>
        {/* Messages */}
        <div className="scrollbar-thin scrollbar-thumb-gray-200 flex-1 overflow-y-auto bg-[#f7fafc] px-4 py-6">
          <Suspense fallback={<div className="flex h-full items-center justify-center">Loading messages...</div>}>
            <ChatMessages
              messages={messages}
              activeConversation={activeConversation}
              currentUser={currentUser}
            />
          </Suspense>
        </div>
        {/* Input */}
        <div className="sticky bottom-0 z-10 border-t border-gray-100 bg-white/80 p-4">
          <Suspense fallback={<div>Loading input...</div>}>
            <ChatInput onSendMessage={sendMessage} />
          </Suspense>
        </div>
      </main>

      {/* Details panel */}
      <aside className="m-2 hidden w-full max-w-xs flex-col overflow-hidden rounded-2xl rounded-r-2xl bg-white shadow-lg lg:flex">
        {activeConversation && (
          <Suspense fallback={<div className="p-4">Loading details...</div>}>
            <ChatDetails contact={activeConversation} />
          </Suspense>
        )}
      </aside>
    </div>
  );
};

export default ChatPage;
