// app/page.tsx
'use client';

import React, { useState } from 'react';

import Toolbar from './toolbar';
import ContentEditable from './contentEditable';
import Textarea from './textarea';
import Style from "@/components/contentEditable/index.module.sass";

export default function Home() {
    const [content, setContent] = useState('Начните вводить текст здесь...');
    const [viewCode, setViewCode] = useState(false);

    return (
        <div className={Style.editor}>
            <Toolbar setContent={setContent}/>

            <div>
                <span>Показать исходный код</span>&nbsp;
                <input type="checkbox" className={Style.checkbox} id="editor-code" onChange={()=>setViewCode(!viewCode)} />
            </div>

            {viewCode ? <Textarea
                html={content}  // Bind content as prop
                result={setContent}
            /> : <ContentEditable
                html={content}  // Bind content as prop
                result={setContent}
            />}


            <p>HTML Content:</p>
            <pre>{content}</pre>
        </div>
    );
}