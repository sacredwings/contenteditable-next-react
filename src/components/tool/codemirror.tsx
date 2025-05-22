'use client';
import React, { useState, useCallback, useRef, useEffect } from 'react';
import ReactCodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import prettier from 'prettier/standalone';
import parserHtml from 'prettier/parser-html';

interface CodeMirrorProps {
    content: string;
    setContent?: (s: string) => void;
}

export default function CodeMirror({
    content,
    setContent = () => {}
}: CodeMirrorProps) {
    const [errCode, setErrCode] = useState<boolean>(false);
    const [isFormatting, setIsFormatting] = useState<boolean>(false); // Индикатор процесса форматирования
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null); // Используем useRef для отмены таймаута

    const handleChange = useCallback(async (value: string) => {
        setErrCode(false);
        setIsFormatting(true); // Начало форматирования

        // Используем setTimeout для задержки форматирования
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(async () => {
            try {
                const formattedCode = await prettier.format(value, {
                    parser: 'html',
                    plugins: [parserHtml],
                    tabWidth: 2,
                });
                setContent(formattedCode);
            } catch (error) {
                console.error("Formatting error:", error);
                setErrCode(true);
            } finally {
                setIsFormatting(false); // Завершение форматирования
            }
        }, 300); // Задержка в 300 мс - можно настроить

    }, [setContent]);


    //  cleanup эффект для отмены таймаута при unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    return (
        <div>
            <h1>HTML Editor</h1>
            <hr />
            {errCode && <p>Error in code</p>}
            {isFormatting && <p>Formatting...</p>} {/* Отображение статуса форматирования */}
            <ReactCodeMirror
                value={content}
                height="400px"
                width="100%"
                extensions={[html()]}
                onChange={handleChange}
            />
        </div>
    );
}