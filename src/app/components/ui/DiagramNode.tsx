import { useState } from 'react';

interface DiagramNodeProps {
  id: string;
  x: number;
  y: number;
  label: string;
  properties: string[];
  color?: string;
  onDrag?: (id: string, dx: number, dy: number) => void;
}

export function DiagramNode({
  id,
  x,
  y,
  label,
  properties,
  color = '#007ACC',
  onDrag
}: DiagramNodeProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - x, y: e.clientY - y });
    e.stopPropagation();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && onDrag) {
      const dx = e.clientX - dragStart.x - x;
      const dy = e.clientY - dragStart.y - y;
      onDrag(id, dx, dy);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="absolute cursor-move select-none transition-shadow"
      style={{
        left: x,
        top: y,
        width: '200px',
        filter: isHovered ? `drop-shadow(0 0 8px ${color}80)` : 'none'
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="relative rounded-sm overflow-hidden"
        style={{
          background: '#FFFFFF',
          border: `2px solid ${color}`,
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
        }}
      >
        <div
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: color,
            top: '50%',
            left: '-5px',
            transform: 'translateY(-50%)'
          }}
        />

        <div
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: color,
            top: '50%',
            right: '-5px',
            transform: 'translateY(-50%)'
          }}
        />

        <div
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: color,
            top: '-5px',
            left: '50%',
            transform: 'translateX(-50%)'
          }}
        />

        <div
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: color,
            bottom: '-5px',
            left: '50%',
            transform: 'translateX(-50%)'
          }}
        />

        <div
          className="px-3 py-2 font-semibold text-[13px]"
          style={{
            background: color,
            color: '#FFFFFF'
          }}
        >
          {label}
        </div>

        <div className="px-3 py-2">
          {properties.map((prop, i) => (
            <div
              key={i}
              className="text-[11px] py-0.5"
              style={{
                color: '#000000',
                fontFamily: 'Fira Code, monospace'
              }}
            >
              {prop}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
