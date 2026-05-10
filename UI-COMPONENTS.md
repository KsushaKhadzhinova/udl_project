# UDL Editor UI Components Library

Complete set of production-ready UI components for the UDL Editor design system.

## Components Overview

### 1. Primary Button
**File:** `src/app/components/ui/PrimaryButton.tsx`

**Specifications:**
- Height: 28px
- Padding: 4px vertical, 12px horizontal
- Border radius: 2px
- Icon + Label layout
- Variants: primary, success, purple, error

**States:**
- Default: Base color (#007ACC for primary)
- Hover: Lighten 10% (#0098FF)
- Active: Darken 5% (#005A9E)
- Disabled: 50% opacity

**Usage:**
```tsx
import { PrimaryButton } from './components/ui/PrimaryButton';
import { Save } from 'lucide-react';

<PrimaryButton icon={Save} label="Save" variant="primary" />
<PrimaryButton icon={Play} label="Run" variant="success" />
<PrimaryButton icon={Sparkles} label="AI Fix" variant="purple" />
```

---

### 2. Toolbar Button
**File:** `src/app/components/ui/ToolbarButton.tsx`

**Specifications:**
- Size: 28x28px square
- Background: #444444 (flat style)
- No border
- Icon only (16px, stroke 1.5)
- Includes tooltip integration

**States:**
- Default: #444 background
- Hover: #555 background
- Active: #007ACC background (blue)
- Disabled: 30% opacity

**Usage:**
```tsx
import { ToolbarButton } from './components/ui/ToolbarButton';
import { Copy } from 'lucide-react';

<ToolbarButton icon={Copy} tooltip="Copy to clipboard" />
<ToolbarButton icon={Settings} tooltip="Settings" active />
```

---

### 3. Input
**File:** `src/app/components/ui/Input.tsx`

**Specifications:**
- Height: 28px
- Background: #1E1E1E (dark)
- Border: 1px solid #3C3C3C
- Padding: 0 8px
- Font: Inter, 12px

**States:**
- Default: Border #3C3C3C
- Focus: Border + outline #007ACC (1px solid blue)
- Disabled: 50% opacity

**Usage:**
```tsx
import { Input } from './components/ui/Input';

<Input placeholder="Enter text..." />
<Input type="password" placeholder="Password" />
<Input type="number" placeholder="Number" disabled />
```

---

### 4. Textarea
**File:** `src/app/components/ui/Textarea.tsx`

**Specifications:**
- Background: #1E1E1E
- Border: 1px solid #3C3C3C
- Padding: 8px
- Font: Inter or Fira Code (monospace option)
- Resize: None

**States:**
- Default: Border #3C3C3C
- Focus: Border + outline #007ACC
- Disabled: 50% opacity

**Usage:**
```tsx
import { Textarea } from './components/ui/Textarea';

<Textarea placeholder="Description..." rows={4} />
<Textarea placeholder="Code..." monospace rows={6} />
```

---

### 5. Diagram Node
**File:** `src/app/components/ui/DiagramNode.tsx`

**Specifications:**
- Width: 200px
- Background: White (#FFFFFF)
- Text: Black (#000000)
- Border radius: 4px
- Border: 2px solid (color varies)
- Connection ports: 4 sides (small 8px dots)

**States:**
- Default: No shadow
- Hover: Blue glow effect `drop-shadow(0 0 8px rgba(0,122,204,0.5))`
- Dragging: Cursor changes to grabbing

**Features:**
- Draggable (with rubber-band connection lines)
- Connection ports on top, right, bottom, left
- Color-coded by type (entity, enum, etc.)

**Usage:**
```tsx
import { DiagramNode } from './components/ui/DiagramNode';

<DiagramNode
  id="user"
  x={150}
  y={100}
  label="User"
  properties={['id: UUID', 'name: String']}
  color="#007ACC"
  onDrag={handleNodeDrag}
/>
```

---

### 6. Tooltip
**File:** `src/app/components/ui/Tooltip.tsx`

**Specifications:**
- Background: #000000 (black)
- Text color: White
- Font size: 10px
- Padding: 4px 8px
- Delay: 400ms before show
- Animation: Fade-in (200ms ease-out)

**Usage:**
```tsx
import { Tooltip } from './components/ui/Tooltip';

<Tooltip content="Save file">
  <button>Save</button>
</Tooltip>

<Tooltip content="Custom delay" delay={600}>
  <span>Hover me</span>
</Tooltip>
```

---

### 7. Loading Spinner
**File:** `src/app/components/ui/LoadingSpinner.tsx`

**Specifications:**
- Size: 16px default (customizable)
- Animation: Linear infinite rotation (1s)
- Color: Customizable (default white)

**Usage:**
```tsx
import { LoadingSpinner } from './components/ui/LoadingSpinner';

<LoadingSpinner size={14} color="#FFFFFF" />
<LoadingSpinner size={24} color="#007ACC" />
```

---

### 8. Animated Run Button
**File:** `src/app/components/ui/AnimatedRunButton.tsx`

**Specifications:**
- Base: Primary button (28px height)
- Icon swap: Play → Loading Spinner during execution
- Auto-returns to Play icon after completion

**Interaction:**
1. User clicks "Run"
2. Icon changes to rotating spinner
3. Label changes to "Running..."
4. After async operation completes, reverts to "Run" + Play icon

**Usage:**
```tsx
import { AnimatedRunButton } from './components/ui/AnimatedRunButton';

const handleRun = async () => {
  await fetch('/api/build');
};

<AnimatedRunButton onRun={handleRun} />
```

---

### 9. Sidebar Toggle
**File:** `src/app/components/ui/SidebarToggle.tsx`

**Specifications:**
- Button: 28x28px toolbar button
- Transition: 300ms ease-in-out
- Smooth slide animation (width: 260px → 0)

**Usage:**
```tsx
import { SidebarToggle } from './components/ui/SidebarToggle';

<SidebarToggle defaultOpen={true}>
  <YourSidebarContent />
</SidebarToggle>
```

---

## Interaction States Summary

| Component | Hover | Active | Focus | Disabled |
|-----------|-------|--------|-------|----------|
| Primary Button | Lighten 10% | Darken 5% | - | 50% opacity |
| Toolbar Button | #555 bg | #007ACC bg | - | 30% opacity |
| Input | - | - | Blue outline | 50% opacity |
| Textarea | - | - | Blue outline | 50% opacity |
| Diagram Node | Blue glow | - | - | - |
| Tooltip | - | - | - | - |

---

## Animation Specifications

### Tooltip Fade-In
```css
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}
/* Duration: 200ms ease-out */
/* Delay: 400ms */
```

### Loading Spinner
```css
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
/* Duration: 1s linear infinite */
```

### Sidebar Toggle
```css
transition: width 300ms ease-in-out;
/* Width: 260px → 0 (collapse) */
```

### Panel Resizer
```css
/* Hover: Width 1px → 1.5px */
/* Background: #3E3E42 → #007ACC */
transition: all 150ms ease;
```

---

## Design Tokens Reference

```css
/* Colors */
--color-primary: #007ACC;
--color-success: #28A745;
--color-purple: #9D5BD2;
--color-error: #F48771;

/* Backgrounds */
--bg-base: #1E1E1E;
--bg-sidebar: #252526;
--bg-input: #3C3C3C;
--bg-toolbar-btn: #444444;

/* Text */
--text-primary: #CCCCCC;
--text-secondary: #858585;

/* Borders */
--border-default: #3E3E42;
--border-focus: #007ACC;

/* Typography */
--font-ui: 'Inter', sans-serif;
--font-editor: 'Fira Code', monospace;
```

---

## File Structure

```
src/app/components/ui/
├── index.tsx                  # Barrel export
├── PrimaryButton.tsx          # Main action buttons
├── ToolbarButton.tsx          # Icon-only toolbar buttons
├── Input.tsx                  # Text input field
├── Textarea.tsx               # Multi-line input
├── DiagramNode.tsx            # Draggable diagram node
├── Tooltip.tsx                # Hover tooltip
├── LoadingSpinner.tsx         # Animated spinner
├── AnimatedRunButton.tsx      # Run button with state
└── SidebarToggle.tsx          # Collapsible sidebar
```

---

## Component Showcase

Run the application and click "Show Components" button to see an interactive demo of all components with live interaction states.

**Features:**
- Live hover/active state demonstrations
- Draggable diagram nodes with connection lines
- Interactive tooltips with delay
- Animated run button execution
- Form inputs with focus states

---

## Integration Example

```tsx
import { PrimaryButton, ToolbarButton, Input, DiagramNode } from './components/ui';
import { Save, Play, Settings } from 'lucide-react';

function MyEditor() {
  return (
    <div>
      {/* Header Actions */}
      <PrimaryButton icon={Save} label="Save" variant="primary" />
      <PrimaryButton icon={Play} label="Run" variant="success" />

      {/* Toolbar */}
      <ToolbarButton icon={Settings} tooltip="Settings" />

      {/* Properties Panel */}
      <Input placeholder="Node name..." />

      {/* Canvas */}
      <DiagramNode
        id="node1"
        x={100}
        y={100}
        label="Entity"
        properties={['id: UUID']}
        color="#007ACC"
      />
    </div>
  );
}
```

---

**Last Updated:** 2026-05-10  
**Design System:** UDL Editor v1.0  
**Component Library Version:** 1.0.0
