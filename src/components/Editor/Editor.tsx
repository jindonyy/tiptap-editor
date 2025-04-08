import Link from '@tiptap/extension-link';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import FontSize from 'tiptap-extension-font-size';

import { Toolbar } from '@/components/Editor/Toolbar/Toolbar';

import './editor.css';

function Editor() {
    const editor = useEditor({
        extensions: [
            StarterKit,
            TextStyle,
            FontSize,
            Underline,
            Table.configure({
                resizable: true,
                handleWidth: 5,
                cellMinWidth: 50,
            }),
            TableRow,
            TableHeader,
            TableCell,
            Link,
        ],
        injectCSS: false,
        content: '',
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
