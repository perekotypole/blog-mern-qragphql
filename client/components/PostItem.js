import React from 'react'
import Link from 'next/link'
import Image from 'next/image';

import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { deepPurple } from '@mui/material/colors';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import Card from './Card';
import { Tooltip, Zoom } from '@mui/material';

const style = () => ({
  sx: {
    bgcolor: deepPurple[500],
    textTransform: 'uppercase',
    float: 'left',
    fontWeight: '1000',
    marginRight: '.5em',
  },
})

const stringAvatar = (name) => ({
  children: `${name.split(' ')[0][0]}`,
})

const PostItem = ({
  id,
  title,
  date,
  username,
  role = 'user',
  avatar,
  topic,
  image,
  content,
}) => (
  <>
    <div className='post'>
      <div>
        {
          avatar ?
          <Avatar {...style()} alt={username} src={avatar} /> :
          <Avatar {...style()} {...stringAvatar(username)}></Avatar>
        }

        <Stack alignItems="center" direction="row" spacing={2}>
          <div className='username'>
            <Link passHref href="/profile/[username]" as={`/profile/@${username}`}>{`@${username}`}</Link>
            {
              role === 'moderator' || role === 'admin' &&
              <Tooltip title={role} placement="top" TransitionComponent={Zoom} arrow>
                <CheckCircleOutlineIcon
                  sx={{
                    height: '.7em', width: '.7em',
                    color: '#942fd2', cursor: 'pointer'
                  }}></CheckCircleOutlineIcon>
              </Tooltip>
            }
          </div>


          <div className='date'>{date.toLocaleString()}</div>

          {topic && 
            <Chip
              label={topic}
              sx={{
                bgcolor: deepPurple[500],
                color: '#fff',
                padding: '0 .5em',
                letterSpacing: '.3em'
              }}/>
          }
        </Stack>

        <Link passHref href="/post/[user]/[id]" as={`/post/@${username}/${id}`}>
          <div className='title'>{title}</div>
        </Link>

        <div className='content'>
          {content}
        </div>
      </div>
      {
        !image || (
          <div className='image'>
            <Card rounded>
              <div><img loading="lazy" alt='post image' src={image} width={160} height={120}></img></div>
            </Card>
          </div>
        )
      }
    </div>


    <style jsx>{`
      .post {
        width: 100%;
        display: flex;
        justify-content: space-between;
      }
      .username {
        font-weight: 900;
        display: flex; align-items: center;
      }

      .date {
        font-size: 0.8em;
      }

      .title {
        font-weight: 900;
        font-size: 20px;
        margin-bottom: .5em;
      }

      .image {
        margin-top: 5px;
      }
    `}</style>
  </>
)

export default PostItem