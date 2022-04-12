import React from 'react'
import { gql } from "@apollo/client";
import client from "../../apollo-client";

import Layout from '../../components/Layout'
import PostItem from '../../components/PostItem'

export const getStaticProps = async () => {
  const { data } = await client.query({
    query: gql`
      query {
        latestPublications {
          _id,
          title,
          user {
            username
          },
          image {
            image,
            description
          },
          text,
          createdAt,
          views,
          topic {
            title
          }
        }
      }
    `,
  });

  // console.log(data);

  return {
    props: {
      publications: data.latestPublications,
    },
 };
}

const SavedPage = ({ publications }) => {
  const posts = publications.map(({
    _id,
    title,
    user,
    image,
    text,
    createdAt,
    topic,
  }) =>
    <>
      <PostItem
        id={_id}
        username={user.username}
        title={title}
        image={image.image}
        date={new Date(Date(createdAt))}
        topic={topic.title}
        content={text}
      ></PostItem>

      <hr></hr>
    </>
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
