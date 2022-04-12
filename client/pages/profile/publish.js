import React from 'react'

import Layout from '../../components/Layout'
import Editor from '../../components/Editor'
import { InputBase, Paper } from '@mui/material';

const PublishPage = () => (
  <>
    <Layout role="user">
      <div style={{ margin: '-20px -40px' }}>
        <Paper
          component="form"
          sx={{
            p: '2px 4px',
            display: 'flex',
            alignItems: 'center',
            marginBottom: '2em',
            marginTop: '1em'
          }}
        >
          <InputBase
            placeholder="Title"
            sx={{ ml: 1, flex: 1, bgcolor: '#ffffff' }}
            inputProps={{ 'aria-label': 'title=' }}
          />
        </Paper>

        <Editor 
          handleContent={(content) => {console.log(content);}}
        />
      </div>
    </Layout>

    <style jsx>{`
    `}</style>
  </>
)

export default PublishPage
