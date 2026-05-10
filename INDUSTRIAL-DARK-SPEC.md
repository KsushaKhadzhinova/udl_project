# UDL Editor - Industrial Dark Implementation

Complete technical specification for the Industrial Dark theme following laboratory requirements and engineering aesthetics.

---

## 🎯 Overview

**Design Philosophy:** Engineering-first, utility-focused, minimalist  
**Visual Style:** Industrial (VS Code + Draw.io hybrid)  
**Semantic HTML:** ✅ Complete (ЛР №3)  
**CSS Grid Layout:** ✅ Implemented (ЛР №4)  
**Accessibility:** ✅ WCAG 2.1 AA compliant  
**Responsive:** ✅ Mobile-first approach

---

## 🎨 Industrial Dark Color System

### Core Technical Palette

```css
/* Primary Actions */
--color-primary: #007ACC;           /* Accent Blue - Links, Focus, Actions */

/* Status Colors (Engineering Indicators) */
--color-success: #4EC9B0;           /* Success Green (Teal) - Build OK */
--color-error: #F48771;             /* Error Coral - Build Failed */
--color-warning: #CCA700;           /* Warning Gold - Lint Issues */
--color-info: #007ACC;              /* Info Blue - Notifications */

/* AI & Special Features */
--color-purple: #9D5BD2;            /* AI Assistant, Smart Actions */

/* Background Layers (Depth Hierarchy) */
--bg-base: #1E1E1E;                 /* Main Editor Surface */
--bg-sidebar: #252526;              /* Sidebar/Panel Surface */
--bg-header: #323233;               /* Header/Toolbar */
--bg-statusbar: #007ACC;            /* Status Bar (Blue) */
--bg-terminal: #1E1E1E;             /* Terminal Background */
--bg-input: #3C3C3C;                /* Input Fields */
--bg-hover: #2A2D2E;                /* Hover State */
--bg-active: #094771;               /* Active Selection */

/* Text (High Contrast) */
--text-primary: #CCCCCC;            /* Primary Content */
--text-secondary: #858585;          /* Secondary/Muted */
--text-editor: #D4D4D4;             /* Editor Content */
--text-inverse: #FFFFFF;            /* On Colored Backgrounds */

/* Borders (1px Separators) */
--border-default: #3C3C3C;          /* Standard Borders */
--border-subtle: #2B2B2B;           /* Subtle Dividers */
--border-focus: #007ACC;            /* Focus Rings (2px) */
```

### Color Usage Matrix

| Element | Background | Text | Border |
|---------|-----------|------|--------|
| **Main Editor** | #1E1E1E | #D4D4D4 | #3C3C3C |
| **Sidebar** | #252526 | #CCCCCC | #3C3C3C |
| **Header** | #323233 | #CCCCCC | #3C3C3C |
| **Status Bar** | #007ACC | #FFFFFF | none |
| **Terminal** | #1E1E1E | #CCCCCC | #3C3C3C |
| **Input Fields** | #3C3C3C | #CCCCCC | #3C3C3C |
| **Hover State** | #2A2D2E | #CCCCCC | - |
| **Active Selection** | #094771 | #FFFFFF | #007ACC |

---

## ✍️ Typography System

### Font Families

```css
/* UI Font - Inter (Sans-serif) */
--font-ui: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Editor Font - Fira Code (Monospace) */
--font-editor: 'Fira Code', 'Consolas', 'Monaco', 'Courier New', monospace;
```

### Font Size Scale (12px Base)

```css
--font-size-xs: 10px;               /* Badges, Timestamps */
--font-size-sm: 11px;               /* Status Bar, Small Labels */
--font-size-base: 12px;             /* UI Default */
--font-size-md: 13px;               /* Headings, Emphasis */
--font-size-lg: 14px;               /* Editor Code */
--font-size-xl: 16px;               /* Page Titles */
```

### Usage Guidelines

| Context | Font Family | Size | Weight | Usage |
|---------|-------------|------|--------|-------|
| **UI Elements** | Inter | 12px | 400 | Buttons, Labels, Navigation |
| **Status Bar** | Inter | 11px | 400 | Status text, indicators |
| **Code Editor** | Fira Code | 14px | 400 | Source code display |
| **Terminal** | Fira Code | 12px | 400 | Terminal output |
| **Headings** | Inter | 13px | 500 | Section headers |
| **Breadcrumbs** | Inter | 12px | 400 | Navigation path |
| **Tooltips** | Inter | 10px | 400 | Hover hints |

---

## 📐 Spacing System (4px Grid)

### Base Units

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
```

### Application Grid

| Element | Spacing | Usage |
|---------|---------|-------|
| **Component Padding** | 8px × 12px | Default padding |
| **Button Padding** | 4px × 12px | Action buttons |
| **Input Padding** | 6px × 8px | Text fields |
| **Panel Gap** | 16px | Between sections |
| **Icon Gap** | 8px | Icon to text |
| **List Item Gap** | 4px | Vertical spacing |

---

## 🔲 Industrial Sharp Edges

**Border Radius:** `2px` - **ALL UI ELEMENTS**

### Strict 2px Policy

```css
/* Universal Sharp Radius */
--radius-sharp: 2px;

/* Applied to ALL interactive elements */
button,
input,
textarea,
select,
.card,
.modal,
.dropdown,
.tooltip,
.badge,
.panel {
  border-radius: 2px;
}
```

**Rationale:** Industrial aesthetic prioritizes precision over softness. 2px provides minimal rounding while maintaining technical appearance.

**Exception:** NONE - All elements use 2px radius consistently.

---

## 🏗️ CSS Grid Layout (ЛР №4)

### Main Application Grid

```css
.udl-app-grid {
  display: grid;
  grid-template-areas:
    'header header header'
    'activity sidebar main'
    'activity sidebar main'
    'footer footer footer';
  grid-template-columns: 48px 260px 1fr;
  grid-template-rows: 35px 1fr auto 22px;
  height: 100vh;
  width: 100vw;
}
```

### Grid Areas

| Area | Size | Description |
|------|------|-------------|
| **header** | 35px height | Top toolbar with breadcrumbs & actions |
| **activity** | 48px width | Left activity bar (icons only) |
| **sidebar** | 260px width | Explorer sidebar (file tree) |
| **main** | 1fr (flexible) | Editor, Canvas, AI Assistant |
| **footer** | 22px height | Status bar |

### Main Content Sub-Grid

```css
.udl-main {
  display: grid;
  grid-template-areas:
    'editor canvas'
    'terminal terminal';
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr auto;
}
```

**Areas:**
- `editor` - Code editor pane (left)
- `canvas` - Diagram canvas (right)
- `terminal` - Terminal/Problems panel (bottom, spans full width)

---

## 📱 Responsive Breakpoints

### Desktop (1024px+)

```css
/* Full 3-column layout */
grid-template-columns: 48px 260px 1fr;
```

- Activity Bar: Visible (48px)
- Sidebar: Visible (260px)
- Layout: Horizontal split (Editor | Canvas)

### Tablet (768px - 1023px)

```css
@media (max-width: 1023px) {
  grid-template-columns: 48px 1fr;
  /* Sidebar becomes overlay */
  .udl-sidebar {
    position: fixed;
    transform: translateX(-100%);
  }
  
  /* Main content becomes vertical */
  .udl-main {
    grid-template-areas:
      'editor'
      'canvas'
      'terminal';
    grid-template-columns: 1fr;
  }
}
```

- Activity Bar: Visible
- Sidebar: Hamburger menu (slide-in overlay)
- Layout: Vertical split (Editor / Canvas)

### Mobile (375px - 767px)

```css
@media (max-width: 767px) {
  grid-template-columns: 1fr;
  
  .udl-activity-bar {
    display: none;
  }
  
  .udl-canvas-pane {
    display: none;
  }
}
```

- Activity Bar: Hidden
- Sidebar: Hamburger menu (full-width overlay)
- Layout: Editor only (Canvas accessible via floating button)
- Header: Icon-only buttons

---

## 🎯 Semantic HTML (ЛР №3)

### Document Structure

```html
<div class="udl-app-grid">
  <header class="udl-header" role="banner">
    <nav aria-label="Breadcrumb">...</nav>
    <div role="toolbar" aria-label="Main actions">...</div>
  </header>

  <nav class="udl-activity-bar" aria-label="Activity bar">
    <button aria-label="Explorer" aria-pressed="true">...</button>
  </nav>

  <aside class="udl-sidebar" aria-label="Sidebar">...</aside>

  <main class="udl-main">
    <section class="udl-editor-pane" aria-label="Code editor">...</section>
    <section class="udl-canvas-pane" aria-label="Diagram canvas">...</section>
  </main>

  <footer class="udl-statusbar" role="status" aria-label="Status bar">...</footer>
</div>
```

### Accessibility Features

| Element | ARIA Attribute | Purpose |
|---------|---------------|---------|
| **Header** | `role="banner"` | Page header landmark |
| **Breadcrumbs** | `aria-label="Breadcrumb"` | Navigation context |
| **Toolbar** | `role="toolbar"` | Action group |
| **Activity Bar** | `aria-label="Activity bar"` | Main navigation |
| **Buttons** | `aria-pressed="true/false"` | Toggle state |
| **Sidebar** | `aria-label="Sidebar"` | Secondary navigation |
| **Main** | Native `<main>` | Main content |
| **Sections** | `aria-label` | Content regions |
| **Status Bar** | `role="status"` | Live status updates |

### Focus Management

```css
.udl-focusable:focus {
  outline: 2px solid var(--border-focus);
  outline-offset: 2px;
}

.udl-focusable:focus:not(:focus-visible) {
  outline: none;
}
```

**Tab Order:** Header → Activity Bar → Sidebar → Main Content → Status Bar

---

## 🎬 Transition & Animation

### Standard Durations

```css
--transition-fast: 120ms ease-in-out;    /* Hover states */
--transition-base: 200ms ease-in-out;    /* Standard transitions */
--transition-slow: 300ms ease-in-out;    /* Layout changes */
```

### Usage Guidelines

| Interaction | Duration | Easing | Example |
|-------------|----------|--------|---------|
| **Button Hover** | 120ms | ease-in-out | Background color |
| **Dropdown Open** | 200ms | ease-in-out | Opacity, transform |
| **Sidebar Toggle** | 300ms | ease-in-out | Width, transform |
| **Panel Resize** | - | - | Immediate (drag) |
| **Typing Indicator** | 1s | ease-in-out | Bounce animation |

---

## 🧩 Component Architecture

### AI Assistant Modes

```typescript
type AIMode = 'write-code' | 'fix-errors' | 'explain-notation' | 'ask-docs';
```

**Dropdown Menu:**
- Write Code: Generate UDL entities
- Fix Errors: Analyze and fix problems
- Explain Notation: Explain diagram concepts
- Ask Docs: Search documentation

**Action Buttons:**
- Primary: "Apply to Code" (Blue #007ACC)
- Secondary: "Insert Template", "Explain Issue" (Gray #3C3C3C)

### Terminal/Problems Panel

**Tabs:**
- Terminal: Command output (Fira Code 12px)
- Problems: Error/warning list with severity icons

**Features:**
- Collapsible (ChevronUp/Down icon)
- Height: 200px default (100px - 400px range)
- Resizable via drag

**Problem Display:**
```
✕ Error message
  file.udl:line:column

⚠ Warning message
  file.udl:line:column
```

---

## 📊 Technical Specifications Table

### Element Dimensions

| Element | Width / Height | Background | Border | Radius |
|---------|---------------|------------|--------|--------|
| **Header** | - × 35px | #323233 | Bottom 1px #3C3C3C | - |
| **Activity Bar** | 48px × - | #333333 | Right 1px #3C3C3C | - |
| **Sidebar** | 260px × - | #252526 | Right 1px #3C3C3C | - |
| **Status Bar** | - × 22px | #007ACC | Top 1px #007ACC | - |
| **Resizer Bar** | 4px × - | #3C3C3C | none | - |
| **Button** | auto × 28px | varies | varies | 2px |
| **Input** | auto × 28px | #3C3C3C | 1px #3C3C3C | 2px |
| **Terminal** | - × 200px | #1E1E1E | Top 1px #3C3C3C | - |

### Font Specifications

| Context | Family | Size | Weight | Line Height |
|---------|--------|------|--------|-------------|
| **UI Text** | Inter | 12px | 400 | 1.5 |
| **Status Bar** | Inter | 11px | 400 | 1.4 |
| **Editor Code** | Fira Code | 14px | 400 | 1.6 |
| **Terminal** | Fira Code | 12px | 400 | 1.6 |
| **Headings** | Inter | 13px | 500 | 1.5 |

---

## 🎨 CSS Variable Reference

```css
:root {
  /* Colors */
  --color-primary: #007ACC;
  --color-success: #4EC9B0;
  --color-error: #F48771;
  --color-warning: #CCA700;
  
  /* Backgrounds */
  --bg-base: #1E1E1E;
  --bg-sidebar: #252526;
  --bg-header: #323233;
  --bg-statusbar: #007ACC;
  --bg-input: #3C3C3C;
  
  /* Text */
  --text-primary: #CCCCCC;
  --text-secondary: #858585;
  --text-inverse: #FFFFFF;
  
  /* Borders */
  --border-default: #3C3C3C;
  --border-focus: #007ACC;
  
  /* Typography */
  --font-ui: 'Inter', sans-serif;
  --font-editor: 'Fira Code', monospace;
  
  /* Spacing */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  
  /* Border Radius - STRICT 2PX */
  --radius-sharp: 2px;
  
  /* Transitions */
  --transition-fast: 120ms ease-in-out;
  --transition-base: 200ms ease-in-out;
  --transition-slow: 300ms ease-in-out;
}
```

---

## ✅ Laboratory Requirements Compliance

### ЛР №3 - Semantic HTML & Accessibility

✅ Complete semantic structure:
- `<header>`, `<nav>`, `<aside>`, `<main>`, `<section>`, `<footer>`
- ARIA labels and roles
- Proper focus management
- Keyboard navigation support

### ЛР №4 - CSS Grid Layout

✅ Grid-based layout system:
- Main app grid (3-column desktop)
- Sub-grid for main content area
- Responsive grid adaptations
- No float or table-based layouts

### ЛР №5 - JavaScript Interactions (Future)

✅ Prepared structure:
- React component architecture
- Event handlers ready
- State management in place
- Transition hooks available

---

## 🔧 Implementation Checklist

### Design System
- [x] Industrial Dark color palette
- [x] 2px border radius strictly applied
- [x] Inter + Fira Code typography
- [x] 4px grid spacing system
- [x] CSS variables defined

### Layout
- [x] CSS Grid main structure
- [x] Semantic HTML elements
- [x] Responsive breakpoints (375px, 768px, 1024px)
- [x] Activity Bar (48px)
- [x] Sidebar (260px)
- [x] Header (35px)
- [x] Status Bar (22px)

### Features
- [x] AI Assistant with mode dropdown
- [x] Terminal/Problems panel
- [x] Code editor pane
- [x] Diagram canvas pane
- [x] Resizable panels
- [x] Collapsible terminal

### Accessibility
- [x] ARIA labels and roles
- [x] Focus indicators (2px outline)
- [x] Keyboard navigation
- [x] Semantic HTML structure
- [x] High contrast colors (WCAG AA)

### Responsive
- [x] Desktop layout (1024px+)
- [x] Tablet layout (768px)
- [x] Mobile layout (375px)
- [x] Hamburger menu
- [x] Vertical split for tablet
- [x] Single view for mobile

---

## 📚 File Structure

```
src/
├── app/
│   └── components/
│       ├── IndustrialApp.tsx              # Main app with CSS Grid
│       ├── AIAssistantModes.tsx           # AI with mode dropdown
│       ├── TerminalPanel.tsx              # Terminal/Problems tabs
│       ├── CodeEditor.tsx                 # Editor pane
│       ├── DiagramCanvas.tsx              # Canvas pane
│       ├── ExplorerSidebar.tsx            # File tree
│       └── [other views...]
│
└── styles/
    ├── theme.css                          # Industrial Dark variables
    ├── grid-layout.css                    # CSS Grid system
    ├── fonts.css                          # Inter + Fira Code
    └── index.css                          # Main import
```

---

## 🚀 Usage

### Starting the Application

```bash
# Development server already running
# Navigate to "Industrial (CSS Grid)" view in top menu
```

### Key Features

1. **Mode Dropdown:** Click AI Assistant header to switch between:
   - Write Code
   - Fix Errors
   - Explain Notation
   - Ask Docs

2. **Terminal Panel:** Click tabs to switch between:
   - Terminal (command output)
   - Problems (errors/warnings)

3. **Responsive Testing:**
   - Resize browser to 375px, 768px, 1024px
   - Test hamburger menu (tablet/mobile)
   - Test vertical/horizontal splits

---

**Design System Version:** Industrial Dark 1.0  
**Last Updated:** 2026-05-10  
**Compliance:** ЛР №3 ✅ | ЛР №4 ✅ | ЛР №5 (Ready) ✅
