import { useState, useEffect } from 'react';
import {
  Files, Search, History, GitBranch, Settings,
  Play, Save, Download, Sparkles, ChevronDown, ChevronRight,
  X, HelpCircle, Sun, Moon, FileImage, FileType,
  Terminal as TerminalIcon, AlertCircle, CheckCircle2,
  ZoomIn, ZoomOut, Maximize2, Grid3x3
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const NOTATIONS = ['BPMN 2.0', 'UML Activity', 'Petri Net', 'ERD', 'IDEF0'];

const SAMPLE_UDL_CODE = `// UDL Diagram - Order Processing System
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

const FILES = [
  { name: 'system.udl', type: 'file', indent: 0 },
  { name: 'models', type: 'folder', indent: 0, expanded: true },
  { name: 'order.udl', type: 'file', indent: 1 },
  { name: 'customer.udl', type: 'file', indent: 1 },
  { name: 'payment.udl', type: 'file', indent: 1 },
  { name: 'diagrams', type: 'folder', indent: 0, expanded: false },
];

export function UDLEditorPro() {
  const { theme, toggleTheme } = useTheme();
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [activeView, setActiveView] = useState<'files' | 'search' | 'history' | 'git' | 'settings'>('files');
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [currentNotation, setCurrentNotation] = useState(NOTATIONS[0]);
  const [notationOpen, setNotationOpen] = useState(false);
  const [code, setCode] = useState(SAMPLE_UDL_CODE);
  const [syntaxOk, setSyntaxOk] = useState(true);
  const [zoom, setZoom] = useState(100);
  const [showGrid, setShowGrid] = useState(true);
  const [helpOpen, setHelpOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [aiOpen, setAiOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState('svg');
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalTab, setTerminalTab] = useState<'terminal' | 'problems'>('terminal');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const bgBase = theme === 'dark' ? '#1E1E1E' : '#FFFFFF';
  const bgSidebar = theme === 'dark' ? '#252526' : '#F3F3F3';
  const bgHeader = theme === 'dark' ? '#323233' : '#F3F3F3';
  const bgActivityBar = theme === 'dark' ? '#333333' : '#2C2C2C';
  const bgElevated = theme === 'dark' ? '#2D2D30' : '#FFFFFF';
  const bgInput = theme === 'dark' ? '#3C3C3C' : '#FFFFFF';
  const bgHover = theme === 'dark' ? '#2A2D2E' : '#E8E8E8';
  const bgActive = theme === 'dark' ? '#094771' : '#E0E0E0';
  const bgSelection = theme === 'dark' ? '#264F78' : '#ADD6FF';
  const textPrimary = theme === 'dark' ? '#CCCCCC' : '#333333';
  const textSecondary = theme === 'dark' ? '#858585' : '#666666';
  const textInverse = theme === 'dark' ? '#FFFFFF' : '#FFFFFF';
  const borderDefault = theme === 'dark' ? '#3C3C3C' : '#E0E0E0';
  const borderSubtle = theme === 'dark' ? '#2B2B2B' : '#CCCCCC';

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 10, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 10, 50));
  const handleZoomFit = () => setZoom(100);

  const handleExport = () => {
    console.log(`Exporting as ${exportFormat}`);
    setExportOpen(false);
  };

  return (
    <div data-theme={theme} style={{ maxWidth: '1920px', margin: '0 auto', height: '100vh', display: 'flex', flexDirection: 'column', background: bgBase, color: textPrimary, fontFamily: 'var(--font-ui)' }}>
      {/* Header Toolbar */}
      <header role="banner" style={{ height: '35px', background: bgHeader, borderBottom: `1px solid ${borderDefault}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px', gap: '12px' }}>
        {/* Breadcrumbs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: textSecondary, flex: 1, minWidth: 0 }}>
          <span style={{ whiteSpace: 'nowrap' }}>workspace</span>
          <ChevronRight size={12} />
          <span style={{ whiteSpace: 'nowrap' }}>models</span>
          <ChevronRight size={12} />
          <span style={{ color: textPrimary, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>system.udl</span>
        </div>

        {/* Center Toolbar */}
        {!isMobile && (
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <button
              onClick={() => console.log('Save')}
              aria-label="Save"
              style={{ height: '28px', padding: '0 12px', background: bgElevated, border: `1px solid ${borderDefault}`, borderRadius: '2px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '12px', color: textPrimary, fontWeight: 500 }}
            >
              <Save size={14} strokeWidth={1.5} />
              Save
            </button>

            <button
              onClick={() => console.log('Run')}
              aria-label="Run diagram"
              style={{ height: '28px', padding: '0 12px', background: '#28A745', border: 'none', borderRadius: '2px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '12px', color: '#FFFFFF', fontWeight: 500 }}
            >
              <Play size={14} strokeWidth={1.5} />
              Run
            </button>

            <button
              onClick={() => setAiOpen(true)}
              aria-label="AI Fix"
              style={{ height: '28px', padding: '0 12px', background: '#9D5BD2', border: 'none', borderRadius: '2px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '12px', color: '#FFFFFF', fontWeight: 500 }}
            >
              <Sparkles size={14} strokeWidth={1.5} />
              AI Fix
            </button>

            {/* Notation Dropdown */}
            <div style={{ position: 'relative', marginLeft: '8px' }}>
              <button
                onClick={() => setNotationOpen(!notationOpen)}
                aria-haspopup="listbox"
                aria-expanded={notationOpen}
                style={{ height: '28px', padding: '0 10px', background: bgElevated, border: `1px solid ${borderDefault}`, borderRadius: '2px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '11px', color: textSecondary }}
              >
                {currentNotation}
                <ChevronDown size={12} />
              </button>

              {notationOpen && (
                <div role="listbox" style={{ position: 'absolute', top: '32px', right: 0, minWidth: '140px', background: bgElevated, border: `1px solid ${borderDefault}`, borderRadius: '2px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: 1000 }}>
                  {NOTATIONS.map(notation => (
                    <div
                      key={notation}
                      role="option"
                      aria-selected={currentNotation === notation}
                      onClick={() => { setCurrentNotation(notation); setNotationOpen(false); }}
                      style={{ padding: '6px 12px', fontSize: '12px', cursor: 'pointer', background: currentNotation === notation ? bgSelection : 'transparent', color: textPrimary }}
                      onMouseEnter={(e) => { if (currentNotation !== notation) e.currentTarget.style.background = bgHover; }}
                      onMouseLeave={(e) => { if (currentNotation !== notation) e.currentTarget.style.background = 'transparent'; }}
                    >
                      {notation}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Export Dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setExportOpen(!exportOpen)}
                aria-label="Export"
                style={{ height: '28px', padding: '0 12px', background: bgElevated, border: `1px solid ${borderDefault}`, borderRadius: '2px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '12px', color: textPrimary }}
              >
                <Download size={14} strokeWidth={1.5} />
                Export
              </button>

              {exportOpen && (
                <div role="menu" style={{ position: 'absolute', top: '32px', right: 0, width: '240px', background: bgElevated, border: `1px solid ${borderDefault}`, borderRadius: '2px', padding: '8px', zIndex: 1000 }}>
                  {[
                    { value: 'svg', label: 'SVG', icon: FileImage },
                    { value: 'png', label: 'PNG', icon: FileImage },
                    { value: 'pdf', label: 'PDF', icon: FileType }
                  ].map(format => (
                    <label
                      key={format.value}
                      style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px', borderRadius: '2px', cursor: 'pointer', background: exportFormat === format.value ? bgSelection : 'transparent' }}
                      onMouseEnter={(e) => { if (exportFormat !== format.value) e.currentTarget.style.background = bgHover; }}
                      onMouseLeave={(e) => { if (exportFormat !== format.value) e.currentTarget.style.background = 'transparent'; }}
                    >
                      <input type="radio" name="format" value={format.value} checked={exportFormat === format.value} onChange={(e) => setExportFormat(e.target.value)} style={{ margin: 0 }} />
                      <format.icon size={14} strokeWidth={1.5} />
                      <span style={{ fontSize: '12px', color: textPrimary }}>{format.label}</span>
                    </label>
                  ))}
                  <button onClick={handleExport} style={{ width: '100%', marginTop: '8px', height: '28px', background: '#007ACC', border: 'none', borderRadius: '2px', cursor: 'pointer', fontSize: '12px', color: '#FFFFFF', fontWeight: 500 }}>
                    Export
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Right Actions */}
        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          {!isMobile && (
            <>
              <button onClick={() => setHelpOpen(true)} aria-label="Help" style={{ width: '28px', height: '28px', background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: textSecondary, borderRadius: '2px' }}>
                <HelpCircle size={16} strokeWidth={1.5} />
              </button>
              <button onClick={() => setSettingsOpen(true)} aria-label="Settings" style={{ width: '28px', height: '28px', background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: textSecondary, borderRadius: '2px' }}>
                <Settings size={16} strokeWidth={1.5} />
              </button>
            </>
          )}
          <button onClick={toggleTheme} aria-label="Toggle theme" style={{ width: '28px', height: '28px', background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: textSecondary, borderRadius: '2px' }}>
            {theme === 'dark' ? <Sun size={16} strokeWidth={1.5} /> : <Moon size={16} strokeWidth={1.5} />}
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main role="main" style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Activity Bar */}
        {!isMobile && (
          <div style={{ width: '48px', background: bgActivityBar, borderRight: `1px solid ${borderDefault}`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              {[
                { id: 'files' as const, icon: Files, label: 'Explorer' },
                { id: 'search' as const, icon: Search, label: 'Search' },
                { id: 'history' as const, icon: History, label: 'History' },
                { id: 'git' as const, icon: GitBranch, label: 'Source Control' },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    if (activeView === item.id) {
                      setSidebarVisible(!sidebarVisible);
                    } else {
                      setActiveView(item.id);
                      setSidebarVisible(true);
                    }
                  }}
                  title={item.label}
                  aria-label={item.label}
                  style={{ width: '48px', height: '48px', background: 'transparent', border: 'none', borderLeft: activeView === item.id ? '2px solid #007ACC' : '2px solid transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: activeView === item.id ? textInverse : textSecondary }}
                >
                  <item.icon size={24} strokeWidth={1.5} />
                </button>
              ))}
            </div>

            <button
              onClick={() => setSettingsOpen(true)}
              aria-label="Settings"
              style={{ width: '48px', height: '48px', background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: textSecondary }}
            >
              <Settings size={24} strokeWidth={1.5} />
            </button>
          </div>
        )}

        {/* Sidebar (Explorer, etc.) */}
        {!isMobile && sidebarVisible && (
          <aside aria-label={activeView === 'files' ? 'Explorer' : 'Sidebar'} style={{ width: '260px', background: bgSidebar, borderRight: `1px solid ${borderDefault}`, display: 'flex', flexDirection: 'column' }}>
            {/* Sidebar Header */}
            <div style={{ height: '35px', padding: '0 12px', display: 'flex', alignItems: 'center', fontSize: '11px', fontWeight: 600, color: textSecondary, textTransform: 'uppercase', borderBottom: `1px solid ${borderSubtle}` }}>
              {activeView === 'files' && 'EXPLORER'}
              {activeView === 'search' && 'SEARCH'}
              {activeView === 'history' && 'HISTORY'}
              {activeView === 'git' && 'SOURCE CONTROL'}
            </div>

            {/* File Tree */}
            {activeView === 'files' && (
              <div style={{ flex: 1, padding: '8px 4px', overflow: 'auto' }}>
                {FILES.map((file, idx) => (
                  <div
                    key={idx}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '4px 8px', paddingLeft: `${8 + file.indent * 16}px`, fontSize: '13px', color: file.name === 'system.udl' ? textPrimary : textSecondary, background: file.name === 'system.udl' ? bgSelection : 'transparent', borderRadius: '2px', cursor: 'pointer', fontFamily: 'var(--font-editor)' }}
                    onMouseEnter={(e) => { if (file.name !== 'system.udl') e.currentTarget.style.background = bgHover; }}
                    onMouseLeave={(e) => { if (file.name !== 'system.udl') e.currentTarget.style.background = 'transparent'; }}
                  >
                    {file.type === 'folder' && (
                      <ChevronRight size={14} strokeWidth={1.5} style={{ transform: file.expanded ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
                    )}
                    {file.type === 'file' && <span style={{ width: '14px' }} />}
                    <span>{file.name}</span>
                  </div>
                ))}
              </div>
            )}
          </aside>
        )}

        {/* Main Workspace - Split View */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
            {/* Code Editor */}
            <section aria-label="Code editor" style={{ width: isMobile ? '100%' : isTablet ? '50%' : '40%', background: '#1E1E1E', borderRight: `1px solid ${borderDefault}`, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
              {/* Tab Bar */}
              <div style={{ height: '35px', background: '#1E1E1E', borderBottom: `1px solid ${borderDefault}`, display: 'flex', alignItems: 'flex-end' }}>
                <div style={{ padding: '0 16px', height: '35px', display: 'flex', alignItems: 'center', fontSize: '13px', color: '#CCCCCC', background: '#1E1E1E', borderTop: '2px solid #007ACC', borderRight: `1px solid ${borderDefault}`, fontFamily: 'var(--font-editor)' }}>
                  system.udl
                </div>
              </div>

              {/* Code Area */}
              <div style={{ flex: 1, padding: '16px', overflow: 'auto' }}>
                <pre style={{ margin: 0, fontFamily: 'var(--font-editor)', fontSize: '14px', lineHeight: '1.6', color: '#D4D4D4' }}>
                  {code.split('\n').map((line, i) => (
                    <div key={i} style={{ display: 'flex', gap: '24px' }}>
                      <span style={{ color: '#858585', minWidth: '32px', textAlign: 'right', userSelect: 'none' }}>{i + 1}</span>
                      <span>{line || ' '}</span>
                    </div>
                  ))}
                </pre>
              </div>
            </section>

            {/* Diagram Canvas */}
            {!isMobile && (
              <section aria-label="Diagram canvas" style={{ flex: 1, background: theme === 'dark' ? '#1E1E1E' : '#FFFFFF', position: 'relative', overflow: 'hidden' }}>
                {/* Grid Background */}
                {showGrid && (
                  <div style={{ position: 'absolute', inset: 0, backgroundImage: `linear-gradient(${borderDefault} 1px, transparent 1px), linear-gradient(90deg, ${borderDefault} 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />
                )}

                {/* Canvas Content */}
                <div style={{ position: 'absolute', inset: 0, padding: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <figure style={{ margin: 0 }}>
                    <div role="img" aria-label="UML class diagram">
                      <svg width="500" height="400" viewBox="0 0 500 400">
                        <defs>
                          <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                            <polygon points="0 0, 10 3, 0 6" fill="#666" />
                          </marker>
                        </defs>

                        {/* Order Class */}
                        <g>
                          <rect x="50" y="50" width="140" height="120" rx="2" fill={bgElevated} stroke="#007ACC" strokeWidth="2" />
                          <rect x="50" y="50" width="140" height="30" rx="2" fill="#007ACC" />
                          <text x="120" y="70" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="600">Order</text>
                          <text x="60" y="95" fill={textPrimary} fontSize="11" fontFamily="Fira Code">+id: string</text>
                          <text x="60" y="110" fill={textPrimary} fontSize="11" fontFamily="Fira Code">+amount: number</text>
                          <text x="60" y="125" fill={textPrimary} fontSize="11" fontFamily="Fira Code">+process()</text>
                          <text x="60" y="140" fill={textPrimary} fontSize="11" fontFamily="Fira Code">+validate()</text>
                        </g>

                        {/* Customer Class */}
                        <g>
                          <rect x="280" y="30" width="140" height="100" rx="2" fill={bgElevated} stroke="#4EC9B0" strokeWidth="2" />
                          <rect x="280" y="30" width="140" height="30" rx="2" fill="#4EC9B0" />
                          <text x="350" y="50" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="600">Customer</text>
                          <text x="290" y="75" fill={textPrimary} fontSize="11" fontFamily="Fira Code">+id: string</text>
                          <text x="290" y="90" fill={textPrimary} fontSize="11" fontFamily="Fira Code">+name: string</text>
                          <text x="290" y="105" fill={textPrimary} fontSize="11" fontFamily="Fira Code">+createOrder()</text>
                        </g>

                        {/* Payment Class */}
                        <g>
                          <rect x="280" y="180" width="140" height="100" rx="2" fill={bgElevated} stroke="#CCA700" strokeWidth="2" />
                          <rect x="280" y="180" width="140" height="30" rx="2" fill="#CCA700" />
                          <text x="350" y="200" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="600">Payment</text>
                          <text x="290" y="225" fill={textPrimary} fontSize="11" fontFamily="Fira Code">+id: string</text>
                          <text x="290" y="240" fill={textPrimary} fontSize="11" fontFamily="Fira Code">+amount: number</text>
                          <text x="290" y="255" fill={textPrimary} fontSize="11" fontFamily="Fira Code">+process()</text>
                        </g>

                        {/* Connections */}
                        <line x1="190" y1="80" x2="280" y2="80" stroke="#666" strokeWidth="2" markerEnd="url(#arrow)" />
                        <line x1="190" y1="130" x2="280" y2="210" stroke="#666" strokeWidth="2" markerEnd="url(#arrow)" />
                      </svg>
                    </div>
                    <figcaption style={{ marginTop: '16px', fontSize: '12px', color: textSecondary, textAlign: 'center' }}>
                      Рис 1. UML class diagram - Order Processing System
                    </figcaption>
                  </figure>
                </div>

                {/* Canvas Controls */}
                <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '4px', background: bgElevated, border: `1px solid ${borderDefault}`, borderRadius: '2px', padding: '4px' }}>
                  <button onClick={() => setShowGrid(!showGrid)} title="Toggle Grid" style={{ width: '28px', height: '28px', background: showGrid ? bgActive : 'transparent', border: showGrid ? `1px solid #007ACC` : 'none', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: showGrid ? '#007ACC' : textSecondary }}>
                    <Grid3x3 size={14} strokeWidth={1.5} />
                  </button>
                </div>

                {/* Zoom Controls */}
                <div style={{ position: 'absolute', bottom: '12px', right: '12px', display: 'flex', flexDirection: 'column', gap: '4px', background: bgElevated, border: `1px solid ${borderDefault}`, borderRadius: '2px', padding: '4px' }}>
                  <button onClick={handleZoomIn} title="Zoom In" style={{ width: '28px', height: '28px', background: 'transparent', border: 'none', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: textSecondary }}>
                    <ZoomIn size={14} strokeWidth={1.5} />
                  </button>
                  <div style={{ fontSize: '11px', color: textSecondary, textAlign: 'center', padding: '2px 0' }}>{zoom}%</div>
                  <button onClick={handleZoomOut} title="Zoom Out" style={{ width: '28px', height: '28px', background: 'transparent', border: 'none', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: textSecondary }}>
                    <ZoomOut size={14} strokeWidth={1.5} />
                  </button>
                  <div style={{ width: '28px', height: '1px', background: borderDefault, margin: '2px 0' }} />
                  <button onClick={handleZoomFit} title="Fit to Screen" style={{ width: '28px', height: '28px', background: 'transparent', border: 'none', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: textSecondary }}>
                    <Maximize2 size={14} strokeWidth={1.5} />
                  </button>
                </div>
              </section>
            )}
          </div>

          {/* Terminal Panel */}
          {terminalOpen && !isMobile && (
            <div style={{ height: '200px', background: '#1E1E1E', borderTop: `1px solid ${borderDefault}`, display: 'flex', flexDirection: 'column' }}>
              {/* Terminal Tabs */}
              <div style={{ height: '35px', background: '#1E1E1E', borderBottom: `1px solid ${borderDefault}`, display: 'flex', alignItems: 'flex-end', gap: '2px' }}>
                <button
                  onClick={() => setTerminalTab('terminal')}
                  style={{ padding: '0 16px', height: '35px', background: terminalTab === 'terminal' ? '#1E1E1E' : 'transparent', borderTop: terminalTab === 'terminal' ? '2px solid #007ACC' : 'none', borderRight: `1px solid ${borderDefault}`, border: 'none', cursor: 'pointer', fontSize: '13px', color: terminalTab === 'terminal' ? '#CCCCCC' : '#858585', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <TerminalIcon size={14} strokeWidth={1.5} />
                  Terminal
                </button>
                <button
                  onClick={() => setTerminalTab('problems')}
                  style={{ padding: '0 16px', height: '35px', background: terminalTab === 'problems' ? '#1E1E1E' : 'transparent', borderTop: terminalTab === 'problems' ? '2px solid #007ACC' : 'none', borderRight: `1px solid ${borderDefault}`, border: 'none', cursor: 'pointer', fontSize: '13px', color: terminalTab === 'problems' ? '#CCCCCC' : '#858585', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <AlertCircle size={14} strokeWidth={1.5} />
                  Problems (0)
                </button>
                <div style={{ flex: 1 }} />
                <button onClick={() => setTerminalOpen(false)} style={{ width: '35px', height: '35px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#858585', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <X size={16} strokeWidth={1.5} />
                </button>
              </div>

              {/* Terminal Content */}
              <div style={{ flex: 1, padding: '8px', fontFamily: 'var(--font-editor)', fontSize: '13px', color: '#CCCCCC', overflow: 'auto' }}>
                {terminalTab === 'terminal' ? (
                  <div>$ npm run build<br />Building UDL project...</div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px' }}>
                    <CheckCircle2 size={16} color="#4EC9B0" />
                    <span style={{ color: '#858585' }}>No problems detected</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Status Bar */}
      <footer role="contentinfo" style={{ height: '22px', background: '#007ACC', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px', fontSize: '11px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <GitBranch size={12} strokeWidth={1.5} />
            <span>main</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {syntaxOk ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
            <span>{syntaxOk ? 'No issues' : 'Errors: 2'}</span>
          </div>
          <button onClick={() => setTerminalOpen(!terminalOpen)} style={{ background: 'transparent', border: 'none', color: '#FFFFFF', cursor: 'pointer', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <TerminalIcon size={12} strokeWidth={1.5} />
            Terminal
          </button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span>Spaces: 4</span>
          <span>UTF-8</span>
          <span>UDL</span>
          <span>&copy; 2026 LogicStream</span>
        </div>
      </footer>

      {/* Help Drawer */}
      {helpOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 3000 }} onClick={() => setHelpOpen(false)}>
          <aside role="complementary" aria-label="Help documentation" onClick={(e) => e.stopPropagation()} style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: isMobile ? '100%' : '400px', background: bgBase, borderLeft: `1px solid ${borderDefault}`, overflow: 'auto' }}>
            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: textPrimary }}>Documentation</h2>
                <button onClick={() => setHelpOpen(false)} aria-label="Close" style={{ width: '32px', height: '32px', background: 'transparent', border: 'none', cursor: 'pointer', color: textPrimary }}>
                  <X size={20} />
                </button>
              </div>

              <article>
                <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '12px', color: textPrimary }}>UDL Syntax Guide</h3>
                <p style={{ fontSize: '13px', lineHeight: '1.6', color: textSecondary, marginBottom: '16px' }}>
                  Unified Diagram Language (UDL) is a domain-specific language for modeling systems.
                </p>

                <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: textPrimary }}>Class Definition</h4>
                <pre style={{ fontFamily: 'var(--font-editor)', fontSize: '12px', background: bgInput, padding: '12px', borderRadius: '2px', overflow: 'auto', color: theme === 'dark' ? '#D4D4D4' : '#333333', marginBottom: '16px' }}>
{`class ClassName {
  +attribute: type
  +method()
}`}
                </pre>

                <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: textPrimary }}>Relationships</h4>
                <p style={{ fontSize: '13px', lineHeight: '1.6', color: textSecondary }}>
                  Use <span style={{ fontFamily: 'var(--font-editor)', background: bgInput, padding: '2px 6px', borderRadius: '2px' }}>--&gt;</span> for associations.
                </p>
              </article>
            </div>
          </aside>
        </div>
      )}

      {/* Settings Modal */}
      {settingsOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }} onClick={() => setSettingsOpen(false)}>
          <div role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: '500px', background: bgBase, borderRadius: '2px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: textPrimary }}>Settings</h2>
              <button onClick={() => setSettingsOpen(false)} aria-label="Close" style={{ width: '32px', height: '32px', background: 'transparent', border: 'none', cursor: 'pointer', color: textPrimary }}>
                <X size={20} />
              </button>
            </div>

            <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label htmlFor="notation-select" style={{ display: 'block', marginBottom: '6px', fontSize: '12px', fontWeight: 500, color: textPrimary }}>Notation</label>
                <select id="notation-select" value={currentNotation} onChange={(e) => setCurrentNotation(e.target.value)} style={{ width: '100%', height: '32px', padding: '0 12px', background: bgInput, border: `1px solid ${borderDefault}`, borderRadius: '2px', fontSize: '13px', color: textPrimary }}>
                  {NOTATIONS.map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>

              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={showGrid} onChange={(e) => setShowGrid(e.target.checked)} style={{ width: '16px', height: '16px' }} />
                  <span style={{ fontSize: '13px', color: textPrimary }}>Show grid on canvas</span>
                </label>
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '8px' }}>
                <button type="button" onClick={() => setSettingsOpen(false)} style={{ height: '32px', padding: '0 20px', background: 'transparent', border: `1px solid ${borderDefault}`, borderRadius: '2px', cursor: 'pointer', fontSize: '13px', color: textPrimary }}>
                  Cancel
                </button>
                <button type="submit" onClick={(e) => { e.preventDefault(); setSettingsOpen(false); }} style={{ height: '32px', padding: '0 20px', background: '#007ACC', border: 'none', borderRadius: '2px', cursor: 'pointer', fontSize: '13px', color: '#FFFFFF' }}>
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* AI Assistant */}
      {aiOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 3000, display: 'flex', alignItems: 'flex-end' }} onClick={() => setAiOpen(false)}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxHeight: '60%', background: bgBase, borderTopLeftRadius: '8px', borderTopRightRadius: '8px', padding: '24px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: textPrimary }}>AI Assistant</h2>
              <button onClick={() => setAiOpen(false)} aria-label="Close" style={{ width: '32px', height: '32px', background: 'transparent', border: 'none', cursor: 'pointer', color: textPrimary }}>
                <X size={20} />
              </button>
            </div>

            <textarea placeholder="Describe the issue or ask for help..." style={{ flex: 1, minHeight: '100px', padding: '12px', background: bgInput, border: `1px solid ${borderDefault}`, borderRadius: '2px', fontFamily: 'var(--font-ui)', fontSize: '13px', color: textPrimary, resize: 'vertical' }} />

            <button style={{ marginTop: '16px', height: '36px', background: '#9D5BD2', border: 'none', borderRadius: '2px', cursor: 'pointer', fontSize: '14px', color: '#FFFFFF', fontWeight: 500 }}>
              Ask AI
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
