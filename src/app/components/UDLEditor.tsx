import { useState } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { Files, Search, GitBranch, Settings } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

const SAMPLE_UDL_CODE = `// UDL Diagram Example
class User {
  +id: string
  +name: string
  +email: string
  +login()
  +logout()
}

class Admin extends User {
  +role: string
  +manageUsers()
}

class Database {
  +connect()
  +query()
}

User --> Database
Admin --> Database`;

interface DiagramNode {
  id: string;
  type: 'class';
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

const MOCK_NODES: DiagramNode[] = [
  { id: '1', type: 'class', name: 'User', x: 100, y: 80, width: 160, height: 120 },
  { id: '2', type: 'class', name: 'Admin', x: 100, y: 240, width: 160, height: 100 },
  { id: '3', type: 'class', name: 'Database', x: 340, y: 160, width: 160, height: 80 }
];

export function UDLEditor() {
  const [code, setCode] = useState(SAMPLE_UDL_CODE);
  const [zoom, setZoom] = useState(100);
  const [activeView, setActiveView] = useState<'files' | 'search' | 'git' | 'settings'>('files');
  const [sidebarVisible, setSidebarVisible] = useState(true);

  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        background: 'var(--bg-base)',
        color: 'var(--text-primary)'
      }}
    >
      {/* Activity Bar - VS Code style */}
      <div
        style={{
          width: '48px',
          background: 'var(--bg-activity-bar)',
          borderRight: '1px solid var(--border-default)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <div>
          {[
            { id: 'files' as const, icon: Files, label: 'Explorer' },
            { id: 'search' as const, icon: Search, label: 'Search' },
            { id: 'git' as const, icon: GitBranch, label: 'Source Control' },
            { id: 'settings' as const, icon: Settings, label: 'Settings' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => {
                if (activeView === item.id) {
                  setSidebarVisible(!sidebarVisible);
                } else {
                  setActiveView(item.id);
                  setSidebarVisible(true);
                }
              }}
              className="udl-transition-fast"
              style={{
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent',
                border: 'none',
                borderLeft: activeView === item.id ? '2px solid var(--color-primary)' : '2px solid transparent',
                color: activeView === item.id ? 'var(--text-inverse)' : 'var(--text-secondary)',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => activeView !== item.id && (e.currentTarget.style.color = 'var(--text-inverse)')}
              onMouseLeave={(e) => activeView !== item.id && (e.currentTarget.style.color = 'var(--text-secondary)')}
              title={item.label}
            >
              <item.icon size={24} strokeWidth={1.5} />
            </button>
          ))}
        </div>

        {/* Theme Toggle at bottom */}
        <div
          style={{
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <ThemeToggle />
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <PanelGroup direction="horizontal">
          {/* Sidebar */}
          {sidebarVisible && (
            <>
              <Panel defaultSize={20} minSize={15} maxSize={30}>
                <div
                  style={{
                    height: '100%',
                    background: 'var(--bg-sidebar)',
                    borderRight: '1px solid var(--border-default)',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  {/* Sidebar Header */}
                  <div
                    style={{
                      height: '35px',
                      padding: '0 12px',
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: '11px',
                      fontWeight: 600,
                      color: 'var(--text-secondary)',
                      textTransform: 'uppercase',
                      borderBottom: '1px solid var(--border-default)'
                    }}
                  >
                    {activeView === 'files' && 'Explorer'}
                    {activeView === 'search' && 'Search'}
                    {activeView === 'git' && 'Source Control'}
                    {activeView === 'settings' && 'Settings'}
                  </div>

                  {/* Sidebar Content */}
                  <div style={{ flex: 1, padding: '8px', overflow: 'auto' }}>
                    {activeView === 'files' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        {['diagram.udl', 'class-model.udl', 'sequence.udl', 'activity.udl'].map(file => (
                          <div
                            key={file}
                            className="udl-transition-fast"
                            style={{
                              padding: '4px 8px',
                              fontSize: '12px',
                              color: file === 'diagram.udl' ? 'var(--text-primary)' : 'var(--text-secondary)',
                              background: file === 'diagram.udl' ? 'var(--bg-selection)' : 'transparent',
                              borderRadius: '2px',
                              cursor: 'pointer',
                              fontFamily: 'var(--font-editor)'
                            }}
                            onMouseEnter={(e) => file !== 'diagram.udl' && (e.currentTarget.style.background = 'var(--bg-hover)')}
                            onMouseLeave={(e) => file !== 'diagram.udl' && (e.currentTarget.style.background = 'transparent')}
                          >
                            {file}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Panel>
              <PanelResizeHandle
                style={{
                  width: '1px',
                  background: 'var(--border-default)'
                }}
              />
            </>
          )}

          {/* Code Editor */}
          <Panel defaultSize={sidebarVisible ? 40 : 50} minSize={30}>
            <div
              style={{
                height: '100%',
                background: 'var(--bg-base)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Tab Bar */}
              <div
                style={{
                  height: '35px',
                  background: 'var(--bg-base)',
                  borderBottom: '1px solid var(--border-default)',
                  display: 'flex',
                  alignItems: 'flex-end'
                }}
              >
                <div
                  style={{
                    padding: '0 16px',
                    height: '35px',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '12px',
                    color: 'var(--text-primary)',
                    background: 'var(--bg-base)',
                    borderTop: '2px solid var(--color-primary)',
                    borderRight: '1px solid var(--border-default)',
                    fontFamily: 'var(--font-editor)'
                  }}
                >
                  diagram.udl
                </div>
              </div>

              {/* Code Area */}
              <div
                style={{
                  flex: 1,
                  overflow: 'auto'
                }}
              >
                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  spellCheck={false}
                  style={{
                    width: '100%',
                    height: '100%',
                    padding: '16px',
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: 'var(--text-editor)',
                    fontFamily: 'var(--font-editor)',
                    fontSize: '14px',
                    lineHeight: '1.6',
                    resize: 'none',
                    caretColor: 'var(--text-primary)'
                  }}
                />
              </div>
            </div>
          </Panel>

          <PanelResizeHandle
            style={{
              width: '1px',
              background: 'var(--border-default)'
            }}
          />

          {/* Diagram Preview */}
          <Panel defaultSize={sidebarVisible ? 40 : 50} minSize={30}>
            <div
              style={{
                height: '100%',
                background: 'var(--bg-canvas)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Preview Tab Bar */}
              <div
                style={{
                  height: '35px',
                  background: 'var(--bg-base)',
                  borderBottom: '1px solid var(--border-default)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between'
                }}
              >
                <div
                  style={{
                    padding: '0 16px',
                    height: '35px',
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '12px',
                    color: 'var(--text-primary)',
                    background: 'var(--bg-base)',
                    borderTop: '2px solid var(--color-primary)',
                    borderRight: '1px solid var(--border-default)'
                  }}
                >
                  Preview
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 8px' }}>
                  <span
                    style={{
                      fontSize: '11px',
                      color: 'var(--text-secondary)'
                    }}
                  >
                    {zoom}%
                  </span>
                </div>
              </div>

              {/* Canvas Area */}
              <div
                style={{
                  flex: 1,
                  position: 'relative',
                  overflow: 'auto'
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    transform: `scale(${zoom / 100})`,
                    transformOrigin: 'top left',
                    padding: '40px'
                  }}
                >
                  {/* Class Diagrams */}
                  {MOCK_NODES.map(node => (
                    <div
                      key={node.id}
                      style={{
                        position: 'absolute',
                        left: node.x,
                        top: node.y,
                        width: node.width,
                        height: node.height,
                        background: 'var(--bg-elevated)',
                        border: '1px solid var(--border-default)',
                        borderRadius: '2px',
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                    >
                      <div
                        style={{
                          padding: '8px 12px',
                          background: 'var(--color-primary)',
                          color: 'var(--text-inverse)',
                          fontSize: '12px',
                          fontWeight: 600,
                          borderTopLeftRadius: '2px',
                          borderTopRightRadius: '2px'
                        }}
                      >
                        {node.name}
                      </div>
                      <div
                        style={{
                          flex: 1,
                          padding: '8px 12px',
                          fontSize: '11px',
                          fontFamily: 'var(--font-editor)',
                          color: 'var(--text-secondary)',
                          lineHeight: '1.4'
                        }}
                      >
                        {node.name === 'User' && (
                          <>
                            <div>+id: string</div>
                            <div>+name: string</div>
                            <div>+login()</div>
                          </>
                        )}
                        {node.name === 'Admin' && (
                          <>
                            <div>+role: string</div>
                            <div>+manageUsers()</div>
                          </>
                        )}
                        {node.name === 'Database' && (
                          <>
                            <div>+connect()</div>
                            <div>+query()</div>
                          </>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Connections */}
                  <svg
                    style={{
                      position: 'absolute',
                      inset: 0,
                      width: '100%',
                      height: '100%',
                      pointerEvents: 'none'
                    }}
                  >
                    <defs>
                      <marker
                        id="arrow"
                        markerWidth="8"
                        markerHeight="8"
                        refX="7"
                        refY="4"
                        orient="auto"
                      >
                        <polygon points="0 0, 8 4, 0 8" fill="var(--border-default)" />
                      </marker>
                    </defs>
                    <line x1={260} y1={140} x2={340} y2={200} stroke="var(--border-default)" strokeWidth="1.5" markerEnd="url(#arrow)" />
                    <line x1={260} y1={290} x2={340} y2={220} stroke="var(--border-default)" strokeWidth="1.5" markerEnd="url(#arrow)" />
                    <line x1={180} y1={200} x2={180} y2={240} stroke="var(--border-default)" strokeWidth="1.5" strokeDasharray="4 2" markerEnd="url(#arrow)" />
                  </svg>
                </div>
              </div>
            </div>
          </Panel>
        </PanelGroup>
      </div>

      {/* Status Bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '22px',
          background: 'var(--bg-statusbar)',
          color: 'var(--text-inverse)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 12px',
          fontSize: '11px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span>UDL</span>
          <span>UTF-8</span>
          <span>Ln 1, Col 1</span>
        </div>
        <div>
          <span>{zoom}%</span>
        </div>
      </div>
    </div>
  );
}
