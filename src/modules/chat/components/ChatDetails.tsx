import { Conversation } from '../types';

interface ChatDetailsProps {
  contact: Conversation;
}

const ChatDetails = ({ contact }: ChatDetailsProps) => {
  return (
    <div className="p-4 h-full flex flex-col">
      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold mb-2">{contact.name}</h2>
        
        <div className="w-28 h-28 mx-auto mb-4 relative">
          <img 
            src={contact.avatar || '/default-avatar.png'} 
            alt={contact.name}
            className="w-full h-full rounded-full"
          />
          {contact.isOnline && (
            <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
          )}
        </div>
        
        <div className="mb-2">
          <span className={`inline-block px-3 py-1 rounded-full text-sm ${
            contact.isOnline 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {contact.isOnline ? 'Online' : 'Offline'}
          </span>
        </div>
      </div>
      
      <div className="flex-1">
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-500 mb-3">Contact Information</h3>
          {contact.email && (
            <div className="flex items-center mb-3">
              <svg 
                className="w-5 h-5 text-gray-500 mr-3" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                />
              </svg>
              <span className="text-sm text-gray-700">{contact.email}</span>
            </div>
          )}
          
          {contact.phoneNumber && (
            <div className="flex items-center">
              <svg 
                className="w-5 h-5 text-gray-500 mr-3" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                />
              </svg>
              <span className="text-sm text-gray-700">{contact.phoneNumber}</span>
            </div>
          )}
        </div>
        
        <div className="border-t border-gray-200 pt-4">
          <h3 className="text-sm font-medium text-gray-500 mb-3">Actions</h3>
          <div className="grid grid-cols-2 gap-2">
            <button className="flex items-center justify-center px-4 py-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200">
              <svg 
                className="w-4 h-4 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" 
                />
              </svg>
              <span className="text-sm">Profile</span>
            </button>
            <button className="flex items-center justify-center px-4 py-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200">
              <svg 
                className="w-4 h-4 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                />
              </svg>
              <span className="text-sm">Delete</span>
            </button>
            <button className="flex items-center justify-center px-4 py-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200">
              <svg 
                className="w-4 h-4 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" 
                />
              </svg>
              <span className="text-sm">Archive</span>
            </button>
            <button className="flex items-center justify-center px-4 py-2 bg-gray-100 rounded-lg text-gray-700 hover:bg-gray-200">
              <svg 
                className="w-4 h-4 mr-2" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                />
              </svg>
              <span className="text-sm">Report</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatDetails; 