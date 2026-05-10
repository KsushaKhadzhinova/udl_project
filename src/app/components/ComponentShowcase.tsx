import { Save, Play, Sparkles, Trash2, Copy, Settings, Download, Upload } from 'lucide-react';
import { PrimaryButton } from './ui/PrimaryButton';
import { ToolbarButton } from './ui/ToolbarButton';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';
import { DiagramNode } from './ui/DiagramNode';
import { AnimatedRunButton } from './ui/AnimatedRunButton';
import { useState } from 'react';

export function ComponentShowcase() {
  const [nodes, setNodes] = useState([
    {
      id: 'node1',
      x: 50,
      y: 50,
      label: 'User',
      properties: ['id: UUID', 'name: String', 'email: String'],
      color: '#007ACC'
    },
    {
      id: 'node2',
      x: 320,
      y: 50,
      label: 'Order',
      properties: ['id: UUID', 'userId: UUID', 'total: Decimal'],
      color: '#28A745'
    },
    {
      id: 'node3',
      x: 185,
      y: 220,
      label: 'Product',
      properties: ['id: UUID', 'name: String', 'price: Decimal'],
      color: '#9D5BD2'
    }
  ]);

  const handleNodeDrag = (id: string, dx: number, dy: number) => {
    setNodes(prev => prev.map(node =>
      node.id === id
        ? { ...node, x: node.x + dx, y: node.y + dy }
        : node
    ));
  };

  const handleRun = async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Execution complete!');
  };

  return (
    <div className="h-full overflow-auto p-8" style={{ background: '#1E1E1E' }}>
      <div className="max-w-5xl mx-auto space-y-12">
        <div>
          <h1 className="text-xl font-semibold mb-2" style={{ color: '#CCCCCC' }}>
            UDL Editor Component Library
          </h1>
          <p className="text-sm" style={{ color: '#858585' }}>
            Interactive showcase of all UI components with live interaction states
          </p>
        </div>

        <section>
          <h2 className="text-base font-semibold mb-4" style={{ color: '#CCCCCC' }}>
            Primary Buttons (28px height, hover/active states)
          </h2>
          <div className="flex flex-wrap gap-3">
            <PrimaryButton icon={Save} label="Save" variant="primary" />
            <PrimaryButton icon={Play} label="Run" variant="success" />
            <PrimaryButton icon={Sparkles} label="AI Fix" variant="purple" />
            <PrimaryButton icon={Trash2} label="Delete" variant="error" />
            <PrimaryButton label="No Icon" variant="primary" />
            <PrimaryButton icon={Download} label="Disabled" variant="primary" disabled />
          </div>
        </section>

        <section>
          <h2 className="text-base font-semibold mb-4" style={{ color: '#CCCCCC' }}>
            Animated Run Button (Loading spinner on click)
          </h2>
          <AnimatedRunButton onRun={handleRun} />
        </section>

        <section>
          <h2 className="text-base font-semibold mb-4" style={{ color: '#CCCCCC' }}>
            Toolbar Buttons (Flat #444 background, tooltips with 400ms delay)
          </h2>
          <div className="flex gap-2">
            <ToolbarButton icon={Copy} tooltip="Copy to clipboard" />
            <ToolbarButton icon={Settings} tooltip="Open settings" />
            <ToolbarButton icon={Upload} tooltip="Upload file" />
            <ToolbarButton icon={Download} tooltip="Download file" active />
            <ToolbarButton icon={Trash2} tooltip="Delete item" disabled />
          </div>
        </section>

        <section>
          <h2 className="text-base font-semibold mb-4" style={{ color: '#CCCCCC' }}>
            Input Fields (Dark background, 1px blue focus outline)
          </h2>
          <div className="space-y-3 max-w-md">
            <Input placeholder="Enter text..." />
            <Input placeholder="Disabled input" disabled />
            <Input type="password" placeholder="Password" />
            <Input type="number" placeholder="Number input" />
          </div>
        </section>

        <section>
          <h2 className="text-base font-semibold mb-4" style={{ color: '#CCCCCC' }}>
            Textarea (Standard and Monospace)
          </h2>
          <div className="space-y-3 max-w-md">
            <Textarea placeholder="Enter description..." rows={3} />
            <Textarea
              placeholder="Enter code..."
              rows={4}
              monospace
              value="function hello() {\n  console.log('UDL Editor');\n}"
            />
          </div>
        </section>

        <section>
          <h2 className="text-base font-semibold mb-4" style={{ color: '#CCCCCC' }}>
            Diagram Nodes (Draggable, hover glow effect, connection ports)
          </h2>
          <p className="text-xs mb-4" style={{ color: '#858585' }}>
            Try dragging the nodes! Hover to see the blue glow effect. Connection ports visible on all 4 sides.
          </p>
          <div
            className="relative border rounded-sm"
            style={{
              height: '400px',
              background: '#1E1E1E',
              borderColor: '#3E3E42'
            }}
          >
            {nodes.map(node => (
              <DiagramNode
                key={node.id}
                {...node}
                onDrag={handleNodeDrag}
              />
            ))}

            <svg className="absolute inset-0 pointer-events-none">
              <line
                x1={nodes[0].x + 100}
                y1={nodes[0].y + 60}
                x2={nodes[1].x + 100}
                y2={nodes[1].y + 60}
                stroke="#007ACC"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
              <line
                x1={nodes[0].x + 100}
                y1={nodes[0].y + 60}
                x2={nodes[2].x + 100}
                y2={nodes[2].y + 60}
                stroke="#28A745"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
            </svg>
          </div>
        </section>

        <section>
          <h2 className="text-base font-semibold mb-4" style={{ color: '#CCCCCC' }}>
            Component Specifications
          </h2>
          <div
            className="rounded-sm p-4 space-y-2 text-xs"
            style={{
              background: '#252526',
              border: '1px solid #3E3E42',
              fontFamily: 'Fira Code, monospace',
              color: '#CCCCCC'
            }}
          >
            <div><span style={{ color: '#569CD6' }}>Primary Button:</span> 28px height, 4px padding, icon + label</div>
            <div><span style={{ color: '#569CD6' }}>Hover State:</span> Lighten 10% (#0098FF)</div>
            <div><span style={{ color: '#569CD6' }}>Active State:</span> Darken 5% (#005A9E)</div>
            <div style={{ marginTop: '12px' }}><span style={{ color: '#569CD6' }}>Toolbar Button:</span> Flat style, #444 background, no border</div>
            <div style={{ marginTop: '12px' }}><span style={{ color: '#569CD6' }}>Input:</span> Dark background #1E1E1E, border 1px #3C3C3C</div>
            <div><span style={{ color: '#569CD6' }}>Focus State:</span> Blue outline 1px (#007ACC)</div>
            <div style={{ marginTop: '12px' }}><span style={{ color: '#569CD6' }}>Diagram Node:</span> 4px radius, white background, connection ports on 4 sides</div>
            <div><span style={{ color: '#569CD6' }}>Hover Effect:</span> Blue glow (shadow: 0 0 8px rgba(0,122,204,0.5))</div>
            <div style={{ marginTop: '12px' }}><span style={{ color: '#569CD6' }}>Tooltip:</span> Black background, 10px font, 400ms delay fade-in</div>
          </div>
        </section>
      </div>
    </div>
  );
}
