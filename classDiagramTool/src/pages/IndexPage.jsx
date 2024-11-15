import { Tldraw } from 'tldraw';
import 'tldraw/tldraw.css';

const components = {

  ActionsMenu: null,
  HelpMenu: null,
  ZoomMenu: null,
  MainMenu: null,
  Minimap: null,
  DebugPanel: null,
  DebugMenu: null,

};

export default function IndexPage() {
  return (
    <div style={{ position: 'absolute', width: '100%', height: '100vh' }}>
      <Tldraw
        onMount={(editor) => {
          editor.blur(); 
        }}
        components={components}
        persistenceKey="example"
      />
    </div>
  );
}
