import { useState, FormEvent, KeyboardEvent, useRef, useEffect } from 'react';
import { Send, Paperclip, Smile } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (content: string) => void;
}

const EMOJIS = [
  '😀',
  '😂',
  '😍',
  '😎',
  '👍',
  '🎉',
  '🙏',
  '🔥',
  '🥳',
  '😢',
  '😡',
  '❤️',
  '😅',
  '🤔',
  '🙌',
];

const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [message, setMessage] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const emojiButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!showEmojis) return;
    function handleClickOutside(event: MouseEvent) {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node) &&
        emojiButtonRef.current &&
        !emojiButtonRef.current.contains(event.target as Node)
      ) {
        setShowEmojis(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showEmojis]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;
    onSendMessage(trimmedMessage);
    setMessage('');
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleEmojiClick = (emoji: string) => {
    if (!message.trim()) {
      onSendMessage(emoji);
      setShowEmojis(false);
      setMessage('');
      return;
    }
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const newMessage = message.slice(0, start) + emoji + message.slice(end);
    setMessage(newMessage);
    setShowEmojis(false);
    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = start + emoji.length;
    }, 0);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex items-end justify-center"
    >
      <div className="relative mr-2 flex-1">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full resize-none rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          placeholder="Type a message..."
          rows={1}
        />
        <div className="absolute top-4 right-2 flex space-x-1">
          <button
            type="button"
            className="text-gray-400 hover:text-gray-600"
            title="Attach a file"
          >
            <Paperclip className="mb-1 h-5 w-5" />
          </button>
          <div className="relative">
            <button
              ref={emojiButtonRef}
              type="button"
              className="text-gray-400 hover:text-gray-600"
              title="Add emoji"
              onClick={() => setShowEmojis((v) => !v)}
            >
              <Smile className="h-5 w-5" />
            </button>
            {showEmojis && (
              <div
                ref={emojiPickerRef}
                className="absolute right-0 bottom-12 z-20 mx-auto grid w-64 grid-cols-5 gap-5 rounded-lg bg-white p-2 shadow-lg"
              >
                {EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    className="rounded text-xl hover:bg-gray-100"
                    onClick={() => handleEmojiClick(emoji)}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="bg-primary mb-2 rounded-full p-3 text-white"
        disabled={!message.trim()}
      >
        <Send className="h-5 w-5" />
      </button>
    </form>
  );
};

export default ChatInput;
