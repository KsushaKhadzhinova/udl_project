# VS Code + Draw.io Hybrid Interface

Complete specification for the UDL Editor hybrid interface combining VS Code's code editing capabilities with Draw.io's diagramming tools.

---

## 🎯 Design Philosophy

**Concept:** Unified Diagram-as-Code IDE  
**Left Side:** VS Code aesthetic (dark theme, file explorer, code editor)  
**Right Side:** Draw.io functionality (canvas, shapes, properties)  
**Integration:** Bi-directional sync between code and diagram

---

## 🏗️ Layout Structure

```
┌────┬─────────┬──────────────────────┬──────────────┐
│    │         │  File Tabs           │              │
│    │         ├──────────┬───────────┤              │
│ A  │  File   │          │           │  Properties  │
│ c  │  Tree   │  Code    │  Diagram  │   Panel      │
│ t  │         │  Editor  │  Canvas   │  (Draw.io)   │
│ i  │ (VS     │  (VS     │ (Draw.io) │              │
│ v  │ Code)   │ Code)    │           │              │
│ i  │         │          │           │              │
│ t  │         │          │           │              │
│ y  │         │          │           │              │
│    │         ├──────────┴───────────┤              │
│    │         │ Terminal / Problems  │              │
├────┴─────────┴──────────────────────┴──────────────┤
│ Status Bar (VS Code style)                         │
└────────────────────────────────────────────────────┘
```

### Grid Layout

| Section | Width | Style | Source |
|---------|-------|-------|--------|
| **Activity Bar** | 48px | Dark (#333) | VS Code |
| **Sidebar** | 260px | Dark (#252526) | VS Code |
| **Code Editor** | 35% | Dark (#1E1E1E) | VS Code |
| **Canvas** | 45% | White (#FFF) | Draw.io |
| **Properties** | 20% | Light (#F9F9F9) | Draw.io |
| **Bottom Panel** | 250px | Dark (#1E1E1E) | VS Code |
| **Status Bar** | 22px | Blue (#007ACC) | VS Code |

---

## 🎨 VS Code Elements

### 1. Activity Bar (Left, 48px)

**Purpose:** Primary navigation  
**Background:** #333333  
**Icons:** 24px, stroke 1.5

**Items:**
- Explorer (Files icon) - Active by default
- Search (Search icon)
- Source Control (Git icon) - Badge: 2
- Run and Debug (Bug icon)
- Settings (Settings icon) - Bottom

**Active State:**
- 2px blue border-left (#007ACC)
- White icon color (#FFFFFF)

**Implementation:**
```typescript
const activityItems = [
  { id: 'explorer', icon: Files, label: 'Explorer' },
  { id: 'search', icon: Search, label: 'Search' },
  { id: 'git', icon: GitIcon, label: 'Source Control', badge: 2 },
  { id: 'debug', icon: Bug, label: 'Run and Debug' }
];
```

### 2. Sidebar (260px)

**Purpose:** File explorer and workspace navigation  
**Background:** #252526  
**Border:** 1px solid #2B2B2B (right)

**Features:**
- Collapsible tree structure
- File icons per type (.udl, .diagram)
- Nested folders with indentation
- Hover state: #2A2D2E

### 3. File Tabs

**Purpose:** Open file management  
**Background:** #252526  
**Active Tab:** #1E1E1E with 1px top border (#007ACC)

**Tab Content:**
- File name (13px, #FFFFFF active, #969696 inactive)
- Close button (X icon, 12px)
- Dirty indicator (white dot for unsaved)

**Features:**
- Horizontal scroll for many tabs
- Close on middle-click
- More actions menu (•••)

### 4. Code Editor

**Purpose:** UDL code editing  
**Background:** #1E1E1E  
**Font:** Fira Code, 14px, line-height 1.6

**Features:**
- Line numbers (#858585)
- Syntax highlighting
- Minimap (optional)
- Scrollbar customization

**Syntax Colors:**
- Keywords: #569CD6 (blue)
- Types: #4EC9B0 (teal)
- Properties: #9CDCFE (light blue)
- Decorators: #C586C0 (purple)
- Strings: #CE9178 (orange)

### 5. Bottom Panel (Terminal/Problems/Output)

**Purpose:** Console, diagnostics, build output  
**Background:** #1E1E1E  
**Height:** 250px (resizable 150-500px)

**Tabs:**
- Terminal - Command execution
- Problems - Errors/warnings list (badge: error count)
- Output - Build/language server logs
- Debug Console - Debug output

**Terminal:**
- Font: Fira Code, 13px
- Green prompt: `workspace $ `
- Blinking cursor
- Command history

**Problems:**
- Error icon: ✕ (#F48771)
- Warning icon: ⚠ (#CCA700)
- Info icon: ⓘ (#007ACC)
- Click to jump to code location

### 6. Status Bar

**Purpose:** Workspace status and metadata  
**Background:** #007ACC (VS Code blue)  
**Color:** #FFFFFF  
**Height:** 22px

**Left Section:**
- Git branch icon + name
- Sync status (✓ Synced)
- Error/warning count (✕ 1 ⚠ 1)

**Right Section:**
- Cursor position (Ln 12, Col 5)
- Indentation (Spaces: 2)
- Encoding (UTF-8)
- Language mode (UDL)

---

## 🎨 Draw.io Elements

### 1. Canvas (White Background)

**Purpose:** Visual diagram editing  
**Background:** #FFFFFF  
**Grid:** 20px × 20px, #E0E0E0

**Features:**
- Infinite canvas (pan/zoom)
- Grid snapping (optional)
- Zoom: 25% - 200%
- Selection handles (8px squares)

**Tools (Top-Left Toolbar):**
```
┌─────────────────────────┐
│ Select | Pan | Grid     │
└─────────────────────────┘
```

- **Select (V):** Mouse pointer icon, blue active (#007ACC)
- **Pan (H):** Move icon, for canvas dragging
- **Grid Toggle:** Grid3x3 icon

**Zoom Controls (Bottom-Right):**
```
┌────┐
│ +  │ Zoom In
├────┤
│100%│ Current zoom
├────┤
│ -  │ Zoom Out
├────┤
│ ⊡  │ Fit to screen
└────┘
```

**Minimap (Bottom-Left, 180×120px):**
- Layers icon + "Minimap" label
- Gray background (#F5F5F5)
- Mini shapes with 60% opacity
- Viewport indicator (blue rect)

### 2. Diagram Shapes

**Types:**
- Rectangle: Rounded 4px
- Ellipse: Perfect circle/oval
- Diamond: Rotated 45° square

**Default Colors:**
- Start: #4EC9B0 (teal)
- Process: #007ACC (blue)
- Decision: #CCA700 (gold)

**Selection State:**
- 2px blue border (#007ACC) at -4px offset
- 8 resize handles (NW, NE, SW, SE)
- Hover: Drop shadow (0 4px 12px rgba(0,0,0,0.15))

**Connections:**
- 2px gray lines (#858585)
- Arrowhead markers
- Smooth routing (future: auto-routing)

### 3. Properties Panel (Right, 280px)

**Purpose:** Shape styling and configuration  
**Background:** #F9F9F9  
**Border:** 1px solid #E0E0E0 (left)

**Header:**
- "Properties" title (12px, bold)
- Collapse button (Minimize2 icon)

**Collapsible Sections:**

**Style Section (Open):**
- Fill color: Color picker + hex input
- Stroke color: Color picker + width dropdown (1-4px)
- Opacity: Range slider (0-100%)
- Shadow: Checkbox

**Text Section (Open):**
- Font family: Dropdown (Inter, Fira Code, Arial)
- Font size: Number input (8-72)
- Text align: Buttons (Left, Center, Right)

**Arrange Section (Closed):**
- Layer order
- Alignment tools
- Distribution

**Footer:**
- "Apply Changes" button (blue #007ACC, full width)

---

## 🔄 Bi-Directional Sync

### Code → Diagram

**When user edits UDL code:**
1. Parser detects entity/relationship changes
2. Diagram auto-updates node positions
3. New entities appear on canvas
4. Deleted entities fade out

**Example:**
```udl
entity User {
  id: UUID @primary
}
```
→ Blue rectangle appears on canvas labeled "User"

### Diagram → Code

**When user drags shapes on canvas:**
1. Node position updates in metadata
2. Code file gets position annotations (optional)
3. New connections create relationships in code

**Example:**
User drags arrow from User to Order
→ Code adds:
```udl
entity User {
  orders: Order[]
}
```

---

## 🎨 Color System

### VS Code Dark Theme

| Element | Background | Text | Border |
|---------|-----------|------|--------|
| Activity Bar | #333333 | #858585 | #2B2B2B |
| Sidebar | #252526 | #CCCCCC | #2B2B2B |
| Editor | #1E1E1E | #D4D4D4 | #2B2B2B |
| Tabs | #252526 | #969696 | #2B2B2B |
| Tab Active | #1E1E1E | #FFFFFF | #007ACC (top) |
| Status Bar | #007ACC | #FFFFFF | - |
| Terminal | #1E1E1E | #CCCCCC | #2B2B2B |

### Draw.io Light Theme

| Element | Background | Text | Border |
|---------|-----------|------|--------|
| Canvas | #FFFFFF | #000000 | - |
| Grid | transparent | - | #E0E0E0 |
| Toolbar | #FFFFFF | #666666 | #E0E0E0 |
| Properties | #F9F9F9 | #333333 | #E0E0E0 |
| Minimap | #F5F5F5 | - | #E0E0E0 |

### Shape Colors

| Type | Fill | Stroke | Usage |
|------|------|--------|-------|
| Start | #4EC9B0 | #3AAA94 | Entry points |
| Process | #007ACC | #005A9E | Actions |
| Decision | #CCA700 | #AA8800 | Conditionals |
| Error | #F48771 | #D96F5B | Error states |

---

## 📐 Responsive Behavior

### Desktop (1440px+)

**Layout:** Full 3-pane split
- Activity: 48px
- Sidebar: 260px
- Editor: 35%
- Canvas: 45%
- Properties: 20%

### Tablet (1024px)

**Layout:** Sidebar collapsible
- Activity: 48px
- Sidebar: Slide-in overlay
- Editor: 40%
- Canvas: 40%
- Properties: 20%

### Mobile (768px)

**Layout:** Single pane mode
- Hide Activity Bar
- Hide Properties Panel
- Tab switcher: Code ↔ Diagram
- Full-width editor or canvas

---

## ⌨️ Keyboard Shortcuts

| Action | Shortcut | Description |
|--------|----------|-------------|
| **View** | | |
| Toggle Sidebar | Cmd+B | Show/hide file explorer |
| Toggle Properties | Cmd+Shift+P | Show/hide properties |
| Toggle Terminal | Ctrl+` | Show/hide bottom panel |
| **Canvas** | | |
| Select Tool | V | Switch to select mode |
| Pan Tool | H | Switch to pan mode |
| Zoom In | Cmd++ | Increase zoom 10% |
| Zoom Out | Cmd+- | Decrease zoom 10% |
| Fit to Screen | Cmd+0 | Reset zoom to 100% |
| Toggle Grid | Cmd+Shift+G | Show/hide grid |
| **Editing** | | |
| Save | Cmd+S | Save current file |
| Undo | Cmd+Z | Undo last action |
| Redo | Cmd+Shift+Z | Redo last undone action |
| Delete | Delete | Remove selected shape |

---

## 🧩 Component Architecture

```
VSCodeDrawioApp.tsx
├── Activity Bar (VS Code)
│   └── Navigation buttons
├── Sidebar (VS Code)
│   └── ExplorerSidebar
├── Main Content
│   ├── VSCodeTabs
│   ├── 3-Panel Split
│   │   ├── CodeEditor (VS Code)
│   │   ├── DrawioCanvas
│   │   └── PropertiesPanel (Draw.io)
│   └── VSCodeBottomPanel
│       ├── Terminal
│       ├── Problems
│       ├── Output
│       └── Debug Console
└── Status Bar (VS Code)
```

### File Structure

```
src/app/components/
├── VSCodeDrawioApp.tsx           # Main hybrid app
├── vscode/
│   ├── VSCodeTabs.tsx             # File tabs UI
│   └── VSCodeBottomPanel.tsx      # Terminal/Problems/Output
├── drawio/
│   ├── DrawioCanvas.tsx           # Canvas with grid/zoom
│   └── PropertiesPanel.tsx        # Shape properties
├── CodeEditor.tsx                 # Code editing pane
└── ExplorerSidebar.tsx            # File tree
```

---

## 🎯 Key Features

### VS Code Features

✅ Activity Bar navigation  
✅ File explorer tree  
✅ File tabs with dirty indicators  
✅ Syntax-highlighted code editor  
✅ Terminal/Problems/Output panels  
✅ Status bar with metadata  
✅ Dark theme (#1E1E1E, #252526)  
✅ Blue accent color (#007ACC)

### Draw.io Features

✅ White canvas with grid  
✅ Zoom controls (25-200%)  
✅ Pan and select tools  
✅ Shape library (rectangle, ellipse, diamond)  
✅ Drag and drop shapes  
✅ Connection arrows  
✅ Resize handles on selection  
✅ Properties panel (Style, Text, Arrange)  
✅ Minimap overview  
✅ Color picker with hex input

### Unique Hybrid Features

🔄 **Bi-directional sync** (future)  
🎨 **Unified color scheme**  
⚡ **Live updates** (code changes reflect in diagram)  
📊 **Diagram metadata** (positions saved in code)  
🔍 **Jump to definition** (click node → scroll to code)

---

## 🚀 Usage

### Starting the App

1. Open application
2. Navigate to **"VS Code + Draw.io"** in top menu
3. Interface loads with 3-pane split

### Editing Code

1. Select `.udl` file from explorer
2. Edit code in left pane (syntax highlighting)
3. Changes auto-save (or Cmd+S)

### Creating Diagrams

1. Click canvas (center pane)
2. Use toolbar: Select (V) or Pan (H)
3. Drag shapes from future shape library
4. Connect shapes with arrows
5. Adjust properties in right panel

### Customizing Shapes

1. Click shape on canvas (selection handles appear)
2. Right panel shows:
   - Style: Fill color, stroke, opacity
   - Text: Font, size, alignment
3. Modify values
4. Click "Apply Changes"

### Using Terminal

1. Click "Terminal" tab in bottom panel
2. Type commands (simulated)
3. View build output
4. Check "Problems" tab for errors

---

## 🎨 Design Tokens

```css
/* VS Code Dark */
--vscode-activityBar-bg: #333333;
--vscode-sideBar-bg: #252526;
--vscode-editor-bg: #1E1E1E;
--vscode-tab-inactive: #252526;
--vscode-tab-active: #1E1E1E;
--vscode-tab-border-top: #007ACC;
--vscode-statusBar-bg: #007ACC;

/* Draw.io Light */
--drawio-canvas-bg: #FFFFFF;
--drawio-grid-color: #E0E0E0;
--drawio-toolbar-bg: #FFFFFF;
--drawio-properties-bg: #F9F9F9;
--drawio-minimap-bg: #F5F5F5;

/* Shapes */
--shape-start: #4EC9B0;
--shape-process: #007ACC;
--shape-decision: #CCA700;
--shape-error: #F48771;

/* Border Radius */
--radius-vscode: 2px;
--radius-drawio: 4px;
```

---

## 📊 Technical Specifications

| Metric | Value | Context |
|--------|-------|---------|
| **Resizers** | 4px | Between panels |
| **Grid Size** | 20px | Canvas grid |
| **Zoom Range** | 25-200% | Canvas zoom |
| **Tab Height** | 35px | File tabs |
| **Status Height** | 22px | Status bar |
| **Panel Min** | 150px | Bottom panel |
| **Panel Max** | 500px | Bottom panel |
| **Sidebar Width** | 260px | Fixed |
| **Activity Width** | 48px | Fixed |

---

## ✅ Checklist

### VS Code Implementation
- [x] Activity Bar with icons
- [x] File explorer sidebar
- [x] File tabs UI
- [x] Syntax-highlighted editor
- [x] Terminal/Problems/Output panels
- [x] Status bar
- [x] Dark theme colors
- [x] Collapsible sections

### Draw.io Implementation
- [x] White canvas
- [x] Grid background
- [x] Zoom controls (+, -, fit)
- [x] Pan/Select tools
- [x] Shape rendering (rect, ellipse, diamond)
- [x] Selection handles
- [x] Properties panel
- [x] Color picker
- [x] Minimap

### Integration
- [ ] Code → Diagram sync (future)
- [ ] Diagram → Code sync (future)
- [x] Resizable panels
- [x] Unified layout
- [x] Consistent styling

---

**Design Version:** VS Code + Draw.io Hybrid v1.0  
**Last Updated:** 2026-05-10  
**Status:** ✅ Complete
