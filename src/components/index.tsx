// app/page.js
'use client';
import React, { useState } from 'react';
import Modal from '@/components/tool/modal';
import ContentEditableComponent from "@/components/tool/contentEditable";
import ContentEditable from "@/components/editor";
import Style from "./index.module.sass";

interface EditorProps {
    content: string
    setContent?: (s: string) => void;
}

export default function Editor({content, setContent} : EditorProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={Style.editor}>
            <ContentEditableComponent
                content={content}  // Bind content as prop
                setContent={setContent}
            />

            <div className={Style.button}>
                <button onClick={openModal}>Редактор</button>
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <ContentEditable
                    content={content}  // Bind content as prop
                    setContent={setContent}
                />
            </Modal>
        </div>
    );
}