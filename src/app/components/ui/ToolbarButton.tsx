import { LucideIcon } from 'lucide-react';
import { Tooltip } from './Tooltip';

interface ToolbarButtonProps {
  icon: LucideIcon;
  tooltip: string;
  onClick?: () => void;
  active?: boolean;
  disabled?: boolean;
}

export function ToolbarButton({
  icon: Icon,
  tooltip,
  onClick,
  active = false,
  disabled = false
}: ToolbarButtonProps) {
  return (
    <Tooltip content={tooltip}>
      <button
        onClick={onClick}
        disabled={disabled}
        className="flex items-center justify-center rounded-sm transition-all disabled:opacity-30 disabled:cursor-not-allowed"
        style={{
          width: '28px',
          height: '28px',
          background: active ? '#007ACC' : '#444444',
          border: 'none',
          color: active ? '#FFFFFF' : '#CCCCCC'
        }}
        onMouseEnter={(e) => {
          if (!disabled && !active) {
            e.currentTarget.style.background = '#555555';
          }
        }}
        onMouseLeave={(e) => {
          if (!active) {
            e.currentTarget.style.background = '#444444';
          }
        }}
        onMouseDown={(e) => {
          if (!disabled && !active) {
            e.currentTarget.style.background = '#333333';
          }
        }}
        onMouseUp={(e) => {
          if (!disabled && !active) {
            e.currentTarget.style.background = '#555555';
          }
        }}
      >
        <Icon size={16} strokeWidth={1.5} />
      </button>
    </Tooltip>
  );
}
