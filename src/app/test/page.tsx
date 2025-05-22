// app/page.js
'use client';
import React, { useState } from 'react';
import Editor from '@/components';
import CodeMirror from '@uiw/react-codemirror'; // Import CodeMirror
import { html } from '@codemirror/lang-html'; // Import HTML syntax highlighting

export default function Test() {
    const [content, setContent] = useState('Начните вводить текст здесь...');

    return (
        <div>
            <h1>Редактор HTML</h1>
            <Editor content={content} setContent={setContent}/>
        </div>
    );
}