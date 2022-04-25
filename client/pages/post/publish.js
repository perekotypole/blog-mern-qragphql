import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { InputBase, Paper } from '@mui/material';
import { gql, useMutation, useQuery } from '@apollo/client';

import Layout from '../../components/Layout'
import Editor from '../../components/Editor'
import Button from '../../components/Button'

const PUBLISH = gql`
  mutation ($data: PublicationInput) {
    publish (data: $data)
  }
`;

const USERNAME = gql`query { username }`;

const PublishPage = () => {
  const router = useRouter()

  const [title, setTitle] = useState()
  const [content, setContect] = useState()

  const [savePublication, { data: publicationId, loading: saveLoading }] = useMutation(PUBLISH)
  const { data: { username } = {}, loading: userLoading } = useQuery(USERNAME)

  const variables = {
    data: {
      title: null,
      content: null
    }
  }

  useEffect(() => {
    variables.data.title = title
    variables.data.content = content && JSON.stringify(content)
  }, [content, title]);

  if (publicationId && username) router.push(`@${username}/${publicationId?.publish}`)

  if (saveLoading || userLoading) return <>
    <Layout loading={true}></Layout>
  </>

  return(
    <>
      <Layout sidebar={<Button onClick={() => {
        if (variables.data.title && variables.data.content) savePublication({ variables })
      }}>save</Button>}>
        <div style={{ margin: '-20px -40px' }}>
          <Paper
            sx={{
              p: '6px 4px',
              display: 'flex',
              alignItems: 'center',
              marginBottom: '1em',
              marginTop: '.5em',
            }}
          >
            <InputBase
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              sx={{ ml: 1, flex: 1 }}
              inputProps={{ 'aria-label': 'title=' }}
            />
          </Paper>

          <Editor handleContent={(content) => setContect(content)}/>
        </div>
      </Layout>

      <style jsx>{`
      `}</style>
    </>
  )
}

export default PublishPage
