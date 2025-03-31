import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import FontSize from 'tiptap-extension-font-size';

import { Toolbar } from '@/components/Editor/Toolbar/Toolbar';

import './editor.css';

function Editor() {
    const editor = useEditor({
        extensions: [StarterKit, TextStyle, FontSize, Underline],
        content: '<p>Hello World! 👋</p>',
    });

    if (!editor) return null;

    return (
        <div className="editor-wrapper">
            <Toolbar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
}

export default Editor;
