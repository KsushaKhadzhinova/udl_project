import { ActivityBar } from './ActivityBar';
import { ExplorerSidebar } from './ExplorerSidebar';
import { CodeEditor } from './CodeEditor';
import { DiagramCanvas } from './DiagramCanvas';
import { Header } from './Header';
import { StatusBar } from './StatusBar';
import { HamburgerButton } from './ui/HamburgerButton';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import { useState, useEffect } from 'react';
import { Code } from 'lucide-react';

export function ResponsiveApp() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1440
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden" style={{ background: '#1E1E1E' }}>
      <div
        className="flex items-center justify-between px-4 border-b"
        style={{
          height: '35px',
          background: '#252526',
          borderColor: '#3E3E42'
        }}
      >
        <div className="flex items-center gap-2">
          {(isMobile || isTablet) && (
            <HamburgerButton
              isOpen={isSidebarOpen}
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            />
          )}
          <div className="text-[12px]" style={{ color: '#007ACC' }}>
            main.udl
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="flex items-center gap-1.5 px-3 py-1 rounded-sm transition-all"
            style={{
              background: '#007ACC',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: 500
            }}
          >
            {isMobile ? '💾' : '💾 Save'}
          </button>

          <button
            className="flex items-center gap-1.5 px-3 py-1 rounded-sm transition-all"
            style={{
              background: '#28A745',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: 500
            }}
          >
            {isMobile ? '▶' : '▶ Run'}
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {!isMobile && <ActivityBar />}

        {(isSidebarOpen || (!isMobile && !isTablet)) && (
          <div
            className="absolute md:relative z-50 md:z-auto h-full transition-transform"
            style={{
              width: '260px',
              background: '#252526',
              transform: isMobile || isTablet ? (isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)') : 'none'
            }}
          >
            <ExplorerSidebar />
          </div>
        )}

        {(isSidebarOpen && (isMobile || isTablet)) && (
          <div
            className="absolute inset-0 bg-black/50 z-40"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <div className="flex-1 flex flex-col overflow-hidden">
          {isMobile ? (
            <div className="relative h-full">
              {showCode ? (
                <CodeEditor />
              ) : (
                <DiagramCanvas />
              )}

              <button
                onClick={() => setShowCode(!showCode)}
                className="absolute bottom-4 right-4 z-10 flex items-center gap-2 px-4 py-2 rounded-sm shadow-lg transition-all"
                style={{
                  background: '#007ACC',
                  color: '#FFFFFF',
                  fontSize: '12px',
                  fontWeight: 500
                }}
              >
                <Code size={16} strokeWidth={1.5} />
                {showCode ? 'Canvas' : 'Code'}
              </button>
            </div>
          ) : isTablet ? (
            <PanelGroup direction="vertical">
              <Panel defaultSize={50} minSize={30}>
                <CodeEditor />
              </Panel>

              <PanelResizeHandle
                className="h-1 hover:h-1.5 transition-all hover:bg-[#007ACC]"
                style={{ background: '#3E3E42' }}
              />

              <Panel defaultSize={50} minSize={30}>
                <DiagramCanvas />
              </Panel>
            </PanelGroup>
          ) : (
            <PanelGroup direction="horizontal">
              <Panel defaultSize={50} minSize={30}>
                <CodeEditor />
              </Panel>

              <PanelResizeHandle
                className="w-1 hover:w-1.5 transition-all hover:bg-[#007ACC]"
                style={{ background: '#3E3E42' }}
              />

              <Panel defaultSize={50} minSize={30}>
                <DiagramCanvas />
              </Panel>
            </PanelGroup>
          )}
        </div>
      </div>

      <StatusBar />

      {isMobile && (
        <div
          className="text-[10px] text-center py-1"
          style={{ background: '#252526', color: '#858585' }}
        >
          Mobile View (375px)
        </div>
      )}
    </div>
  );
}
