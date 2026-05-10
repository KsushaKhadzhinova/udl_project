import { useState, useRef } from 'react';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Grid3x3,
  Layers,
  Move,
  MousePointer
} from 'lucide-react';

interface DiagramNode {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  type: 'rectangle' | 'ellipse' | 'diamond';
  label: string;
  color: string;
}

const MOCK_NODES: DiagramNode[] = [
  {
    id: '1',
    x: 100,
    y: 100,
    width: 120,
    height: 60,
    type: 'rectangle',
    label: 'Start',
    color: '#4EC9B0'
  },
  {
    id: '2',
    x: 280,
    y: 100,
    width: 120,
    height: 60,
    type: 'rectangle',
    label: 'Process',
    color: '#007ACC'
  },
  {
    id: '3',
    x: 460,
    y: 80,
    width: 100,
    height: 100,
    type: 'diamond',
    label: 'Decision',
    color: '#CCA700'
  }
];

export function DrawioCanvas() {
  const [nodes, setNodes] = useState<DiagramNode[]>(MOCK_NODES);
  const [zoom, setZoom] = useState(100);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [tool, setTool] = useState<'select' | 'pan'>('select');
  const [showGrid, setShowGrid] = useState(true);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 10, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 10, 25));
  const handleZoomFit = () => setZoom(100);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background: 'var(--bg-canvas)',
        overflow: 'hidden'
      }}
    >
      {/* Grid Background */}
      {showGrid && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(var(--border-default) 1px, transparent 1px),
              linear-gradient(90deg, var(--border-default) 1px, transparent 1px)
            `,
            backgroundSize: `${20 * (zoom / 100)}px ${20 * (zoom / 100)}px`,
            backgroundPosition: `${pan.x}px ${pan.y}px`
          }}
        />
      )}

      {/* Canvas */}
      <div
        ref={canvasRef}
        style={{
          position: 'absolute',
          inset: 0,
          cursor: tool === 'pan' ? 'grab' : 'default',
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom / 100})`,
          transformOrigin: '0 0'
        }}
      >
        {/* Connections */}
        <svg
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none'
          }}
        >
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
            >
              <polygon points="0 0, 10 3, 0 6" fill="#858585" />
            </marker>
          </defs>

          {/* Connection from Start to Process */}
          <line
            x1={nodes[0].x + nodes[0].width}
            y1={nodes[0].y + nodes[0].height / 2}
            x2={nodes[1].x}
            y2={nodes[1].y + nodes[1].height / 2}
            stroke="#858585"
            strokeWidth="2"
            markerEnd="url(#arrowhead)"
          />

          {/* Connection from Process to Decision */}
          <line
            x1={nodes[1].x + nodes[1].width}
            y1={nodes[1].y + nodes[1].height / 2}
            x2={nodes[2].x}
            y2={nodes[2].y + nodes[2].height / 2}
            stroke="#858585"
            strokeWidth="2"
            markerEnd="url(#arrowhead)"
          />
        </svg>

        {/* Nodes */}
        {nodes.map(node => {
          const isSelected = selectedNodeId === node.id;

          return (
            <div
              key={node.id}
              onClick={() => setSelectedNodeId(node.id)}
              className="udl-transition-fast"
              style={{
                position: 'absolute',
                left: node.x,
                top: node.y,
                width: node.width,
                height: node.height,
                cursor: 'pointer',
                userSelect: 'none'
              }}
            >
              {/* Selection Outline */}
              {isSelected && (
                <div
                  style={{
                    position: 'absolute',
                    inset: '-4px',
                    border: '2px solid #007ACC',
                    borderRadius: node.type === 'ellipse' ? '50%' : '4px',
                    pointerEvents: 'none'
                  }}
                >
                  {/* Resize Handles */}
                  {['nw', 'ne', 'sw', 'se'].map(pos => (
                    <div
                      key={pos}
                      style={{
                        position: 'absolute',
                        width: '8px',
                        height: '8px',
                        background: '#FFFFFF',
                        border: '1px solid #007ACC',
                        borderRadius: '1px',
                        ...(pos.includes('n') ? { top: '-4px' } : { bottom: '-4px' }),
                        ...(pos.includes('w') ? { left: '-4px' } : { right: '-4px' })
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Node Shape */}
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  background: node.color,
                  border: '2px solid ' + node.color,
                  borderRadius: node.type === 'ellipse' ? '50%' : '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontWeight: 500,
                  fontSize: '13px',
                  transform: node.type === 'diamond' ? 'rotate(45deg)' : 'none',
                  boxShadow: isSelected ? '0 4px 12px rgba(0,0,0,0.15)' : 'none'
                }}
              >
                <span style={{ transform: node.type === 'diamond' ? 'rotate(-45deg)' : 'none' }}>
                  {node.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Toolbar - Top Left */}
      <div
        style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          display: 'flex',
          gap: '4px',
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-default)',
          borderRadius: '4px',
          padding: '4px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
      >
        <button
          onClick={() => setTool('select')}
          className="udl-transition-fast"
          style={{
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: tool === 'select' ? 'var(--bg-active)' : 'transparent',
            border: tool === 'select' ? '1px solid var(--border-focus)' : '1px solid transparent',
            borderRadius: '2px',
            cursor: 'pointer',
            color: tool === 'select' ? 'var(--border-focus)' : 'var(--text-secondary)'
          }}
          title="Select (V)"
        >
          <MousePointer size={16} strokeWidth={1.5} />
        </button>

        <button
          onClick={() => setTool('pan')}
          className="udl-transition-fast"
          style={{
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: tool === 'pan' ? 'var(--bg-active)' : 'transparent',
            border: tool === 'pan' ? '1px solid var(--border-focus)' : '1px solid transparent',
            borderRadius: '2px',
            cursor: 'pointer',
            color: tool === 'pan' ? 'var(--border-focus)' : 'var(--text-secondary)'
          }}
          title="Pan (H)"
        >
          <Move size={16} strokeWidth={1.5} />
        </button>

        <div style={{ width: '1px', height: '32px', background: 'var(--border-default)', margin: '0 4px' }} />

        <button
          onClick={() => setShowGrid(!showGrid)}
          className="udl-transition-fast"
          style={{
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: showGrid ? 'var(--bg-active)' : 'transparent',
            border: showGrid ? '1px solid var(--border-focus)' : '1px solid transparent',
            borderRadius: '2px',
            cursor: 'pointer',
            color: showGrid ? 'var(--border-focus)' : 'var(--text-secondary)'
          }}
          title="Toggle Grid"
        >
          <Grid3x3 size={16} strokeWidth={1.5} />
        </button>
      </div>

      {/* Zoom Controls - Bottom Right */}
      <div
        style={{
          position: 'absolute',
          bottom: '12px',
          right: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-default)',
          borderRadius: '4px',
          padding: '4px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
      >
        <button
          onClick={handleZoomIn}
          className="udl-transition-fast"
          style={{
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
            border: 'none',
            borderRadius: '2px',
            cursor: 'pointer',
            color: '#666666'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-hover)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          title="Zoom In (+)"
        >
          <ZoomIn size={16} strokeWidth={1.5} />
        </button>

        <div
          style={{
            fontSize: '11px',
            fontWeight: 500,
            color: 'var(--text-secondary)',
            textAlign: 'center',
            padding: '4px 0'
          }}
        >
          {zoom}%
        </div>

        <button
          onClick={handleZoomOut}
          className="udl-transition-fast"
          style={{
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
            border: 'none',
            borderRadius: '2px',
            cursor: 'pointer',
            color: 'var(--text-secondary)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-hover)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          title="Zoom Out (-)"
        >
          <ZoomOut size={16} strokeWidth={1.5} />
        </button>

        <div style={{ width: '32px', height: '1px', background: 'var(--border-default)', margin: '2px 0' }} />

        <button
          onClick={handleZoomFit}
          className="udl-transition-fast"
          style={{
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
            border: 'none',
            borderRadius: '2px',
            cursor: 'pointer',
            color: 'var(--text-secondary)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-hover)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          title="Fit to Screen"
        >
          <Maximize2 size={16} strokeWidth={1.5} />
        </button>
      </div>

      {/* Minimap - Bottom Left */}
      <div
        style={{
          position: 'absolute',
          bottom: '12px',
          left: '12px',
          width: '180px',
          height: '120px',
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border-default)',
          borderRadius: '4px',
          padding: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '6px',
            fontSize: '11px',
            fontWeight: 500,
            color: 'var(--text-secondary)'
          }}
        >
          <Layers size={12} strokeWidth={1.5} />
          <span>Minimap</span>
        </div>

        <div
          style={{
            width: '100%',
            height: 'calc(100% - 20px)',
            background: 'var(--bg-hover)',
            borderRadius: '2px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Minimap nodes */}
          {nodes.map(node => (
            <div
              key={node.id}
              style={{
                position: 'absolute',
                left: `${(node.x / 800) * 100}%`,
                top: `${(node.y / 600) * 100}%`,
                width: `${(node.width / 800) * 100}%`,
                height: `${(node.height / 600) * 100}%`,
                background: node.color,
                opacity: 0.6,
                borderRadius: node.type === 'ellipse' ? '50%' : '1px'
              }}
            />
          ))}

          {/* Viewport indicator */}
          <div
            style={{
              position: 'absolute',
              inset: '10%',
              border: '1px solid #007ACC',
              background: 'rgba(0, 122, 204, 0.1)',
              pointerEvents: 'none'
            }}
          />
        </div>
      </div>
    </div>
  );
}
