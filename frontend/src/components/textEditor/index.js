import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";


import "./styles.css";

const TextEditor = forwardRef((props, ref) => {
  const [state, setState] = useState({
    editorState: EditorState.createEmpty(),
  });
  const [editorText, setEditorText] = useState("");

  useImperativeHandle(ref, () =>{
    return {
      state,
      setState,
      editorText,
      setEditorText
    }
  })

  return (
    <Editor
      editorState={state.editorState}
      toolbarOnFocus
      wrapperClassName="editorWrapperEl"
      editorClassName="editorEl"
      toolbarClassName="editorToolbarEl"
      onChange={(draftObject) => setEditorText(draftObject)}
      onEditorStateChange={(editorState) =>
        setState({
          editorState: editorState,
        })
      }
      toolbar={{
        options: [
          "colorPicker",
          "inline",
          "fontSize",
        ],
        inline:{
          options: ['bold', 'italic', 'underline', 'strikethrough'],
        }
        ,
        fontSize:{
          popupClassName: "fontSize",
          options: [24, 30, 36, 48, 60, 72]
        }
      }}
    />
  );
})


export default TextEditor;