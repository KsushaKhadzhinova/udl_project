import { useState } from 'react';
import { Terminal as TerminalIcon, AlertCircle, X, ChevronUp, ChevronDown } from 'lucide-react';

interface Problem {
  severity: 'error' | 'warning';
  message: string;
  file: string;
  line: number;
  column: number;
}

const MOCK_PROBLEMS: Problem[] = [
  {
    severity: 'error',
    message: 'Missing @primary decorator on entity User',
    file: 'main.udl',
    line: 2,
    column: 3
  },
  {
    severity: 'warning',
    message: 'Unused import: OrderStatus',
    file: 'main.udl',
    line: 15,
    column: 1
  }
];

const TERMINAL_OUTPUT = `$ udl build
[14:23:45] Starting build process...
[14:23:46] Parsing UDL files...
[14:23:47] Generating diagram layouts...
[14:23:48] ✓ Build complete (2.3s)
[14:23:48] Output: dist/diagram.svg`;

type TabId = 'terminal' | 'problems';

export function TerminalPanel() {
  const [activeTab, setActiveTab] = useState<TabId>('terminal');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [height, setHeight] = useState(200);

  return (
    <div
      className="udl-terminal-pane"
      style={{
        height: isCollapsed ? '32px' : `${height}px`,
        minHeight: isCollapsed ? '32px' : '100px',
        maxHeight: '400px',
        background: '#1E1E1E',
        borderTop: '1px solid #3C3C3C',
        display: 'flex',
        flexDirection: 'column',
        transition: 'height 200ms ease-in-out'
      }}
    >
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#252526',
          borderBottom: isCollapsed ? 'none' : '1px solid #3C3C3C',
          height: '32px',
          flexShrink: 0
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button
            onClick={() => setActiveTab('terminal')}
            className="udl-focusable udl-transition-fast"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '0 12px',
              height: '32px',
              background: activeTab === 'terminal' ? '#1E1E1E' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'terminal' ? '2px solid #007ACC' : '2px solid transparent',
              color: activeTab === 'terminal' ? '#CCCCCC' : '#858585',
              fontSize: '12px',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 120ms ease-in-out'
            }}
          >
            <TerminalIcon size={14} strokeWidth={1.5} />
            <span>Terminal</span>
          </button>

          <button
            onClick={() => setActiveTab('problems')}
            className="udl-focusable udl-transition-fast"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '0 12px',
              height: '32px',
              background: activeTab === 'problems' ? '#1E1E1E' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'problems' ? '2px solid #007ACC' : '2px solid transparent',
              color: activeTab === 'problems' ? '#CCCCCC' : '#858585',
              fontSize: '12px',
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 120ms ease-in-out'
            }}
          >
            <AlertCircle size={14} strokeWidth={1.5} />
            <span>Problems</span>
            {MOCK_PROBLEMS.length > 0 && (
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '16px',
                  height: '16px',
                  padding: '0 4px',
                  background: '#F48771',
                  borderRadius: '2px',
                  color: '#FFFFFF',
                  fontSize: '10px',
                  fontWeight: 600
                }}
              >
                {MOCK_PROBLEMS.length}
              </span>
            )}
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', paddingRight: '8px' }}>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="udl-focusable udl-transition-fast"
            style={{
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'transparent',
              border: 'none',
              borderRadius: '2px',
              color: '#858585',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#3C3C3C';
              e.currentTarget.style.color = '#CCCCCC';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#858585';
            }}
            title={isCollapsed ? 'Expand' : 'Collapse'}
          >
            {isCollapsed ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          <button
            onClick={() => {}}
            className="udl-focusable udl-transition-fast"
            style={{
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'transparent',
              border: 'none',
              borderRadius: '2px',
              color: '#858585',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#3C3C3C';
              e.currentTarget.style.color = '#CCCCCC';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#858585';
            }}
            title="Close"
          >
            <X size={14} />
          </button>
        </div>
      </header>

      {!isCollapsed && (
        <div
          className="udl-overflow-auto"
          style={{
            flex: 1,
            padding: '8px 12px',
            fontFamily: 'Fira Code, monospace',
            fontSize: '12px',
            lineHeight: '1.6'
          }}
        >
          {activeTab === 'terminal' && (
            <pre
              style={{
                margin: 0,
                color: '#CCCCCC',
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word'
              }}
            >
              {TERMINAL_OUTPUT}
            </pre>
          )}

          {activeTab === 'problems' && (
            <div>
              {MOCK_PROBLEMS.length === 0 ? (
                <div style={{ color: '#4EC9B0', padding: '8px 0' }}>
                  ✓ No problems detected
                </div>
              ) : (
                MOCK_PROBLEMS.map((problem, index) => (
                  <div
                    key={index}
                    className="udl-transition-fast"
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px',
                      padding: '6px 8px',
                      marginBottom: '2px',
                      borderRadius: '2px',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#2A2D2E';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <span
                      style={{
                        color: problem.severity === 'error' ? '#F48771' : '#CCA700',
                        flexShrink: 0,
                        marginTop: '2px'
                      }}
                    >
                      {problem.severity === 'error' ? '✕' : '⚠'}
                    </span>

                    <div style={{ flex: 1 }}>
                      <div style={{ color: '#CCCCCC', marginBottom: '2px' }}>
                        {problem.message}
                      </div>
                      <div style={{ fontSize: '10px', color: '#858585' }}>
                        {problem.file}:{problem.line}:{problem.column}
                      </div>
                    </div>
                  </div>
                ))
              )}

              <div
                style={{
                  marginTop: '12px',
                  paddingTop: '8px',
                  borderTop: '1px solid #3C3C3C',
                  fontSize: '10px',
                  color: '#858585'
                }}
              >
                {MOCK_PROBLEMS.filter(p => p.severity === 'error').length} errors,{' '}
                {MOCK_PROBLEMS.filter(p => p.severity === 'warning').length} warnings
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
