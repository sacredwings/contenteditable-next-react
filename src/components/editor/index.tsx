// app/page.js
'use client';
import React, { useState } from 'react';
import Modal from '@/components/Modal';
import ContentEditable from "@/components/tool/contentEditable";
import ContentEditableTool from "../tool";

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
        <div>
            <h1>Модальное окно Next.js 14</h1>
            <ContentEditable
                content={content}  // Bind content as prop
                setContent={setContent}
            />
            <button onClick={openModal}>Открыть модальное окно</button>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <ContentEditableTool
                    content={content}  // Bind content as prop
                    setContent={setContent}
                />
            </Modal>
        </div>
    );
}