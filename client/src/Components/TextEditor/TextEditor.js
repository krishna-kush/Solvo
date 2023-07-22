import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";

import SunEditor, { buttonList } from "suneditor-react"; 
/*
	buttonList.basic = basic buttons for wordprocessing
	buttonList.formatting = most tools used for formatting - This is the default option
	buttonList.complex = contains most of the buttons
*/
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File


const TextEditor = forwardRef((params, ref) => { // forwardRef is necessary for useImperativeHandle to work, so to access or edit child components from parent we need to use useImperativeHandle and for that forwardRef but to use parent component's div in child we can just pass ref in params...

  const editorRef = useRef(null);

  useImperativeHandle(ref, () => ({
    setContents: (data) => editorRef.current.setContents(data),
    offToolbar: () => setHideToolbar(true),
  }));

  let [hideToolbar, setHideToolbar] = useState(true)

  const handleChange = (content) => {
    params.change(content)
  }

  const handleSave = (content) => {
    // editorRef.current.setContents('')
    alert('Use POST button to post your question')
  }

  const getSunEditorInstance = (sunEditor) => {
    editorRef.current = sunEditor;
  }

  // to close toolbar when clicked outside of it but except POST button
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (params.parentRef.current) {
        if (!params.parentRef.current.contains(event.target)) {
          setHideToolbar(true)
        }
      }
    };

    // adding the event directly on document not on it's element because we want to listen to all clicks on the page and one element can only listen to it's own events
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [params.parentRef]);


  return (
    <div style={{margin: 'calc(var(--long-margin)) 0px'}}>
      <SunEditor
      getSunEditorInstance={getSunEditorInstance} // makes it slow without it, things load fast...

      placeholder={params.placeholder? params.placeholder : "What's in your mind..."}
      hideToolbar={hideToolbar}

      onFocus={() => setHideToolbar(false)}

      onChange={handleChange}

      onSave={handleSave}

      setOptions={{
        buttonList: buttonList.complex // Or Array of button list, eg. [['font', 'align'], ['image']]
        // buttonList: [['font', 'size', 'formats'] ],
      }} />
    </div>    
  )
})

export default TextEditor