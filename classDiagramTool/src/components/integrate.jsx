import React from 'react';
import Header from './Header';
import TextEditor from './TextEditor';

function App() {
    return (
        <div className="dark:bg-gray-900 min-h-screen">
            <Header />
            <main className="p-4">
                <TextEditor />
            </main>
        </div>
    );
}

export default App;
