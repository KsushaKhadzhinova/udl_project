import { useState, useEffect } from 'react';
import { Play, Save, Download, Sparkles, ChevronDown, X, HelpCircle, Settings as SettingsIcon, Menu, Sun, Moon, FileImage, FileType, FileText } from 'lucide-react';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';
import { useTheme } from '../context/ThemeContext';

const NOTATIONS = ['BPMN 2.0', 'UML Activity', 'Petri Net', 'ERD'];
const EXPORT_FORMATS = [
  { value: 'svg', label: 'SVG', description: 'Vector graphics', icon: FileImage },
  { value: 'png', label: 'PNG', description: 'Raster image', icon: FileImage },
  { value: 'pdf', label: 'PDF', description: 'Document', icon: FileType }
];

const SAMPLE_CODE = `// BPMN 2.0 Process Diagram
start -> process_order
process_order -> check_inventory
check_inventory -> [in_stock?]
[in_stock?] -> ship_order : yes
[in_stock?] -> backorder : no
ship_order -> end
backorder -> notify_customer -> end`;

export function DiagramEditor() {
  const { theme, toggleTheme } = useTheme();
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentNotation, setCurrentNotation] = useState(NOTATIONS[0]);
  const [notationOpen, setNotationOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [exportFormat, setExportFormat] = useState('svg');
  const [aiDrawerOpen, setAiDrawerOpen] = useState(false);
  const [helpDrawerOpen, setHelpDrawerOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [syntaxOk, setSyntaxOk] = useState(true);
  const [code, setCode] = useState(SAMPLE_CODE);
  const [projectName, setProjectName] = useState('');
  const [engine, setEngine] = useState('PlantUML');
  const [includeComments, setIncludeComments] = useState(true);
  const [aiDescription, setAiDescription] = useState('');

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

  const bgColor = theme === 'dark' ? 'var(--bg-base)' : '#FFFFFF';
  const textColor = theme === 'dark' ? 'var(--text-primary)' : '#333333';
  const borderColor = theme === 'dark' ? 'var(--border-default)' : '#E0E0E0';
  const headerBg = theme === 'dark' ? 'var(--bg-header)' : '#F3F3F3';
  const editorBg = theme === 'dark' ? '#1E1E1E' : '#1E1E1E';
  const canvasBg = theme === 'dark' ? 'var(--bg-canvas)' : '#F8F9FA';

  const handleExport = () => {
    console.log(`Exporting as ${exportFormat}`);
    setExportOpen(false);
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Generating diagram:', { projectName, engine, includeComments, aiDescription });
    setSettingsOpen(false);
  };

  return (
    <div style={{ maxWidth: '1920px', margin: '0 auto', height: '100vh', display: 'flex', flexDirection: 'column', background: bgColor, color: textColor }}>
      {/* Header Toolbar */}
      <header role="banner" style={{ height: '48px', background: headerBg, borderBottom: `1px solid ${borderColor}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', gap: '16px' }}>
        {/* Logo */}
        <div style={{ fontWeight: 600, fontSize: '14px', fontFamily: 'var(--font-ui)', color: 'var(--color-primary)', whiteSpace: 'nowrap' }}>
          LogicStream
        </div>

        {isMobile ? (
          <>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              aria-haspopup="menu"
              aria-expanded={mobileMenuOpen}
              style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', cursor: 'pointer', color: textColor }}
            >
              <Menu size={20} />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
              style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', cursor: 'pointer', color: textColor }}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </>
        ) : (
          <>
            {/* Notation Dropdown */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setNotationOpen(!notationOpen)}
                aria-haspopup="listbox"
                aria-expanded={notationOpen}
                style={{ height: '32px', padding: '0 12px', background: theme === 'dark' ? 'var(--bg-elevated)' : '#FFFFFF', border: `1px solid ${borderColor}`, borderRadius: '2px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '12px', color: textColor, fontFamily: 'var(--font-ui)' }}
              >
                {currentNotation}
                <ChevronDown size={14} />
              </button>

              {notationOpen && (
                <div role="listbox" style={{ position: 'absolute', top: '36px', left: 0, minWidth: '160px', background: theme === 'dark' ? 'var(--bg-elevated)' : '#FFFFFF', border: `1px solid ${borderColor}`, borderRadius: '4px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', zIndex: 1000 }}>
                  {NOTATIONS.map(notation => (
                    <div
                      key={notation}
                      role="option"
                      aria-selected={currentNotation === notation}
                      onClick={() => { setCurrentNotation(notation); setNotationOpen(false); }}
                      style={{ padding: '8px 12px', fontSize: '12px', cursor: 'pointer', background: currentNotation === notation ? 'var(--bg-selection)' : 'transparent', color: textColor }}
                      onMouseEnter={(e) => { if (currentNotation !== notation) e.currentTarget.style.background = theme === 'dark' ? 'var(--bg-hover)' : '#F5F5F5'; }}
                      onMouseLeave={(e) => { if (currentNotation !== notation) e.currentTarget.style.background = 'transparent'; }}
                    >
                      {notation}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div style={{ flex: 1, display: 'flex', gap: '8px', alignItems: 'center' }}>
              <button
                onClick={() => console.log('Run')}
                aria-label="Run diagram"
                style={{ height: '32px', padding: '0 16px', background: 'var(--color-primary)', border: 'none', borderRadius: '2px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '12px', color: '#FFFFFF', fontWeight: 500 }}
              >
                <Play size={14} strokeWidth={2} />
                Run
              </button>

              <button
                onClick={() => console.log('Save')}
                aria-label="Save diagram"
                style={{ height: '32px', padding: '0 16px', background: theme === 'dark' ? 'var(--bg-elevated)' : '#FFFFFF', border: `1px solid ${borderColor}`, borderRadius: '2px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '12px', color: textColor, fontWeight: 500 }}
              >
                <Save size={14} strokeWidth={2} />
                Save
              </button>

              {/* Export Dropdown */}
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setExportOpen(!exportOpen)}
                  aria-label="Export diagram"
                  aria-haspopup="menu"
                  aria-expanded={exportOpen}
                  style={{ height: '32px', padding: '0 16px', background: theme === 'dark' ? 'var(--bg-elevated)' : '#FFFFFF', border: `1px solid ${borderColor}`, borderRadius: '2px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '12px', color: textColor, fontWeight: 500 }}
                >
                  <Download size={14} strokeWidth={2} />
                  Export
                </button>

                {exportOpen && (
                  <div role="menu" style={{ position: 'absolute', top: '36px', right: 0, width: '280px', background: theme === 'dark' ? 'var(--bg-elevated)' : '#FFFFFF', border: `1px solid ${borderColor}`, borderRadius: '4px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', padding: '12px', zIndex: 1000 }}>
                    <div style={{ marginBottom: '12px', fontSize: '11px', fontWeight: 600, color: theme === 'dark' ? 'var(--text-secondary)' : '#666666', textTransform: 'uppercase' }}>
                      Export Format
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
                      {EXPORT_FORMATS.map(format => (
                        <label
                          key={format.value}
                          style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px', borderRadius: '2px', cursor: 'pointer', background: exportFormat === format.value ? 'var(--bg-selection)' : 'transparent' }}
                          onMouseEnter={(e) => { if (exportFormat !== format.value) e.currentTarget.style.background = theme === 'dark' ? 'var(--bg-hover)' : '#F5F5F5'; }}
                          onMouseLeave={(e) => { if (exportFormat !== format.value) e.currentTarget.style.background = 'transparent'; }}
                        >
                          <input
                            type="radio"
                            name="export-format"
                            value={format.value}
                            checked={exportFormat === format.value}
                            onChange={(e) => setExportFormat(e.target.value)}
                            style={{ margin: 0 }}
                          />
                          <format.icon size={16} strokeWidth={1.5} style={{ color: theme === 'dark' ? 'var(--text-secondary)' : '#666666' }} />
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '12px', fontWeight: 500, color: textColor }}>{format.label}</div>
                            <div style={{ fontSize: '11px', color: theme === 'dark' ? 'var(--text-secondary)' : '#666666' }}>{format.description}</div>
                          </div>
                        </label>
                      ))}
                    </div>

                    <button
                      onClick={handleExport}
                      style={{ width: '100%', height: '32px', background: 'var(--color-primary)', border: 'none', borderRadius: '2px', cursor: 'pointer', fontSize: '12px', color: '#FFFFFF', fontWeight: 500 }}
                    >
                      Export
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={() => setAiDrawerOpen(true)}
                aria-label="AI Prompt"
                style={{ height: '32px', padding: '0 16px', background: theme === 'dark' ? 'var(--bg-elevated)' : '#FFFFFF', border: `1px solid ${borderColor}`, borderRadius: '2px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '12px', color: textColor, fontWeight: 500 }}
              >
                <Sparkles size={14} strokeWidth={2} />
                AI Prompt
              </button>

              <button
                onClick={() => setHelpDrawerOpen(true)}
                aria-label="Help documentation"
                style={{ height: '32px', width: '32px', background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: theme === 'dark' ? 'var(--text-secondary)' : '#666666' }}
              >
                <HelpCircle size={18} strokeWidth={1.5} />
              </button>

              <button
                onClick={() => setSettingsOpen(true)}
                aria-label="Settings"
                style={{ height: '32px', width: '32px', background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: theme === 'dark' ? 'var(--text-secondary)' : '#666666' }}
              >
                <SettingsIcon size={18} strokeWidth={1.5} />
              </button>

              <button
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
                style={{ height: '32px', width: '32px', background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: theme === 'dark' ? 'var(--text-secondary)' : '#666666' }}
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </>
        )}
      </header>

      {/* Mobile Menu Drawer */}
      {isMobile && mobileMenuOpen && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 2000 }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ position: 'fixed', top: 0, left: 0, bottom: 0, width: '280px', background: bgColor, borderRight: `1px solid ${borderColor}`, display: 'flex', flexDirection: 'column', padding: '16px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div style={{ fontWeight: 600, fontSize: '16px', color: 'var(--color-primary)' }}>Menu</div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                style={{ width: '32px', height: '32px', background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: textColor }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ marginBottom: '8px' }}>
                <div style={{ fontSize: '11px', fontWeight: 600, color: theme === 'dark' ? 'var(--text-secondary)' : '#666666', marginBottom: '8px', textTransform: 'uppercase' }}>Notation</div>
                <select
                  value={currentNotation}
                  onChange={(e) => setCurrentNotation(e.target.value)}
                  style={{ width: '100%', height: '36px', padding: '0 12px', background: theme === 'dark' ? 'var(--bg-elevated)' : '#FFFFFF', border: `1px solid ${borderColor}`, borderRadius: '2px', fontSize: '12px', color: textColor }}
                >
                  {NOTATIONS.map(notation => (
                    <option key={notation} value={notation}>{notation}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={() => { setMobileMenuOpen(false); console.log('Run'); }}
                style={{ height: '44px', padding: '0 16px', background: 'var(--color-primary)', border: 'none', borderRadius: '2px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', fontSize: '14px', color: '#FFFFFF', fontWeight: 500 }}
              >
                <Play size={16} strokeWidth={2} />
                Run
              </button>

              <button
                onClick={() => { setMobileMenuOpen(false); console.log('Save'); }}
                style={{ height: '44px', padding: '0 16px', background: 'transparent', border: `1px solid ${borderColor}`, borderRadius: '2px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', fontSize: '14px', color: textColor, fontWeight: 500 }}
              >
                <Save size={16} strokeWidth={2} />
                Save
              </button>

              <button
                onClick={() => { setMobileMenuOpen(false); setTimeout(() => setExportOpen(true), 100); }}
                style={{ height: '44px', padding: '0 16px', background: 'transparent', border: `1px solid ${borderColor}`, borderRadius: '2px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', fontSize: '14px', color: textColor, fontWeight: 500 }}
              >
                <Download size={16} strokeWidth={2} />
                Export
              </button>

              <button
                onClick={() => { setMobileMenuOpen(false); setTimeout(() => setAiDrawerOpen(true), 100); }}
                style={{ height: '44px', padding: '0 16px', background: 'transparent', border: `1px solid ${borderColor}`, borderRadius: '2px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', fontSize: '14px', color: textColor, fontWeight: 500 }}
              >
                <Sparkles size={16} strokeWidth={2} />
                AI Prompt
              </button>

              <button
                onClick={() => { setMobileMenuOpen(false); setTimeout(() => setHelpDrawerOpen(true), 100); }}
                style={{ height: '44px', padding: '0 16px', background: 'transparent', border: `1px solid ${borderColor}`, borderRadius: '2px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', fontSize: '14px', color: textColor, fontWeight: 500 }}
              >
                <HelpCircle size={16} strokeWidth={2} />
                Help
              </button>

              <button
                onClick={() => { setMobileMenuOpen(false); setTimeout(() => setSettingsOpen(true), 100); }}
                style={{ height: '44px', padding: '0 16px', background: 'transparent', border: `1px solid ${borderColor}`, borderRadius: '2px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', fontSize: '14px', color: textColor, fontWeight: 500 }}
              >
                <SettingsIcon size={16} strokeWidth={2} />
                Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main role="main" style={{ flex: 1, overflow: 'hidden' }}>
        {isMobile ? (
          /* Mobile Stacked Layout */
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <section aria-label="Code editor" style={{ height: '40%', background: editorBg, borderBottom: `1px solid ${borderColor}`, overflow: 'auto', padding: '16px' }}>
              <pre style={{ margin: 0, fontFamily: 'var(--font-editor)', fontSize: '13px', lineHeight: '1.6', color: '#D4D4D4' }}>
                {code.split('\n').map((line, i) => (
                  <div key={i} style={{ display: 'flex', gap: '16px' }}>
                    <span style={{ color: '#858585', minWidth: '24px', textAlign: 'right', userSelect: 'none' }}>{i + 1}</span>
                    <span>{line || ' '}</span>
                  </div>
                ))}
              </pre>
            </section>

            <section aria-label="Diagram canvas" style={{ height: '60%', background: canvasBg, overflow: 'auto', padding: '24px' }}>
              <figure style={{ margin: 0 }}>
                <div role="img" aria-label="BPMN flowchart" style={{ width: '100%', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="300" height="250" viewBox="0 0 300 250">
                    <defs>
                      <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                        <polygon points="0 0, 10 3, 0 6" fill="#666" />
                      </marker>
                    </defs>

                    <rect x="20" y="20" width="80" height="40" rx="4" fill="#4EC9B0" />
                    <text x="60" y="45" textAnchor="middle" fill="#FFF" fontSize="12" fontWeight="500">Start</text>

                    <rect x="110" y="60" width="80" height="40" rx="4" fill="#007ACC" />
                    <text x="150" y="85" textAnchor="middle" fill="#FFF" fontSize="12" fontWeight="500">Process</text>

                    <path d="M 150,120 L 190,150 L 150,180 L 110,150 Z" fill="#CCA700" />
                    <text x="150" y="155" textAnchor="middle" fill="#FFF" fontSize="11" fontWeight="500">Decision</text>

                    <rect x="20" y="160" width="70" height="35" rx="4" fill="#9D5BD2" />
                    <text x="55" y="182" textAnchor="middle" fill="#FFF" fontSize="11" fontWeight="500">Debug</text>

                    <rect x="210" y="160" width="70" height="35" rx="4" fill="#2D9574" />
                    <text x="245" y="182" textAnchor="middle" fill="#FFF" fontSize="11" fontWeight="500">Great</text>

                    <ellipse cx="150" cy="225" rx="30" ry="20" fill="#F48771" />
                    <text x="150" y="230" textAnchor="middle" fill="#FFF" fontSize="11" fontWeight="500">End</text>

                    <line x1="100" y1="40" x2="110" y2="80" stroke="#666" strokeWidth="2" markerEnd="url(#arrow)" />
                    <line x1="150" y1="100" x2="150" y2="120" stroke="#666" strokeWidth="2" markerEnd="url(#arrow)" />
                    <line x1="110" y1="150" x2="90" y2="160" stroke="#666" strokeWidth="2" markerEnd="url(#arrow)" />
                    <line x1="190" y1="150" x2="210" y2="160" stroke="#666" strokeWidth="2" markerEnd="url(#arrow)" />
                    <line x1="55" y1="195" x2="120" y2="225" stroke="#666" strokeWidth="2" markerEnd="url(#arrow)" />
                    <line x1="245" y1="195" x2="180" y2="225" stroke="#666" strokeWidth="2" markerEnd="url(#arrow)" />
                  </svg>
                </div>
                <figcaption style={{ marginTop: '16px', fontSize: '12px', color: theme === 'dark' ? 'var(--text-secondary)' : '#666666', textAlign: 'center' }}>
                  Рис 1. BPMN схема процесса
                </figcaption>
              </figure>
            </section>
          </div>
        ) : (
          /* Desktop/Tablet Split Layout */
          <PanelGroup direction="horizontal">
            <Panel defaultSize={isTablet ? 50 : 40} minSize={30}>
              <section aria-label="Code editor" style={{ height: '100%', background: editorBg, overflow: 'auto', padding: '16px' }}>
                <pre style={{ margin: 0, fontFamily: 'var(--font-editor)', fontSize: '14px', lineHeight: '1.6', color: '#D4D4D4' }}>
                  {code.split('\n').map((line, i) => (
                    <div key={i} style={{ display: 'flex', gap: '16px' }}>
                      <span style={{ color: '#858585', minWidth: '28px', textAlign: 'right', userSelect: 'none' }}>{i + 1}</span>
                      <span>{line || ' '}</span>
                    </div>
                  ))}
                </pre>
              </section>
            </Panel>

            <PanelResizeHandle style={{ width: '4px', background: borderColor, cursor: 'col-resize' }} />

            <Panel defaultSize={isTablet ? 50 : 60} minSize={30}>
              <section aria-label="Diagram canvas" style={{ height: '100%', background: canvasBg, overflow: 'auto', padding: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <figure style={{ margin: 0, maxWidth: '600px' }}>
                  <div role="img" aria-label="BPMN flowchart" style={{ width: '100%' }}>
                    <svg width="500" height="350" viewBox="0 0 500 350">
                      <defs>
                        <marker id="arrow-desktop" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                          <polygon points="0 0, 10 3, 0 6" fill="#666" />
                        </marker>
                      </defs>

                      <rect x="40" y="40" width="100" height="50" rx="4" fill="#4EC9B0" />
                      <text x="90" y="70" textAnchor="middle" fill="#FFF" fontSize="14" fontWeight="500">Start</text>

                      <rect x="180" y="100" width="120" height="50" rx="4" fill="#007ACC" />
                      <text x="240" y="130" textAnchor="middle" fill="#FFF" fontSize="14" fontWeight="500">Process Order</text>

                      <path d="M 240,180 L 300,230 L 240,280 L 180,230 Z" fill="#CCA700" />
                      <text x="240" y="235" textAnchor="middle" fill="#FFF" fontSize="13" fontWeight="500">In Stock?</text>

                      <rect x="40" y="210" width="100" height="45" rx="4" fill="#9D5BD2" />
                      <text x="90" y="237" textAnchor="middle" fill="#FFF" fontSize="13" fontWeight="500">Backorder</text>

                      <rect x="340" y="210" width="100" height="45" rx="4" fill="#2D9574" />
                      <text x="390" y="237" textAnchor="middle" fill="#FFF" fontSize="13" fontWeight="500">Ship Order</text>

                      <ellipse cx="240" cy="310" rx="40" ry="25" fill="#F48771" />
                      <text x="240" y="317" textAnchor="middle" fill="#FFF" fontSize="13" fontWeight="500">End</text>

                      <line x1="140" y1="65" x2="180" y2="125" stroke="#666" strokeWidth="2" markerEnd="url(#arrow-desktop)" />
                      <line x1="240" y1="150" x2="240" y2="180" stroke="#666" strokeWidth="2" markerEnd="url(#arrow-desktop)" />
                      <line x1="180" y1="230" x2="140" y2="232" stroke="#666" strokeWidth="2" markerEnd="url(#arrow-desktop)" />
                      <line x1="300" y1="230" x2="340" y2="232" stroke="#666" strokeWidth="2" markerEnd="url(#arrow-desktop)" />
                      <line x1="90" y1="255" x2="200" y2="310" stroke="#666" strokeWidth="2" markerEnd="url(#arrow-desktop)" />
                      <line x1="390" y1="255" x2="280" y2="310" stroke="#666" strokeWidth="2" markerEnd="url(#arrow-desktop)" />
                    </svg>
                  </div>
                  <figcaption style={{ marginTop: '20px', fontSize: '13px', color: theme === 'dark' ? 'var(--text-secondary)' : '#666666', textAlign: 'center' }}>
                    Рис 1. BPMN схема процесса
                  </figcaption>
                </figure>
              </section>
            </Panel>
          </PanelGroup>
        )}
      </main>

      {/* Footer Status Bar */}
      <footer role="contentinfo" style={{ height: '24px', background: theme === 'dark' ? 'var(--bg-elevated)' : '#F3F3F3', borderTop: `1px solid ${borderColor}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px', fontSize: '11px', color: theme === 'dark' ? 'var(--text-secondary)' : '#666666' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: syntaxOk ? '#22C55E' : '#EF4444' }} />
            <span>Syntax: {syntaxOk ? 'OK' : 'Error'}</span>
          </div>
          <span>Version 1.0.4</span>
          <span>Notation: {currentNotation}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span>UTF-8</span>
          <span>&copy; 2026 LogicStream</span>
        </div>
      </footer>

      {/* AI Drawer */}
      {aiDrawerOpen && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 3000, display: 'flex', alignItems: 'flex-end' }}
          onClick={() => setAiDrawerOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ width: '100%', maxHeight: '70%', background: bgColor, borderTopLeftRadius: '12px', borderTopRightRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 600, color: textColor }}>AI Diagram Generation</h2>
              <button
                onClick={() => setAiDrawerOpen(false)}
                aria-label="Close AI drawer"
                style={{ width: '32px', height: '32px', background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: textColor }}
              >
                <X size={20} />
              </button>
            </div>

            <textarea
              value={aiDescription}
              onChange={(e) => setAiDescription(e.target.value)}
              placeholder="Describe your process or workflow..."
              style={{ flex: 1, minHeight: '120px', padding: '12px', background: theme === 'dark' ? 'var(--bg-input)' : '#FFFFFF', border: `1px solid ${borderColor}`, borderRadius: '4px', fontFamily: 'var(--font-ui)', fontSize: '13px', color: textColor, resize: 'vertical' }}
            />

            <button
              onClick={() => setAiDrawerOpen(false)}
              style={{ marginTop: '16px', height: '40px', background: 'var(--color-primary)', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '14px', color: '#FFFFFF', fontWeight: 500 }}
            >
              Generate Diagram
            </button>
          </div>
        </div>
      )}

      {/* Help Drawer - Aside with Article */}
      {helpDrawerOpen && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 3000 }}
          onClick={() => setHelpDrawerOpen(false)}
        >
          <aside
            role="complementary"
            aria-label="Help documentation"
            onClick={(e) => e.stopPropagation()}
            style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: isMobile ? '100%' : '400px', background: bgColor, borderLeft: `1px solid ${borderColor}`, overflow: 'auto' }}
          >
            <div style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: textColor }}>Help Documentation</h2>
                <button
                  onClick={() => setHelpDrawerOpen(false)}
                  aria-label="Close help"
                  style={{ width: '32px', height: '32px', background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: textColor }}
                >
                  <X size={20} />
                </button>
              </div>

              <article>
                <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '12px', color: textColor }}>BPMN 2.0 Syntax Guide</h3>
                <p style={{ fontSize: '13px', lineHeight: '1.6', color: theme === 'dark' ? 'var(--text-secondary)' : '#666666', marginBottom: '16px' }}>
                  Business Process Model and Notation (BPMN) is a graphical representation for specifying business processes in a business process model.
                </p>

                <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: textColor }}>Basic Syntax</h4>
                <p style={{ fontSize: '13px', lineHeight: '1.6', color: theme === 'dark' ? 'var(--text-secondary)' : '#666666', marginBottom: '12px' }}>
                  Use the <span style={{ fontFamily: 'var(--font-editor)', background: theme === 'dark' ? 'var(--bg-input)' : '#F5F5F5', padding: '2px 6px', borderRadius: '2px', fontSize: '12px' }}>-&gt;</span> operator to create connections between process elements.
                </p>

                <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: textColor }}>Decision Points</h4>
                <p style={{ fontSize: '13px', lineHeight: '1.6', color: theme === 'dark' ? 'var(--text-secondary)' : '#666666', marginBottom: '12px' }}>
                  Wrap conditions in <span style={{ fontFamily: 'var(--font-editor)', background: theme === 'dark' ? 'var(--bg-input)' : '#F5F5F5', padding: '2px 6px', borderRadius: '2px', fontSize: '12px' }}>[brackets]</span> to create decision gateways.
                </p>

                <h4 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: textColor }}>Process Flow Example</h4>
                <pre style={{ fontFamily: 'var(--font-editor)', fontSize: '12px', background: theme === 'dark' ? 'var(--bg-input)' : '#F5F5F5', padding: '12px', borderRadius: '4px', overflow: 'auto', color: theme === 'dark' ? '#D4D4D4' : '#333333' }}>
{`start -> process
process -> [decision?]
[decision?] -> end_a : yes
[decision?] -> end_b : no`}
                </pre>
              </article>
            </div>
          </aside>
        </div>
      )}

      {/* Settings Modal with Form */}
      {settingsOpen && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
          onClick={() => setSettingsOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Project Settings"
            onClick={(e) => e.stopPropagation()}
            style={{ width: '100%', maxWidth: '500px', background: bgColor, borderRadius: '8px', padding: '24px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: textColor }}>Project & AI Settings</h2>
              <button
                onClick={() => setSettingsOpen(false)}
                aria-label="Close settings"
                style={{ width: '32px', height: '32px', background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: textColor }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label htmlFor="project-name" style={{ display: 'block', marginBottom: '6px', fontSize: '12px', fontWeight: 500, color: textColor }}>
                  Project Name
                </label>
                <input
                  id="project-name"
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="Enter project name..."
                  required
                  style={{ width: '100%', height: '36px', padding: '0 12px', background: theme === 'dark' ? 'var(--bg-input)' : '#FFFFFF', border: `1px solid ${borderColor}`, borderRadius: '4px', fontSize: '13px', color: textColor, fontFamily: 'var(--font-ui)' }}
                />
              </div>

              <div>
                <label htmlFor="engine" style={{ display: 'block', marginBottom: '6px', fontSize: '12px', fontWeight: 500, color: textColor }}>
                  Engine
                </label>
                <select
                  id="engine"
                  value={engine}
                  onChange={(e) => setEngine(e.target.value)}
                  style={{ width: '100%', height: '36px', padding: '0 12px', background: theme === 'dark' ? 'var(--bg-input)' : '#FFFFFF', border: `1px solid ${borderColor}`, borderRadius: '4px', fontSize: '13px', color: textColor, fontFamily: 'var(--font-ui)' }}
                >
                  <option value="PlantUML">PlantUML</option>
                  <option value="Mermaid">Mermaid</option>
                  <option value="Graphviz">Graphviz</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={includeComments}
                    onChange={(e) => setIncludeComments(e.target.checked)}
                    style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                  />
                  <span style={{ fontSize: '13px', fontWeight: 500, color: textColor }}>Include syntax comments</span>
                </label>
              </div>

              <div>
                <label htmlFor="ai-description" style={{ display: 'block', marginBottom: '6px', fontSize: '12px', fontWeight: 500, color: textColor }}>
                  AI Prompt
                </label>
                <textarea
                  id="ai-description"
                  value={aiDescription}
                  onChange={(e) => setAiDescription(e.target.value)}
                  placeholder="Describe your diagram..."
                  style={{ width: '100%', minHeight: '100px', padding: '12px', background: theme === 'dark' ? 'var(--bg-input)' : '#FFFFFF', border: `1px solid ${borderColor}`, borderRadius: '4px', fontSize: '13px', color: textColor, fontFamily: 'var(--font-ui)', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setSettingsOpen(false)}
                  style={{ height: '36px', padding: '0 20px', background: 'transparent', border: `1px solid ${borderColor}`, borderRadius: '4px', cursor: 'pointer', fontSize: '13px', color: textColor, fontWeight: 500 }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ height: '36px', padding: '0 20px', background: 'var(--color-primary)', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', color: '#FFFFFF', fontWeight: 500 }}
                >
                  Generate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
