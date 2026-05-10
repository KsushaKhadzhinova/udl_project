import { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Paperclip, Minimize2, Maximize2 } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  actions?: {
    label: string;
    onClick: () => void;
  }[];
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-2">
      <div
        className="w-2 h-2 rounded-full animate-bounce"
        style={{ background: '#858585', animationDelay: '0ms' }}
      />
      <div
        className="w-2 h-2 rounded-full animate-bounce"
        style={{ background: '#858585', animationDelay: '150ms' }}
      />
      <div
        className="w-2 h-2 rounded-full animate-bounce"
        style={{ background: '#858585', animationDelay: '300ms' }}
      />
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  return (
    <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'} mb-3`}>
      <div
        className="max-w-[80%] rounded-sm px-3 py-2"
        style={{
          background: message.type === 'user' ? '#3C3C3C' : '#4B2C85',
          color: '#FFFFFF'
        }}
      >
        <div className="text-[12px] leading-relaxed" style={{ lineHeight: '1.5' }}>
          {message.content}
        </div>

        {message.actions && message.actions.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {message.actions.map((action, i) => (
              <button
                key={i}
                onClick={action.onClick}
                className="px-2 py-1 rounded-sm text-[10px] font-medium transition-all"
                style={{
                  background: '#FFFFFF20',
                  color: '#FFFFFF',
                  border: '1px solid #FFFFFF40'
                }}
              >
                {action.label}
              </button>
            ))}
          </div>
        )}

        <div className="text-[9px] mt-1 opacity-60">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
}

export function AIAssistant({ onClose }: { onClose?: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Hello! I\'m your AI assistant. I can help you with code fixes, diagram conversions, and explanations. How can I help you today?',
      timestamp: new Date(),
      actions: [
        { label: 'Fix code errors', onClick: () => console.log('Fix code') },
        { label: 'Explain diagram', onClick: () => console.log('Explain') },
        { label: 'Convert to BPMN', onClick: () => console.log('Convert') }
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [inputValue]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: 'I\'ve analyzed your request. I can help you apply the fix to your code. Would you like me to proceed?',
        timestamp: new Date(),
        actions: [
          { label: 'Apply fix to code', onClick: () => console.log('Apply fix') },
          { label: 'Explain changes', onClick: () => console.log('Explain') },
          { label: 'Show preview', onClick: () => console.log('Preview') }
        ]
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (isMinimized) {
    return (
      <div
        className="fixed bottom-8 right-8 cursor-pointer transition-all hover:scale-105"
        onClick={() => setIsMinimized(false)}
        style={{
          width: '56px',
          height: '56px',
          background: '#9D5BD2',
          borderRadius: '50%',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100
        }}
      >
        <Sparkles size={24} strokeWidth={1.5} style={{ color: '#FFFFFF' }} />
      </div>
    );
  }

  return (
    <div
      className="fixed bottom-8 right-8 flex flex-col rounded-sm shadow-2xl overflow-hidden animate-slide-up"
      style={{
        width: '320px',
        height: '480px',
        background: '#252526',
        border: '1px solid #3E3E42',
        zIndex: 100
      }}
    >
      <div
        className="flex items-center justify-between px-4 py-3 border-b"
        style={{ background: '#9D5BD2', borderColor: '#7D3EB0' }}
      >
        <div className="flex items-center gap-2">
          <Sparkles size={16} strokeWidth={1.5} style={{ color: '#FFFFFF' }} />
          <h3 className="text-[13px] font-semibold" style={{ color: '#FFFFFF' }}>
            AI Assistant
          </h3>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsMinimized(true)}
            className="p-1 rounded-sm hover:bg-white/10 transition-colors"
            title="Minimize"
          >
            <Minimize2 size={14} strokeWidth={1.5} style={{ color: '#FFFFFF' }} />
          </button>
          <button
            onClick={onClose}
            className="p-1 rounded-sm hover:bg-white/10 transition-colors"
            title="Close"
          >
            <X size={14} strokeWidth={1.5} style={{ color: '#FFFFFF' }} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4" style={{ background: '#1E1E1E' }}>
        {messages.map(message => (
          <MessageBubble key={message.id} message={message} />
        ))}

        {isTyping && <TypingIndicator />}

        <div ref={messagesEndRef} />
      </div>

      <div
        className="border-t p-3"
        style={{ borderColor: '#3E3E42', background: '#252526' }}
      >
        <div className="flex gap-2">
          <button
            className="flex-shrink-0 p-2 rounded-sm hover:bg-white/5 transition-colors"
            title="Attach file"
          >
            <Paperclip size={16} strokeWidth={1.5} style={{ color: '#858585' }} />
          </button>

          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything..."
            className="flex-1 resize-none rounded-sm px-3 py-2 transition-all"
            style={{
              background: '#1E1E1E',
              border: '1px solid #3E3E42',
              color: '#CCCCCC',
              fontSize: '12px',
              minHeight: '36px',
              maxHeight: '120px',
              outline: 'none'
            }}
            rows={1}
          />

          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="flex-shrink-0 p-2 rounded-sm transition-all disabled:opacity-30"
            style={{
              background: '#007ACC',
              color: '#FFFFFF'
            }}
            title="Send"
          >
            <Send size={16} strokeWidth={1.5} />
          </button>
        </div>

        <div className="mt-2 text-[9px]" style={{ color: '#858585' }}>
          Press Enter to send, Shift+Enter for new line
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slide-up {
          animation: slide-up 300ms ease-out;
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }

        .animate-bounce {
          animation: bounce 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
