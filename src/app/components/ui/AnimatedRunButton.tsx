import { Play } from 'lucide-react';
import { useState } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

interface AnimatedRunButtonProps {
  onRun?: () => Promise<void>;
}

export function AnimatedRunButton({ onRun }: AnimatedRunButtonProps) {
  const [isRunning, setIsRunning] = useState(false);

  const handleClick = async () => {
    setIsRunning(true);
    try {
      await onRun?.();
      setTimeout(() => setIsRunning(false), 2000);
    } catch (error) {
      setIsRunning(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isRunning}
      className="flex items-center gap-2 rounded-sm font-medium text-white transition-all disabled:opacity-90"
      style={{
        height: '28px',
        padding: '0 12px',
        background: '#28A745',
        fontSize: '12px'
      }}
      onMouseEnter={(e) => {
        if (!isRunning) {
          e.currentTarget.style.background = '#34C759';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = '#28A745';
      }}
    >
      {isRunning ? (
        <LoadingSpinner size={14} color="#FFFFFF" />
      ) : (
        <Play size={14} strokeWidth={1.5} />
      )}
      <span>{isRunning ? 'Running...' : 'Run'}</span>
    </button>
  );
}
