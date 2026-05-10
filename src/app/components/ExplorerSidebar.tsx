import { ChevronRight, ChevronDown, FileCode, Folder, FolderOpen } from 'lucide-react';
import { useState } from 'react';

interface FileItem {
  name: string;
  type: 'file' | 'folder';
  children?: FileItem[];
}

const fileTree: FileItem[] = [
  {
    name: 'src',
    type: 'folder',
    children: [
      {
        name: 'models',
        type: 'folder',
        children: [
          { name: 'UserModel.udl', type: 'file' },
          { name: 'OrderModel.udl', type: 'file' },
        ],
      },
      {
        name: 'diagrams',
        type: 'folder',
        children: [
          { name: 'UserFlow.diagram', type: 'file' },
          { name: 'SystemArchitecture.diagram', type: 'file' },
        ],
      },
      { name: 'main.udl', type: 'file' },
    ],
  },
  {
    name: 'config',
    type: 'folder',
    children: [
      { name: 'settings.json', type: 'file' },
    ],
  },
  { name: 'README.md', type: 'file' },
];

function FileTreeItem({ item, depth = 0 }: { item: FileItem; depth?: number }) {
  const [isOpen, setIsOpen] = useState(depth === 0);

  const handleClick = () => {
    if (item.type === 'folder') {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="w-full flex items-center gap-1 px-2 py-0.5 hover:bg-[#2A2D2E] text-left group"
        style={{ paddingLeft: `${8 + depth * 12}px` }}
      >
        {item.type === 'folder' && (
          <span className="flex-shrink-0">
            {isOpen ? (
              <ChevronDown size={16} strokeWidth={1.5} className="text-[#858585]" />
            ) : (
              <ChevronRight size={16} strokeWidth={1.5} className="text-[#858585]" />
            )}
          </span>
        )}
        {item.type === 'file' && <span className="w-4" />}

        {item.type === 'folder' ? (
          isOpen ? (
            <FolderOpen size={16} strokeWidth={1.5} className="text-[#858585] flex-shrink-0" />
          ) : (
            <Folder size={16} strokeWidth={1.5} className="text-[#858585] flex-shrink-0" />
          )
        ) : (
          <FileCode size={16} strokeWidth={1.5} className="text-[#007ACC] flex-shrink-0" />
        )}

        <span className="text-[13px] text-[#CCCCCC] truncate">
          {item.name}
        </span>
      </button>

      {item.type === 'folder' && isOpen && item.children && (
        <div>
          {item.children.map((child, index) => (
            <FileTreeItem key={index} item={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export function ExplorerSidebar() {
  return (
    <div
      className="h-full flex flex-col overflow-hidden"
      style={{ width: '260px', background: '#252526' }}
    >
      <div className="px-4 py-2 border-b" style={{ borderColor: '#3E3E42' }}>
        <h2 className="text-[11px] font-semibold tracking-wider" style={{ color: '#CCCCCC' }}>
          EXPLORER
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto py-1">
        {fileTree.map((item, index) => (
          <FileTreeItem key={index} item={item} />
        ))}
      </div>
    </div>
  );
}
