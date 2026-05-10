import { useState } from 'react';
import { DiagramNode } from './ui/DiagramNode';

interface Node {
  id: string;
  x: number;
  y: number;
  label: string;
  type: 'entity' | 'enum';
  properties: string[];
}

const initialNodes: Node[] = [
  {
    id: 'user',
    x: 150,
    y: 100,
    label: 'User',
    type: 'entity',
    properties: ['id: UUID', 'username: String', 'email: String', 'createdAt: DateTime']
  },
  {
    id: 'order',
    x: 450,
    y: 100,
    label: 'Order',
    type: 'entity',
    properties: ['id: UUID', 'userId: UUID', 'status: OrderStatus', 'total: Decimal']
  },
  {
    id: 'orderStatus',
    x: 450,
    y: 350,
    label: 'OrderStatus',
    type: 'enum',
    properties: ['PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED']
  },
];

const edges = [
  { from: 'user', to: 'order', label: '1:N' },
  { from: 'order', to: 'orderStatus', label: 'uses' },
];

export function DiagramCanvas() {
  const [nodes, setNodes] = useState(initialNodes);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleCanvasMouseUp = () => {
    setIsDragging(false);
  };

  const handleNodeDrag = (id: string, dx: number, dy: number) => {
    setNodes(prev => prev.map(node =>
      node.id === id
        ? { ...node, x: node.x + dx, y: node.y + dy }
        : node
    ));
  };

  return (
    <div
      className="h-full relative overflow-hidden cursor-grab active:cursor-grabbing"
      style={{ background: '#1E1E1E' }}
      onMouseDown={handleCanvasMouseDown}
      onMouseMove={handleCanvasMouseMove}
      onMouseUp={handleCanvasMouseUp}
      onMouseLeave={handleCanvasMouseUp}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(#3E3E42 1px, transparent 1px),
            linear-gradient(90deg, #3E3E42 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
          opacity: 0.2
        }}
      />

      <svg
        className="absolute inset-0 pointer-events-none"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px)`,
          width: '100%',
          height: '100%'
        }}
      >
        {edges.map((edge, i) => {
          const fromNode = nodes.find(n => n.id === edge.from);
          const toNode = nodes.find(n => n.id === edge.to);
          if (!fromNode || !toNode) return null;

          const fromX = fromNode.x + 100;
          const fromY = fromNode.y + 60;
          const toX = toNode.x + 100;
          const toY = toNode.y + 60;

          return (
            <g key={i}>
              <line
                x1={fromX}
                y1={fromY}
                x2={toX}
                y2={toY}
                stroke="#007ACC"
                strokeWidth="2"
                markerEnd="url(#arrowhead)"
              />
              <text
                x={(fromX + toX) / 2}
                y={(fromY + toY) / 2 - 8}
                fill="#858585"
                fontSize="11"
                textAnchor="middle"
              >
                {edge.label}
              </text>
            </g>
          );
        })}

        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="10"
            refX="9"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 10 3, 0 6" fill="#007ACC" />
          </marker>
        </defs>
      </svg>

      <div
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px)`,
        }}
      >
        {nodes.map((node) => (
          <DiagramNode
            key={node.id}
            id={node.id}
            x={node.x}
            y={node.y}
            label={node.label}
            properties={node.properties}
            color={node.type === 'entity' ? '#007ACC' : '#9D5BD2'}
            onDrag={handleNodeDrag}
          />
        ))}
      </div>

      <div
        className="absolute bottom-4 right-4 px-2 py-1 rounded-sm text-[10px]"
        style={{
          background: '#252526',
          border: '1px solid #3E3E42',
          color: '#858585'
        }}
      >
        Pan: {Math.round(pan.x)}, {Math.round(pan.y)} | Nodes: {nodes.length}
      </div>

      <div
        className="absolute top-4 left-4 px-3 py-2 rounded-sm text-[11px]"
        style={{
          background: '#252526',
          border: '1px solid #3E3E42',
          color: '#858585'
        }}
      >
        <div style={{ color: '#CCCCCC', marginBottom: '4px' }}>💡 Interactions</div>
        <div>• Drag canvas to pan</div>
        <div>• Drag nodes to reposition</div>
        <div>• Hover nodes for glow effect</div>
      </div>
    </div>
  );
}
