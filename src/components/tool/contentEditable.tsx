import { useRef, useEffect, useCallback } from 'react';
import Style from './contentEditable.module.sass';

interface ContentEditableProps {
    content: string;
    onChange?: (s: string) => void;
    onBlur?: (s: string) => void;
    onPaste?: (e: React.ClipboardEvent<HTMLDivElement>) => void; // Указываем, что onPaste может быть undefined
    style?: React.CSSProperties;
    setContent?: (s: string) => void;
}

const ContentEditable = ({
    content,
    onChange = () => {},
    onBlur = () => {},
    onPaste, // Теперь onPaste опционально, благодаря интерфейсу
    style={},
    setContent = () => {},
}: ContentEditableProps) => {
    const ref = useRef<HTMLDivElement>(null);

    const handleContentChange = useCallback((newHtml: string) => {
        onChange(newHtml);
        setContent(newHtml);
    }, [onChange, setContent]);


    const emitChange = () => {
        if (!ref.current) return;
        const curHtml = ref.current.innerHTML;
        if (curHtml !== content) {
            handleContentChange(curHtml);
        }
    };

    useEffect(() => {
        if (ref.current && ref.current.innerHTML !== content) {
            ref.current.innerHTML = content;
            handleContentChange(content);
        }
    }, [content, handleContentChange]);

    const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
        e.preventDefault();
        // Проверяем, существует ли onPaste перед вызовом
        onPaste?.(e); // Используем опциональный оператор (?.)
    };


    return (
        <div
            className={Style.contenteditable}
            style={style}
            ref={ref}
            onInput={emitChange}
            onBlur={emitChange}
            onPaste={handlePaste}
            contentEditable
            suppressContentEditableWarning
        ></div>
    );
};

export default ContentEditable;