'use client';

import React, { useCallback } from 'react';
import Style from './toolbar.module.sass'; // Убедитесь, что путь правильный

interface CommandPromptMap {
    [commandId: string]: string | undefined;
}

const COMMAND_PROMPT_MAP: CommandPromptMap = {
    'createLink': 'Введите URL ссылку',
    'insertText': 'Введите текст',
    'insertHTML': 'Введите HTML код',
};

interface ToolbarProps {
    setContent: (newContent: string) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({  }) => {

    const OnClickButton = useCallback((commandId: string, value: string | null = null) => {
        if (value !== null) {
            document.execCommand(commandId, false, value);
        } else {
            document.execCommand(commandId, false);
        }
    }, []);

    const OnClickButtonInput = useCallback((commandId: string) => {
        const promptText = COMMAND_PROMPT_MAP[commandId];

        if (!promptText) {
            return;
        }

        const value = prompt(promptText, '');

        if (commandId === 'createLink') {
            try {
                if (value) {
                    new URL(value);
                } else {
                    return;
                }
            } catch (_) {
                alert('Некорректный URL');
                return;
            }
        }

        if (value) {
            OnClickButton(commandId, value);
        } else {
            OnClickButton(commandId, null);
        }
    }, [OnClickButton]);

    const OnClickList = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        OnClickButton(e.target.name, (e.target as HTMLInputElement).value || (e.target as HTMLSelectElement).value);
    }, [OnClickButton]);

    return <div className={Style.toolbar}>
        <button type="button" className="toolbar-b fas fa-bold" title="Жирный"
                onClick={() => OnClickButton('bold')}></button>
        <button className="toolbar-i fas fa-italic" title="Курсив" onClick={() => OnClickButton('italic')}></button>
        <button className="toolbar-u fas fa-underline" title="Подчёркнутый"
                onClick={() => OnClickButton('underline')}></button>
        <button className="toolbar-s fas fa-strikethrough" title="Зачёркнутый"
                onClick={() => OnClickButton('strikethrough')}></button>
        <button className="toolbar-sup fas fa-superscript" title="Верхний индекс"
                onClick={() => OnClickButton('superscript')}></button>
        <button className="toolbar-sub fas fa-subscript" title="Нижний индекс"
                onClick={() => OnClickButton('subscript')}></button>

        <button className="toolbar-ul fas fa-list-ul" title="Маркированный список"
                onClick={() => OnClickButton('insertUnorderedList')}></button>
        <button className="toolbar-ol fas fa-list-ol" title="Нумерованный список"
                onClick={() => OnClickButton('insertOrderedList')}></button>

        <select className="toolbar-font" defaultValue="selected" onChange={OnClickList} name="formatBlock">
            <option value="selected" disabled={true}>Формат блока</option>
            <option value="p">p</option>
            <option value="h1">h1</option>
            <option value="h2">h2</option>
            <option value="h3">h3</option>
            <option value="h4">h4</option>
            <option value="h5">h5</option>
        </select>


        <button className="toolbar-hr" title="Горизонтальная линия"
                onClick={() => OnClickButton('insertHorizontalRule')}>hr
        </button>
        <button className="toolbar-blockquote fas fa-quote-right" title="Цитата"
                onClick={() => OnClickButton('formatBlock', 'blockquote')}></button>

        <button className="toolbar-img far fa-image" title="Изображение"
                onClick={() => OnClickButton('insertImage')}></button>
        <button className="toolbar-a fas fa-link" title="Ссылка"
                onClick={() => OnClickButtonInput('createLink')}></button>
        <button className="toolbar-unlink fas fa-unlink" title="Удаление ссылки"
                onClick={() => OnClickButton('unlink')}></button>

        <button className="toolbar-html" title="Вставить html" onClick={() => OnClickButtonInput('insertHTML')}>HTML
        </button>
        <button className="toolbar-text" title="Вставить текст" onClick={() => OnClickButtonInput('insertText')}>Text
        </button>

        <br/>

        <button className="toolbar-left fas fa-align-left" title="по левому краю"
                onClick={() => OnClickButton('justifyLeft')}></button>
        <button className="toolbar-center fas fa-align-center" title="по центру"
                onClick={() => OnClickButton('justifyCenter')}></button>
        <button className="toolbar-right fas fa-align-right" title="по правому краю"
                onClick={() => OnClickButton('justifyRight')}></button>
        <button className="toolbar-justify fas fa-align-justify" title="по ширине"
                onClick={() => OnClickButton('justifyFull')}></button>

        <select className="toolbar-font" defaultValue="selected"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => OnClickList(e)} name="fontName">
            <option value="selected" disabled={true}>Шрифт</option>
            <option value="arial">Arial</option>
            <option value="Courier New">Courier New</option>
            <option value="georgia">Georgia</option>
            <option value="impact">Impact</option>
            <option value="roboto">Tahoma</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="verdana">Verdana</option>
        </select>

        <select className="toolbar-size" defaultValue="selected"
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => OnClickList(e)} name="fontSize">
            <option value="selected" disabled={true}>Размер</option>
            <option value="1">10px</option>
            <option value="2">12px</option>
            <option value="3">14px</option>
            <option value="4">16px</option>
            <option value="5">18px</option>
            <option value="6">21px</option>
            <option value="7">26px</option>
        </select>


        <span>Цвет</span> <input className="toolbar-color" type="color" value="#ff0000"
                                 onChange={(e: React.ChangeEvent<HTMLInputElement>) => OnClickList(e)}
                                 name="foreColor"/>
        <span>Фон</span> <input className="toolbar-bg" type="color" value="#ffff00"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => OnClickList(e)} name="backColor"/>

        <br/>

        <button className="toolbar-undo fas fa-undo" title="Отмена" onClick={() => OnClickButton('undo')}></button>
        <button className="toolbar-redo fas fa-redo" title="Повтор" onClick={() => OnClickButton('redo')}></button>
        <button className="toolbar-delete far fa-trash-alt" title="Удалить"
                onClick={() => OnClickButton('delete')}></button>
        <button className="toolbar-selectAll" onClick={() => OnClickButton('selectAll')}>Выделить всё</button>
        <button className="toolbar-removeFormat" onClick={() => OnClickButton('removeFormat')}>Очистить стили</button>
        <button className="toolbar-cut fas fa-cut" title="Вырезать" onClick={() => OnClickButton('cut')}></button>
        <button className="toolbar-copy fas fa-copy" title="Копировать" onClick={() => OnClickButton('copy')}></button>

    </div>
}

export default Toolbar;

