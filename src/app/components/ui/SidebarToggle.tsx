import { PanelLeft } from 'lucide-react';
import { useState } from 'react';

interface SidebarToggleProps {
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function SidebarToggle({ children, defaultOpen = true }: SidebarToggleProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center transition-colors"
        style={{
          width: '28px',
          height: '28px',
          background: '#444444',
          border: 'none',
          color: '#CCCCCC',
          borderRadius: '2px'
        }}
        title={isOpen ? 'Hide Sidebar' : 'Show Sidebar'}
      >
        <PanelLeft size={16} strokeWidth={1.5} />
      </button>

      <div
        className="overflow-hidden transition-all"
        style={{
          width: isOpen ? '260px' : '0',
          transitionDuration: '300ms',
          transitionTimingFunction: 'ease-in-out'
        }}
      >
        {children}
      </div>
    </>
  );
}
