import React from 'react'

import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { deepPurple } from '@mui/material/colors';


const style = () => ({
  sx: {
    bgcolor: deepPurple[500],
    textTransform: 'uppercase',
    float: 'left',
    marginRight: '.5em',
  },
})

const stringAvatar = (name) => ({
  children: `${name.split(' ')[0][0]}`,
})

const PostItem = ({
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
      {
        avatar ?
        <Avatar {...style()} alt={username} src={avatar} /> :
        <Avatar {...style()} {...stringAvatar(username)}></Avatar>
      }

      <Stack alignItems="center" direction="row" spacing={2}>
        <div className='username'>{`@${username}`}</div>

        <div>{date.toLocaleString()}</div>

        <Chip
          label={topic}
          sx={{
            bgcolor: deepPurple[500],
            color: '#fff',
            padding: '0 .5em',
            letterSpacing: '.3em'
          }}/>
      </Stack>

      <div className='title'>
        {title}
      </div>

      <div className='content'>
        {content}
      </div>
    </div>

    <style jsx>{`
      .post {
        
      }

      .username {
        font-weight: 900;
      }

      .title {
        font-weight: 900;
        font-size: 20px;
        margin-bottom: .5em;
      }
    `}</style>
  </>
)

export default PostItem