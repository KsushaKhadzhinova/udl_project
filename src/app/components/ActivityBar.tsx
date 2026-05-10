import { Files, Search, History, Github, Settings } from 'lucide-react';

const activities = [
  { icon: Files, label: 'Explorer', id: 'files' },
  { icon: Search, label: 'Search', id: 'search' },
  { icon: History, label: 'History', id: 'history' },
  { icon: Github, label: 'GitHub', id: 'github' },
];

export function ActivityBar() {
  return (
    <div
      className="flex flex-col h-full justify-between"
      style={{ width: '48px', background: '#333333' }}
    >
      <div className="flex flex-col">
        {activities.map((activity) => (
          <button
            key={activity.id}
            className="w-12 h-12 flex items-center justify-center hover:bg-white/5 transition-colors group relative"
            title={activity.label}
          >
            <activity.icon
              size={24}
              strokeWidth={1.5}
              className="text-[#858585] group-hover:text-white transition-colors"
            />
          </button>
        ))}
      </div>

      <div className="flex flex-col">
        <button
          className="w-12 h-12 flex items-center justify-center hover:bg-white/5 transition-colors group"
          title="Settings"
        >
          <Settings
            size={24}
            strokeWidth={1.5}
            className="text-[#858585] group-hover:text-white transition-colors"
          />
        </button>
      </div>
    </div>
  );
}
