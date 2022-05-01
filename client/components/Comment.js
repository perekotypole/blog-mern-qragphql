import React from 'react'

import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepPurple } from '@mui/material/colors';

import Reactions from './Reactions';
import { gql, useMutation, useQuery } from '@apollo/client';

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

const SET_REACTION = gql`
mutation ($commentID: String, $reaction: Reactions) {
  setCommentReaction(commentID: $commentID, reaction: $reaction)
}
`;

const REACTIONS = gql`
query ($commentID: String) {
  commentReactions (commentID: $commentID){
    label,
    number,
    selected
  }
}
`;

const Comment = ({
  id: commentID,
  date,
  username,
  avatar,
  content,
}) => {
  const { data: { commentReactions: reactions } = {} } = useQuery(REACTIONS, { variables: { commentID } })
  const [setReaction] = useMutation(SET_REACTION)

  return (
    <>
      <div className='comment'>
        {
          avatar ?
          <Avatar {...style()} alt={username} src={avatar} /> :
          <Avatar {...style()} {...stringAvatar(username)}></Avatar>
        }

        <div>
          <Stack alignItems="center" direction="row" spacing={2}>
            <div className='username'>{`@${username}`}</div>

            <div>{date.toLocaleString()}</div>
          </Stack>
        </div>

        <div className='content'>
          {content}
        </div>

        <Reactions
            key={commentID}
            initReactions={reactions}
            onChange={(reaction) => {setReaction({ variables: { commentID, reaction }})}}></Reactions>
      </div>

      <style jsx>{`
        .comment {
          margin-top: 1.5em;
        }

        .username {
          font-weight: 900;
        }

        .content {
          margin: .5em 0;
          text-align: justify;
        }
      `}</style>
    </>
  )
}

export default Comment