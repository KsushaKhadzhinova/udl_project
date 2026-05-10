import { useState, useEffect, useRef } from 'react';
import {
  Files, Search, GitBranch, Bug, Box, Settings,
  Play, Save, Download, Upload, Sparkles, ChevronDown, ChevronRight,
  X, HelpCircle, Sun, Moon, FileCode, Plus,
  Terminal as TerminalIcon, AlertCircle, CheckCircle2, XCircle, AlertTriangle,
  ZoomIn, ZoomOut, Maximize2, Grid3x3, Circle, Square, Move,
  Copy, Folder, FolderOpen, MoreHorizontal, RefreshCw,
  BookOpen, Layers, User, Activity
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

// MVP Нотации
const NOTATIONS = {
  'UML': {
    structured: ['Class', 'Object', 'Component', 'Composite Structure', 'Deployment', 'Package', 'Profile'],
    behavioral: ['Use Case', 'Activity', 'State Machine', 'Sequence', 'Communication', 'Interaction Overview', 'Timing']
  },
  'ERD': ['Conceptual', 'Logical', 'Physical'],
  'IDEF0': ['Context', 'A-0 Diagram', 'Child Diagrams'],
  'IDEF1X': ['ER', 'KB', 'FA', 'Node Tree'],
  'IDEF3': ['PFDD', 'OSTN'],
  'DFD': ['Level 0', 'Level 1', 'Level 2']
};

// AI Modes
const AI_MODES = [
  { id: 'write', label: 'Написать код', description: 'Генерация нового кода диаграммы' },
  { id: 'fix', label: 'Исправить код', description: 'Исправление существующего кода' },
  { id: 'error', label: 'Исправить ошибку', description: 'Устранение ошибок в коде' },
  { id: 'docs', label: 'Спросить документацию', description: 'Вопросы по синтаксису и нотациям' }
];

// Templates
const TEMPLATES = [
  {
    id: 'uml-class-basic',
    name: 'UML Class - Basic',
    notation: 'UML',
    type: 'Class',
    code: `// Basic UML Class Diagram
class User {
  +id: string
  +name: string
  +email: string
  +login()
  +logout()
}

class Order {
  +id: string
  +total: number
  +status: string
  +create()
  +cancel()
}

User --> Order`
  },
  {
    id: 'uml-usecase',
    name: 'UML Use Case',
    notation: 'UML',
    type: 'Use Case',
    code: `// UML Use Case Diagram
actor User
actor Admin

usecase "Login" as UC1
usecase "Manage Users" as UC2
usecase "View Reports" as UC3

User --> UC1
User --> UC3
Admin --> UC2
Admin --> UC3`
  },
  {
    id: 'erd-conceptual',
    name: 'ERD - Conceptual',
    notation: 'ERD',
    type: 'Conceptual',
    code: `// Conceptual ERD
entity Customer {
  customer_id: PK
  name: string
  email: string
}

entity Order {
  order_id: PK
  order_date: date
  total: decimal
}

Customer --< Order`
  },
  {
    id: 'dfd-level0',
    name: 'DFD - Level 0',
    notation: 'DFD',
    type: 'Level 0',
    code: `// Data Flow Diagram Level 0
external "Customer"
process "Order System" as P0
datastore "Database"

Customer -> P0 : "Order Request"
P0 -> Customer : "Order Confirmation"
P0 -> Database : "Store Order"`
  }
];

// Export Formats
const EXPORT_FORMATS = ['SVG', 'PNG', 'XML', 'Canvas'];

// Post-MVP Нотации (закомментированы для будущих версий)
// const POST_MVP_NOTATIONS = {
//   'BPMN': ['Process', 'Collaboration', 'Choreography', 'Conversation'],
//   'Petri Nets': {
//     types: ['Colored', 'Timed', 'Stochastic', 'Inhibitor'],
//     structure: ['State Machines', 'Marked Graphs', 'Ordinary Nets', 'Generalized Nets']
//   },
//   'Custom': ['Произвольная диаграмма']
// };

const SAMPLE_CODE = `// UML Class Diagram - Order Processing
class Order {
  +id: string
  +customerId: string
  +totalAmount: number
  +status: OrderStatus
  +process()
  +validate()
}

class Customer {
  +id: string
  +name: string
  +email: string
  +createOrder()
}

class Payment {
  +id: string
  +amount: number
  +method: string
  +process()
}

Order --> Customer
Order --> Payment`;

const tr = {
  fast: 'all 0.12s cubic-bezier(0.4, 0.0, 0.2, 1)',
  base: 'all 0.2s cubic-bezier(0.4, 0.0, 0.2, 1)',
  slow: 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
  bounce: 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
};

type ToastType = 'success' | 'error' | 'warning' | 'info';
interface Toast {
  id: string;
  type: ToastType;
  message: string;
}

interface DiagramNode {
  id: string;
  type: 'class' | 'entity' | 'process';
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  attributes?: string[];
  codeLines?: number[]; // Maps node to corresponding code lines
}

interface Connection {
  id: string;
  from: string;
  to: string;
}

interface FileNode {
  name: string;
  type: 'file' | 'folder';
  expanded?: boolean;
  children?: FileNode[];
}

const FILE_TREE: FileNode[] = [
  {
    name: 'workspace',
    type: 'folder',
    expanded: true,
    children: [
      {
        name: 'diagrams',
        type: 'folder',
        expanded: true,
        children: [
          { name: 'system.udl', type: 'file' },
          { name: 'database.udl', type: 'file' },
          { name: 'workflow.udl', type: 'file' }
        ]
      },
      {
        name: 'src',
        type: 'folder',
        expanded: false,
        children: [
          { name: 'components', type: 'folder' },
          { name: 'utils', type: 'folder' }
        ]
      },
      {
        name: 'config',
        type: 'folder',
        expanded: false,
        children: [
          { name: 'settings.json', type: 'file' }
        ]
      },
      { name: 'package.json', type: 'file' },
      { name: 'README.md', type: 'file' }
    ]
  }
];

export function UDLEditorComplete() {
  const { theme, toggleTheme } = useTheme();

  const [sidebarView, setSidebarView] = useState<'files' | 'search' | 'git' | 'debug' | 'extensions'>('files');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [rightPanelTab, setRightPanelTab] = useState<'templates' | 'files' | 'debug' | 'terminal' | 'status' | 'profile'>('templates');
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [selectedNotation, setSelectedNotation] = useState('UML');
  const [selectedDiagramType, setSelectedDiagramType] = useState('Class');
  const [notationDropdownOpen, setNotationDropdownOpen] = useState(false);
  const [code, setCode] = useState(SAMPLE_CODE);
  const [highlightedLines, setHighlightedLines] = useState<number[]>([]);
  const [hoveredCodeLine, setHoveredCodeLine] = useState<number | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [zoom, setZoom] = useState(100);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [showGrid, setShowGrid] = useState(true);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [docsOpen, setDocsOpen] = useState(false);
  const [aiMode, setAiMode] = useState<string>('write');
  const [exportFormat, setExportFormat] = useState<string>('SVG');

  const [diagramNodes, setDiagramNodes] = useState<DiagramNode[]>([
    { id: 'order', type: 'class', label: 'Order', x: 50, y: 50, width: 140, height: 120, color: '#007ACC', attributes: ['+id: string', '+amount: number', '+process()'], codeLines: [1, 2, 3, 4, 5, 6, 7] },
    { id: 'customer', type: 'class', label: 'Customer', x: 280, y: 30, width: 140, height: 100, color: '#4EC2F7', attributes: ['+id: string', '+name: string', '+createOrder()'], codeLines: [9, 10, 11, 12, 13] },
    { id: 'payment', type: 'class', label: 'Payment', x: 280, y: 180, width: 140, height: 100, color: '#0078D4', attributes: ['+id: string', '+amount: number', '+process()'], codeLines: [15, 16, 17, 18, 19] }
  ]);

  const [connections] = useState<Connection[]>([
    { id: 'c1', from: 'order', to: 'customer' },
    { id: 'c2', from: 'order', to: 'payment' }
  ]);

  const [draggedNode, setDraggedNode] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  const [bottomPanelTab, setBottomPanelTab] = useState<'problems' | 'output' | 'debug' | 'terminal' | 'ports' | 'comments'>('terminal');
  const [bottomPanelOpen, setBottomPanelOpen] = useState(true);
  const [terminalContent, setTerminalContent] = useState<string[]>(['$ Ready...', '$ npm run dev', '> vite', '', 'VITE v4.0.0  ready in 342 ms', '', '➜  Local:   http://localhost:5173/', '➜  Network: use --host to expose']);
  const [terminalInput, setTerminalInput] = useState('');

  const [toasts, setToasts] = useState<Toast[]>([]);
  const [aiOpen, setAiOpen] = useState(false);
  const [fileTree, setFileTree] = useState(FILE_TREE);

  const c = {
    base: theme === 'dark' ? '#1E1E1E' : '#FFFFFF',
    sidebar: theme === 'dark' ? '#252526' : '#F3F3F3',
    header: theme === 'dark' ? '#323233' : '#F3F3F3',
    activityBar: theme === 'dark' ? '#333333' : '#2C2C2C',
    elevated: theme === 'dark' ? '#2D2D30' : '#FFFFFF',
    input: theme === 'dark' ? '#3C3C3C' : '#FFFFFF',
    hover: theme === 'dark' ? '#2A2D2E' : '#E8E8E8',
    active: theme === 'dark' ? '#094771' : '#E0E0E0',
    selection: theme === 'dark' ? '#264F78' : '#ADD6FF',
    editorBg: theme === 'dark' ? '#1E1E1E' : '#FFFFFF',
    editorText: theme === 'dark' ? '#D4D4D4' : '#333333',
    lineNumber: theme === 'dark' ? '#858585' : '#999999',
    textPrimary: theme === 'dark' ? '#CCCCCC' : '#333333',
    textSecondary: theme === 'dark' ? '#858585' : '#666666',
    textInverse: '#FFFFFF',
    border: theme === 'dark' ? '#3C3C3C' : '#E0E0E0',
    borderSubtle: theme === 'dark' ? '#2B2B2B' : '#CCCCCC',
    primary: '#007ACC',
    success: '#0078D4',
    error: '#0063B1',
    warning: '#2B88D8',
    info: '#007ACC',
    accent1: '#4EC2F7',
    accent2: '#0078D4',
  };

  const addToast = (type: ToastType, message: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  };

  const handleNodeHover = (nodeId: string | null) => {
    setHoveredNode(nodeId);
    if (nodeId) {
      const node = diagramNodes.find(n => n.id === nodeId);
      if (node && node.codeLines) {
        setHighlightedLines(node.codeLines);
      } else {
        setHighlightedLines([]);
      }
    } else {
      setHighlightedLines([]);
    }
  };

  const handleCodeLineHover = (lineIndex: number | null) => {
    setHoveredCodeLine(lineIndex);
    if (lineIndex !== null) {
      const node = diagramNodes.find(n => n.codeLines?.includes(lineIndex));
      if (node) {
        setHoveredNode(node.id);
      } else {
        setHoveredNode(null);
      }
    } else {
      setHoveredNode(null);
    }
  };

  const handleRun = () => {
    addToast('info', 'Rendering diagram...');
    setTimeout(() => addToast('success', 'Diagram rendered successfully'), 500);
  };

  const handleSave = () => {
    addToast('success', 'Diagram saved');
  };

  const handleExport = () => {
    addToast('success', `Exported as ${exportFormat}`);
  };

  const handleImport = () => {
    addToast('info', 'Import file dialog');
  };

  const handleCopyTemplate = (code: string) => {
    navigator.clipboard.writeText(code);
    addToast('success', 'Template code copied to clipboard');
  };

  const handleNodeMouseDown = (e: React.MouseEvent, nodeId: string) => {
    const node = diagramNodes.find(n => n.id === nodeId);
    if (!node) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const scaleX = (e.clientX - rect.left - pan.x) / (zoom / 100);
    const scaleY = (e.clientY - rect.top - pan.y) / (zoom / 100);
    setDraggedNode(nodeId);
    setDragOffset({ x: scaleX - node.x, y: scaleY - node.y });
    setSelectedNode(nodeId);
  };

  const handleCanvasMouseMove = (e: React.MouseEvent) => {
    if (draggedNode) {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      const scaleX = (e.clientX - rect.left - pan.x) / (zoom / 100);
      const scaleY = (e.clientY - rect.top - pan.y) / (zoom / 100);
      setDiagramNodes(prev => prev.map(node =>
        node.id === draggedNode ? { ...node, x: scaleX - dragOffset.x, y: scaleY - dragOffset.y } : node
      ));
    } else if (isPanning) {
      setPan({ x: e.clientX - panStart.x, y: e.clientY - panStart.y });
    }
  };

  const handleCanvasMouseUp = () => {
    setDraggedNode(null);
    setIsPanning(false);
  };

  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    if (e.button === 1 || (e.button === 0 && e.altKey)) {
      setIsPanning(true);
      setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleAddNode = () => {
    const newNode: DiagramNode = {
      id: `node-${Date.now()}`,
      type: 'class',
      label: 'NewClass',
      x: 100 + diagramNodes.length * 20,
      y: 100 + diagramNodes.length * 20,
      width: 140,
      height: 100,
      color: '#007ACC',
      attributes: ['+attribute: type', '+method()']
    };
    setDiagramNodes(prev => [...prev, newNode]);
    addToast('success', 'New node added');
  };

  const toggleFolder = (path: string[]) => {
    const updateTree = (nodes: FileNode[], currentPath: string[] = []): FileNode[] => {
      return nodes.map(node => {
        const nodePath = [...currentPath, node.name];
        const pathMatch = JSON.stringify(nodePath) === JSON.stringify(path);

        if (pathMatch && node.type === 'folder') {
          return { ...node, expanded: !node.expanded };
        }

        if (node.children) {
          return { ...node, children: updateTree(node.children, nodePath) };
        }

        return node;
      });
    };

    setFileTree(updateTree(fileTree));
  };

  const renderFileTree = (nodes: FileNode[], level: number = 0, path: string[] = []): JSX.Element[] => {
    return nodes.map((node, idx) => {
      const currentPath = [...path, node.name];
      const isSelected = node.name === 'system.udl';

      return (
        <div key={`${level}-${idx}-${node.name}`}>
          <div
            onClick={() => node.type === 'folder' ? toggleFolder(currentPath) : null}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '2px 4px 2px ' + (8 + level * 16) + 'px',
              cursor: 'pointer',
              fontSize: '13px',
              color: c.textPrimary,
              background: isSelected ? c.selection : 'transparent',
              transition: tr.fast,
              userSelect: 'none'
            }}
            onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.background = c.hover; }}
            onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.background = 'transparent'; }}
          >
            {node.type === 'folder' && (
              <div style={{ width: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ChevronRight size={14} style={{ transition: tr.fast, transform: node.expanded ? 'rotate(90deg)' : 'none' }} />
              </div>
            )}
            {node.type === 'file' && <div style={{ width: '16px' }} />}

            {node.type === 'folder' ? (
              node.expanded ? <FolderOpen size={16} color={c.primary} /> : <Folder size={16} color={c.primary} />
            ) : (
              <FileCode size={16} color={c.primary} />
            )}

            <span style={{ flex: 1 }}>{node.name}</span>
          </div>

          {node.type === 'folder' && node.expanded && node.children && (
            <div>
              {renderFileTree(node.children, level + 1, currentPath)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div data-theme={theme} style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: c.base, color: c.textPrimary, fontFamily: 'var(--font-ui)', overflow: 'hidden' }}>

      {/* Title Bar */}
      <header style={{ height: '35px', background: c.header, borderBottom: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', padding: '0 8px', gap: '16px', fontSize: '13px', zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: c.primary, fontWeight: 600 }}>
          <Box size={14} />
          LogicStream
        </div>

        <div style={{ display: 'flex', gap: '12px', fontSize: '13px', color: c.textPrimary }}>
          {['File', 'Edit', 'Selection', 'View', 'Go', 'Run', 'Terminal', 'Help'].map(item => (
            <span key={item} style={{ cursor: 'pointer', transition: tr.fast }} onMouseEnter={(e) => e.currentTarget.style.background = c.hover} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>{item}</span>
          ))}
        </div>

        <div style={{ flex: 1 }} />

        <button onClick={toggleTheme} style={{ width: '28px', height: '28px', background: 'transparent', border: 'none', borderRadius: '2px', color: c.textSecondary, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: tr.fast }} onMouseEnter={(e) => { e.currentTarget.style.background = c.hover; e.currentTarget.style.color = c.primary; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = c.textSecondary; }}>
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </header>

      {/* Toolbar */}
      <div style={{ height: '48px', background: c.header, borderBottom: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', padding: '0 16px', gap: '12px', zIndex: 90 }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: c.primary, fontWeight: 600, fontSize: '14px', marginRight: '16px' }}>
          <Box size={20} />
          LogicStream
        </div>

        {/* Notation Selector with Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setNotationDropdownOpen(!notationDropdownOpen)}
            style={{
              height: '32px',
              padding: '0 12px',
              background: c.input,
              border: `1px solid ${c.border}`,
              borderRadius: '2px',
              color: c.textPrimary,
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: tr.fast,
              minWidth: '180px',
              justifyContent: 'space-between'
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = c.primary}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = c.border}
          >
            <span>{selectedNotation} - {selectedDiagramType}</span>
            <ChevronDown size={14} style={{ transition: tr.fast, transform: notationDropdownOpen ? 'rotate(180deg)' : 'none' }} />
          </button>

          {notationDropdownOpen && (
            <div style={{ position: 'absolute', top: '36px', left: 0, minWidth: '280px', background: c.elevated, border: `1px solid ${c.border}`, borderRadius: '2px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: 1000, maxHeight: '400px', overflow: 'auto' }}>
              {Object.entries(NOTATIONS).map(([notation, types]) => (
                <div key={notation}>
                  <div style={{ padding: '8px 12px', fontSize: '11px', fontWeight: 600, color: c.textSecondary, textTransform: 'uppercase', background: c.sidebar }}>{notation}</div>
                  {(Array.isArray(types) ? types : [...types.structured, ...types.behavioral]).map(type => (
                    <div
                      key={type}
                      onClick={() => {
                        setSelectedNotation(notation);
                        setSelectedDiagramType(type);
                        setNotationDropdownOpen(false);
                        addToast('info', `Switched to ${notation} - ${type}`);
                      }}
                      style={{
                        padding: '8px 16px',
                        fontSize: '13px',
                        color: selectedNotation === notation && selectedDiagramType === type ? c.primary : c.textPrimary,
                        background: selectedNotation === notation && selectedDiagramType === type ? c.selection : 'transparent',
                        cursor: 'pointer',
                        transition: tr.fast
                      }}
                      onMouseEnter={(e) => { if (!(selectedNotation === notation && selectedDiagramType === type)) e.currentTarget.style.background = c.hover; }}
                      onMouseLeave={(e) => { if (!(selectedNotation === notation && selectedDiagramType === type)) e.currentTarget.style.background = 'transparent'; }}
                    >
                      {type}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
          style={{
            width: '32px',
            height: '32px',
            background: c.input,
            border: `1px solid ${c.border}`,
            borderRadius: '2px',
            color: c.textPrimary,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: tr.fast
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = c.primary; e.currentTarget.style.color = c.primary; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.color = c.textPrimary; }}
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        <div style={{ width: '1px', height: '24px', background: c.border }} />

        {/* RUN Button */}
        <button
          onClick={handleRun}
          style={{
            height: '32px',
            padding: '0 16px',
            background: c.success,
            border: 'none',
            borderRadius: '2px',
            color: c.textInverse,
            fontSize: '13px',
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: tr.fast
          }}
          onMouseEnter={(e) => e.currentTarget.style.filter = 'brightness(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.filter = 'brightness(1)'}
        >
          <Play size={14} />
          RUN
        </button>

        {/* SAVE Button */}
        <button
          onClick={handleSave}
          style={{
            height: '32px',
            padding: '0 16px',
            background: c.input,
            border: `1px solid ${c.border}`,
            borderRadius: '2px',
            color: c.textPrimary,
            fontSize: '13px',
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: tr.fast
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = c.primary; e.currentTarget.style.background = c.hover; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.background = c.input; }}
        >
          <Save size={14} />
          SAVE
        </button>

        {/* EXPORT Button */}
        <button
          onClick={handleExport}
          style={{
            height: '32px',
            padding: '0 16px',
            background: c.input,
            border: `1px solid ${c.border}`,
            borderRadius: '2px',
            color: c.textPrimary,
            fontSize: '13px',
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: tr.fast
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = c.primary; e.currentTarget.style.background = c.hover; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.background = c.input; }}
        >
          <Download size={14} />
          EXPORT
        </button>

        {/* IMPORT Button */}
        <button
          onClick={handleImport}
          style={{
            height: '32px',
            padding: '0 16px',
            background: c.input,
            border: `1px solid ${c.border}`,
            borderRadius: '2px',
            color: c.textPrimary,
            fontSize: '13px',
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: tr.fast
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = c.primary; e.currentTarget.style.background = c.hover; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.background = c.input; }}
        >
          <Upload size={14} />
          IMPORT
        </button>

        {/* AI Button */}
        <button
          onClick={() => setAiOpen(true)}
          style={{
            height: '32px',
            padding: '0 16px',
            background: c.accent2,
            border: 'none',
            borderRadius: '2px',
            color: c.textInverse,
            fontSize: '13px',
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: tr.fast
          }}
          onMouseEnter={(e) => e.currentTarget.style.filter = 'brightness(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.filter = 'brightness(1)'}
        >
          <Sparkles size={14} />
          AI
        </button>

        {/* DOCS Button */}
        <button
          onClick={() => setDocsOpen(true)}
          style={{
            height: '32px',
            padding: '0 16px',
            background: c.input,
            border: `1px solid ${c.border}`,
            borderRadius: '2px',
            color: c.textPrimary,
            fontSize: '13px',
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: tr.fast
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = c.primary; e.currentTarget.style.background = c.hover; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.background = c.input; }}
        >
          <BookOpen size={14} />
          DOCS
        </button>
      </div>

      {/* Main Content */}
      <main style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

        {/* Activity Bar */}
        <aside style={{ width: '48px', background: c.activityBar, borderRight: `1px solid ${c.border}`, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '8px 0', gap: '4px' }}>
          {[
            { id: 'files' as const, icon: Files },
            { id: 'search' as const, icon: Search },
            { id: 'git' as const, icon: GitBranch },
            { id: 'debug' as const, icon: Bug },
            { id: 'extensions' as const, icon: Box }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => { setSidebarView(item.id); setSidebarOpen(true); }}
              style={{
                width: '48px',
                height: '48px',
                background: sidebarView === item.id && sidebarOpen ? c.hover : 'transparent',
                border: 'none',
                borderLeft: sidebarView === item.id && sidebarOpen ? `2px solid ${c.primary}` : '2px solid transparent',
                color: c.textInverse,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: tr.fast,
                marginLeft: '-2px'
              }}
              onMouseEnter={(e) => { if (!(sidebarView === item.id && sidebarOpen)) e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
              onMouseLeave={(e) => { if (!(sidebarView === item.id && sidebarOpen)) e.currentTarget.style.background = 'transparent'; }}
            >
              <item.icon size={24} strokeWidth={1.5} />
            </button>
          ))}

          <div style={{ flex: 1 }} />

          <button onClick={() => setAiOpen(true)} style={{ width: '48px', height: '48px', background: 'transparent', border: 'none', color: c.textInverse, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: tr.fast }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
            <Sparkles size={24} strokeWidth={1.5} />
          </button>

          <button style={{ width: '48px', height: '48px', background: 'transparent', border: 'none', color: c.textInverse, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: tr.fast }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
            <Settings size={24} strokeWidth={1.5} />
          </button>
        </aside>

        {/* Sidebar */}
        {sidebarOpen && (
          <aside style={{ width: '250px', background: c.sidebar, borderRight: `1px solid ${c.border}`, display: 'flex', flexDirection: 'column' }}>
            {/* Sidebar Header */}
            <div style={{ height: '35px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px 0 20px', borderBottom: `1px solid ${c.border}` }}>
              <span style={{ fontSize: '11px', fontWeight: 600, color: c.textSecondary, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {sidebarView === 'files' ? 'EXPLORER' : sidebarView.toUpperCase()}
              </span>
              <div style={{ display: 'flex', gap: '4px' }}>
                <button style={{ width: '20px', height: '20px', background: 'transparent', border: 'none', cursor: 'pointer', color: c.textSecondary, borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: tr.fast }} onMouseEnter={(e) => e.currentTarget.style.background = c.hover} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                  <Plus size={14} />
                </button>
                <button style={{ width: '20px', height: '20px', background: 'transparent', border: 'none', cursor: 'pointer', color: c.textSecondary, borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: tr.fast }} onMouseEnter={(e) => e.currentTarget.style.background = c.hover} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                  <RefreshCw size={14} />
                </button>
                <button style={{ width: '20px', height: '20px', background: 'transparent', border: 'none', cursor: 'pointer', color: c.textSecondary, borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: tr.fast }} onMouseEnter={(e) => e.currentTarget.style.background = c.hover} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                  <MoreHorizontal size={14} />
                </button>
              </div>
            </div>

            {/* Sidebar Content */}
            <div style={{ flex: 1, overflow: 'auto', padding: '4px 0' }}>
              {sidebarView === 'files' && renderFileTree(fileTree)}
            </div>
          </aside>
        )}

        {/* Editor Area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

          {/* Tabs */}
          <div style={{ height: '35px', background: c.editorBg, borderBottom: `1px solid ${c.border}`, display: 'flex', alignItems: 'flex-end', overflow: 'auto' }}>
            {['system.udl', 'database.udl', 'diagram.svg'].map((tab, idx) => (
              <div
                key={tab}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '0 12px',
                  height: '35px',
                  background: idx === 0 ? c.editorBg : 'transparent',
                  borderTop: idx === 0 ? `2px solid ${c.primary}` : '2px solid transparent',
                  borderRight: `1px solid ${c.border}`,
                  fontSize: '13px',
                  color: idx === 0 ? c.editorText : c.textSecondary,
                  cursor: 'pointer',
                  position: 'relative',
                  top: idx === 0 ? '0' : '1px',
                  transition: tr.fast
                }}
                onMouseEnter={(e) => { if (idx !== 0) e.currentTarget.style.background = c.hover; }}
                onMouseLeave={(e) => { if (idx !== 0) e.currentTarget.style.background = 'transparent'; }}
              >
                <FileCode size={16} />
                <span>{tab}</span>
                {idx === 0 && (
                  <button style={{ width: '20px', height: '20px', background: 'transparent', border: 'none', cursor: 'pointer', color: c.textSecondary, borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, transition: tr.fast }} onMouseEnter={(e) => { e.currentTarget.style.background = c.hover; e.currentTarget.style.color = c.textPrimary; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = c.textSecondary; }}>
                    <X size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Split View */}
          <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>

            {/* Code Editor */}
            <section style={{ width: '50%', background: c.editorBg, borderRight: `1px solid ${c.border}`, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
              <div style={{ flex: 1, overflow: 'auto' }}>
                <div style={{ display: 'flex' }}>
                  {/* Line Numbers */}
                  <div style={{ width: '50px', background: c.editorBg, padding: '16px 8px', fontSize: '13px', lineHeight: '1.6', color: c.lineNumber, textAlign: 'right', userSelect: 'none', fontFamily: 'var(--font-editor)', borderRight: `1px solid ${c.border}` }}>
                    {code.split('\n').map((_, i) => (
                      <div key={i} style={{ height: '20.8px' }}>{i + 1}</div>
                    ))}
                  </div>

                  {/* Code Content */}
                  <div style={{ flex: 1, padding: '16px', overflow: 'auto' }}>
                    <pre style={{ margin: 0, fontFamily: 'var(--font-editor)', fontSize: '13px', lineHeight: '1.6', color: c.editorText }}>
                      {code.split('\n').map((line, i) => (
                        <div
                          key={i}
                          onMouseEnter={() => handleCodeLineHover(i)}
                          onMouseLeave={() => handleCodeLineHover(null)}
                          style={{
                            minHeight: '20.8px',
                            background: highlightedLines.includes(i) ? (theme === 'dark' ? 'rgba(0,122,204,0.15)' : 'rgba(0,122,204,0.1)') : 'transparent',
                            borderLeft: highlightedLines.includes(i) ? `2px solid ${c.primary}` : '2px solid transparent',
                            paddingLeft: '8px',
                            marginLeft: '-10px',
                            transition: tr.fast,
                            cursor: 'pointer'
                          }}
                        >
                          {line || ' '}
                        </div>
                      ))}
                    </pre>
                  </div>
                </div>
              </div>
            </section>

            {/* Diagram Canvas */}
            <section
              ref={canvasRef}
              style={{
                flex: 1,
                background: c.editorBg,
                position: 'relative',
                overflow: 'hidden',
                cursor: draggedNode ? 'grabbing' : isPanning ? 'grabbing' : 'default'
              }}
              onMouseMove={handleCanvasMouseMove}
              onMouseUp={handleCanvasMouseUp}
              onMouseDown={handleCanvasMouseDown}
              onMouseLeave={handleCanvasMouseUp}
            >
              {showGrid && (
                <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(${c.border} 1px, transparent 1px), linear-gradient(90deg, ${c.border} 1px, transparent 1px)`, backgroundSize: '20px 20px', opacity: 0.3, pointerEvents: 'none' }} />
              )}

              {/* Canvas Controls */}
              <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '4px', background: c.elevated, border: `1px solid ${c.border}`, borderRadius: '2px', padding: '4px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', zIndex: 10 }}>
                <button onClick={handleAddNode} title="Add Node" style={{ width: '28px', height: '28px', background: 'transparent', border: 'none', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: c.textSecondary, transition: tr.fast }} onMouseEnter={(e) => { e.currentTarget.style.background = c.hover; e.currentTarget.style.color = c.primary; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = c.textSecondary; }}>
                  <Plus size={16} />
                </button>
                <button onClick={() => setShowGrid(!showGrid)} style={{ width: '28px', height: '28px', background: showGrid ? c.active : 'transparent', border: showGrid ? `1px solid ${c.primary}` : 'none', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: showGrid ? c.primary : c.textSecondary, transition: tr.fast }}>
                  <Grid3x3 size={16} />
                </button>
              </div>

              {/* Zoom Controls */}
              <div style={{ position: 'absolute', bottom: '12px', right: '12px', display: 'flex', flexDirection: 'column', gap: '4px', background: c.elevated, border: `1px solid ${c.border}`, borderRadius: '2px', padding: '4px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', zIndex: 10 }}>
                <button onClick={() => setZoom(z => Math.min(z + 10, 200))} style={{ width: '28px', height: '28px', background: 'transparent', border: 'none', borderRadius: '2px', cursor: 'pointer', color: c.textSecondary, transition: tr.fast }} onMouseEnter={(e) => { e.currentTarget.style.background = c.hover; e.currentTarget.style.color = c.primary; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = c.textSecondary; }}>
                  <ZoomIn size={16} />
                </button>
                <div style={{ fontSize: '11px', color: c.textSecondary, textAlign: 'center', fontWeight: 600 }}>{zoom}%</div>
                <button onClick={() => setZoom(z => Math.max(z - 10, 50))} style={{ width: '28px', height: '28px', background: 'transparent', border: 'none', borderRadius: '2px', cursor: 'pointer', color: c.textSecondary, transition: tr.fast }} onMouseEnter={(e) => { e.currentTarget.style.background = c.hover; e.currentTarget.style.color = c.primary; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = c.textSecondary; }}>
                  <ZoomOut size={16} />
                </button>
                <div style={{ width: '28px', height: '1px', background: c.border, margin: '2px 0' }} />
                <button onClick={() => { setZoom(100); setPan({ x: 0, y: 0 }); }} style={{ width: '28px', height: '28px', background: 'transparent', border: 'none', borderRadius: '2px', cursor: 'pointer', color: c.textSecondary, transition: tr.fast }} onMouseEnter={(e) => { e.currentTarget.style.background = c.hover; e.currentTarget.style.color = c.primary; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = c.textSecondary; }}>
                  <Maximize2 size={16} />
                </button>
              </div>

              {/* SVG Canvas */}
              <div style={{ position: 'absolute', inset: 0, transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom / 100})`, transformOrigin: '0 0', transition: draggedNode || isPanning ? 'none' : tr.base, pointerEvents: 'none' }}>
                <svg width="2000" height="2000" style={{ pointerEvents: 'all' }}>
                  <defs>
                    <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                      <polygon points="0 0, 10 3, 0 6" fill={c.textSecondary} />
                    </marker>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                      <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                    <filter id="shadow">
                      <feDropShadow dx="0" dy="2" stdDeviation="4" floodOpacity="0.3"/>
                    </filter>
                  </defs>

                  {connections.map(conn => {
                    const fromNode = diagramNodes.find(n => n.id === conn.from);
                    const toNode = diagramNodes.find(n => n.id === conn.to);
                    if (!fromNode || !toNode) return null;
                    return (
                      <line
                        key={conn.id}
                        x1={fromNode.x + fromNode.width}
                        y1={fromNode.y + fromNode.height / 2}
                        x2={toNode.x}
                        y2={toNode.y + toNode.height / 2}
                        stroke={c.textSecondary}
                        strokeWidth="2"
                        markerEnd="url(#arrow)"
                      />
                    );
                  })}

                  {diagramNodes.map(node => (
                    <g
                      key={node.id}
                      onMouseEnter={() => handleNodeHover(node.id)}
                      onMouseLeave={() => handleNodeHover(null)}
                      onMouseDown={(e) => handleNodeMouseDown(e as any, node.id)}
                      style={{ cursor: 'grab' }}
                    >
                      <rect x={node.x} y={node.y} width={node.width} height={node.height} rx="2" fill={c.elevated} stroke={node.color} strokeWidth={hoveredNode === node.id || selectedNode === node.id ? '3' : '2'} filter={hoveredNode === node.id ? 'url(#glow)' : 'url(#shadow)'} />
                      <rect x={node.x} y={node.y} width={node.width} height="30" rx="2" fill={node.color} opacity="0.9" />
                      <text x={node.x + node.width / 2} y={node.y + 20} textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="600">{node.label}</text>
                      {node.attributes?.map((attr, i) => (
                        <text key={i} x={node.x + 10} y={node.y + 50 + i * 15} fill={c.editorText} fontSize="11" fontFamily="Fira Code">{attr}</text>
                      ))}
                    </g>
                  ))}
                </svg>
              </div>
            </section>
          </div>

          {/* Right Panel */}
          {rightPanelOpen && (
            <aside style={{ width: '320px', background: c.sidebar, borderLeft: `1px solid ${c.border}`, display: 'flex', flexDirection: 'column' }}>
              {/* Right Panel Tabs */}
              <div style={{ height: '35px', display: 'flex', borderBottom: `1px solid ${c.border}`, background: c.sidebar, overflow: 'auto' }}>
                {[
                  { id: 'templates' as const, label: 'Templates', icon: Layers },
                  { id: 'files' as const, label: 'Files', icon: Files },
                  { id: 'debug' as const, label: 'Debug', icon: Bug },
                  { id: 'terminal' as const, label: 'Terminal', icon: TerminalIcon },
                  { id: 'status' as const, label: 'Status', icon: Activity },
                  { id: 'profile' as const, label: 'Profile', icon: User }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setRightPanelTab(tab.id)}
                    style={{
                      flex: 1,
                      height: '35px',
                      background: rightPanelTab === tab.id ? c.elevated : 'transparent',
                      border: 'none',
                      borderTop: rightPanelTab === tab.id ? `2px solid ${c.primary}` : '2px solid transparent',
                      color: rightPanelTab === tab.id ? c.textPrimary : c.textSecondary,
                      fontSize: '11px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: tr.fast,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.3px'
                    }}
                    onMouseEnter={(e) => { if (rightPanelTab !== tab.id) e.currentTarget.style.background = c.hover; }}
                    onMouseLeave={(e) => { if (rightPanelTab !== tab.id) e.currentTarget.style.background = 'transparent'; }}
                  >
                    <tab.icon size={14} />
                    <span style={{ display: 'none', '@media (min-width: 1400px)': { display: 'inline' } }}>{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Right Panel Content */}
              <div style={{ flex: 1, overflow: 'auto', padding: '12px' }}>
                {rightPanelTab === 'templates' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: c.textSecondary, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Diagram Templates
                    </div>
                    {TEMPLATES.map(template => (
                      <div
                        key={template.id}
                        style={{
                          background: c.elevated,
                          border: `1px solid ${c.border}`,
                          borderRadius: '2px',
                          padding: '12px',
                          transition: tr.fast,
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.borderColor = c.primary}
                        onMouseLeave={(e) => e.currentTarget.style.borderColor = c.border}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                          <div style={{ fontSize: '13px', fontWeight: 500, color: c.textPrimary }}>{template.name}</div>
                          <button
                            onClick={() => handleCopyTemplate(template.code)}
                            style={{
                              width: '28px',
                              height: '28px',
                              background: 'transparent',
                              border: 'none',
                              borderRadius: '2px',
                              color: c.textSecondary,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: tr.fast
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = c.hover; e.currentTarget.style.color = c.primary; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = c.textSecondary; }}
                          >
                            <Copy size={14} />
                          </button>
                        </div>
                        <div style={{ fontSize: '11px', color: c.textSecondary, marginBottom: '8px' }}>
                          {template.notation} - {template.type}
                        </div>
                        <pre style={{
                          fontSize: '10px',
                          fontFamily: 'var(--font-editor)',
                          color: c.editorText,
                          background: c.editorBg,
                          padding: '8px',
                          borderRadius: '2px',
                          overflow: 'auto',
                          maxHeight: '100px',
                          margin: 0
                        }}>
                          {template.code}
                        </pre>
                      </div>
                    ))}
                  </div>
                )}

                {rightPanelTab === 'files' && (
                  <div style={{ fontSize: '13px', color: c.textSecondary }}>
                    <div style={{ marginBottom: '8px', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Recent Files
                    </div>
                    {['system.udl', 'database.udl', 'workflow.udl'].map(file => (
                      <div
                        key={file}
                        style={{
                          padding: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          cursor: 'pointer',
                          borderRadius: '2px',
                          transition: tr.fast
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = c.hover}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                      >
                        <FileCode size={16} color={c.primary} />
                        <span style={{ color: c.textPrimary }}>{file}</span>
                      </div>
                    ))}
                  </div>
                )}

                {rightPanelTab === 'debug' && (
                  <div style={{ fontSize: '13px', color: c.textSecondary }}>
                    <div style={{ marginBottom: '8px', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Debug Console
                    </div>
                    <div style={{ fontSize: '12px', fontFamily: 'var(--font-editor)' }}>
                      <div>[Debug] Ready</div>
                      <div>[Debug] Validation: OK</div>
                      <div>[Debug] Nodes: {diagramNodes.length}</div>
                    </div>
                  </div>
                )}

                {rightPanelTab === 'terminal' && (
                  <div style={{ fontSize: '13px', color: c.textSecondary }}>
                    <div style={{ marginBottom: '8px', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Terminal Output
                    </div>
                    <div style={{ fontSize: '12px', fontFamily: 'var(--font-editor)' }}>
                      {terminalContent.slice(-5).map((line, i) => (
                        <div key={i}>{line}</div>
                      ))}
                    </div>
                  </div>
                )}

                {rightPanelTab === 'status' && (
                  <div style={{ fontSize: '13px', color: c.textSecondary }}>
                    <div style={{ marginBottom: '8px', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      System Status
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', background: c.elevated, borderRadius: '2px' }}>
                        <span style={{ color: c.textPrimary }}>Notation:</span>
                        <span style={{ color: c.primary }}>{selectedNotation}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', background: c.elevated, borderRadius: '2px' }}>
                        <span style={{ color: c.textPrimary }}>Type:</span>
                        <span style={{ color: c.primary }}>{selectedDiagramType}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', background: c.elevated, borderRadius: '2px' }}>
                        <span style={{ color: c.textPrimary }}>Nodes:</span>
                        <span style={{ color: c.success }}>{diagramNodes.length}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', background: c.elevated, borderRadius: '2px' }}>
                        <span style={{ color: c.textPrimary }}>Zoom:</span>
                        <span style={{ color: c.primary }}>{zoom}%</span>
                      </div>
                    </div>
                  </div>
                )}

                {rightPanelTab === 'profile' && (
                  <div style={{ fontSize: '13px', color: c.textSecondary }}>
                    <div style={{ marginBottom: '12px', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      User Profile
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
                      <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: c.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', color: c.textInverse, fontWeight: 600 }}>
                        U
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '14px', fontWeight: 600, color: c.textPrimary, marginBottom: '4px' }}>User Name</div>
                        <div style={{ fontSize: '12px', color: c.textSecondary }}>user@example.com</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Panel Close Button */}
              <div style={{ height: '35px', borderTop: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 12px' }}>
                <button
                  onClick={() => setRightPanelOpen(false)}
                  style={{
                    width: '28px',
                    height: '28px',
                    background: 'transparent',
                    border: 'none',
                    borderRadius: '2px',
                    color: c.textSecondary,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: tr.fast
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = c.hover; e.currentTarget.style.color = c.textPrimary; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = c.textSecondary; }}
                >
                  <X size={16} />
                </button>
              </div>
            </aside>
          )}
        </div>
      </main>

      {/* Bottom Panel */}
      {bottomPanelOpen && (
        <div style={{ height: '200px', background: c.editorBg, borderTop: `1px solid ${c.border}`, display: 'flex', flexDirection: 'column' }}>
          {/* Panel Tabs */}
          <div style={{ height: '35px', display: 'flex', alignItems: 'center', borderBottom: `1px solid ${c.border}`, background: c.editorBg }}>
            {[
              { id: 'problems' as const, label: 'PROBLEMS', count: 0 },
              { id: 'output' as const, label: 'OUTPUT' },
              { id: 'debug' as const, label: 'DEBUG CONSOLE' },
              { id: 'terminal' as const, label: 'TERMINAL' },
              { id: 'ports' as const, label: 'PORTS' },
              { id: 'comments' as const, label: 'COMMENTS' }
            ].map(tab => (
              <div
                key={tab.id}
                onClick={() => setBottomPanelTab(tab.id)}
                style={{
                  padding: '0 16px',
                  height: '35px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '11px',
                  fontWeight: 500,
                  color: bottomPanelTab === tab.id ? c.textPrimary : c.textSecondary,
                  borderTop: bottomPanelTab === tab.id ? `2px solid ${c.primary}` : '2px solid transparent',
                  cursor: 'pointer',
                  transition: tr.fast,
                  textTransform: 'uppercase',
                  letterSpacing: '0.3px'
                }}
                onMouseEnter={(e) => { if (bottomPanelTab !== tab.id) e.currentTarget.style.color = c.textPrimary; }}
                onMouseLeave={(e) => { if (bottomPanelTab !== tab.id) e.currentTarget.style.color = c.textSecondary; }}
              >
                {tab.label}
                {tab.count !== undefined && (
                  <span style={{ background: c.selection, color: c.textPrimary, padding: '1px 6px', borderRadius: '10px', fontSize: '10px' }}>{tab.count}</span>
                )}
              </div>
            ))}

            <div style={{ flex: 1 }} />

            <button onClick={() => setBottomPanelOpen(false)} style={{ width: '28px', height: '28px', background: 'transparent', border: 'none', borderRadius: '2px', color: c.textSecondary, cursor: 'pointer', marginRight: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: tr.fast }} onMouseEnter={(e) => { e.currentTarget.style.background = c.hover; e.currentTarget.style.color = c.textPrimary; }} onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = c.textSecondary; }}>
              <X size={16} />
            </button>
          </div>

          {/* Panel Content */}
          <div style={{ flex: 1, overflow: 'auto', padding: '12px', fontFamily: 'var(--font-editor)', fontSize: '13px', color: c.editorText }}>
            {bottomPanelTab === 'terminal' && (
              <div>
                {terminalContent.map((line, i) => (
                  <div key={i} style={{ marginBottom: '2px', whiteSpace: 'pre' }}>{line}</div>
                ))}
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                  <span style={{ color: c.primary }}>$</span>
                  <input
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && terminalInput) {
                        setTerminalContent(prev => [...prev, `$ ${terminalInput}`, '> Command executed']);
                        setTerminalInput('');
                      }
                    }}
                    style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: '13px', color: c.editorText, fontFamily: 'var(--font-editor)' }}
                    placeholder=""
                  />
                </div>
              </div>
            )}

            {bottomPanelTab === 'problems' && (
              <div style={{ fontSize: '13px', color: c.textSecondary, padding: '8px' }}>No problems detected</div>
            )}

            {bottomPanelTab === 'output' && (
              <div style={{ fontSize: '13px', color: c.textSecondary }}>
                <div>[Extension Host] Info: Extension activated</div>
                <div>[Extension Host] Info: Language server started</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Status Bar */}
      <footer style={{ height: '22px', background: c.primary, color: c.textInverse, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px', fontSize: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', padding: '0 6px', borderRadius: '2px', transition: tr.fast }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
            <GitBranch size={14} />
            <span>main</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <CheckCircle2 size={14} />
            <span>0</span>
            <AlertTriangle size={14} />
            <span>0</span>
          </div>
          <div style={{ cursor: 'pointer', padding: '0 6px', borderRadius: '2px', transition: tr.fast }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
            Validation: OK
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span>Ln 1, Col 1</span>
          <span>Spaces: 2</span>
          <span>UTF-8</span>
          <span>CRLF</span>
          <span>{selectedNotation} - {selectedDiagramType}</span>
          <button onClick={() => setBottomPanelOpen(!bottomPanelOpen)} style={{ background: 'transparent', border: 'none', color: c.textInverse, cursor: 'pointer', fontSize: '12px', padding: '0 6px', borderRadius: '2px', transition: tr.fast, display: 'flex', alignItems: 'center' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
            <TerminalIcon size={14} />
          </button>
          <button onClick={() => setRightPanelOpen(!rightPanelOpen)} style={{ background: 'transparent', border: 'none', color: c.textInverse, cursor: 'pointer', fontSize: '12px', padding: '0 6px', borderRadius: '2px', transition: tr.fast, display: 'flex', alignItems: 'center' }} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
            <Layers size={14} />
          </button>
        </div>
      </footer>

      {/* AI Modal */}
      {aiOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fadeIn 0.2s ease-out' }} onClick={() => setAiOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: '600px', background: c.base, borderRadius: '4px', padding: '24px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', border: `1px solid ${c.border}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: c.textPrimary, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={18} color={c.accent2} />
                AI Assistant
              </h2>
              <button onClick={() => setAiOpen(false)} style={{ width: '32px', height: '32px', background: 'transparent', border: 'none', cursor: 'pointer', color: c.textPrimary, borderRadius: '2px', transition: tr.fast }} onMouseEnter={(e) => e.currentTarget.style.background = c.hover} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                <X size={20} />
              </button>
            </div>

            {/* AI Modes */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
              {AI_MODES.map(mode => (
                <button
                  key={mode.id}
                  onClick={() => setAiMode(mode.id)}
                  style={{
                    padding: '12px',
                    background: aiMode === mode.id ? c.selection : c.elevated,
                    border: aiMode === mode.id ? `1px solid ${c.primary}` : `1px solid ${c.border}`,
                    borderRadius: '2px',
                    color: aiMode === mode.id ? c.primary : c.textPrimary,
                    fontSize: '12px',
                    fontWeight: 500,
                    cursor: 'pointer',
                    transition: tr.fast,
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => { if (aiMode !== mode.id) e.currentTarget.style.borderColor = c.primary; }}
                  onMouseLeave={(e) => { if (aiMode !== mode.id) e.currentTarget.style.borderColor = c.border; }}
                >
                  <div style={{ marginBottom: '4px', fontWeight: 600 }}>{mode.label}</div>
                  <div style={{ fontSize: '10px', color: c.textSecondary }}>{mode.description}</div>
                </button>
              ))}
            </div>

            <textarea placeholder="Введите ваш запрос..." style={{ width: '100%', minHeight: '120px', padding: '12px', background: c.input, border: `1px solid ${c.border}`, borderRadius: '2px', fontSize: '13px', color: c.textPrimary, resize: 'vertical', fontFamily: 'var(--font-ui)' }} />
            <button onClick={() => { addToast('info', 'Processing AI request...'); setAiOpen(false); }} style={{ marginTop: '16px', width: '100%', height: '40px', background: c.accent2, border: 'none', borderRadius: '2px', cursor: 'pointer', fontSize: '14px', color: c.textInverse, fontWeight: 500, transition: tr.fast }} onMouseEnter={(e) => e.currentTarget.style.filter = 'brightness(1.15)'} onMouseLeave={(e) => e.currentTarget.style.filter = 'brightness(1)'}>
              Отправить
            </button>
          </div>
        </div>
      )}

      {/* Documentation Modal */}
      {docsOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'fadeIn 0.2s ease-out' }} onClick={() => setDocsOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: '700px', maxHeight: '80vh', background: c.base, borderRadius: '4px', padding: '24px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', border: `1px solid ${c.border}`, overflow: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: c.textPrimary, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <BookOpen size={18} color={c.primary} />
                UDL Documentation
              </h2>
              <button onClick={() => setDocsOpen(false)} style={{ width: '32px', height: '32px', background: 'transparent', border: 'none', cursor: 'pointer', color: c.textPrimary, borderRadius: '2px', transition: tr.fast }} onMouseEnter={(e) => e.currentTarget.style.background = c.hover} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* UML Class Syntax */}
              <div>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: c.primary, marginBottom: '8px' }}>UML Class Diagram</h3>
                <pre style={{ background: c.editorBg, padding: '12px', borderRadius: '2px', fontSize: '12px', fontFamily: 'var(--font-editor)', color: c.editorText, overflow: 'auto' }}>
{`class ClassName {
  +public_attr: type
  -private_attr: type
  #protected_attr: type
  +method()
}

// Relationships
ClassA --> ClassB   // Association
ClassA --o ClassB   // Aggregation
ClassA --* ClassB   // Composition
ClassA --|> ClassB  // Inheritance`}
                </pre>
              </div>

              {/* ERD Syntax */}
              <div>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: c.primary, marginBottom: '8px' }}>ERD (Entity Relationship Diagram)</h3>
                <pre style={{ background: c.editorBg, padding: '12px', borderRadius: '2px', fontSize: '12px', fontFamily: 'var(--font-editor)', color: c.editorText, overflow: 'auto' }}>
{`entity EntityName {
  id: PK           // Primary Key
  name: string
  email: string
  foreign_id: FK   // Foreign Key
}

// Relationships
Entity1 --< Entity2   // One-to-Many
Entity1 >--< Entity2  // Many-to-Many
Entity1 --- Entity2   // One-to-One`}
                </pre>
              </div>

              {/* DFD Syntax */}
              <div>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: c.primary, marginBottom: '8px' }}>DFD (Data Flow Diagram)</h3>
                <pre style={{ background: c.editorBg, padding: '12px', borderRadius: '2px', fontSize: '12px', fontFamily: 'var(--font-editor)', color: c.editorText, overflow: 'auto' }}>
{`external "External Entity"
process "Process Name" as P1
datastore "Data Store"

ExternalEntity -> Process : "Data Flow"
Process -> DataStore : "Store Data"
DataStore -> Process : "Retrieve Data"`}
                </pre>
              </div>

              {/* IDEF0 Syntax */}
              <div>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: c.primary, marginBottom: '8px' }}>IDEF0</h3>
                <pre style={{ background: c.editorBg, padding: '12px', borderRadius: '2px', fontSize: '12px', fontFamily: 'var(--font-editor)', color: c.editorText, overflow: 'auto' }}>
{`activity "Activity Name" as A0

Input -> A0 : input
A0 -> Output : output
Control -> A0 : control
Mechanism -> A0 : mechanism`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toasts */}
      <div style={{ position: 'fixed', top: '60px', right: '20px', zIndex: 4000, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {toasts.map(toast => (
          <div
            key={toast.id}
            style={{
              minWidth: '320px',
              background: c.elevated,
              border: `1px solid ${c.border}`,
              borderLeft: `4px solid ${toast.type === 'success' ? c.success : toast.type === 'error' ? c.error : toast.type === 'warning' ? c.warning : c.info}`,
              borderRadius: '2px',
              padding: '14px 16px',
              boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              animation: 'slideInRight 0.3s ease-out',
              cursor: 'pointer'
            }}
            onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
          >
            {toast.type === 'success' && <CheckCircle2 size={18} color={c.success} />}
            {toast.type === 'error' && <XCircle size={18} color={c.error} />}
            {toast.type === 'warning' && <AlertTriangle size={18} color={c.warning} />}
            {toast.type === 'info' && <AlertCircle size={18} color={c.info} />}
            <span style={{ fontSize: '13px', color: c.textPrimary, flex: 1 }}>{toast.message}</span>
            <X size={14} />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
      `}</style>
    </div>
  );
}
