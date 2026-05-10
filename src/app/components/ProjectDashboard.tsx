import { useState } from 'react';
import { Search, Plus, User, Clock, Trash2, Share2 } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  notation: 'UML' | 'DFD' | 'IDEF0' | 'Petri Net' | 'BPMN';
  lastEdited: string;
  preview: string;
  color: string;
}

const projects: Project[] = [
  {
    id: '1',
    name: 'E-Commerce System',
    notation: 'UML',
    lastEdited: '2 hours ago',
    preview: 'uml',
    color: '#007ACC'
  },
  {
    id: '2',
    name: 'Order Processing',
    notation: 'DFD',
    lastEdited: '1 day ago',
    preview: 'dfd',
    color: '#28A745'
  },
  {
    id: '3',
    name: 'Manufacturing Flow',
    notation: 'IDEF0',
    lastEdited: '3 days ago',
    preview: 'idef0',
    color: '#9D5BD2'
  },
  {
    id: '4',
    name: 'Workflow Analysis',
    notation: 'Petri Net',
    lastEdited: '1 week ago',
    preview: 'petri',
    color: '#F48771'
  },
  {
    id: '5',
    name: 'Business Process',
    notation: 'BPMN',
    lastEdited: '2 weeks ago',
    preview: 'bpmn',
    color: '#FFC107'
  },
  {
    id: '6',
    name: 'User Journey',
    notation: 'UML',
    lastEdited: '1 month ago',
    preview: 'uml',
    color: '#007ACC'
  }
];

function NotationBadge({ notation }: { notation: string }) {
  const colors: Record<string, string> = {
    'UML': '#007ACC',
    'DFD': '#28A745',
    'IDEF0': '#9D5BD2',
    'Petri Net': '#F48771',
    'BPMN': '#FFC107'
  };

  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-sm text-[10px] font-medium"
      style={{
        background: `${colors[notation]}20`,
        color: colors[notation],
        border: `1px solid ${colors[notation]}40`
      }}
    >
      {notation}
    </span>
  );
}

function ProjectCard({ project, isMobile }: { project: Project; isMobile: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="rounded-sm overflow-hidden cursor-pointer transition-all"
      style={{
        height: isMobile ? 'auto' : '200px',
        width: isMobile ? '100%' : '300px',
        background: '#252526',
        border: '1px solid #3E3E42',
        transform: isHovered && !isMobile ? 'scale(1.05)' : 'scale(1)',
        boxShadow: isHovered && !isMobile ? '0 8px 24px rgba(0, 0, 0, 0.4)' : 'none'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isMobile ? (
        <div className="flex gap-3 p-3">
          <div
            className="flex-shrink-0 rounded-sm flex items-center justify-center"
            style={{
              width: '80px',
              height: '80px',
              background: '#1E1E1E',
              border: `2px solid ${project.color}`
            }}
          >
            <div
              className="w-12 h-12 rounded-sm"
              style={{ background: `${project.color}40` }}
            />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-[13px] font-semibold mb-1 truncate" style={{ color: '#CCCCCC' }}>
              {project.name}
            </h3>

            <div className="flex items-center gap-2 mb-2">
              <NotationBadge notation={project.notation} />
            </div>

            <div className="flex items-center gap-1 text-[10px]" style={{ color: '#858585' }}>
              <Clock size={10} strokeWidth={1.5} />
              {project.lastEdited}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div
            className="relative flex items-center justify-center"
            style={{
              height: '140px',
              background: '#1E1E1E',
              borderBottom: '1px solid #3E3E42'
            }}
          >
            <div
              className="w-20 h-20 rounded-sm"
              style={{ background: `${project.color}40`, border: `2px solid ${project.color}` }}
            />

            {isHovered && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-2 animate-fade-in">
                <button
                  className="p-2 rounded-sm transition-colors"
                  style={{ background: '#444444', color: '#CCCCCC' }}
                  title="Share"
                >
                  <Share2 size={16} strokeWidth={1.5} />
                </button>
                <button
                  className="p-2 rounded-sm transition-colors"
                  style={{ background: '#F48771', color: '#FFFFFF' }}
                  title="Delete"
                >
                  <Trash2 size={16} strokeWidth={1.5} />
                </button>
              </div>
            )}
          </div>

          <div className="p-3">
            <h3 className="text-[13px] font-semibold mb-2 truncate" style={{ color: '#CCCCCC' }}>
              {project.name}
            </h3>

            <div className="flex items-center justify-between">
              <NotationBadge notation={project.notation} />

              <div className="flex items-center gap-1 text-[10px]" style={{ color: '#858585' }}>
                <Clock size={10} strokeWidth={1.5} />
                {project.lastEdited}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export function ProjectDashboard() {
  const [activeTab, setActiveTab] = useState<'my-projects' | 'shared' | 'trash'>('my-projects');
  const [sortBy, setSortBy] = useState('date');
  const [filterNotation, setFilterNotation] = useState('all');
  const [isMobile, setIsMobile] = useState(false);

  return (
    <div className="h-screen flex" style={{ background: '#1E1E1E' }}>
      <aside
        className="flex flex-col border-r"
        style={{
          width: '240px',
          background: '#252526',
          borderColor: '#3E3E42'
        }}
      >
        <div className="p-4 border-b" style={{ borderColor: '#3E3E42' }}>
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-[14px] font-semibold"
              style={{ background: '#007ACC', color: '#FFFFFF' }}
            >
              SC
            </div>
            <div>
              <div className="text-[13px] font-semibold" style={{ color: '#CCCCCC' }}>
                Sarah Chen
              </div>
              <div className="text-[10px]" style={{ color: '#858585' }}>
                sarah@example.com
              </div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-2">
          <button
            onClick={() => setActiveTab('my-projects')}
            className="w-full px-3 py-2 mb-1 rounded-sm text-left text-[12px] transition-colors"
            style={{
              background: activeTab === 'my-projects' ? '#094771' : 'transparent',
              color: activeTab === 'my-projects' ? '#FFFFFF' : '#CCCCCC'
            }}
          >
            My Projects
          </button>

          <button
            onClick={() => setActiveTab('shared')}
            className="w-full px-3 py-2 mb-1 rounded-sm text-left text-[12px] transition-colors"
            style={{
              background: activeTab === 'shared' ? '#094771' : 'transparent',
              color: activeTab === 'shared' ? '#FFFFFF' : '#CCCCCC'
            }}
          >
            Shared with me
          </button>

          <button
            onClick={() => setActiveTab('trash')}
            className="w-full px-3 py-2 rounded-sm text-left text-[12px] transition-colors"
            style={{
              background: activeTab === 'trash' ? '#094771' : 'transparent',
              color: activeTab === 'trash' ? '#FFFFFF' : '#CCCCCC'
            }}
          >
            Trash
          </button>
        </nav>

        <div className="p-3 border-t" style={{ borderColor: '#3E3E42' }}>
          <div className="text-[10px] mb-2" style={{ color: '#858585' }}>
            Storage: 2.4 GB / 10 GB
          </div>
          <div
            className="h-1 rounded-full overflow-hidden"
            style={{ background: '#3E3E42' }}
          >
            <div
              className="h-full"
              style={{ width: '24%', background: '#007ACC' }}
            />
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <div
          className="flex items-center justify-between px-6 py-4 border-b"
          style={{ borderColor: '#3E3E42' }}
        >
          <h1 className="text-[18px] font-semibold" style={{ color: '#CCCCCC' }}>
            My Projects
          </h1>

          <button
            className="flex items-center gap-2 px-4 py-2 rounded-sm transition-all"
            style={{
              background: '#007ACC',
              color: '#FFFFFF',
              fontSize: '12px',
              fontWeight: 500
            }}
          >
            <Plus size={16} strokeWidth={1.5} />
            New Project
          </button>
        </div>

        <div
          className="flex items-center gap-4 px-6 py-3 border-b"
          style={{ background: '#252526', borderColor: '#3E3E42' }}
        >
          <div className="relative flex-1 max-w-md">
            <Search
              size={14}
              strokeWidth={1.5}
              className="absolute left-3 top-1/2 -translate-y-1/2"
              style={{ color: '#858585' }}
            />
            <input
              type="text"
              placeholder="Search projects..."
              className="w-full pl-9 pr-3 rounded-sm"
              style={{
                height: '32px',
                background: '#1E1E1E',
                border: '1px solid #3E3E42',
                color: '#CCCCCC',
                fontSize: '12px'
              }}
            />
          </div>

          <select
            value={filterNotation}
            onChange={(e) => setFilterNotation(e.target.value)}
            className="px-3 rounded-sm"
            style={{
              height: '32px',
              background: '#1E1E1E',
              border: '1px solid #3E3E42',
              color: '#CCCCCC',
              fontSize: '12px'
            }}
          >
            <option value="all">All Notations</option>
            <option value="UML">UML</option>
            <option value="DFD">DFD</option>
            <option value="IDEF0">IDEF0</option>
            <option value="Petri Net">Petri Net</option>
            <option value="BPMN">BPMN</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 rounded-sm"
            style={{
              height: '32px',
              background: '#1E1E1E',
              border: '1px solid #3E3E42',
              color: '#CCCCCC',
              fontSize: '12px'
            }}
          >
            <option value="date">Sort by Date</option>
            <option value="name">Sort by Name</option>
            <option value="notation">Sort by Notation</option>
          </select>

          <button
            onClick={() => setIsMobile(!isMobile)}
            className="px-3 py-1 rounded-sm text-[10px]"
            style={{
              background: '#444444',
              color: '#CCCCCC'
            }}
          >
            {isMobile ? 'Grid View' : 'List View'}
          </button>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <div
            className={isMobile ? 'space-y-3' : 'grid gap-6'}
            style={isMobile ? {} : {
              gridTemplateColumns: 'repeat(auto-fill, 300px)',
              justifyContent: 'start'
            }}
          >
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} isMobile={isMobile} />
            ))}
          </div>
        </div>
      </main>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-fade-in {
          animation: fade-in 200ms ease-out;
        }
      `}</style>
    </div>
  );
}
