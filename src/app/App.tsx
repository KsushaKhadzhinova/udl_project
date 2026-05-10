import { ThemeProvider } from './context/ThemeContext';
import { UDLEditorComplete } from './components/UDLEditorComplete';

export default function App() {
  return (
    <ThemeProvider>
      <UDLEditorComplete />
    </ThemeProvider>
  );
}