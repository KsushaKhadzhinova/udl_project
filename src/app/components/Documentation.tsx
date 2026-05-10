import { useState } from 'react';
import { Search, ChevronRight, Copy, CheckCircle } from 'lucide-react';
import { Input } from './ui/Input';

interface Topic {
  id: string;
  title: string;
  children?: Topic[];
}

const topics: Topic[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    children: [
      { id: 'installation', title: 'Installation' },
      { id: 'first-project', title: 'Your First Project' }
    ]
  },
  {
    id: 'udl-syntax',
    title: 'UDL Syntax',
    children: [
      { id: 'entities', title: 'Entities' },
      { id: 'relationships', title: 'Relationships' },
      { id: 'decorators', title: 'Decorators' }
    ]
  },
  {
    id: 'idef0-standards',
    title: 'IDEF0 Standards',
    children: [
      { id: 'notation', title: 'Notation Basics' },
      { id: 'diagrams', title: 'Creating Diagrams' }
    ]
  },
  {
    id: 'petri-nets',
    title: 'Petri Nets Theory',
    children: [
      { id: 'basics', title: 'Basic Concepts' },
      { id: 'analysis', title: 'Analysis Methods' }
    ]
  }
];

function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-4 rounded-sm overflow-hidden" style={{ border: '1px solid #3E3E42' }}>
      <div
        className="flex items-center justify-between px-3 py-2 border-b"
        style={{ background: '#252526', borderColor: '#3E3E42' }}
      >
        <span className="text-[10px] uppercase" style={{ color: '#858585' }}>
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 px-2 py-1 rounded-sm transition-colors text-[10px]"
          style={{
            background: copied ? '#28A745' : '#444444',
            color: '#FFFFFF'
          }}
        >
          {copied ? <CheckCircle size={12} /> : <Copy size={12} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre
        className="p-4 overflow-x-auto"
        style={{
          background: '#1E1E1E',
          color: '#CCCCCC',
          fontFamily: 'Fira Code, monospace',
          fontSize: '12px',
          lineHeight: '1.6'
        }}
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}

function NavItem({ topic, level = 0, activeId, onSelect }: {
  topic: Topic;
  level?: number;
  activeId: string;
  onSelect: (id: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(level === 0);
  const isActive = activeId === topic.id;

  return (
    <div>
      <button
        onClick={() => {
          if (topic.children) {
            setIsOpen(!isOpen);
          }
          onSelect(topic.id);
        }}
        className="w-full flex items-center gap-2 px-3 py-2 text-left transition-colors text-[12px]"
        style={{
          paddingLeft: `${12 + level * 16}px`,
          background: isActive ? '#094771' : 'transparent',
          color: isActive ? '#FFFFFF' : '#CCCCCC'
        }}
      >
        {topic.children && (
          <ChevronRight
            size={14}
            strokeWidth={1.5}
            className="transition-transform"
            style={{
              transform: isOpen ? 'rotate(90deg)' : 'none',
              color: '#858585'
            }}
          />
        )}
        {!topic.children && <span className="w-3.5" />}
        {topic.title}
      </button>

      {topic.children && isOpen && (
        <div>
          {topic.children.map(child => (
            <NavItem
              key={child.id}
              topic={child}
              level={level + 1}
              activeId={activeId}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function Documentation() {
  const [activeId, setActiveId] = useState('getting-started');
  const [searchQuery, setSearchQuery] = useState('');

  const content: Record<string, { title: string; content: JSX.Element }> = {
    'getting-started': {
      title: 'Getting Started',
      content: (
        <>
          <p style={{ color: '#858585', marginBottom: '16px' }}>
            Welcome to UDL Editor! This guide will help you create your first diagram.
          </p>

          <h3 style={{ color: '#E1E1E1', fontSize: '14px', fontWeight: 600, marginTop: '24px', marginBottom: '12px' }}>
            Installation
          </h3>
          <p style={{ color: '#858585', marginBottom: '16px' }}>
            Download the latest version from the official website and follow the installation wizard.
          </p>

          <CodeBlock
            language="bash"
            code={`# Install UDL Editor CLI
npm install -g udl-editor

# Verify installation
udl --version`}
          />
        </>
      )
    },
    'udl-syntax': {
      title: 'UDL Syntax',
      content: (
        <>
          <p style={{ color: '#858585', marginBottom: '16px' }}>
            UDL (Unified Diagram Language) is a domain-specific language for modeling entities and relationships.
          </p>

          <h3 style={{ color: '#E1E1E1', fontSize: '14px', fontWeight: 600, marginTop: '24px', marginBottom: '12px' }}>
            Entity Definition
          </h3>

          <CodeBlock
            language="UDL"
            code={`entity User {
  id: UUID @primary
  username: String @unique
  email: String @unique
  createdAt: DateTime @default(now())

  orders: Order[]
}

entity Order {
  id: UUID @primary
  userId: UUID @foreign(User.id)
  status: OrderStatus
  total: Decimal

  user: User @relation
}`}
          />

          <p style={{ color: '#858585', marginTop: '16px' }}>
            Entities are defined using the <code style={{ color: '#569CD6' }}>entity</code> keyword followed by properties and decorators.
          </p>
        </>
      )
    },
    'idef0-standards': {
      title: 'IDEF0 Standards',
      content: (
        <>
          <p style={{ color: '#858585', marginBottom: '16px' }}>
            IDEF0 is a function modeling methodology for describing manufacturing functions.
          </p>

          <h3 style={{ color: '#E1E1E1', fontSize: '14px', fontWeight: 600, marginTop: '24px', marginBottom: '12px' }}>
            IDEF0 Notation
          </h3>

          <CodeBlock
            language="IDEF0"
            code={`activity ProcessOrder {
  inputs: [RawOrder, CustomerData]
  outputs: [ProcessedOrder]
  controls: [BusinessRules, Regulations]
  mechanisms: [OrderSystem, Database]
}`}
          />

          <p style={{ color: '#858585', marginTop: '16px' }}>
            Each activity box has four sides: Input (left), Output (right), Control (top), and Mechanism (bottom).
          </p>
        </>
      )
    },
    'petri-nets': {
      title: 'Petri Nets Theory',
      content: (
        <>
          <p style={{ color: '#858585', marginBottom: '16px' }}>
            Petri nets are a mathematical modeling language for distributed systems.
          </p>

          <h3 style={{ color: '#E1E1E1', fontSize: '14px', fontWeight: 600, marginTop: '24px', marginBottom: '12px' }}>
            Basic Structure
          </h3>

          <CodeBlock
            language="PetriNet"
            code={`net OrderProcessing {
  places: [Received, Processing, Completed]
  transitions: [StartProcess, FinishProcess]

  arcs: [
    Received -> StartProcess,
    StartProcess -> Processing,
    Processing -> FinishProcess,
    FinishProcess -> Completed
  ]
}`}
          />

          <p style={{ color: '#858585', marginTop: '16px' }}>
            A Petri net consists of places (circles), transitions (rectangles), and directed arcs.
          </p>
        </>
      )
    }
  };

  const currentContent = content[activeId] || content['getting-started'];

  return (
    <div className="h-screen flex" style={{ background: '#1E1E1E' }}>
      <aside
        className="flex flex-col border-r overflow-hidden"
        style={{
          width: '250px',
          background: '#252526',
          borderColor: '#3E3E42'
        }}
      >
        <div className="p-3">
          <div className="relative">
            <Search
              size={14}
              strokeWidth={1.5}
              className="absolute left-2 top-1/2 -translate-y-1/2"
              style={{ color: '#858585' }}
            />
            <input
              type="text"
              placeholder="Search docs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 rounded-sm transition-all"
              style={{
                height: '28px',
                background: '#1E1E1E',
                border: '1px solid #3E3E42',
                color: '#CCCCCC',
                fontSize: '12px'
              }}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {topics.map(topic => (
            <NavItem
              key={topic.id}
              topic={topic}
              activeId={activeId}
              onSelect={setActiveId}
            />
          ))}
        </div>

        <div
          className="px-3 py-2 border-t text-[10px]"
          style={{ borderColor: '#3E3E42', color: '#858585' }}
        >
          Version 1.0.0 • Last updated: May 2026
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto p-8">
          <h1
            style={{
              color: '#E1E1E1',
              fontSize: '24px',
              fontWeight: 600,
              marginBottom: '8px'
            }}
          >
            {currentContent.title}
          </h1>

          <div className="animate-fade-in">
            {currentContent.content}
          </div>
        </div>
      </main>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 200ms ease-out;
        }
      `}</style>
    </div>
  );
}
