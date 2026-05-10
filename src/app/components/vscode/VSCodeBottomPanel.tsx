import { useState } from 'react';
import {
  Terminal as TerminalIcon,
  AlertCircle,
  FileOutput,
  Bug,
  X,
  ChevronUp,
  ChevronDown
} from 'lucide-react';

type PanelTab = 'terminal' | 'problems' | 'output' | 'debug';

interface Problem {
  severity: 'error' | 'warning' | 'info';
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
  },
  {
    severity: 'info',
    message: 'Consider adding validation to email field',
    file: 'main.udl',
    line: 4,
    column: 3
  }
];

const TERMINAL_OUTPUT = `$ udl build
[14:23:45] Starting build process...
[14:23:46] Parsing UDL files...
[14:23:46] ├─ main.udl
[14:23:46] ├─ models/system.udl
[14:23:46] └─ diagrams/workflow.diagram
[14:23:47] Generating diagram layouts...
[14:23:47] ├─ Applying force-directed layout
[14:23:47] ├─ Optimizing edge routing
[14:23:47] └─ Calculating bounding boxes
[14:23:48] ✓ Build complete (2.3s)
[14:23:48] Output: dist/diagram.svg
`;

const OUTPUT_LOG = `[Info - 14:23:45] UDL Language Server started
[Info - 14:23:46] Workspace initialized: /workspace
[Info - 14:23:47] Loaded 3 UDL files
[Info - 14:23:48] Diagram validation complete`;

export function VSCodeBottomPanel() {
  const [activeTab, setActiveTab] = useState<PanelTab>('terminal');
  const [isMaximized, setIsMaximized] = useState(false);
  const [height, setHeight] = useState(250);

  const tabs: Array<{ id: PanelTab; label: string; icon: any; badge?: number }> = [
    { id: 'terminal', label: 'Terminal', icon: TerminalIcon },
    {
      id: 'problems',
      label: 'Problems',
      icon: AlertCircle,
      badge: MOCK_PROBLEMS.filter(p => p.severity === 'error').length
    },
    { id: 'output', label: 'Output', icon: FileOutput },
    { id: 'debug', label: 'Debug Console', icon: Bug }
  ];

  return (
    <div
      style={{
        height: isMaximized ? '100%' : `${height}px`,
        minHeight: '150px',
        maxHeight: isMaximized ? '100%' : '500px',
        background: '#1E1E1E',
        borderTop: '1px solid #2B2B2B',
        display: 'flex',
        flexDirection: 'column',
        transition: 'height 200ms ease-in-out'
      }}
    >
      {/* Tab Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#252526',
          borderBottom: '1px solid #2B2B2B',
          height: '35px',
          flexShrink: 0
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="udl-transition-fast"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '0 12px',
                  height: '35px',
                  background: isActive ? '#1E1E1E' : 'transparent',
                  border: 'none',
                  borderBottom: isActive ? '1px solid #007ACC' : '1px solid transparent',
                  color: isActive ? '#FFFFFF' : '#969696',
                  fontSize: '13px',
                  fontWeight: isActive ? 500 : 400,
                  cursor: 'pointer',
                  transition: 'all 120ms ease-in-out'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#CCCCCC';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#969696';
                  }
                }}
              >
                <Icon size={14} strokeWidth={1.5} />
                <span>{tab.label}</span>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minWidth: '18px',
                      height: '18px',
                      padding: '0 5px',
                      background: '#F48771',
                      borderRadius: '9px',
                      color: '#FFFFFF',
                      fontSize: '11px',
                      fontWeight: 600
                    }}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', paddingRight: '4px' }}>
          <button
            onClick={() => setIsMaximized(!isMaximized)}
            className="udl-focusable udl-transition-fast"
            style={{
              width: '28px',
              height: '28px',
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
              e.currentTarget.style.background = '#3E3E42';
              e.currentTarget.style.color = '#CCCCCC';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#858585';
            }}
            title={isMaximized ? 'Restore Panel' : 'Maximize Panel'}
          >
            {isMaximized ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
          </button>

          <button
            className="udl-focusable udl-transition-fast"
            style={{
              width: '28px',
              height: '28px',
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
              e.currentTarget.style.background = '#3E3E42';
              e.currentTarget.style.color = '#CCCCCC';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = '#858585';
            }}
            title="Close Panel"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div
        className="udl-overflow-auto"
        style={{
          flex: 1,
          fontFamily: 'Fira Code, monospace',
          fontSize: '13px',
          lineHeight: '1.6'
        }}
      >
        {activeTab === 'terminal' && (
          <div style={{ padding: '8px 12px' }}>
            <pre
              style={{
                margin: 0,
                color: '#CCCCCC',
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word'
              }}
            >
              {TERMINAL_OUTPUT}
              <span style={{ color: '#4EC9B0' }}>workspace $ </span>
              <span
                style={{
                  display: 'inline-block',
                  width: '8px',
                  height: '16px',
                  background: '#FFFFFF',
                  animation: 'blink 1s step-end infinite',
                  marginLeft: '2px'
                }}
              />
            </pre>
          </div>
        )}

        {activeTab === 'problems' && (
          <div>
            {MOCK_PROBLEMS.map((problem, index) => {
              const severityColors = {
                error: { icon: '✕', color: '#F48771' },
                warning: { icon: '⚠', color: '#CCA700' },
                info: { icon: 'ⓘ', color: '#007ACC' }
              };
              const severity = severityColors[problem.severity];

              return (
                <div
                  key={index}
                  className="udl-transition-fast"
                  style={{
                    display: 'flex',
                    gap: '12px',
                    padding: '6px 12px',
                    borderBottom: '1px solid #2B2B2B',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#2A2D2E'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <span style={{ color: severity.color, flexShrink: 0, marginTop: '2px' }}>
                    {severity.icon}
                  </span>

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ color: '#CCCCCC', marginBottom: '2px', fontSize: '13px' }}>
                      {problem.message}
                    </div>
                    <div
                      style={{
                        fontSize: '11px',
                        color: '#858585',
                        fontFamily: 'Fira Code, monospace'
                      }}
                    >
                      {problem.file} [{problem.line}, {problem.column}]
                    </div>
                  </div>
                </div>
              );
            })}

            <div
              style={{
                padding: '8px 12px',
                fontSize: '11px',
                color: '#858585',
                borderTop: '1px solid #2B2B2B'
              }}
            >
              {MOCK_PROBLEMS.filter(p => p.severity === 'error').length} errors,{' '}
              {MOCK_PROBLEMS.filter(p => p.severity === 'warning').length} warnings,{' '}
              {MOCK_PROBLEMS.filter(p => p.severity === 'info').length} infos
            </div>
          </div>
        )}

        {activeTab === 'output' && (
          <div style={{ padding: '8px 12px' }}>
            <pre
              style={{
                margin: 0,
                color: '#CCCCCC',
                whiteSpace: 'pre-wrap',
                wordWrap: 'break-word',
                fontSize: '12px'
              }}
            >
              {OUTPUT_LOG}
            </pre>
          </div>
        )}

        {activeTab === 'debug' && (
          <div style={{ padding: '16px 12px', color: '#858585', fontSize: '12px' }}>
            Debug console is empty
          </div>
        )}
      </div>

      <style>{`
        @keyframes blink {
          from, to {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
