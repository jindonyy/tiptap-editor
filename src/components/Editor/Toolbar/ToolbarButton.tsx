import './ToolbarButton.css';

export interface ToolbarButtonProps {
    icon: string;
    title: string;
    isActive?: boolean;
    onClick?: () => void;
    children?: React.ReactNode;
    dropdown?: boolean;
}

export function ToolbarButton({
    icon,
    title,
    isActive = false,
    onClick,
    children,
    dropdown = false,
}: ToolbarButtonProps) {
    return (
        <button
            className={`toolbar-button ${isActive ? 'active' : ''}`}
            onMouseDown={e => {
                e.preventDefault();
                onClick?.();
            }}
            title={title}
        >
            <i className={`fas ${icon}`} />
            {children}
            {dropdown && <i className="dropdown-icon fa-solid fa-chevron-down" />}
        </button>
    );
}
