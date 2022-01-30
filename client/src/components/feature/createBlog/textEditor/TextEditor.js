import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { EditorState } from 'draft-js';  
import { Editor } from 'react-draft-wysiwyg';
import { convertFromHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './textEditor.css';

const TextEditor = React.forwardRef(({ prevEditorContent = null }, ref) => {
    //if text input is to be edited pass as prop 
    const initalEditorState = !prevEditorContent ? 
                                EditorState.createEmpty() : 
                                EditorState.createWithContent(convertFromHTML(DOMPurify.sanitize(prevEditorContent)));
    const [editorState, setEditorState] = useState(initalEditorState);

    return (
        <Editor 
            ref={ref} //ref to get child state from outside 
            editorState={ editorState } 
            onEditorStateChange= { setEditorState }
            wrapperClassName='editor-wrapper'
            toolbarClassName='editor-toolbar'
            editorClassName='editor-text-input'
        />
    )
});

TextEditor.propTypes = {
    prevEditorContent: PropTypes.string
}

export default TextEditor;
