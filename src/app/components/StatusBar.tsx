import { GitBranch, CloudUpload, FileText } from 'lucide-react';

export function StatusBar() {
  return (
    <div
      className="flex items-center justify-between px-3"
      style={{
        height: '22px',
        background: '#007ACC',
        color: '#FFFFFF',
        fontSize: '12px'
      }}
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <GitBranch size={14} strokeWidth={1.5} />
          <span>main</span>
        </div>

        <div className="flex items-center gap-1.5">
          <CloudUpload size={14} strokeWidth={1.5} />
          <span>Synced</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <FileText size={14} strokeWidth={1.5} />
          <span>UTF-8</span>
        </div>

        <div>
          <span className="font-medium">UDL</span>
        </div>
      </div>
    </div>
  );
}
