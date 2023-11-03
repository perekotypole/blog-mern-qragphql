import React from 'react'
import { useRouter } from 'next/router'
import { gql, useQuery } from "@apollo/client";

import Layout from '../../components/Layout'
import PostItem from '../../components/PostItem'
import Link from 'next/link';
import { Avatar } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import Content from '../../components/Content';
import Card from '../../components/Card';

const SEARCH = gql`
  query ($query: String) {
    search(query: $query) {
      users {
        _id,
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


const style = () => ({
  sx: {
    bgcolor: deepPurple[500],
    textTransform: 'uppercase',
    fontSize: '3em',
    fontWeight: '1000',
    width: 100, height: 100
  },
})

const stringAvatar = (name) => ({
  children: `${name.split(' ')[0][0]}`,
})

const SearchPage = () => {
  const router = useRouter()
  const query = router.query['query']
  const {data: { search } = {}, loading} = useQuery(SEARCH, { variables: { query } })

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

  const users = search.users.map(({
    _id,
    username,
    image,
  }) =>
    <Link key={_id} passHref href={'/profile/[username]'} as={`/profile/@${username}`}>
      <div key={_id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {
          image ?
          <Avatar {...style()} alt={username} src={image} /> :
          <Avatar {...style()} {...stringAvatar(username)} />
        }
        
        <div style={{ fontWeight: '1000', marginTop: '15px', marginBottom: '5px' }}>@{username}</div>
      </div>
    </Link>
  )

  console.log(search.users);
  
  return (
    <>
      <Layout>
        <h2 className='title upper'>Search: <span style={{ textTransform: 'none', textDecoration: 'underline' }}>{query}</span></h2>

        { users.length ?
        <div style={{ marginBottom: '25px' }}>
          <Card rounded>
            <Content>
              <div style={{
                display: 'flex',
                gap: '25px',
                overflowX: 'auto',
                maxWidth: '500px',
              }}>
                {users}
              </div>
            </Content>
          </Card>
        </div> : null}
        
        { posts.length ? posts : <h2 style={{ color: '#cccccc' }}>No publication</h2> }
      </Layout>

      <style jsx>{`
      `}</style>
    </>
  )
}

export default SearchPage
