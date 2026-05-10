import { Menu, X } from 'lucide-react';

interface HamburgerButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export function HamburgerButton({ isOpen, onClick }: HamburgerButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center transition-colors md:hidden"
      style={{
        width: '28px',
        height: '28px',
        background: '#444444',
        border: 'none',
        color: '#CCCCCC',
        borderRadius: '2px'
      }}
      title={isOpen ? 'Close Menu' : 'Open Menu'}
    >
      {isOpen ? (
        <X size={16} strokeWidth={1.5} />
      ) : (
        <Menu size={16} strokeWidth={1.5} />
      )}
    </button>
  );
}
