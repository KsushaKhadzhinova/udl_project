# UDL Editor Design System
**Professional CASE-tool Design System**  
Version 1.0 • Deep Dark Theme (VS Code Style)

---

## 🎨 Color Tokens

### Core Colors
```css
--color-primary: #007ACC;           /* Action Blue - primary actions, links, focus states */
--color-secondary: #252526;         /* Sidebar Background - secondary surfaces */
--color-success: #28A745;           /* Success states, confirmations */
--color-error: #F48771;             /* Error states, warnings, destructive actions */
```

### Background Colors
```css
--bg-base: #1E1E1E;                 /* Main editor background */
--bg-sidebar: #252526;              /* Sidebar, panels */
--bg-elevated: #2D2D30;             /* Dropdowns, modals, tooltips */
--bg-input: #3C3C3C;                /* Input fields, text areas */
--bg-hover: #2A2D2E;                /* Hover states */
--bg-active: #094771;               /* Active item background (primary tint) */
--bg-selection: #264F78;            /* Text selection, highlighted items */
```

### Text Colors
```css
--text-primary: #CCCCCC;            /* Primary text, body copy */
--text-secondary: #858585;          /* Secondary text, hints, placeholders */
--text-disabled: #656565;           /* Disabled text */
--text-inverse: #FFFFFF;            /* Text on primary backgrounds */
--text-link: #007ACC;               /* Links, interactive text */
```

### Border Colors
```css
--border-default: #3E3E42;          /* Default borders */
--border-subtle: #2B2B2B;           /* Subtle dividers */
--border-focus: #007ACC;            /* Focus rings */
--border-error: #F48771;            /* Error borders */
```

### Status Colors
```css
--status-info: #007ACC;
--status-success: #28A745;
--status-warning: #FFC107;
--status-error: #F48771;
```

---

## ✍️ Typography

### Font Families
```css
--font-ui: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-editor: 'Fira Code', 'Consolas', 'Monaco', monospace;
```

### UI Typography (Inter)
```css
/* Default UI Text */
--font-size-ui: 12px;
--font-weight-ui: 400;              /* Regular */
--line-height-ui: 1.5;              /* 18px */

/* UI Variants */
--font-size-xs: 10px;               /* Small labels, badges */
--font-size-sm: 11px;               /* Secondary text */
--font-size-md: 12px;               /* Base UI text */
--font-size-lg: 14px;               /* Headings, emphasis */
--font-size-xl: 16px;               /* Page titles */

--font-weight-regular: 400;
--font-weight-medium: 500;          /* Buttons, labels */
--font-weight-semibold: 600;        /* Headings */
```

### Editor Typography (Fira Code)
```css
--font-size-editor: 14px;
--font-weight-editor: 400;
--line-height-editor: 1.6;          /* 22.4px for readability */
--letter-spacing-editor: 0;
```

### Font Loading
```html
<!-- Add to fonts.css -->
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&display=swap');
```

---

## 📐 Spacing System
**4px Grid System** - All spacing follows multiples of 4px for precision

```css
--space-0: 0px;
--space-1: 4px;                     /* Tight spacing */
--space-2: 8px;                     /* Small gaps, padding */
--space-3: 12px;                    /* Default padding */
--space-4: 16px;                    /* Medium spacing */
--space-5: 20px;
--space-6: 24px;                    /* Large spacing */
--space-8: 32px;                    /* Section spacing */
--space-10: 40px;
--space-12: 48px;                   /* Page margins */
--space-16: 64px;
```

### Usage Guidelines
- **Component padding**: 8px (vertical) × 12px (horizontal)
- **Button padding**: 4px (vertical) × 12px (horizontal)
- **Input padding**: 6px (vertical) × 8px (horizontal)
- **Panel gaps**: 16px between major sections
- **Icon spacing**: 8px gap from text

---

## 🔲 Border Radius
**Industrial Style - Sharp, Minimal Rounding**

```css
--radius-none: 0px;                 /* Completely sharp */
--radius-sm: 2px;                   /* Default for all UI elements */
--radius-md: 2px;                   /* Buttons, inputs, cards */
--radius-lg: 2px;                   /* Modals, panels */
```

**Usage**: Use 2px uniformly across all interactive elements (buttons, inputs, dropdowns, tooltips, cards). Only use 0px for dividers, table cells, and structural elements.

---

## 🔧 Component Patterns

### Buttons

#### Primary Button
```tsx
<button className="
  bg-[--color-primary] 
  text-[--text-inverse] 
  px-3 py-1 
  rounded-[2px]
  hover:bg-[#0098FF]
  active:bg-[#005A9E]
  disabled:opacity-50
  font-medium
">
  Action
</button>
```

#### Secondary Button
```tsx
<button className="
  bg-[--bg-input] 
  text-[--text-primary] 
  border border-[--border-default]
  px-3 py-1 
  rounded-[2px]
  hover:bg-[--bg-hover]
  active:bg-[--bg-active]
">
  Cancel
</button>
```

#### Icon Button
```tsx
<button className="
  w-8 h-8 
  flex items-center justify-center
  rounded-[2px]
  hover:bg-[--bg-hover]
  text-[--text-secondary]
  hover:text-[--text-primary]
">
  <Icon size={16} strokeWidth={1.5} />
</button>
```

### Inputs

#### Text Input
```tsx
<input 
  type="text"
  className="
    bg-[--bg-input]
    text-[--text-primary]
    border border-[--border-default]
    rounded-[2px]
    px-2 py-1.5
    text-xs
    focus:outline-none
    focus:border-[--border-focus]
    focus:ring-1
    focus:ring-[--border-focus]
    placeholder:text-[--text-secondary]
  "
  placeholder="Enter value..."
/>
```

#### Textarea (Editor Style)
```tsx
<textarea 
  className="
    bg-[--bg-base]
    text-[--text-primary]
    font-['Fira_Code']
    text-sm
    border border-[--border-default]
    rounded-[2px]
    p-3
    resize-none
    focus:outline-none
    focus:border-[--border-focus]
  "
/>
```

### Panels & Cards

#### Sidebar Panel
```tsx
<aside className="
  w-64
  bg-[--bg-sidebar]
  border-r border-[--border-subtle]
  h-full
  flex flex-col
">
  {/* Panel content */}
</aside>
```

#### Card
```tsx
<div className="
  bg-[--bg-elevated]
  border border-[--border-default]
  rounded-[2px]
  p-4
">
  {/* Card content */}
</div>
```

### Tooltips

```tsx
<div className="
  bg-[--bg-elevated]
  text-[--text-primary]
  text-xs
  px-2 py-1
  rounded-[2px]
  border border-[--border-default]
  shadow-lg
  whitespace-nowrap
">
  Tooltip text
</div>
```

### Modals

```tsx
<div className="
  fixed inset-0 
  bg-black/60 
  flex items-center justify-center
  z-50
">
  <div className="
    bg-[--bg-elevated]
    border border-[--border-default]
    rounded-[2px]
    w-[480px]
    shadow-2xl
  ">
    {/* Header */}
    <header className="
      px-4 py-3
      border-b border-[--border-subtle]
      flex items-center justify-between
    ">
      <h2 className="text-sm font-semibold">Modal Title</h2>
      <button>×</button>
    </header>
    
    {/* Body */}
    <div className="p-4">
      Content
    </div>
    
    {/* Footer */}
    <footer className="
      px-4 py-3
      border-t border-[--border-subtle]
      flex justify-end gap-2
    ">
      <button>Cancel</button>
      <button>Confirm</button>
    </footer>
  </div>
</div>
```

### Tabs

```tsx
<div className="border-b border-[--border-default]">
  <nav className="flex gap-1 px-2">
    <button className="
      px-3 py-2
      text-xs
      text-[--text-secondary]
      hover:text-[--text-primary]
      border-b-2 border-transparent
      data-[active=true]:border-[--color-primary]
      data-[active=true]:text-[--text-primary]
    ">
      Tab 1
    </button>
  </nav>
</div>
```

### Dropdown Menu

```tsx
<div className="
  bg-[--bg-elevated]
  border border-[--border-default]
  rounded-[2px]
  py-1
  shadow-lg
  min-w-[160px]
">
  <button className="
    w-full
    px-3 py-1.5
    text-left
    text-xs
    text-[--text-primary]
    hover:bg-[--bg-hover]
    flex items-center gap-2
  ">
    <Icon size={16} />
    Menu Item
  </button>
</div>
```

### Status Badge

```tsx
<span className="
  inline-flex items-center gap-1
  px-2 py-0.5
  rounded-[2px]
  text-[10px]
  font-medium
  bg-[--status-success]/10
  text-[--status-success]
  border border-[--status-success]/30
">
  <div className="w-1.5 h-1.5 rounded-full bg-current" />
  Active
</span>
```

---

## 🎯 Icons

**Style**: Lucide React  
**Size**: 16×16px default  
**Stroke Width**: 1.5 (thin, professional)

### Installation
```bash
pnpm add lucide-react
```

### Usage
```tsx
import { FileCode, Settings, Save, Play } from 'lucide-react';

<FileCode size={16} strokeWidth={1.5} className="text-[--text-secondary]" />
```

### Common Icons
- **File Operations**: FileCode, FolderOpen, Save, Upload, Download
- **Editor**: Code, Terminal, GitBranch, Search, Replace
- **UI Controls**: Settings, Menu, X, ChevronRight, MoreVertical
- **Actions**: Play, Pause, Square, RefreshCw, Trash2
- **Status**: CheckCircle, AlertCircle, Info, XCircle

---

## 📏 Layout Principles

### Toolbar Heights
```css
--height-toolbar: 32px;             /* Top toolbar */
--height-statusbar: 24px;           /* Bottom status bar */
--height-tab: 32px;                 /* Tab bar */
```

### Sidebar Widths
```css
--width-sidebar-sm: 48px;           /* Icon-only sidebar */
--width-sidebar-md: 240px;          /* Default sidebar */
--width-sidebar-lg: 320px;          /* Wide sidebar (properties) */
```

### Application Layout Structure

```
┌─────────────────────────────────────────┐
│ Top Toolbar (32px)                      │
├──────┬──────────────────────┬───────────┤
│ Side │ Editor Area          │ Right     │
│ bar  │                      │ Panel     │
│ 48px │ (Flexible)           │ 320px     │
│      │                      │           │
├──────┴──────────────────────┴───────────┤
│ Status Bar (24px)                       │
└─────────────────────────────────────────┘
```

### Grid System
- **Columns**: Use flex or CSS grid with gap-4 (16px)
- **Responsive breakpoints**: Not applicable (desktop-first tool)
- **Min widths**: Panels min 200px, Editor min 400px

---

## 🎨 CSS Variables Implementation

Create `src/styles/theme.css`:

```css
:root {
  /* Colors */
  --color-primary: #007ACC;
  --color-secondary: #252526;
  --color-success: #28A745;
  --color-error: #F48771;
  
  /* Backgrounds */
  --bg-base: #1E1E1E;
  --bg-sidebar: #252526;
  --bg-elevated: #2D2D30;
  --bg-input: #3C3C3C;
  --bg-hover: #2A2D2E;
  --bg-active: #094771;
  --bg-selection: #264F78;
  
  /* Text */
  --text-primary: #CCCCCC;
  --text-secondary: #858585;
  --text-disabled: #656565;
  --text-inverse: #FFFFFF;
  
  /* Borders */
  --border-default: #3E3E42;
  --border-subtle: #2B2B2B;
  --border-focus: #007ACC;
  
  /* Typography */
  --font-ui: 'Inter', sans-serif;
  --font-editor: 'Fira Code', monospace;
  
  /* Spacing (use Tailwind classes) */
  /* Border Radius (use Tailwind rounded-[2px]) */
}

body {
  background: var(--bg-base);
  color: var(--text-primary);
  font-family: var(--font-ui);
  font-size: 12px;
  line-height: 1.5;
}
```

---

## ✅ Accessibility

- **Focus indicators**: 2px solid `--border-focus` outline
- **Keyboard navigation**: All interactive elements must be keyboard accessible
- **Minimum contrast**: 4.5:1 for text (WCAG AA)
- **Focus order**: Logical tab order following visual layout
- **Screen reader**: Use semantic HTML and ARIA labels where needed

---

## 🚀 Getting Started

1. **Install fonts**: Add Inter and Fira Code to `src/styles/fonts.css`
2. **Apply theme**: Import theme.css in your main App
3. **Install icons**: `pnpm add lucide-react`
4. **Build components**: Use the patterns above as starting templates
5. **Test in dark environment**: Ensure sufficient contrast

---

**Design System Version**: 1.0  
**Last Updated**: 2026-05-10  
**Maintained by**: UDL Editor Team
