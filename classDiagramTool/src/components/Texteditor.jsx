import React, { useState } from 'react';

export default function TextEditor() {
    const [content, setContent] = useState('');

    const handleInputChange = (e) => {
        setContent(e.target.innerHTML);
    };

    const execCommand = (command) => {
        document.execCommand(command, false, null);
    };

    return (
        <div className="p-4">
            <div className="flex gap-2 mb-4">
                <button
                    onClick={() => execCommand('bold')}
                    className="p-2 bg-gray-100 dark:bg-gray-800 dark:text-white rounded shadow"
                >
                    Bold
                </button>
                <button
                    onClick={() => execCommand('italic')}
                    className="p-2 bg-gray-100 dark:bg-gray-800 dark:text-white rounded shadow"
                >
                    Italic
                </button>
                <button
                    onClick={() => execCommand('underline')}
                    className="p-2 bg-gray-100 dark:bg-gray-800 dark:text-white rounded shadow"
                >
                    Underline
                </button>
                <button
                    onClick={() => execCommand('justifyLeft')}
                    className="p-2 bg-gray-100 dark:bg-gray-800 dark:text-white rounded shadow"
                >
                    Align Left
                </button>
                <button
                    onClick={() => execCommand('justifyCenter')}
                    className="p-2 bg-gray-100 dark:bg-gray-800 dark:text-white rounded shadow"
                >
                    Align Center
                </button>
                <button
                    onClick={() => execCommand('justifyRight')}
                    className="p-2 bg-gray-100 dark:bg-gray-800 dark:text-white rounded shadow"
                >
                    Align Right
                </button>
                <button
                    onClick={() => execCommand('insertUnorderedList')}
                    className="p-2 bg-gray-100 dark:bg-gray-800 dark:text-white rounded shadow"
                >
                    Bullet List
                </button>
                <button
                    onClick={() => execCommand('insertOrderedList')}
                    className="p-2 bg-gray-100 dark:bg-gray-800 dark:text-white rounded shadow"
                >
                    Numbered List
                </button>
                <button
                    onClick={() => execCommand('undo')}
                    className="p-2 bg-gray-100 dark:bg-gray-800 dark:text-white rounded shadow"
                >
                    Undo
                </button>
                <button
                    onClick={() => execCommand('redo')}
                    className="p-2 bg-gray-100 dark:bg-gray-800 dark:text-white rounded shadow"
                >
                    Redo
                </button>
            </div>

            <div
                contentEditable="true"
                onInput={handleInputChange}
                className="border border-gray-300 dark:border-gray-600 p-4 min-h-[200px] rounded-md focus:outline-none dark:bg-gray-900 dark:text-white"
                style={{ whiteSpace: 'pre-wrap' }}
            >
                Start typing here...
            </div>

            <div className="mt-4">
                <h2 className="text-lg font-bold dark:text-white">Editor Output:</h2>
                <div className="p-2 bg-gray-100 dark:bg-gray-800 dark:text-white rounded-md">
                    {content}
                </div>
            </div>
        </div>
    );
}
