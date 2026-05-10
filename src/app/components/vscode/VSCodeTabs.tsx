import { X, Circle } from 'lucide-react';
import { useState } from 'react';

interface Tab {
  id: string;
  label: string;
  path: string;
  isDirty: boolean;
  isActive: boolean;
}

const MOCK_TABS: Tab[] = [
  { id: '1', label: 'main.udl', path: 'src/main.udl', isDirty: true, isActive: true },
  { id: '2', label: 'system.udl', path: 'src/models/system.udl', isDirty: false, isActive: false },
  { id: '3', label: 'workflow.diagram', path: 'src/diagrams/workflow.diagram', isDirty: false, isActive: false }
];

export function VSCodeTabs() {
  const [tabs, setTabs] = useState<Tab[]>(MOCK_TABS);

  const handleCloseTab = (tabId: string) => {
    setTabs(prev => prev.filter(t => t.id !== tabId));
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        background: '#252526',
        borderBottom: '1px solid #2B2B2B',
        height: '35px',
        overflow: 'hidden'
      }}
    >
      <div
        style={{
          display: 'flex',
          flex: 1,
          overflow: 'auto',
          scrollbarWidth: 'none'
        }}
      >
        {tabs.map(tab => (
          <div
            key={tab.id}
            className="udl-transition-fast"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '0 12px',
              minWidth: '120px',
              maxWidth: '200px',
              height: '35px',
              background: tab.isActive ? '#1E1E1E' : 'transparent',
              borderRight: '1px solid #2B2B2B',
              borderTop: tab.isActive ? '1px solid #007ACC' : '1px solid transparent',
              cursor: 'pointer',
              position: 'relative'
            }}
            onMouseEnter={(e) => {
              if (!tab.isActive) {
                e.currentTarget.style.background = '#2A2D2E';
              }
            }}
            onMouseLeave={(e) => {
              if (!tab.isActive) {
                e.currentTarget.style.background = 'transparent';
              }
            }}
          >
            <span
              style={{
                flex: 1,
                fontSize: '13px',
                color: tab.isActive ? '#FFFFFF' : '#969696',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
              title={tab.path}
            >
              {tab.label}
            </span>

            {tab.isDirty ? (
              <Circle
                size={8}
                fill="#FFFFFF"
                stroke="none"
                style={{ flexShrink: 0 }}
              />
            ) : (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCloseTab(tab.id);
                }}
                className="udl-transition-fast"
                style={{
                  width: '16px',
                  height: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'transparent',
                  border: 'none',
                  borderRadius: '2px',
                  padding: 0,
                  cursor: 'pointer',
                  opacity: 0,
                  flexShrink: 0
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#3E3E42';
                  e.currentTarget.style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <X size={12} strokeWidth={1.5} color="#858585" />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* More Actions */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0 4px',
          background: '#252526',
          borderLeft: '1px solid #2B2B2B'
        }}
      >
        <button
          className="udl-transition-fast"
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
          title="More..."
        >
          ···
        </button>
      </div>

      <style>{`
        .udl-tab:hover .udl-tab-close {
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
