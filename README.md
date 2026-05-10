# UDL Editor - Professional CASE Tool

A complete design system for a professional DSL (Domain-Specific Language) Diagram Editor with **Industrial Dark** theme (VS Code + Draw.io aesthetic). Features CSS Grid layout, semantic HTML, responsive design, AI assistant with modes, and comprehensive component library.

## 🎨 VS Code + Draw.io Hybrid Interface

**🆕 PRIMARY INTERFACE:** Unified Diagram-as-Code IDE combining best of both tools:
- **Left (VS Code):** Activity Bar (48px) + File Explorer (260px) + Code Editor with tabs
- **Center (Draw.io):** White canvas with grid, zoom controls, shape tools, minimap
- **Right (Draw.io):** Properties panel for styling shapes (colors, text, arrangement)
- **Bottom (VS Code):** Terminal/Problems/Output/Debug Console tabs
- **Status Bar:** Git, sync, errors, cursor position, language mode

### Industrial Dark Implementation

Engineering-focused layout following laboratory requirements:
- ✅ **ЛР №3:** Semantic HTML (`<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`) with full ARIA support
- ✅ **ЛР №4:** CSS Grid-based layout (3-column desktop, responsive mobile/tablet)
- ✅ **Sharp Edges:** Strict 2px border-radius on ALL elements (industrial aesthetic)
- ✅ **Typography:** Inter (12px UI) + Fira Code (14px Editor)
- ✅ **AI Modes:** Dropdown with Write Code, Fix Errors, Explain Notation, Ask Docs
- ✅ **Terminal Panel:** Tabs for Terminal output and Problems list

## 🎨 Design System

### Industrial Dark Theme
**Visual Style:** Engineering-first, utility-focused, minimalist (VS Code + Draw.io)  
**Primary Color:** #007ACC (Action Blue)  
**Status Colors:**  
- Success: #4EC9B0 (Teal)  
- Error: #F48771 (Coral)  
- Warning: #CCA700 (Gold)  

**Typography:**  
- UI: Inter, 12px base  
- Editor: Fira Code, 14px  
- Status Bar: Inter, 11px  

**Border Radius:** 2px STRICT (all elements - sharp industrial edges)  
**Spacing:** 4px grid system  
**Layout:** CSS Grid (3-column desktop, responsive mobile/tablet)  

### Complete Documentation
- **[VS Code + Draw.io Hybrid](./VSCODE-DRAWIO-HYBRID.md)** - 🆕 🌟 Primary interface combining code + diagrams
- **[Industrial Dark Spec](./INDUSTRIAL-DARK-SPEC.md)** - Engineering-focused theme with CSS Grid & semantic HTML
- **[Design System Guidelines](./UDL-Editor-Guidelines.md)** - Complete design tokens, colors, typography, spacing
- **[UI Components Library](./UI-COMPONENTS.md)** - Component specifications and usage examples
- **[Responsive Specifications](./RESPONSIVE-SPECS.md)** - Responsive layouts, new screens, animations
- **[Implementation Summary](./IMPLEMENTATION-SUMMARY.md)** - Complete feature overview
- **[Lab Requirements](./LAB-REQUIREMENTS.md)** - ЛР №3, №4, №5 compliance report

## 📐 Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│ Header (35px) - Breadcrumbs + Action Buttons               │
├────┬────────┬───────────────────────────┬──────────────────┤
│ A  │  E     │  Code Editor              │  Diagram Canvas  │
│ c  │  x     │  (Monaco-style)           │  (Node-link)     │
│ t  │  p     │  - Line numbers           │  - Draggable     │
│ i  │  l     │  - Syntax highlighting    │  - Connections   │
│ v  │  o     │  - Fira Code 14px         │  - Hover glow    │
│ i  │  r     │                           │                  │
│ t  │  e     │                           │                  │
│ y  │  r     │  <─── Resizable ────>     │                  │
│    │  (260) │                           │                  │
│ (48)│        │                           │                  │
├────┴────────┴───────────────────────────┴──────────────────┤
│ Status Bar (22px) - Git | Sync | UTF-8 | UDL              │
└─────────────────────────────────────────────────────────────┘
```

### Layout Sections

**Activity Bar (48px)**
- Files, Search, History, GitHub, Settings icons
- Background: #333333
- Icon size: 24px, stroke 1.5

**Explorer Sidebar (260px)**
- Title: 'EXPLORER' (11px uppercase)
- File tree with expand/collapse
- Background: #252526

**Split Pane Content**
- **Left:** Code editor with line numbers
- **Right:** Infinite canvas with diagram nodes
- Resizable with vertical handle

**Header (35px)**
- Breadcrumb navigation
- Action buttons: Save, Run (green), AI Fix (purple)

**Status Bar (22px)**
- Background: #007ACC
- Git branch, Sync status, UTF-8, UDL language

## 🧩 UI Components

### Primary Buttons
- Height: 28px
- Padding: 4px vertical, 12px horizontal
- States: Hover (+10% light), Active (-5% dark)
- Variants: primary, success, purple, error

### Toolbar Buttons
- Size: 28×28px
- Flat style, #444 background
- No border, icon only
- Includes 400ms delay tooltips

### Input/Textarea
- Dark background #1E1E1E
- Border: 1px #3C3C3C
- Focus: Blue outline 1px #007ACC
- Monospace option for code

### Diagram Nodes
- Rounded rectangle (4px radius)
- White background, black text
- Connection ports on 4 sides (8px dots)
- Hover: Blue glow shadow effect
- Draggable with rubber-band connections

### Tooltips
- Black background
- 10px font size
- 400ms delay
- Fade-in animation (200ms)

## 🎭 Interaction States

### Resizer Panel
- Vertical bar between editor and canvas
- Drag to resize panels fluently
- Hover: Width 1px → 1.5px, color → blue

### Sidebar Toggle
- Smooth slide transition (300ms ease-in-out)
- Width animates: 260px ↔ 0px

### Run Button
- Click → Icon changes to loading spinner
- Rotate linear infinite
- Returns to Play icon on completion

### Diagram Nodes
- Hover: Subtle blue glow (shadow: 0 0 8px rgba(0,122,204,0.5))
- Drag: Nodes move with connection lines following (rubber-band effect)
- Connection ports visible on all 4 sides

## 🚀 Getting Started

### Prerequisites
```bash
pnpm install
```

### Run Development Server
The Vite dev server is already running in the Figma Make environment.

### Navigation
Use the top menu bar to switch between different views:
- **VS Code + Draw.io** - 🆕 🌟 Hybrid interface (LEFT: code, CENTER: canvas, RIGHT: properties)
- **Industrial (CSS Grid)** - Engineering-focused layout with semantic HTML, AI modes, Terminal panel
- **Editor (Desktop)** - Main DSL diagram editor with split view
- **Responsive Layouts** - Tablet (768px) and Mobile (375px) views
- **Documentation** - Help screen with navigation and code examples
- **Version Comparison** - Side-by-side diff with sync scrolling
- **Project Dashboard** - Grid layout with project cards
- **UI Components** - Component library showcase
- **AI Assistant** - Toggle the floating AI chat panel

### Project Structure
```
src/
├── app/
│   ├── App.tsx                    # Main application entry
│   └── components/
│       ├── ViewSwitcher.tsx       # Navigation between all views
│       ├── ResponsiveApp.tsx      # Responsive editor layout
│       ├── Documentation.tsx      # Help/docs screen
│       ├── VersionDiff.tsx        # Version comparison interface
│       ├── ProjectDashboard.tsx   # Project grid dashboard
│       ├── AIAssistant.tsx        # Floating AI chat panel
│       ├── ActivityBar.tsx        # Left activity bar (48px)
│       ├── ExplorerSidebar.tsx    # File tree sidebar (260px)
│       ├── CodeEditor.tsx         # Monaco-style editor
│       ├── DiagramCanvas.tsx      # Node-link diagram
│       ├── Header.tsx             # Top header bar
│       ├── StatusBar.tsx          # Bottom status bar
│       ├── ComponentShowcase.tsx  # Component demo page
│       └── ui/                    # Reusable UI components
│           ├── PrimaryButton.tsx
│           ├── ToolbarButton.tsx
│           ├── Input.tsx
│           ├── Textarea.tsx
│           ├── DiagramNode.tsx
│           ├── Tooltip.tsx
│           ├── LoadingSpinner.tsx
│           ├── AnimatedRunButton.tsx
│           ├── SidebarToggle.tsx
│           └── HamburgerButton.tsx
├── styles/
│   ├── theme.css              # UDL Editor design tokens
│   ├── fonts.css              # Inter + Fira Code imports
│   └── tailwind.css           # Tailwind v4 setup
```

## 🎨 Design Tokens

### Colors
```css
--color-primary: #007ACC;      /* Action Blue */
--color-success: #28A745;      /* Success Green */
--color-purple: #9D5BD2;       /* AI/Special actions */
--color-error: #F48771;        /* Error/Warning */

--bg-base: #1E1E1E;            /* Main background */
--bg-sidebar: #252526;         /* Sidebar/panels */
--bg-activity-bar: #333333;    /* Activity bar */
--bg-input: #3C3C3C;           /* Input fields */

--text-primary: #CCCCCC;       /* Primary text */
--text-secondary: #858585;     /* Secondary text */

--border-default: #3E3E42;     /* Default borders */
--border-focus: #007ACC;       /* Focus state */
```

### Typography
```css
--font-ui: 'Inter', sans-serif;
--font-editor: 'Fira Code', monospace;

/* UI Text: 12px regular */
/* Editor Text: 14px regular, line-height 1.6 */
```

## 📦 Dependencies

- **react-resizable-panels** - Split pane layout with draggable resize
- **lucide-react** - Icon system (16px, stroke 1.5)
- **React 18** - UI framework
- **Tailwind CSS v4** - Utility-first CSS

## 🎯 Features

### Main Editor
- Monaco-style syntax highlighting
- Line numbers
- UDL language support
- Fira Code font with ligatures
- Decorators (@primary, @unique, @foreign)
- Entity/enum/property highlighting

### Diagram Canvas
- Infinite canvas with grid background
- Draggable nodes with connection ports
- Automatic edge routing with arrows
- Pan-able viewport
- Hover effects with glow
- Rubber-band connections during drag

### Responsive Design
- **Desktop (1024px+):** Full 3-column layout
- **Tablet (768px):** Hamburger menu, vertical split editor/canvas
- **Mobile (375px):** Icon-only header, floating Code/Canvas toggle
- Font sizes remain at 12px for readability

### Documentation System
- Searchable navigation tree
- Syntax-highlighted code examples
- Copy button for code blocks
- Smooth page transitions (200ms fade-in)
- Topics: Getting Started, UDL Syntax, IDEF0, Petri Nets

### Version Control
- Side-by-side diff view
- Red highlighting for removals
- Green highlighting for additions
- Timeline sidebar with commits
- Diagram preview with changed nodes
- Sync-scrolling (1:1 ratio)
- Revert and Merge actions

### Project Dashboard
- 4-column grid layout (300×200px cards)
- Notation badges (UML, DFD, IDEF0, Petri Net, BPMN)
- Hover scale effect (1.05x)
- Search and filter by notation type
- Sort by date/name
- Responsive list view on mobile
- Storage usage indicator

### AI Assistant
- Floating panel (320×480px)
- Chat interface with user/AI bubbles
- Smart action buttons inline
- Typing indicator with bouncing dots
- Auto-expanding text input
- Minimize to circular button
- Slide-up animation (300ms)

### Interactive Components
- Animated Run button with loading spinner
- Tooltips with 400ms delay
- Collapsible sidebar (300ms transitions)
- Resizable panel layout
- Full keyboard navigation support

## 🏗️ Architecture

### Component Design Principles
- **Atomic Design:** Small, reusable components
- **VS Code Inspired:** Professional desktop tool aesthetic
- **Accessibility:** Keyboard navigation, focus indicators
- **Performance:** Optimized re-renders, smooth animations
- **Type Safety:** Full TypeScript support

### State Management
- Local component state for UI interactions
- Controlled components for forms
- Lift state for shared data (diagram nodes)

## 📚 Documentation

1. **[UDL-Editor-Guidelines.md](./UDL-Editor-Guidelines.md)** - Complete design system specification
2. **[UI-COMPONENTS.md](./UI-COMPONENTS.md)** - Component library documentation

## 🎨 Color Palette

| Name | Hex | Usage |
|------|-----|-------|
| Action Blue | #007ACC | Primary actions, links, focus |
| Success Green | #28A745 | Success states, Run button |
| AI Purple | #9D5BD2 | AI/special features |
| Error Coral | #F48771 | Errors, destructive actions |
| Base Dark | #1E1E1E | Main background |
| Sidebar Dark | #252526 | Sidebar, panels |
| Activity Bar | #333333 | Left activity bar |
| Input Dark | #3C3C3C | Input backgrounds |
| Border Gray | #3E3E42 | Default borders |
| Text Light | #CCCCCC | Primary text |
| Text Muted | #858585 | Secondary text |

## ✨ Animations

- **Tooltip fade-in:** 200ms ease-out with 400ms delay
- **Loading spinner:** 1s linear infinite rotation
- **Sidebar toggle:** 300ms ease-in-out width transition
- **Button hover:** Instant color transitions
- **Panel resize:** Smooth draggable behavior
- **Node drag:** Real-time rubber-band connections

## 🔧 Customization

### Changing Theme Colors
Edit `src/styles/theme.css` to customize design tokens.

### Adding New Components
1. Create in `src/app/components/ui/`
2. Follow UDL Editor design system specs
3. Export from `ui/index.tsx`
4. Add to ComponentShowcase for demo

### Modifying Layout
Adjust `src/app/App.tsx` and individual layout components (ActivityBar, ExplorerSidebar, etc.).

---

**Design System Version:** 1.0  
**Last Updated:** 2026-05-10  
**Built with:** React, Tailwind CSS v4, TypeScript
