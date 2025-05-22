'use client';

import React, { useState, useRef, useEffect } from 'react';
import ContentEditable from "@/components/editor";

export default function Page() {
    const [content, setContent] = useState('Начните вводить текст здесь...');

    return (
        <div>
            <h1>Редактор HTML</h1>
            <ContentEditable content={content} setContent={setContent}/>
        </div>
    );
}