# UDL Editor - Responsive Specifications

Complete technical specifications for responsive layouts and new interface screens.

---

## 📱 Responsive Breakpoints

### Desktop (Default)
**Min Width:** 1024px  
**Layout:** 3-column grid (Activity Bar + Sidebar + Split Content)

### Tablet
**Width:** 768px - 1023px  
**Changes:**
- Sidebar → Hamburger menu (slide-in overlay)
- Main workspace → 1-column vertical split
- Editor (top) / Canvas (bottom)
- Resizer changes from horizontal to vertical

### Mobile
**Width:** 375px - 767px  
**Changes:**
- Hide Activity Bar completely
- Sidebar → Hamburger menu only
- Header toolbar → Icons only (no text labels)
- Canvas becomes full-screen
- Floating 'Code' toggle button to switch views
- Font sizes remain at 12px for readability
- Status bar remains visible

---

## 📐 Element Specifications

| Element | Width / Height | Styles / Colors |
|---------|---------------|-----------------|
| **Header** | Height: 35px | #252526, Bottom border 1px #3C3C3C |
| **Activity Bar** | Width: 48px | #333333, Icons center-aligned |
| **Sidebar** | Width: 260px | #252526, Text color #858585 |
| **Status Bar** | Height: 22px | #007ACC (Blue), White text 11px |
| **Resizer Bar** | Width: 4px | #3C3C3C, Hover color #007ACC |
| **Buttons** | Padding: 4px 12px | Border-radius: 2px |
| **Editor Font** | 14px | Fira Code (Monospace) |

---

## 🖥️ Screen Modules

### 1. Documentation/Help Screen
**Dimensions:** 1440 × 1080px

#### Layout
```
┌─────────────┬────────────────────────────────────┐
│             │                                    │
│  Sidebar    │  Content Area                     │
│  (250px)    │  (900px)                          │
│             │                                    │
│  - Search   │  # Heading (14px, #E1E1E1)        │
│  - Nav Tree │  Body text (#858585)              │
│             │                                    │
│             │  ```code                          │
│             │  // Syntax highlighted            │
│             │  ```                              │
│             │                                    │
└─────────────┴────────────────────────────────────┘
```

**Components:**
- **Left Sidebar:** Navigation tree with sections
  - Getting Started
  - UDL Syntax
  - IDEF0 Standards
  - Petri Nets Theory
- **Search Bar:** 28px height, rounded 2px, floating at top
- **Content Area:** Rich text (Markdown style)
  - Headings: #E1E1E1
  - Body text: #858585
- **Code Blocks:** Fira Code font with 'Copy' button (top right)
- **Animation:** Smooth scroll, fade-in 200ms for page transitions

**Responsive (Mobile):**
- Hidden sidebar menu
- Single-column reading layout
- Search becomes full-width at top

---

### 2. Version Comparison (Diff)
**Dimensions:** 1440 × 900px

#### Layout
```
┌──────────┬─────────────┬─────────────┐
│ Timeline │  Original   │  Modified   │
│ Sidebar  │  (Red -)    │  (Green +)  │
│ (280px)  │             │             │
│          │  Code       │  Code       │
│ Commits: │  Editor     │  Editor     │
│ • a3f8b2c│             │             │
│ • f2c91d4│             │             │
│          │             │             │
│ [Revert] ├─────────────┴─────────────┤
│ [Merge]  │  Diagram Preview          │
│          │  (Side-by-side)           │
└──────────┴───────────────────────────┘
```

**Features:**
- **Split Screen:** 50/50 left (original) / right (modified)
- **Highlighting:**
  - Removed lines: Red background (#F4877120), red border-left
  - Added lines: Green background (#28A74520), green border-left
- **Timeline Sidebar:**
  - Vertical commit list
  - Timestamps, author names, short messages
  - Active commit highlighted
- **Actions:**
  - 'Revert to this version' button (Blue #007ACC)
  - 'Merge' button (Green #28A745)
- **Diagram Preview:** Below code, changed nodes with dashed blue stroke
- **Animation:** Sync-scrolling 1:1 ratio between left/right panes

**Responsive (Mobile):**
- Vertical stack (Code over Code)
- Timeline becomes horizontal tabs
- Swipe to switch between versions

---

### 3. Project Dashboard
**Dimensions:** 1440 × 1200px

#### Layout
```
┌──────────┬────────────────────────────────────────┐
│          │ Search & Filter Bar                    │
│ Sidebar  ├────────────────────────────────────────┤
│ (240px)  │                                        │
│          │  ┌────┐ ┌────┐ ┌────┐ ┌────┐          │
│ Avatar   │  │Card│ │Card│ │Card│ │Card│          │
│ Name     │  └────┘ └────┘ └────┘ └────┘          │
│          │                                        │
│ • My     │  ┌────┐ ┌────┐ ┌────┐ ┌────┐          │
│   Projects│  │Card│ │Card│ │Card│ │Card│          │
│ • Shared │  └────┘ └────┘ └────┘ └────┘          │
│ • Trash  │                                        │
│          │                                        │
│ Storage  │                                        │
└──────────┴────────────────────────────────────────┘
```

**Project Card:**
- **Size:** 300px × 200px
- **Structure:**
  - Top 70% (140px): Preview image/diagram thumbnail
  - Bottom 30% (60px): Project name, notation badge, last edited
- **Hover Effect:** Scale 1.05x with drop shadow (rgba(0,0,0,0.2))
- **Badge Colors:**
  - UML: #007ACC
  - DFD: #28A745
  - IDEF0: #9D5BD2
  - Petri Net: #F48771
  - BPMN: #FFC107

**Sidebar Components:**
- Account info (Avatar circle, Name, Email)
- Navigation: My Projects, Shared with me, Trash
- Storage indicator with progress bar

**Top Bar:**
- Search field (full-width search)
- Dropdown: 'Notation Type' filter
- Dropdown: 'Sort by Date'

**Responsive (Mobile 375px):**
- Switch to 1-column list view
- Smaller thumbnails (80px × 80px)
- Card becomes horizontal layout
- Sidebar hidden behind hamburger menu

---

### 4. AI Assistant Panel
**Dimensions:** 320px × 480px (floating)

#### Layout
```
┌─────────────────────────────┐
│ ✨ AI Assistant        [—][×]│
├─────────────────────────────┤
│                             │
│  User bubble (dark gray)    │
│                             │
│      AI bubble (purple)     │
│      [Apply fix to code]    │
│      [Explain this node]    │
│                             │
│  User bubble (dark gray)    │
│                             │
│      • • •  (typing)        │
├─────────────────────────────┤
│ [📎]  [Text input...]  [→] │
└─────────────────────────────┘
```

**Position:** Fixed bottom-right corner  
**z-index:** 100

**Components:**
- **Header:**
  - Sparkles icon + "AI Assistant" text
  - Minimize and close buttons
- **Chat History:**
  - User messages: Dark gray background (#3C3C3C)
  - AI messages: Dark purple background (#4B2C85)
  - Timestamp below each message (9px)
- **Smart Actions:** Inline buttons in AI messages
  - "Apply fix to code"
  - "Explain this node"
  - "Convert to BPMN"
- **Input Bar:**
  - Auto-expanding textarea (min 36px, max 120px)
  - Attach button (📎 icon)
  - Send button (→ icon, #007ACC)
- **Typing Indicator:** 3 bouncing dots animation

**Animations:**
- **Entry:** Slide-up from bottom (300ms ease-out)
- **Typing:** Dots bounce with 150ms delay between each
- **Minimize:** Collapses to floating circle button (56px diameter)

**Minimized State:**
- Circular button with Sparkles icon
- Purple background (#9D5BD2)
- Hover: Scale 1.05x
- Click to restore panel

---

## 🎬 Animation Specifications

### 1. Resizer Panel (Drag)
**Trigger:** On Drag  
**Animation:** Smart Animate  
**Effect:** Smooth column width adjustment  
**Implementation:** Use Smart Animate in Figma with On Drag trigger

### 2. Code-to-Diagram Sync
**Trigger:** On Run button click  
**Delay:** 400ms  
**Animation:** Dissolve  
**Effect:** Canvas elements fade in (simulates rendering)

### 3. Tooltip
**Trigger:** While Hovering  
**Animation:** Move In (200ms ease-out)  
**Offset:** 8px upward  
**Delay:** 400ms before appearing

### 4. Sidebar Toggle
**Duration:** 300ms  
**Easing:** ease-in-out  
**Effect:** Width animates 260px → 0px (collapse) / 0px → 260px (expand)

### 5. AI Panel Slide-Up
**Duration:** 300ms  
**Easing:** ease-out  
**Transform:** translateY(20px) → translateY(0)  
**Opacity:** 0 → 1

### 6. Card Hover (Dashboard)
**Duration:** 200ms  
**Easing:** ease-out  
**Transform:** scale(1) → scale(1.05)  
**Shadow:** 0 → 0 8px 24px rgba(0,0,0,0.4)

### 7. Typing Indicator
**Duration:** 1s per cycle  
**Animation:** Bounce (infinite)  
**Delay Pattern:** 0ms, 150ms, 300ms (staggered)

### 8. Page Fade-In (Documentation)
**Duration:** 200ms  
**Easing:** ease-out  
**Transform:** translateY(8px) → translateY(0)  
**Opacity:** 0 → 1

---

## 🔧 Technical Implementation Notes

### Sync Scrolling (Version Diff)
```javascript
useEffect(() => {
  const handleScroll = (source, target) => {
    return () => {
      target.scrollTop = source.scrollTop;
    };
  };

  const leftHandler = handleScroll(leftRef.current, rightRef.current);
  const rightHandler = handleScroll(rightRef.current, leftRef.current);

  leftRef.current.addEventListener('scroll', leftHandler);
  rightRef.current.addEventListener('scroll', rightHandler);

  return () => {
    leftRef.current.removeEventListener('scroll', leftHandler);
    rightRef.current.removeEventListener('scroll', rightHandler);
  };
}, []);
```

### Auto-Expanding Textarea (AI Assistant)
```javascript
useEffect(() => {
  if (textareaRef.current) {
    textareaRef.current.style.height = 'auto';
    const newHeight = Math.min(textareaRef.current.scrollHeight, 120);
    textareaRef.current.style.height = `${newHeight}px`;
  }
}, [inputValue]);
```

### Responsive Breakpoint Detection
```javascript
const [windowWidth, setWindowWidth] = useState(window.innerWidth);

useEffect(() => {
  const handleResize = () => setWindowWidth(window.innerWidth);
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

const isMobile = windowWidth < 768;
const isTablet = windowWidth >= 768 && windowWidth < 1024;
```

---

## 📱 Mobile-Specific Adjustments

### Header (Mobile)
- Show hamburger menu icon
- Icon-only buttons (remove text labels)
- File path becomes single filename only

### Navigation
- Sidebar slides in from left as overlay
- Backdrop overlay (rgba(0,0,0,0.5)) when sidebar open
- Click outside to close

### Editor/Canvas Toggle
- Floating button bottom-right
- Background: #007ACC
- Icon: Code (16px)
- Label: "Code" or "Canvas" (toggle state)
- z-index: 10 (above content, below AI assistant)

### Status Bar
- Remains visible
- Condensed info (Git + Language only)
- Additional mobile view indicator

---

## 🎯 Checklist for Figma Implementation

- [ ] Header: 35px height, #252526, border-bottom 1px #3C3C3C
- [ ] Activity Bar: 48px width, #333333, centered icons
- [ ] Sidebar: 260px width, #252526, text #858585
- [ ] Status Bar: 22px height, #007ACC, white text 11px
- [ ] Resizer: 4px width, #3C3C3C, hover #007ACC
- [ ] Buttons: 4px/12px padding, 2px border-radius
- [ ] Editor Font: 14px Fira Code
- [ ] Documentation: 250px sidebar + 900px content
- [ ] Version Diff: 280px timeline + 50/50 split
- [ ] Dashboard: 240px sidebar + 300×200px cards
- [ ] AI Panel: 320×480px, bottom-right fixed
- [ ] All animations: Proper easing and duration
- [ ] Responsive: Test at 375px, 768px, 1024px, 1440px

---

**Last Updated:** 2026-05-10  
**Design System:** UDL Editor v1.0  
**Responsive Version:** 1.0.0
