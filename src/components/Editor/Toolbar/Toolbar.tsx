import type { Editor } from '@tiptap/react';

import './Toolbar.css';
import { Dropdown } from '@/components/Dropdown/Dropdown.tsx';
import { ToolbarButton } from '@/components/Editor/Toolbar/ToolbarButton.tsx';

interface ToolbarProps {
    editor: Editor;
}

export function Toolbar({ editor }: ToolbarProps) {
    const headingOptions = [
        { value: 'paragraph', label: '본문' },
        { value: 'heading-1', label: '제목 1' },
        { value: 'heading-2', label: '제목 2' },
        { value: 'heading-3', label: '제목 3' },
    ];

    const handleHeadingChange = (value: string | number) => {
        switch (value) {
            case 'heading-1':
                editor.chain().focus().toggleHeading({ level: 1 }).run();
                break;
            case 'heading-2':
                editor.chain().focus().toggleHeading({ level: 2 }).run();
                break;
            case 'heading-3':
                editor.chain().focus().toggleHeading({ level: 3 }).run();
                break;
            default:
                editor.chain().focus().setParagraph().run();
        }
    };

    const getCurrentHeading = () => {
        if (editor.isActive('heading', { level: 1 })) return 'heading-1';
        if (editor.isActive('heading', { level: 2 })) return 'heading-2';
        if (editor.isActive('heading', { level: 3 })) return 'heading-3';
        return 'paragraph';
    };

    const currentHeading =
        headingOptions.find(option => option.value === getCurrentHeading())?.label || '본문';

    const handleFontSizeChange = (value: string | number) => {
        const selection = editor.state.selection;
        if (!selection) return;

        editor.chain().focus().setFontSize(`${value}`).run();
    };

    const fontSizeOptions = [
        { value: '12px', label: '12px' },
        { value: '14px', label: '14px' },
        { value: '16px', label: '16px' },
        { value: '18px', label: '18px' },
        { value: '20px', label: '20px' },
        { value: '24px', label: '24px' },
    ];

    const getCurrentFontSize = () => {
        const selection = editor.state.selection;
        if (!selection) return '16px';

        const marks = editor.state.doc.resolve(selection.from).marks();
        const fontSize = marks.find(mark => mark.type.name === 'textStyle')?.attrs.fontSize;
        return fontSize || '16px';
    };

    const currentFontSize =
        fontSizeOptions.find(option => option.value === getCurrentFontSize())?.label || '16px';

    return (
        <div className="toolbar">
            <div className="toolbar-group">
                <Dropdown
                    trigger={<ToolbarButton dropdown icon="fa-heading" title={currentHeading} />}
                    options={headingOptions}
                    onSelect={handleHeadingChange}
                />
                <Dropdown
                    trigger={
                        <ToolbarButton dropdown icon="fa-text-height" title={currentFontSize} />
                    }
                    options={fontSizeOptions}
                    onSelect={handleFontSizeChange}
                />
            </div>

            <div className="toolbar-group">
                <ToolbarButton
                    icon="fa-bold"
                    title="굵게"
                    isActive={editor.isActive('bold')}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                />
                <ToolbarButton
                    icon="fa-italic"
                    title="기울임"
                    isActive={editor.isActive('italic')}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                />
                <ToolbarButton
                    icon="fa-underline"
                    title="밑줄"
                    isActive={editor.isActive('underline')}
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                />
                <ToolbarButton
                    icon="fa-strikethrough"
                    title="취소선"
                    isActive={editor.isActive('strike')}
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                />
            </div>

            <div className="toolbar-group">
                <ToolbarButton
                    icon="fa-list-ul"
                    title="글머리 기호 목록"
                    isActive={editor.isActive('bulletList')}
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                />
                <ToolbarButton
                    icon="fa-list-ol"
                    title="번호 매기기 목록"
                    isActive={editor.isActive('orderedList')}
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                />
            </div>
        </div>
    );
}
