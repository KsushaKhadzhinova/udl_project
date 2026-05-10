import { useState } from 'react';
import {
  Files,
  Search,
  History,
  Github,
  HelpCircle,
  Save,
  Play,
  Sparkles,
  GitBranch,
  Check,
  AlertCircle,
  Menu,
  Code,
  ChevronRight
} from 'lucide-react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { ExplorerSidebar } from './ExplorerSidebar';
import { CodeEditor } from './CodeEditor';
import { DiagramCanvas } from './DiagramCanvas';
import { AIAssistantModes } from './AIAssistantModes';
import { TerminalPanel } from './TerminalPanel';

export function IndustrialApp() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showAI, setShowAI] = useState(true);

  return (
    <div className="udl-app-grid">
      {/* Semantic Header */}
      <header className="udl-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="udl-focusable udl-transition-fast md:hidden"
            style={{
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#3C3C3C',
              border: 'none',
              borderRadius: '2px',
              color: '#CCCCCC',
              cursor: 'pointer'
            }}
            title="Toggle Sidebar"
          >
            <Menu size={16} strokeWidth={1.5} />
          </button>

          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '12px',
              color: '#858585'
            }}
            aria-label="Breadcrumb"
          >
            <span style={{ color: '#CCCCCC' }}>workspace</span>
            <ChevronRight size={12} strokeWidth={1.5} />
            <span style={{ color: '#CCCCCC' }}>src</span>
            <ChevronRight size={12} strokeWidth={1.5} />
            <span style={{ color: '#007ACC' }}>main.udl</span>
          </nav>
        </div>

        <div
          role="toolbar"
          aria-label="Main actions"
          style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <button
            className="udl-focusable udl-transition-fast udl-sharp"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              background: '#3C3C3C',
              border: '1px solid #3C3C3C',
              color: '#CCCCCC',
              fontSize: '12px',
              fontWeight: 500,
              cursor: 'pointer',
              height: '28px'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#444444'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#3C3C3C'}
            title="Save file"
            aria-label="Save file"
          >
            <Save size={14} strokeWidth={1.5} />
            <span className="hidden sm:inline">Save</span>
          </button>

          <button
            className="udl-focusable udl-transition-fast udl-sharp"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              background: '#4EC9B0',
              border: 'none',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: 500,
              cursor: 'pointer',
              height: '28px'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#5FD6BE'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#4EC9B0'}
            title="Run build"
            aria-label="Run build"
          >
            <Play size={14} strokeWidth={1.5} />
            <span className="hidden sm:inline">Run</span>
          </button>

          <button
            className="udl-focusable udl-transition-fast udl-sharp"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              background: '#9D5BD2',
              border: 'none',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: 500,
              cursor: 'pointer',
              height: '28px'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#B470E8'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#9D5BD2'}
            onClick={() => setShowAI(!showAI)}
            title="Toggle AI Assistant"
            aria-label="Toggle AI Assistant"
          >
            <Sparkles size={14} strokeWidth={1.5} />
            <span className="hidden sm:inline">AI</span>
          </button>
        </div>
      </header>

      {/* Semantic Nav - Activity Bar */}
      <nav
        className="udl-activity-bar"
        aria-label="Activity bar"
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <button
            className="udl-focusable udl-transition-fast"
            style={{
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#094771',
              border: 'none',
              borderLeft: '2px solid #007ACC',
              borderRadius: '0',
              color: '#FFFFFF',
              cursor: 'pointer'
            }}
            title="Explorer"
            aria-label="Explorer"
            aria-pressed="true"
          >
            <Files size={20} strokeWidth={1.5} />
          </button>

          {[
            { icon: Search, label: 'Search' },
            { icon: History, label: 'History' },
            { icon: Github, label: 'Source Control' },
            { icon: HelpCircle, label: 'Help' }
          ].map(({ icon: Icon, label }) => (
            <button
              key={label}
              className="udl-focusable udl-transition-fast"
              style={{
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'transparent',
                border: 'none',
                borderRadius: '0',
                color: '#858585',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = '#CCCCCC'}
              onMouseLeave={(e) => e.currentTarget.style.color = '#858585'}
              title={label}
              aria-label={label}
              aria-pressed="false"
            >
              <Icon size={20} strokeWidth={1.5} />
            </button>
          ))}
        </div>
      </nav>

      {/* Semantic Aside - Sidebar */}
      <aside
        className={`udl-sidebar ${isSidebarOpen ? 'is-open' : ''}`}
        aria-label="Sidebar"
      >
        <ExplorerSidebar />
      </aside>

      {/* Semantic Main Content */}
      <main className="udl-main">
        <PanelGroup direction="horizontal">
          <Panel defaultSize={50} minSize={30}>
            <section className="udl-editor-pane" aria-label="Code editor">
              <CodeEditor />
            </section>
          </Panel>

          <PanelResizeHandle
            className="udl-transition-fast"
            style={{
              width: '4px',
              background: '#3C3C3C',
              cursor: 'col-resize',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#007ACC';
              e.currentTarget.style.width = '6px';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#3C3C3C';
              e.currentTarget.style.width = '4px';
            }}
          />

          <Panel defaultSize={50} minSize={30}>
            <section className="udl-canvas-pane" aria-label="Diagram canvas">
              <DiagramCanvas />
            </section>
          </Panel>

          {showAI && (
            <>
              <PanelResizeHandle
                className="udl-transition-fast"
                style={{
                  width: '4px',
                  background: '#3C3C3C',
                  cursor: 'col-resize'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#007ACC';
                  e.currentTarget.style.width = '6px';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#3C3C3C';
                  e.currentTarget.style.width = '4px';
                }}
              />

              <Panel defaultSize={320} minSize={280} maxSize={400}>
                <AIAssistantModes onClose={() => setShowAI(false)} />
              </Panel>
            </>
          )}
        </PanelGroup>

        <TerminalPanel />
      </main>

      {/* Semantic Footer - Status Bar */}
      <footer
        className="udl-statusbar"
        role="status"
        aria-label="Status bar"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '11px'
            }}
            title="Git branch"
          >
            <GitBranch size={12} strokeWidth={1.5} />
            <span>main</span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '11px'
            }}
            title="Sync status"
          >
            <Check size={12} strokeWidth={1.5} />
            <span>Synced</span>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '11px'
            }}
            title="Errors and warnings"
          >
            <AlertCircle size={12} strokeWidth={1.5} />
            <span>0 / 0</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ fontSize: '11px' }} title="Indentation">
            Spaces: 4
          </div>

          <div style={{ fontSize: '11px' }} title="Encoding">
            UTF-8
          </div>

          <div
            style={{
              fontSize: '11px',
              fontWeight: 600
            }}
            title="Language mode"
          >
            UDL
          </div>
        </div>
      </footer>
    </div>
  );
}
