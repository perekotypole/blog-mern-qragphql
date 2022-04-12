import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { EditorState, convertFromRaw, convertToRaw} from 'draft-js'

const Editor = dynamic(
  () => import('react-draft-wysiwyg').then(mod => mod.Editor),
  { ssr: false }
)

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Card from './Card';
import Content from './Content';

const EditorComponent = (props) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState)
    props.handleContent(convertToRaw(editorState.getCurrentContent()))
  }

  return (
    <>
      <Card sx={{ overflow: 'visible' }}>
        <Content>
          <Editor
            editorState={editorState}
            toolbarClassName="toolbar-class"
            editorClassName="editor-class"
            onEditorStateChange={onEditorStateChange}
            toolbar={{
              options: ['blockType', 'list', 'link', 'emoji', 'image', 'history'],
              inline: { inDropdown: true },
              list: { inDropdown: true },
              link: { inDropdown: true },
              history: { inDropdown: false },
              image: { 
                // uploadCallback: uploadImageCallBack,
                urlEnabled: true,
                uploadEnabled: true,
                previewImage: true,
                alt: { present: false, mandatory: false } 
              },
            }}
          />
        </Content>
      </Card>

      <style jsx>{`
      `}</style>
    </>
  )
}

export default EditorComponent
