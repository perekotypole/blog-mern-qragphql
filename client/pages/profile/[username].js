import React from 'react'
import { gql, useQuery } from "@apollo/client";

import Layout from '../../components/Layout'
import PostItem from '../../components/PostItem'
import Button from '../../components/Button'

import { Avatar, Link } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';

const PROFILE = gql`
  query {
    ownProfile {
      _id,
      username,
      image,
      bio,
      contact,
      createdAt
    }
  }
`

const style = () => ({
  sx: {
    bgcolor: deepPurple[500],
    textTransform: 'uppercase',
    marginRight: '.5em',
    fontSize: '3em',
    fontWeight: '1000',
    width: 125, height: 125
  },
})

const stringAvatar = (name) => ({
  children: `${name.split(' ')[0][0]}`,
})

const ProfilePage = ({ publications }) => {
  // const posts = publications.map(({
  //   _id,
  //   title,
  //   user,
  //   image,
  //   text,
  //   createdAt,
  //   topic,
  // }) =>
  //   <>
  //     <PostItem
  //       key={_id}
  //       id={_id}
  //       username={user.username}
  //       title={title}
  //       image={image.image}
  //       date={new Date(Date(createdAt))}
  //       topic={topic.title}
  //       content={text}
  //     ></PostItem>

  //     <hr></hr>
  //   </>
  // )

  const { data, loading: profileLoading } = useQuery(PROFILE)

  if (!data || profileLoading) return <>
    <Layout loading={true}></Layout>
  </>

  const { ownProfile: profile } = data
  return (
    <>
      <Layout>
        <div className='profile'>
          <div className='leftside'>
            {
              profile?.image ?
              <Avatar {...style()} alt={profile.username} src={profile.image} /> :
              <Avatar {...style()} {...stringAvatar(profile.username)} />
            }
            
            <div className='row'>
              <div className='username'>@{ profile.username }</div>
              
              <Button>follow</Button>
            </div>

            <div className='bio'>{profile.bio}</div>
          </div>

          <div className='rightside'>
            <Link sx={{ marginLeft: 'auto' }} href={'/profile/edit'}>
              <EditIcon sx={{ color: '#000000' }}></EditIcon>
            </Link>

            <div className='info'>
              <div className='date'><span>date of registration: </span>{new Date(profile.createdA).toLocaleDateString()}</div>
              <div className='publications'><span>publications: </span>{profile.publications}</div>
            </div>

            <div className='contact'>
            <Link sx={{ color: '#ffffff' }} href={profile.contact}>
              <Button>contact</Button>
            </Link>
            </div>
          </div>
        </div>

        <hr></hr>

        <div className='publications'>
          <h2 className='title upper'>Publications</h2>

          {/* { posts } */}
        </div>
      </Layout>

      <style jsx>{`
        .profile {
          display: grid;
          grid-template-columns: 5fr 4fr;
          gap: 25px;
        }

        .profile>div {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .username {
          font-weight: 1000;
        }

        .row {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .bio {
          text-align: justify;
          color: #656565;
        }

        .contact button {
          color: #ffffff !important;
        }
      `}</style>
    </>
  )
}

export default ProfilePage
