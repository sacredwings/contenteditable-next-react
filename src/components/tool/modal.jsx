// components/Modal.js
import React from 'react';
import styles from './modal.module.sass';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className={styles.modalOverlay} onClick={onClose}>

            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <button className={styles.closeButton} onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className={styles.modalBody}>
                    {children}
                </div>
                <div className={styles.modalFooter}>
                    <button onClick={onClose}>Закрыть</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;