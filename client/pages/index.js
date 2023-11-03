import React from 'react'
import { gql, useQuery } from "@apollo/client";

import Layout from '../components/Layout'
import PostItem from '../components/PostItem'

const LATEST = gql`
  query {
    latestPublications {
      _id,
      title,
      user {
        username,
        role
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

const HomePage = () => {
  const {data: { latestPublications: publications } = {}, loading} = useQuery(LATEST, {
    onError: (error) => { 
      console.log(error.message);
    }
  })

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
        role={user?.role}
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
      <Layout>
        { posts }
      </Layout>

      <style global jsx>{`
      `}</style>
    </>
  )
}

export default HomePage
