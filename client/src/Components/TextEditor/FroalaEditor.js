import React from "react";

   // Require Editor CSS files.
   import 'froala-editor/css/froala_style.min.css';
   import 'froala-editor/css/froala_editor.pkgd.min.css';
   
   import FroalaEditorComponent from 'react-froala-wysiwyg';


const save = (data) => {
  console.log(data);
};


const TextEditor = () => {

  return (
    <>
    <FroalaEditorComponent/>
    </>    
  )
}

export default TextEditor