// app/page.tsx
'use client';

import React, { useState } from 'react';

import Toolbar from '../tool/toolbar';
import ContentEditable from '../tool/contentEditable';
import Textarea from '../tool/textarea';
import Codemirror from '../tool/codemirror';
import Style from "./index.module.sass";

interface ToolProps {
    content: string
    setContent?: (s: string) => void;
}

export default function Tool({content, setContent} : ToolProps) {
    const [viewCode, setViewCode] = useState(false);

    return (
        <div>
            <Toolbar/>

            <div>
                <span>Показать исходный код</span>&nbsp;
                <input type="checkbox" className={Style.checkbox} id="editor-code" onChange={()=>setViewCode(!viewCode)} />
            </div>

            {viewCode ? <Codemirror
                content={content}  // Bind content as prop
                setContent={setContent}
            /> : <ContentEditable
                content={content}  // Bind content as prop
                setContent={setContent}
            />}

            <p>HTML Content:</p>
            <pre>{content}</pre>
        </div>
    );
}