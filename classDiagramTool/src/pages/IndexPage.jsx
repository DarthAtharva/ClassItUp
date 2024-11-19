import React, { useRef, useEffect } from 'react';
import { Tldraw } from 'tldraw';
import domtoimage from 'dom-to-image';
import 'tldraw/tldraw.css';

// Define which components to exclude from Tldraw
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
  const editorRef = useRef(null);
  const tldrawContainerRef = useRef(null);
  const drawingCanvasRef = useRef(null);

  useEffect(() => {
    const locateCanvas = () => {
      if (tldrawContainerRef.current) {
        // Update this selector if necessary based on Tldraw's DOM structure
        drawingCanvasRef.current = tldrawContainerRef.current.querySelector('.tl-canvas');

        if (!drawingCanvasRef.current) {
          console.error('Drawing canvas element not found. Please verify the selector.');
        } else {
          console.log('Successfully located the drawing canvas element:', drawingCanvasRef.current);
        }
      }
    };

    const timeout = setTimeout(locateCanvas, 100); 
    return () => clearTimeout(timeout);
  }, []);

  const handleExport = async () => {
    if (!drawingCanvasRef.current) {
      console.error('Drawing canvas reference is not initialized.');
      alert('Canvas is not ready for export.');
      return;
    }

    try {
      console.log('Attempting to export only the drawing canvas with dom-to-image...');
      const dataUrl = await domtoimage.toPng(drawingCanvasRef.current);

      // Create a link to download the PNG file
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = 'canvas-export.png';
      link.click();

      console.log('Export successful using dom-to-image on the drawing canvas only.');
    } catch (error) {
      console.error('Error during export with dom-to-image:', error);
      alert('An error occurred during export. Check the console for details.');
    }
  };

  return (
    <div style={{ position: 'absolute', width: '100%', height: '100vh' }}>
      {/* Styled Export Button */}
      <div style={{ position: 'absolute', top: 0, left: 275, zIndex: 1000 }}>
        <button onClick={handleExport} style={buttonStyle}>
          Export Canvas
        </button>
      </div>

      {/* Tldraw Component Container */}
      <div ref={tldrawContainerRef} style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
        <Tldraw
          onMount={(editor) => {
            editorRef.current = editor;
            console.log('Editor instance mounted:', editor);
          }}
          components={components}
          persistenceKey="example"
        />
      </div>
    </div>
  );
}

// CSS styling for the export button
const buttonStyle = {
  padding: '8px 20px',
  // margin: '5px',
  fontSize: '16px',
  fontWeight: 'bold',
  backgroundColor: '#3182ED',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

buttonStyle[':hover'] = {
  backgroundColor: '#45a049',
};

buttonStyle[':active'] = {
  backgroundColor: '#3e8e41',
};