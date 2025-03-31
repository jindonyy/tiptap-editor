import { useEffect, useRef, useState } from 'react';
import React from 'react';
import './Dropdown.css';

interface Option {
    value: string | number;
    label: React.ReactNode;
}

export interface DropdownProps {
    trigger: React.ReactElement<{ onClick?: () => void }>;
    options?: Option[];
    onSelect?: (value: string) => void;
    children?: React.ReactNode;
}

export function Dropdown({ trigger, options, onSelect, children }: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const triggerWithClick = React.cloneElement(trigger, {
        onClick: () => {
            setIsOpen(prev => !prev);
            trigger.props.onClick?.();
        },
    });

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div className="dropdown" ref={dropdownRef}>
            {triggerWithClick}
            {isOpen && (
                <div className="dropdown-content">
                    <div className="dropdown-options">
                        {children ||
                            (options &&
                                onSelect &&
                                options.map(option => (
                                    <button
                                        key={option.value}
                                        onMouseDown={e => {
                                            e.preventDefault();
                                            onSelect(option.value.toString());
                                        }}
                                    >
                                        {option.label}
                                    </button>
                                )))}
                    </div>
                </div>
            )}
        </div>
    );
}
