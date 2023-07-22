import React from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles"; // necessary for MUIRichTextEditor
import MUIRichTextEditor from "mui-rte";

import DoneIcon from '@mui/icons-material/Done'
import { EditorState } from 'draft-js'

const save = (data) => {
  console.log(data);
};

const myTheme = createTheme({
  // Set up your custom MUI theme here
});

const MyBlock = (props) => {
  return (
      <div style={{
          padding: 10,
          backgroundColor: "#ebebeb"
      }}>
          My Block content is:
          {props.children}
      </div>
  )
}

const TextEditor = () => {
  return (
    <ThemeProvider theme={myTheme}>

    <MUIRichTextEditor
      label="Type something here..."
      onSave={save}
      inlineToolbar={true}
    />

{/* <MUIRichTextEditor 
    controls={["my-callback"]}
    customControls={[
        {
            name: "my-callback",
            icon: <DoneIcon />,
            type: "callback",
            onClick: (editorState, name, anchor) => {
                console.log(`Clicked ${name} control`)
                return EditorState.createEmpty()
            }
        }
    ]}
/> */}
    </ThemeProvider>
  )
}

export default TextEditor