import { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Code, Bug, BookOpen, MessageSquare, ChevronDown } from 'lucide-react';

type AIMode = 'write-code' | 'fix-errors' | 'explain-notation' | 'ask-docs';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  actions?: {
    label: string;
    type: 'primary' | 'secondary';
    onClick: () => void;
  }[];
}

const AI_MODES: Record<AIMode, { label: string; icon: any; description: string }> = {
  'write-code': {
    label: 'Write Code',
    icon: Code,
    description: 'Generate UDL code from description'
  },
  'fix-errors': {
    label: 'Fix Errors',
    icon: Bug,
    description: 'Analyze and fix code problems'
  },
  'explain-notation': {
    label: 'Explain Notation',
    icon: BookOpen,
    description: 'Explain diagram concepts'
  },
  'ask-docs': {
    label: 'Ask Docs',
    icon: MessageSquare,
    description: 'Search documentation'
  }
};

export function AIAssistantModes({ onClose }: { onClose?: () => void }) {
  const [currentMode, setCurrentMode] = useState<AIMode>('write-code');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: 'Ready to help with code generation. Describe what you need and I\'ll create the UDL entities.',
      timestamp: new Date(),
      actions: [
        { label: 'Insert Template', type: 'secondary', onClick: () => console.log('Insert') },
        { label: 'Show Example', type: 'secondary', onClick: () => console.log('Example') }
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showModeDropdown, setShowModeDropdown] = useState(false);
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
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 96)}px`;
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
      let aiResponse: Message;

      switch (currentMode) {
        case 'fix-errors':
          aiResponse = {
            id: (Date.now() + 1).toString(),
            type: 'ai',
            content: 'Found 2 issues:\n1. Missing @primary decorator on id field\n2. Invalid relationship syntax\n\nWould you like me to apply the fixes?',
            timestamp: new Date(),
            actions: [
              { label: 'Apply to Code', type: 'primary', onClick: () => console.log('Apply') },
              { label: 'Explain Issue', type: 'secondary', onClick: () => console.log('Explain') }
            ]
          };
          break;
        case 'explain-notation':
          aiResponse = {
            id: (Date.now() + 1).toString(),
            type: 'ai',
            content: 'IDEF0 uses box-and-arrow notation where:\n• Inputs enter from the left\n• Outputs exit to the right\n• Controls enter from the top\n• Mechanisms enter from the bottom',
            timestamp: new Date(),
            actions: [
              { label: 'Show Diagram', type: 'secondary', onClick: () => console.log('Diagram') }
            ]
          };
          break;
        case 'ask-docs':
          aiResponse = {
            id: (Date.now() + 1).toString(),
            type: 'ai',
            content: 'Found in documentation: "entity" keyword defines a data model with properties and decorators. See UDL Syntax → Entities.',
            timestamp: new Date(),
            actions: [
              { label: 'Open Docs', type: 'secondary', onClick: () => console.log('Docs') }
            ]
          };
          break;
        default:
          aiResponse = {
            id: (Date.now() + 1).toString(),
            type: 'ai',
            content: 'Generated code based on your description. Review and apply if correct.',
            timestamp: new Date(),
            actions: [
              { label: 'Apply to Code', type: 'primary', onClick: () => console.log('Apply') },
              { label: 'Insert Template', type: 'secondary', onClick: () => console.log('Insert') }
            ]
          };
      }

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1200);
  };

  const handleModeChange = (mode: AIMode) => {
    setCurrentMode(mode);
    setShowModeDropdown(false);
    setMessages([{
      id: Date.now().toString(),
      type: 'ai',
      content: `Switched to ${AI_MODES[mode].label} mode. ${AI_MODES[mode].description}.`,
      timestamp: new Date()
    }]);
  };

  const currentModeConfig = AI_MODES[currentMode];
  const ModeIcon = currentModeConfig.icon;

  return (
    <aside
      className="udl-ai-assistant"
      style={{
        width: '320px',
        background: '#252526',
        borderLeft: '1px solid #3C3C3C',
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <header
        style={{
          background: '#323233',
          borderBottom: '1px solid #3C3C3C',
          padding: '8px 12px'
        }}
      >
        <div className="relative">
          <button
            onClick={() => setShowModeDropdown(!showModeDropdown)}
            className="udl-focusable"
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '8px',
              background: '#3C3C3C',
              border: '1px solid #3C3C3C',
              borderRadius: '2px',
              padding: '6px 8px',
              color: '#CCCCCC',
              fontSize: '12px',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 120ms ease-in-out'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#444444'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#3C3C3C'}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ModeIcon size={14} strokeWidth={1.5} />
              <span>{currentModeConfig.label}</span>
            </div>
            <ChevronDown size={14} strokeWidth={1.5} />
          </button>

          {showModeDropdown && (
            <>
              <div
                style={{
                  position: 'fixed',
                  inset: 0,
                  zIndex: 9
                }}
                onClick={() => setShowModeDropdown(false)}
              />
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  marginTop: '4px',
                  background: '#2D2D30',
                  border: '1px solid #3C3C3C',
                  borderRadius: '2px',
                  overflow: 'hidden',
                  zIndex: 10,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                }}
              >
                {(Object.keys(AI_MODES) as AIMode[]).map((mode) => {
                  const config = AI_MODES[mode];
                  const Icon = config.icon;
                  return (
                    <button
                      key={mode}
                      onClick={() => handleModeChange(mode)}
                      className="udl-focusable"
                      style={{
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        gap: '2px',
                        padding: '8px 12px',
                        background: mode === currentMode ? '#094771' : 'transparent',
                        border: 'none',
                        color: '#CCCCCC',
                        fontSize: '12px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'background 120ms ease-in-out'
                      }}
                      onMouseEnter={(e) => {
                        if (mode !== currentMode) {
                          e.currentTarget.style.background = '#2A2D2E';
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = mode === currentMode ? '#094771' : 'transparent';
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Icon size={14} strokeWidth={1.5} />
                        <span style={{ fontWeight: 500 }}>{config.label}</span>
                      </div>
                      <span style={{ fontSize: '10px', color: '#858585' }}>
                        {config.description}
                      </span>
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>

        <div
          style={{
            marginTop: '8px',
            fontSize: '10px',
            color: '#858585',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <Sparkles size={10} strokeWidth={1.5} />
          Context: {messages.length} messages
        </div>
      </header>

      <div
        className="udl-overflow-auto"
        style={{
          flex: 1,
          padding: '12px',
          background: '#1E1E1E'
        }}
      >
        {messages.map(message => (
          <div
            key={message.id}
            style={{
              marginBottom: '16px',
              fontFamily: 'Inter, sans-serif'
            }}
          >
            <div
              style={{
                fontSize: '10px',
                color: '#858585',
                marginBottom: '4px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                fontWeight: 500
              }}
            >
              {message.type === 'user' ? 'User' : 'AI Assistant'}
            </div>

            <div
              style={{
                fontSize: '12px',
                color: '#CCCCCC',
                lineHeight: '1.5',
                whiteSpace: 'pre-wrap'
              }}
            >
              {message.content}
            </div>

            {message.actions && message.actions.length > 0 && (
              <div style={{ marginTop: '8px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {message.actions.map((action, i) => (
                  <button
                    key={i}
                    onClick={action.onClick}
                    className="udl-focusable udl-transition-fast"
                    style={{
                      padding: '4px 8px',
                      background: action.type === 'primary' ? '#007ACC' : '#3C3C3C',
                      border: action.type === 'primary' ? 'none' : '1px solid #3C3C3C',
                      borderRadius: '2px',
                      color: '#FFFFFF',
                      fontSize: '10px',
                      fontWeight: 500,
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = action.type === 'primary' ? '#0098FF' : '#444444';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = action.type === 'primary' ? '#007ACC' : '#3C3C3C';
                    }}
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {isTyping && (
          <div style={{ display: 'flex', gap: '4px', marginTop: '8px' }}>
            <div
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#858585',
                animation: 'bounce 1s ease-in-out infinite'
              }}
            />
            <div
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#858585',
                animation: 'bounce 1s ease-in-out 0.2s infinite'
              }}
            />
            <div
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#858585',
                animation: 'bounce 1s ease-in-out 0.4s infinite'
              }}
            />
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <footer
        style={{
          borderTop: '1px solid #3C3C3C',
          padding: '8px',
          background: '#252526'
        }}
      >
        <div style={{ display: 'flex', gap: '6px' }}>
          <textarea
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder={`Ask in ${currentModeConfig.label} mode...`}
            className="udl-focusable"
            style={{
              flex: 1,
              resize: 'none',
              background: '#3C3C3C',
              border: '1px solid #3C3C3C',
              borderRadius: '2px',
              padding: '6px 8px',
              color: '#CCCCCC',
              fontSize: '12px',
              fontFamily: 'Inter, sans-serif',
              minHeight: '32px',
              maxHeight: '96px',
              outline: 'none'
            }}
            rows={1}
          />

          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="udl-focusable udl-transition-fast"
            style={{
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#007ACC',
              border: 'none',
              borderRadius: '2px',
              color: '#FFFFFF',
              cursor: inputValue.trim() ? 'pointer' : 'not-allowed',
              opacity: inputValue.trim() ? 1 : 0.3
            }}
          >
            <Send size={14} strokeWidth={1.5} />
          </button>
        </div>

        <div style={{ marginTop: '6px', fontSize: '9px', color: '#858585' }}>
          Enter to send • Shift+Enter for new line
        </div>
      </footer>

      <style>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }
      `}</style>
    </aside>
  );
}
