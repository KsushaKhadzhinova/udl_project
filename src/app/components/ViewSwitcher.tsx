import { useState } from 'react';
import { VSCodeDrawioApp } from './VSCodeDrawioApp';
import { IndustrialApp } from './IndustrialApp';
import { ResponsiveApp } from './ResponsiveApp';
import { Documentation } from './Documentation';
import { VersionDiff } from './VersionDiff';
import { ProjectDashboard } from './ProjectDashboard';
import { ComponentShowcase } from './ComponentShowcase';
import { AIAssistant } from './AIAssistant';
import { ThemeToggle } from './ThemeToggle';
import {
  Layout,
  Book,
  GitCompare,
  LayoutGrid,
  Palette,
  Sparkles,
  Monitor,
  Tablet,
  Smartphone,
  Cpu,
  Blend
} from 'lucide-react';

type View =
  | 'vscode-drawio'
  | 'industrial'
  | 'editor'
  | 'responsive'
  | 'documentation'
  | 'version-diff'
  | 'dashboard'
  | 'components';

interface ViewOption {
  id: View;
  label: string;
  icon: any;
  description: string;
}

const views: ViewOption[] = [
  {
    id: 'vscode-drawio',
    label: 'VS Code + Draw.io',
    icon: Blend,
    description: 'Hybrid interface: VS Code (left) + Draw.io (center/right)'
  },
  {
    id: 'industrial',
    label: 'Industrial (CSS Grid)',
    icon: Cpu,
    description: 'Engineering-focused layout with semantic HTML & CSS Grid'
  },
  {
    id: 'editor',
    label: 'Editor (Desktop)',
    icon: Layout,
    description: 'Main DSL diagram editor with split view'
  },
  {
    id: 'responsive',
    label: 'Responsive Layouts',
    icon: Monitor,
    description: 'Tablet (768px) & Mobile (375px) views'
  },
  {
    id: 'documentation',
    label: 'Documentation',
    icon: Book,
    description: 'Help screen with navigation & code examples'
  },
  {
    id: 'version-diff',
    label: 'Version Comparison',
    icon: GitCompare,
    description: 'Side-by-side diff with sync scrolling'
  },
  {
    id: 'dashboard',
    label: 'Project Dashboard',
    icon: LayoutGrid,
    description: 'Grid layout with project cards'
  },
  {
    id: 'components',
    label: 'UI Components',
    icon: Palette,
    description: 'Component library showcase'
  }
];

export function ViewSwitcher() {
  const [currentView, setCurrentView] = useState<View>('vscode-drawio');
  const [showAI, setShowAI] = useState(false);
  const [showMenu, setShowMenu] = useState(true);

  const renderView = () => {
    switch (currentView) {
      case 'vscode-drawio':
        return <VSCodeDrawioApp />;
      case 'industrial':
        return <IndustrialApp />;
      case 'editor':
        return (
          <div className="h-screen">
            <ResponsiveApp />
          </div>
        );
      case 'responsive':
        return <ResponsiveApp />;
      case 'documentation':
        return <Documentation />;
      case 'version-diff':
        return <VersionDiff />;
      case 'dashboard':
        return <ProjectDashboard />;
      case 'components':
        return <ComponentShowcase />;
      default:
        return <VSCodeDrawioApp />;
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {showMenu && (
        <div
          className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 border-b backdrop-blur-sm"
          style={{
            background: 'var(--bg-sidebar)',
            borderColor: 'var(--border-default)'
          }}
        >
          <div className="flex items-center gap-2">
            <Sparkles size={20} strokeWidth={1.5} style={{ color: 'var(--color-primary)' }} />
            <h1 className="text-[14px] font-semibold" style={{ color: 'var(--text-primary)' }}>
              UDL Editor Design System
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            {views.map(view => (
              <button
                key={view.id}
                onClick={() => setCurrentView(view.id)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-sm transition-all text-[11px]"
                style={{
                  background: currentView === view.id ? 'var(--color-primary)' : 'var(--bg-input)',
                  color: currentView === view.id ? 'var(--text-inverse)' : 'var(--text-primary)',
                  border: currentView === view.id ? 'none' : '1px solid var(--border-default)',
                  borderRadius: '2px'
                }}
                title={view.description}
              >
                <view.icon size={14} strokeWidth={1.5} />
                <span className="hidden md:inline">{view.label}</span>
              </button>
            ))}

            <div className="w-px h-6 mx-2" style={{ background: '#3E3E42' }} />

            <button
              onClick={() => setShowAI(!showAI)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-sm transition-all text-[11px]"
              style={{
                background: showAI ? 'var(--color-purple)' : 'var(--bg-input)',
                color: 'var(--text-inverse)',
                border: showAI ? 'none' : '1px solid var(--border-default)'
              }}
            >
              <Sparkles size={14} strokeWidth={1.5} />
              <span className="hidden md:inline">AI Assistant</span>
            </button>

            <button
              onClick={() => setShowMenu(false)}
              className="px-3 py-1.5 rounded-sm text-[11px]"
              style={{
                background: 'var(--bg-input)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-default)'
              }}
            >
              Hide Menu
            </button>
          </div>
        </div>
      )}

      {!showMenu && (
        <button
          onClick={() => setShowMenu(true)}
          className="fixed top-4 right-4 z-50 px-3 py-1.5 rounded-sm text-[11px] shadow-lg"
          style={{
            background: '#007ACC',
            color: '#FFFFFF'
          }}
        >
          Show Menu
        </button>
      )}

      <div className={showMenu ? 'pt-[52px] h-screen' : 'h-screen'}>
        {renderView()}
      </div>

      {showAI && <AIAssistant onClose={() => setShowAI(false)} />}

      <div
        className="fixed bottom-4 left-4 z-40 px-3 py-2 rounded-sm text-[10px] backdrop-blur-sm"
        style={{
          background: '#252526E6',
          border: '1px solid #3E3E42',
          color: '#858585'
        }}
      >
        <div style={{ color: '#CCCCCC', marginBottom: '4px' }}>
          Current View: <strong>{views.find(v => v.id === currentView)?.label}</strong>
        </div>
        <div>{views.find(v => v.id === currentView)?.description}</div>
      </div>
    </div>
  );
}
