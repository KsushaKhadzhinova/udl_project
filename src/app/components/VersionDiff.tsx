import { useState, useRef, useEffect } from 'react';
import { GitBranch, User, Calendar, RotateCcw, GitMerge } from 'lucide-react';
import { PrimaryButton } from './ui/PrimaryButton';

interface Commit {
  id: string;
  message: string;
  author: string;
  timestamp: string;
  hash: string;
}

const commits: Commit[] = [
  {
    id: '1',
    hash: 'a3f8b2c',
    message: 'Add Order entity and relationships',
    author: 'Sarah Chen',
    timestamp: '2026-05-10 14:32'
  },
  {
    id: '2',
    hash: 'f2c91d4',
    message: 'Update User entity decorators',
    author: 'John Smith',
    timestamp: '2026-05-09 11:15'
  },
  {
    id: '3',
    hash: 'e8a4b3f',
    message: 'Initial project setup',
    author: 'Sarah Chen',
    timestamp: '2026-05-08 09:00'
  }
];

const originalCode = `entity User {
  id: UUID @primary
  name: String
  email: String @unique

  orders: Order[]
}

entity Product {
  id: UUID @primary
  name: String
  price: Decimal
}`;

const modifiedCode = `entity User {
  id: UUID @primary
  username: String @unique
  email: String @unique
  createdAt: DateTime @default(now())

  orders: Order[]
}

entity Order {
  id: UUID @primary
  userId: UUID @foreign(User.id)
  total: Decimal
}

entity Product {
  id: UUID @primary
  name: String
  price: Decimal
}`;

function DiffEditor({ code, type }: { code: string; type: 'original' | 'modified' }) {
  const lines = code.split('\n');
  const removedLines = type === 'original' ? [2, 3] : [];
  const addedLines = type === 'modified' ? [2, 3, 8, 9, 10, 11, 12] : [];

  return (
    <div className="h-full flex flex-col" style={{ background: '#1E1E1E' }}>
      <div
        className="flex items-center px-4 border-b"
        style={{
          height: '35px',
          background: '#252526',
          borderColor: '#3E3E42'
        }}
      >
        <span className="text-[13px]" style={{ color: '#CCCCCC' }}>
          {type === 'original' ? 'Original (HEAD~1)' : 'Modified (HEAD)'}
        </span>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="flex">
          <div
            className="flex flex-col items-end px-2 select-none"
            style={{
              background: '#1E1E1E',
              color: '#858585',
              fontFamily: 'Fira Code, monospace',
              fontSize: '14px',
              lineHeight: '22.4px',
              paddingTop: '8px'
            }}
          >
            {lines.map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>

          <div
            className="flex-1 py-2"
            style={{
              fontFamily: 'Fira Code, monospace',
              fontSize: '14px',
              lineHeight: '22.4px',
              color: '#CCCCCC'
            }}
          >
            {lines.map((line, i) => {
              const isRemoved = removedLines.includes(i);
              const isAdded = addedLines.includes(i);

              return (
                <div
                  key={i}
                  className="px-4"
                  style={{
                    background: isRemoved
                      ? 'rgba(244, 135, 113, 0.15)'
                      : isAdded
                      ? 'rgba(40, 167, 69, 0.15)'
                      : 'transparent',
                    borderLeft: isRemoved
                      ? '3px solid #F48771'
                      : isAdded
                      ? '3px solid #28A745'
                      : '3px solid transparent'
                  }}
                >
                  <span style={{ color: isRemoved ? '#F48771' : isAdded ? '#28A745' : '#CCCCCC' }}>
                    {line || ' '}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function DiagramPreview({ type }: { type: 'original' | 'modified' }) {
  const nodes = type === 'original'
    ? [
        { label: 'User', x: 50, y: 30, changed: true },
        { label: 'Product', x: 200, y: 30, changed: false }
      ]
    : [
        { label: 'User', x: 30, y: 30, changed: true },
        { label: 'Order', x: 180, y: 30, changed: true },
        { label: 'Product', x: 330, y: 30, changed: false }
      ];

  return (
    <div
      className="relative rounded-sm"
      style={{
        height: '150px',
        background: '#1E1E1E',
        border: '1px solid #3E3E42'
      }}
    >
      <svg className="w-full h-full">
        {type === 'modified' && (
          <line
            x1="110"
            y1="60"
            x2="180"
            y2="60"
            stroke="#007ACC"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
        )}

        {nodes.map((node, i) => (
          <g key={i}>
            <rect
              x={node.x}
              y={node.y}
              width="80"
              height="60"
              fill="#FFFFFF"
              stroke={node.changed ? '#007ACC' : '#3E3E42'}
              strokeWidth={node.changed ? '2' : '1'}
              strokeDasharray={node.changed ? '4 4' : '0'}
              rx="2"
            />
            <text
              x={node.x + 40}
              y={node.y + 35}
              textAnchor="middle"
              fill="#000000"
              fontSize="12"
              fontWeight="600"
            >
              {node.label}
            </text>
          </g>
        ))}
      </svg>

      <div
        className="absolute top-2 left-2 px-2 py-1 rounded-sm text-[10px]"
        style={{
          background: '#252526',
          border: '1px solid #3E3E42',
          color: '#858585'
        }}
      >
        {type === 'original' ? 'Before' : 'After'}
      </div>
    </div>
  );
}

export function VersionDiff() {
  const [selectedCommit, setSelectedCommit] = useState(commits[0]);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = (source: HTMLDivElement, target: HTMLDivElement) => {
      return () => {
        target.scrollTop = source.scrollTop;
      };
    };

    const left = leftRef.current;
    const right = rightRef.current;

    if (left && right) {
      const leftHandler = handleScroll(left, right);
      const rightHandler = handleScroll(right, left);

      left.addEventListener('scroll', leftHandler);
      right.addEventListener('scroll', rightHandler);

      return () => {
        left.removeEventListener('scroll', leftHandler);
        right.removeEventListener('scroll', rightHandler);
      };
    }
  }, []);

  return (
    <div className="h-screen flex" style={{ background: '#1E1E1E' }}>
      <aside
        className="flex flex-col border-r"
        style={{
          width: '280px',
          background: '#252526',
          borderColor: '#3E3E42'
        }}
      >
        <div
          className="px-4 py-3 border-b"
          style={{ borderColor: '#3E3E42' }}
        >
          <h2 className="text-[13px] font-semibold" style={{ color: '#CCCCCC' }}>
            Version History
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto">
          {commits.map((commit) => (
            <button
              key={commit.id}
              onClick={() => setSelectedCommit(commit)}
              className="w-full px-4 py-3 text-left border-b transition-colors"
              style={{
                background: selectedCommit.id === commit.id ? '#094771' : 'transparent',
                borderColor: '#3E3E42'
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <GitBranch size={12} strokeWidth={1.5} style={{ color: '#007ACC' }} />
                <span
                  className="text-[11px] font-mono"
                  style={{ color: '#007ACC' }}
                >
                  {commit.hash}
                </span>
              </div>

              <div className="text-[12px] mb-2" style={{ color: '#CCCCCC' }}>
                {commit.message}
              </div>

              <div className="flex items-center gap-3 text-[10px]" style={{ color: '#858585' }}>
                <div className="flex items-center gap-1">
                  <User size={10} strokeWidth={1.5} />
                  {commit.author}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={10} strokeWidth={1.5} />
                  {commit.timestamp}
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="p-3 border-t space-y-2" style={{ borderColor: '#3E3E42' }}>
          <PrimaryButton
            icon={RotateCcw}
            label="Revert to this version"
            variant="primary"
            onClick={() => console.log('Revert')}
          />
          <PrimaryButton
            icon={GitMerge}
            label="Merge"
            variant="success"
            onClick={() => console.log('Merge')}
          />
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        <div
          className="flex items-center justify-center px-4 border-b"
          style={{
            height: '35px',
            background: '#252526',
            borderColor: '#3E3E42'
          }}
        >
          <span className="text-[13px]" style={{ color: '#CCCCCC' }}>
            Side-by-Side Comparison
          </span>
        </div>

        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 flex flex-col" ref={leftRef}>
            <DiffEditor code={originalCode} type="original" />
          </div>

          <div
            className="w-1"
            style={{ background: '#3E3E42' }}
          />

          <div className="flex-1 flex flex-col" ref={rightRef}>
            <DiffEditor code={modifiedCode} type="modified" />
          </div>
        </div>

        <div
          className="border-t p-4"
          style={{ background: '#252526', borderColor: '#3E3E42' }}
        >
          <div className="text-[11px] mb-3" style={{ color: '#858585' }}>
            Diagram Preview
          </div>

          <div className="grid grid-cols-2 gap-4">
            <DiagramPreview type="original" />
            <DiagramPreview type="modified" />
          </div>

          <div className="mt-3 flex items-center gap-4 text-[10px]" style={{ color: '#858585' }}>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 border-2 rounded-sm" style={{ borderColor: '#007ACC', borderStyle: 'dashed' }} />
              Changed nodes
            </div>
            <div className="flex items-center gap-1">
              <div className="w-8 h-0.5" style={{ background: '#F48771' }} />
              Removed
            </div>
            <div className="flex items-center gap-1">
              <div className="w-8 h-0.5" style={{ background: '#28A745' }} />
              Added
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
