import { Save, Sparkles, ChevronRight } from 'lucide-react';
import { PrimaryButton } from './ui/PrimaryButton';
import { AnimatedRunButton } from './ui/AnimatedRunButton';

export function Header() {
  const handleRun = async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Build complete!');
  };

  return (
    <div
      className="flex items-center justify-between px-4 border-b"
      style={{
        height: '35px',
        background: '#252526',
        borderColor: '#3E3E42'
      }}
    >
      <div className="flex items-center gap-1 text-[12px]" style={{ color: '#858585' }}>
        <span style={{ color: '#CCCCCC' }}>workspace</span>
        <ChevronRight size={14} strokeWidth={1.5} />
        <span style={{ color: '#CCCCCC' }}>src</span>
        <ChevronRight size={14} strokeWidth={1.5} />
        <span style={{ color: '#007ACC' }}>main.udl</span>
      </div>

      <div className="flex items-center gap-2">
        <PrimaryButton icon={Save} label="Save" variant="primary" />
        <AnimatedRunButton onRun={handleRun} />
        <PrimaryButton icon={Sparkles} label="AI Fix" variant="purple" />
      </div>
    </div>
  );
}
