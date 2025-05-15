import { lazy, useEffect, Suspense } from 'react';
import { useChat } from './hooks/useChat';
import { useParams } from 'react-router';

const ChatSidebar = lazy(() => import('./components/ChatSidebar'));
const ChatMessages = lazy(() => import('./components/ChatMessages'));
const ChatInput = lazy(() => import('./components/ChatInput'));
const ChatDetails = lazy(() => import('./components/ChatDetails'));
import Loading from '../../loading';
import { AlertTriangleIcon } from '@/modules/shared/icons';

const ChatPage = () => {
  const { id } = useParams();
  const {
    messages,
    conversations,
    activeConversation,
    sendMessage,
    selectConversation,
    startNewConversation,
    currentUser,
    loading,
    error,
    isCreatingChat,
  } = useChat();
  useEffect(() => {
    if (id && conversations) {
      const existingConversation = conversations.find(
        (conv) => conv.id === parseInt(id)
      );
      if (existingConversation) {
        selectConversation(existingConversation);
      } else if (parseInt(id)) {
        startNewConversation(parseInt(id));
      }
    }
  }, [id, conversations, selectConversation, startNewConversation]);

  if (loading) {
    return (<Loading/> );
  }

  if (error) {
    return (
      <div className="bg-white flex h-[calc(100vh-100px)] w-full items-center justify-center">
        <div className="flex flex-col items-center gap-4 p-6 bg-primary/10 rounded-lg border border-primary/20 max-w-md">
          <AlertTriangleIcon className="h-12 w-12 text-primary" />
          <h3 className="text-xl font-semibold text-gray-800">Something went wrong</h3>
          <div className="text-base text-primary text-center">{error}</div>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-primary/30 flex h-[calc(100vh-100px)] w-full text-gray-900">
      {/* Sidebar */}
      <aside className="m-2 hidden w-full max-w-xs flex-col overflow-hidden rounded-2xl rounded-l-2xl bg-white/80 shadow-lg md:flex">
        <div className="scrollbar-thin scrollbar-thumb-gray-200 flex-1 overflow-y-auto">
          <Suspense
            fallback={<div className="p-4">Loading conversations...</div>}
          >
            <ChatSidebar
              conversations={conversations || []}
              activeConversation={activeConversation}
              onSelectConversation={selectConversation}
              onStartNewChat={(user) => startNewConversation(user.id)}
              isCreatingChat={isCreatingChat}
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
                src={
                  activeConversation.avatar ||
                  '/assets/servicesOfsignup/profilePicTemp.png'
                }
                alt="avatar"
                className="h-10 w-10 rounded-full border object-cover"
              />
              <div>
                <div className="font-semibold">{activeConversation.name}</div>
              </div>
            </>
          )}
        </div>
        {/* Messages */}
        <div className="scrollbar-thin scrollbar-thumb-gray-200 flex-1 overflow-y-auto bg-[#f7fafc] px-4 py-6">
          <Suspense
            fallback={
              <div className="flex h-full items-center justify-center">
                Loading messages...
              </div>
            }
          >
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
