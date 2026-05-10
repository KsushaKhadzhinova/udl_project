import { useState } from 'react';
import {
  Files,
  Search,
  GitBranch as GitIcon,
  Bug,
  Settings,
  Menu,
  Circle
} from 'lucide-react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { ExplorerSidebar } from './ExplorerSidebar';
import { CodeEditor } from './CodeEditor';
import { VSCodeTabs } from './vscode/VSCodeTabs';
import { DrawioCanvas } from './drawio/DrawioCanvas';
import { PropertiesPanel } from './drawio/PropertiesPanel';
import { VSCodeBottomPanel } from './vscode/VSCodeBottomPanel';

export function VSCodeDrawioApp() {
  const [activeView, setActiveView] = useState<'explorer' | 'search' | 'git' | 'debug'>('explorer');
  const [showSidebar, setShowSidebar] = useState(true);
  const [showProperties, setShowProperties] = useState(true);

  const activityItems = [
    { id: 'explorer', icon: Files, label: 'Explorer', badge: null },
    { id: 'search', icon: Search, label: 'Search', badge: null },
    { id: 'git', icon: GitIcon, label: 'Source Control', badge: 2 },
    { id: 'debug', icon: Bug, label: 'Run and Debug', badge: null }
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateAreas: `
          'activity sidebar main'
          'activity sidebar main'
        `,
        gridTemplateColumns: showSidebar ? '48px 260px 1fr' : '48px 0 1fr',
        gridTemplateRows: '1fr auto',
        height: '100vh',
        width: '100vw',
        background: '#1E1E1E',
        overflow: 'hidden'
      }}
    >
      {/* VS Code Activity Bar */}
      <nav
        style={{
          gridArea: 'activity',
          background: '#333333',
          borderRight: '1px solid #2B2B2B',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '8px 0',
          zIndex: 10
        }}
        aria-label="Activity bar"
      >
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {activityItems.map(item => {
            const Icon = item.icon;
            const isActive = activeView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveView(item.id as any);
                  setShowSidebar(true);
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
                  borderLeft: isActive ? '2px solid #007ACC' : '2px solid transparent',
                  color: isActive ? '#FFFFFF' : '#858585',
                  cursor: 'pointer',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#CCCCCC';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#858585';
                  }
                }}
                title={item.label}
                aria-label={item.label}
                aria-pressed={isActive}
              >
                <Icon size={24} strokeWidth={1.5} />
                {item.badge && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      minWidth: '16px',
                      height: '16px',
                      padding: '0 4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: '#007ACC',
                      borderRadius: '8px',
                      color: '#FFFFFF',
                      fontSize: '10px',
                      fontWeight: 600
                    }}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <button
          className="udl-transition-fast"
          style={{
            width: '48px',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
            border: 'none',
            color: '#858585',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#CCCCCC'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#858585'}
          title="Settings"
        >
          <Settings size={24} strokeWidth={1.5} />
        </button>
      </nav>

      {/* VS Code Sidebar */}
      <aside
        style={{
          gridArea: 'sidebar',
          background: '#252526',
          borderRight: '1px solid #2B2B2B',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          width: showSidebar ? '260px' : '0',
          transition: 'width 200ms ease-in-out'
        }}
        aria-label="Sidebar"
      >
        {showSidebar && <ExplorerSidebar />}
      </aside>

      {/* Main Content Area */}
      <main
        style={{
          gridArea: 'main',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* VS Code File Tabs */}
        <VSCodeTabs />

        {/* Editor + Canvas + Properties (3-pane split) */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          <PanelGroup direction="horizontal">
            {/* Left: Code Editor */}
            <Panel defaultSize={35} minSize={20}>
              <div
                style={{
                  height: '100%',
                  background: '#1E1E1E',
                  borderRight: '1px solid #2B2B2B'
                }}
              >
                <CodeEditor />
              </div>
            </Panel>

            {/* VS Code Style Resizer */}
            <PanelResizeHandle
              style={{
                width: '4px',
                background: '#2B2B2B',
                cursor: 'col-resize',
                transition: 'background 120ms ease-in-out'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#007ACC'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#2B2B2B'}
            />

            {/* Center: Draw.io Canvas */}
            <Panel defaultSize={showProperties ? 45 : 65} minSize={30}>
              <DrawioCanvas />
            </Panel>

            {showProperties && (
              <>
                {/* Draw.io Style Resizer */}
                <PanelResizeHandle
                  style={{
                    width: '4px',
                    background: '#E0E0E0',
                    cursor: 'col-resize',
                    transition: 'background 120ms ease-in-out'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#007ACC'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#E0E0E0'}
                />

                {/* Right: Draw.io Properties Panel */}
                <Panel defaultSize={20} minSize={15} maxSize={30}>
                  <PropertiesPanel />
                </Panel>
              </>
            )}
          </PanelGroup>
        </div>

        {/* VS Code Bottom Panel */}
        <VSCodeBottomPanel />
      </main>

      {/* VS Code Status Bar */}
      <footer
        style={{
          gridColumn: '1 / -1',
          background: '#007ACC',
          borderTop: '1px solid #007ACC',
          height: '22px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 8px',
          fontSize: '12px',
          color: '#FFFFFF',
          zIndex: 10
        }}
        role="status"
        aria-label="Status bar"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
            <GitIcon size={12} strokeWidth={1.5} />
            <span>main</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Circle size={8} fill="#4EC9B0" stroke="none" />
            <span>Synced</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
            <span>✕ 1</span>
            <span>⚠ 1</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span>Ln 12, Col 5</span>
          <span>Spaces: 2</span>
          <span>UTF-8</span>
          <span style={{ fontWeight: 600 }}>UDL</span>
        </div>
      </footer>
    </div>
  );
}
