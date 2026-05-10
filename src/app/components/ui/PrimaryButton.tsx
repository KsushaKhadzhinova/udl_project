import { LucideIcon } from 'lucide-react';

interface PrimaryButtonProps {
  icon?: LucideIcon;
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'success' | 'purple' | 'error';
  disabled?: boolean;
}

export function PrimaryButton({
  icon: Icon,
  label,
  onClick,
  variant = 'primary',
  disabled = false
}: PrimaryButtonProps) {
  const variants = {
    primary: {
      bg: '#007ACC',
      hover: '#0098FF',
      active: '#005A9E'
    },
    success: {
      bg: '#28A745',
      hover: '#34C759',
      active: '#1E8035'
    },
    purple: {
      bg: '#9D5BD2',
      hover: '#B470E8',
      active: '#7D3EB0'
    },
    error: {
      bg: '#F48771',
      hover: '#FF9D88',
      active: '#D96F5B'
    }
  };

  const colors = variants[variant];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex items-center gap-2 rounded-sm font-medium text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      style={{
        height: '28px',
        padding: '0 12px',
        background: colors.bg,
        fontSize: '12px'
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.background = colors.hover;
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = colors.bg;
      }}
      onMouseDown={(e) => {
        if (!disabled) {
          e.currentTarget.style.background = colors.active;
        }
      }}
      onMouseUp={(e) => {
        if (!disabled) {
          e.currentTarget.style.background = colors.hover;
        }
      }}
    >
      {Icon && <Icon size={14} strokeWidth={1.5} />}
      <span>{label}</span>
    </button>
  );
}
