import { ChevronDown, ChevronRight, Palette, Type, Minimize2, AlignLeft } from 'lucide-react';
import { useState } from 'react';

interface PropertySection {
  id: string;
  title: string;
  icon: any;
  isOpen: boolean;
}

export function PropertiesPanel() {
  const [sections, setSections] = useState<PropertySection[]>([
    { id: 'style', title: 'Style', icon: Palette, isOpen: true },
    { id: 'text', title: 'Text', icon: Type, isOpen: true },
    { id: 'arrange', title: 'Arrange', icon: AlignLeft, isOpen: false }
  ]);

  const toggleSection = (id: string) => {
    setSections(prev =>
      prev.map(s => (s.id === id ? { ...s, isOpen: !s.isOpen } : s))
    );
  };

  return (
    <aside
      style={{
        width: '280px',
        height: '100%',
        background: 'var(--bg-sidebar)',
        borderLeft: '1px solid var(--border-default)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '8px 12px',
          background: 'var(--bg-elevated)',
          borderBottom: '1px solid var(--border-default)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>
          Properties
        </span>
        <button
          className="udl-transition-fast"
          style={{
            width: '24px',
            height: '24px',
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
          title="Collapse"
        >
          <Minimize2 size={14} strokeWidth={1.5} />
        </button>
      </div>

      {/* Sections */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        {sections.map(section => {
          const Icon = section.icon;
          return (
            <div key={section.id}>
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.id)}
                className="udl-transition-fast"
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 12px',
                  background: 'var(--bg-elevated)',
                  border: 'none',
                  borderBottom: '1px solid var(--border-default)',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-hover)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'var(--bg-elevated)'}
              >
                {section.isOpen ? (
                  <ChevronDown size={14} strokeWidth={1.5} color="var(--text-secondary)" />
                ) : (
                  <ChevronRight size={14} strokeWidth={1.5} color="var(--text-secondary)" />
                )}
                <Icon size={14} strokeWidth={1.5} color="var(--text-secondary)" />
                <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-primary)' }}>
                  {section.title}
                </span>
              </button>

              {/* Section Content */}
              {section.isOpen && (
                <div style={{ padding: '12px', background: 'var(--bg-elevated)' }}>
                  {section.id === 'style' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {/* Fill Color */}
                      <div>
                        <label
                          style={{
                            display: 'block',
                            fontSize: '11px',
                            fontWeight: 500,
                            color: 'var(--text-secondary)',
                            marginBottom: '4px'
                          }}
                        >
                          Fill
                        </label>
                        <div style={{ display: 'flex', gap: '4px' }}>
                          <input
                            type="color"
                            defaultValue="#007ACC"
                            style={{
                              width: '32px',
                              height: '28px',
                              border: '1px solid var(--border-default)',
                              borderRadius: '2px',
                              cursor: 'pointer'
                            }}
                          />
                          <input
                            type="text"
                            defaultValue="#007ACC"
                            style={{
                              flex: 1,
                              height: '28px',
                              padding: '0 8px',
                              border: '1px solid var(--border-default)',
                              borderRadius: '2px',
                              fontSize: '11px',
                              fontFamily: 'monospace',
                              color: 'var(--text-primary)',
                              background: 'var(--bg-input)'
                            }}
                          />
                        </div>
                      </div>

                      {/* Stroke Color */}
                      <div>
                        <label
                          style={{
                            display: 'block',
                            fontSize: '11px',
                            fontWeight: 500,
                            color: 'var(--text-secondary)',
                            marginBottom: '4px'
                          }}
                        >
                          Stroke
                        </label>
                        <div style={{ display: 'flex', gap: '4px' }}>
                          <input
                            type="color"
                            defaultValue="#005A9E"
                            style={{
                              width: '32px',
                              height: '28px',
                              border: '1px solid var(--border-default)',
                              borderRadius: '2px',
                              cursor: 'pointer'
                            }}
                          />
                          <select
                            defaultValue="2"
                            style={{
                              flex: 1,
                              height: '28px',
                              padding: '0 8px',
                              border: '1px solid var(--border-default)',
                              borderRadius: '2px',
                              fontSize: '11px',
                              color: 'var(--text-primary)',
                              background: 'var(--bg-input)',
                              cursor: 'pointer'
                            }}
                          >
                            <option value="1">1px</option>
                            <option value="2">2px</option>
                            <option value="3">3px</option>
                            <option value="4">4px</option>
                          </select>
                        </div>
                      </div>

                      {/* Opacity */}
                      <div>
                        <label
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: '11px',
                            fontWeight: 500,
                            color: 'var(--text-secondary)',
                            marginBottom: '4px'
                          }}
                        >
                          <span>Opacity</span>
                          <span>100%</span>
                        </label>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          defaultValue="100"
                          style={{
                            width: '100%',
                            height: '4px',
                            cursor: 'pointer'
                          }}
                        />
                      </div>

                      {/* Shadow */}
                      <div>
                        <label
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            fontSize: '11px',
                            fontWeight: 500,
                            color: 'var(--text-secondary)',
                            cursor: 'pointer'
                          }}
                        >
                          <input type="checkbox" />
                          <span>Shadow</span>
                        </label>
                      </div>
                    </div>
                  )}

                  {section.id === 'text' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {/* Font Family */}
                      <div>
                        <label
                          style={{
                            display: 'block',
                            fontSize: '11px',
                            fontWeight: 500,
                            color: 'var(--text-secondary)',
                            marginBottom: '4px'
                          }}
                        >
                          Font
                        </label>
                        <select
                          defaultValue="Inter"
                          style={{
                            width: '100%',
                            height: '28px',
                            padding: '0 8px',
                            border: '1px solid var(--border-default)',
                            borderRadius: '2px',
                            fontSize: '11px',
                            color: 'var(--text-primary)',
                            background: 'var(--bg-input)',
                            cursor: 'pointer'
                          }}
                        >
                          <option>Inter</option>
                          <option>Fira Code</option>
                          <option>Arial</option>
                          <option>Helvetica</option>
                        </select>
                      </div>

                      {/* Font Size */}
                      <div>
                        <label
                          style={{
                            display: 'block',
                            fontSize: '11px',
                            fontWeight: 500,
                            color: 'var(--text-secondary)',
                            marginBottom: '4px'
                          }}
                        >
                          Size
                        </label>
                        <input
                          type="number"
                          defaultValue="13"
                          min="8"
                          max="72"
                          style={{
                            width: '100%',
                            height: '28px',
                            padding: '0 8px',
                            border: '1px solid var(--border-default)',
                            borderRadius: '2px',
                            fontSize: '11px',
                            color: 'var(--text-primary)',
                            background: 'var(--bg-input)'
                          }}
                        />
                      </div>

                      {/* Text Align */}
                      <div>
                        <label
                          style={{
                            display: 'block',
                            fontSize: '11px',
                            fontWeight: 500,
                            color: 'var(--text-secondary)',
                            marginBottom: '4px'
                          }}
                        >
                          Align
                        </label>
                        <div style={{ display: 'flex', gap: '4px' }}>
                          {['Left', 'Center', 'Right'].map(align => (
                            <button
                              key={align}
                              className="udl-transition-fast"
                              style={{
                                flex: 1,
                                height: '28px',
                                background: align === 'Center' ? 'var(--bg-active)' : 'var(--bg-input)',
                                border: align === 'Center' ? '1px solid var(--border-focus)' : '1px solid var(--border-default)',
                                borderRadius: '2px',
                                fontSize: '11px',
                                color: align === 'Center' ? 'var(--border-focus)' : 'var(--text-secondary)',
                                cursor: 'pointer'
                              }}
                            >
                              {align}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {section.id === 'arrange' && (
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center', padding: '12px 0' }}>
                      No selection
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div
        style={{
          padding: '8px 12px',
          background: 'var(--bg-elevated)',
          borderTop: '1px solid var(--border-default)'
        }}
      >
        <button
          className="udl-transition-fast"
          style={{
            width: '100%',
            height: '32px',
            background: 'var(--color-primary)',
            border: 'none',
            borderRadius: '2px',
            color: 'var(--text-inverse)',
            fontSize: '12px',
            fontWeight: 500,
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-primary-hover)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'var(--color-primary)'}
        >
          Apply Changes
        </button>
      </div>
    </aside>
  );
}
