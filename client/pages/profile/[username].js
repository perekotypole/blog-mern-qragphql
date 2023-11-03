import React, { useEffect } from 'react'
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { useRouter } from 'next/router';

import Layout from '../../components/Layout'
import PostItem from '../../components/PostItem'
import Button from '../../components/Button'

import { Avatar, Link, CircularProgress, Tooltip, Zoom } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';


const PROFILE = gql`
  query ($username: String) {
    profile (username: $username) {
      _id,
      username,
      role,
      image,
      bio,
      contact,
      createdAt
    }
  }
`

const PUBLICATIONS = gql`
  query ($userID: String) {
    profilePublications (userID: $userID) {
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

const ProfilePage = () => {
  const router = useRouter()
  const { username } = router.query

  const { data: { profile } = {}, loading: profileLoading } = useQuery(PROFILE, {
    variables: { username: username && username?.split('@')[1] },
    onError: (error) => {
      console.log(error.message);
    }
  })
  const [getPublications, { data: { profilePublications: publications } = {}, loading: publicationsLoading }] =
    useLazyQuery(PUBLICATIONS)

  useEffect(() => {
    profile?._id && (() => {
      getPublications({ variables: { userID: profile._id }})
    })()
  }, [profile]);

  if (!profile || profileLoading) return <>
    <Layout loading={true}></Layout>
  </>

  const posts = publications ? publications.map(({
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
  ): null

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
              <div className='username'>
                @{ profile.username }
                {
                  profile.role === 'moderator' || profile.role === 'admin' &&
                  <Tooltip title={profile.role} placement="top" TransitionComponent={Zoom} arrow>
                    <CheckCircleOutlineIcon
                      sx={{
                        height: '.7em', width: '.7em',
                        color: '#942fd2', cursor: 'pointer'
                      }}></CheckCircleOutlineIcon>
                  </Tooltip>
                }
              </div>

            </div>

            <div className='bio'>{profile.bio}</div>
          </div>

          <div className='rightside'>
            <div className='info'>
              <div className='date'><span>date of registration: </span>{new Date(Number(profile.createdAt)).toLocaleDateString()}</div>
              <div className='publications'><span>publications: </span>{publications?.length || '0'}</div>
            </div>

            {
              profile.contact &&
              <>
                <div className='contact'>
                  <Link sx={{ color: '#ffffff' }} href={profile.contact}>
                    <Button>contact</Button>
                  </Link>
                </div>
              </>
            }
          </div>
        </div>

        <hr></hr>

        <div className='publications'>
          <h2 className='title upper'>Publications</h2>

          { publications && publications.length ?
            posts :
            (publicationsLoading ?
              (<CircularProgress color="secondary" />) :
              (<h2 style={{ color: '#cccccc' }}>No publication</h2>)) }
        </div>
      </Layout>

      <style jsx>{`
        .profile {
          display: grid;
          grid-template-columns: 4fr 3fr;
          gap: 25px;
        }

        .profile>div {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .username {
          font-weight: 1000;
          font-size: 1.2em;
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
