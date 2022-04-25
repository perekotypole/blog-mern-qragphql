import React from 'react'
import { useRouter } from 'next/router'
import { gql, useQuery } from "@apollo/client";

import Layout from '../../components/Layout'
import PostItem from '../../components/PostItem'

const SEARCH = gql`
  query ($query: String) {
    search(query: $query) {
      users {
        username,
        image
      },
      publications {
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
  }
`

const SearchPage = () => {
  const router = useRouter()
  const {data: { search } = {}, loading} = useQuery(SEARCH, { variables: { query: router.query['query'] } })

  if (loading || !search) return <Layout loading/>

  const posts = search.publications.map(({
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
      <Layout>
        { posts }
      </Layout>

      <style jsx>{`
      `}</style>
    </>
  )
}

export default SearchPage
