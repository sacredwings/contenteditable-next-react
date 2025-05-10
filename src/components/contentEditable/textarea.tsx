import { useRef, useEffect, useCallback } from 'react';
import Style from './contentEditable.module.sass';

interface ContentEditableProps {
    html: string;
    onChange?: (s: string) => void;
    onBlur?: (s: string) => void;
    onPaste?: (e: React.ClipboardEvent<HTMLTextAreaElement>) => void; // Обратите внимание на HTMLTextAreaElement
    style?: React.CSSProperties;
    result?: (s: string) => void;
}

const ContentEditable = ({
                             html,
                             onChange = () => {},
                             onBlur = () => {},
                             onPaste = () => {},
                             style={},
                             result = () => {},
                         }: ContentEditableProps) => {
    const ref = useRef<HTMLTextAreaElement>(null); // Обратите внимание на HTMLTextAreaElement

    const handleContentChange = useCallback((newHtml: string) => {
        onChange(newHtml);
        result(newHtml);
    }, [onChange, result]);


    const emitChange = () => {
        if (!ref.current) return;
        const curHtml = ref.current.value; // Изменено: .innerHTML на .value
        if (curHtml !== html) {
            handleContentChange(curHtml);
        }
    };

    useEffect(() => {
        if (ref.current && ref.current.value !== html) { // Изменено: .innerHTML на .value
            ref.current.value = html; // Изменено: .innerHTML на .value
            handleContentChange(html);
        }
    }, [html, handleContentChange]);

    const handlePaste = (e: React.ClipboardEvent<HTMLTextAreaElement>) => { // Обратите внимание на HTMLTextAreaElement
        e.preventDefault();
        // Проверяем, существует ли onPaste перед вызовом
        onPaste?.(e); // Используем опциональный оператор (?.)
    };


    return (
        <textarea // Заменено: div на textarea
            className={Style.contenteditable}
            style={style}
            ref={ref}
            onChange={emitChange} // Заменено: onInput на onChange
            onBlur={emitChange}
            onPaste={handlePaste}
            suppressContentEditableWarning // Этот пропс больше не нужен, но оставим для полной копии
        />
    );
};

export default ContentEditable;