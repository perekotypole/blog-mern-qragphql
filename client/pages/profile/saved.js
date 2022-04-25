import React from 'react'
import { gql, useQuery } from "@apollo/client";

import Layout from '../../components/Layout'
import PostItem from '../../components/PostItem'

const SAVED = gql`
query {
  saved {
    _id,
    title,
    user {
      username
    },
    image,
    text,
    createdAt,
    views,
    topic {
      title
    }
  }
}
`

const SavedPage = () => {
  const {data: { saved: publications } = {}, loading} = useQuery(SAVED)

  if (loading || !publications) return <Layout loading/>
  const posts = publications.map(({
    _id,
    title,
    user,
    image,
    text,
    createdAt,
    topic,
  }) =>
    <div key={_id}>
      <PostItem
        id={_id}
        username={user?.username}
        title={title}
        image={image}
        date={new Date(Number(createdAt))}
        topic={topic?.title}
        content={text}
      ></PostItem>

      <hr></hr>
    </div>
  )
  return (
    <>
      <Layout role="user">
        <h2 className='title upper'>Saved</h2>

        { posts }
      </Layout>

      <style jsx>{`
      `}</style>
    </>
  )
}

export default SavedPage
