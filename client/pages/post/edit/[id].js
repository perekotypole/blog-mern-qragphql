import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { InputBase, Paper } from '@mui/material';
import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client';

import Layout from '../../../components/Layout'
import Editor from '../../../components/Editor'
import Button from '../../../components/Button'

const UPDATE_PUBLISH = gql`
mutation ($id: String, $data: UpdatePublicationInput) {
  updatePublish (id: $id, data: $data)
}
`;

const PUBLICATION = gql`
  query ($id: String) {
    publication (id: $id) {
      title,
      content,
      createdAt,
      views,
    }
  }
`;

const USERNAME = gql`query { username }`;

const PublishPage = () => {
  const router = useRouter()
  const { id: postID, author = null } = router.query

  const { data: { username } = {}, loading: userLoading } = useQuery(USERNAME)
  const [getPublication, { data: { publication } = {}, called }] = useLazyQuery(PUBLICATION)
  const [updatePublication, { data: { updatePublish } = {}, loading: updateLoading }] = useMutation(UPDATE_PUBLISH)

  const [title, setTitle] = useState()
  const [content, setContect] = useState()

  const variables = {
    data: {
      title: null,
      content: null
    }
  }

  useEffect(() => {
    variables.id = postID
    variables.data.user = author
    console.log(variables.data.user);

    variables.data.title = title
    variables.data.content = content && JSON.stringify(content)

    if (publication) {
      variables.data.createdAt = publication.createdAt
      variables.data.views = publication.views
    }
  }, [content, title]);

  useEffect(() => {
    if (publication) {
      setTitle(publication.title),
      setContect(publication.content)
    }
  }, [publication]);

  useEffect(() => {
    if (!called && postID) getPublication({ variables: { id: postID } })
  }, [postID]);

  if (updatePublish && username) router.push(`/post/@${username}/${postID}`)
  if (!postID || !publication || updateLoading || userLoading) return <Layout loading={true}></Layout>

  return(
    <>
      <Layout sidebar={<Button onClick={() => {
        if (variables.data.title && variables.data.content) updatePublication({ variables })
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
              defaultValue={publication.title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              sx={{ ml: 1, flex: 1 }}
              inputProps={{ 'aria-label': 'title=' }}
            />
          </Paper>

          <Editor
            handleContent={(content) => setContect(content)}
            initialContent={JSON.parse(publication.content)}
          />
        </div>
      </Layout>

      <style jsx>{`
      `}</style>
    </>
  )
}

export default PublishPage
