import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { InputBase, Paper } from '@mui/material';
import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client';

import Layout from '../../../components/Layout'
import Editor from '../../../components/Editor'
import Button from '../../../components/Button'
import Error from '../../../components/Error';

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
      user {
        _id,
        username,
      }
    }
  }
`;

const PublishPage = () => {
  const router = useRouter()
  const { id: postID, author = null } = router.query

  const [title, setTitle] = useState()
  const [content, setContect] = useState()

  const [errorMessage, setError] = useState()

  const variables = {
    data: {
      title: null,
      content: null
    }
  }

  const [getPublication, { data: { publication } = {}, called }] = useLazyQuery(PUBLICATION, {
    onCompleted: ({ publication }) => {
      setTitle(publication.title),
      setContect(JSON.parse(publication.content))
    },
    onError: (error) => {
      console.log(error);
      router.replace('/')
    }
  })
  const [updatePublication, { loading: updateLoading }] = useMutation(UPDATE_PUBLISH, {
    onCompleted: () => {
      setError()
      router.push(`/post/@${publication.user.username}/${postID}`)
    },
    onError: (error) => {
      setError(error)
    }
  })

  useEffect(() => {
    console.log(variables.data);
    variables.id = postID
    
    variables.data.title = title
    variables.data.content = content && JSON.stringify(content)
    
    if (publication) {
      variables.data.user = author || publication.user._id
      variables.data.createdAt = publication.createdAt
      variables.data.views = publication.views
    }
  }, [content, title]);

  useEffect(() => {
    if (!called && postID) getPublication({ variables: { id: postID } })
  }, [postID]);

  const handleSubmit = () => {
    if (!variables.data.title || !variables.data.content) {
      setError('Check the entered data')
      return
    }

    // updatePublication({ variables })
  }

  if (!postID || !publication || updateLoading) return <Layout loading={true}></Layout>

  return(
    <>
      <Layout sidebar={<>
        <Error>{errorMessage}</Error>

        <Button onClick={() => { handleSubmit() }}>save</Button>
      </>}>
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
