import React from 'react'
import Link from 'next/link'
import Image from 'next/image';

import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { deepPurple } from '@mui/material/colors';

import Card from './Card';

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
          <div className='username'>{`@${username}`}</div>

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