import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'

import Layout from "../../../components/Layout"
import Button from "../../../components/Button"
import Comment from "../../../components/Comment"
import Reactions from "../../../components/Reactions"

import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client'

import draftToHtml from 'draftjs-to-html';
import styled from 'styled-components'

import { Avatar, TextField, Tooltip, Zoom } from "@mui/material"
import Bookmark from "@mui/icons-material/Bookmark"
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import { deepPurple } from "@mui/material/colors"
import Error from '../../../components/Error'

const PUBLICATION = gql`
  query ($id: String) {
    publication (id: $id) {
      title,
      content,
      user {
        _id,
        username,
        role,
        bio,
        image,
        createdAt
      },
      createdAt,
      views,
      saved
    }
  }
`;

const ADD_VIEWS = gql`
  mutation ($id: String) {
    addViews (id: $id)
  }
`;

const COMMENTS = gql`
query ($publicationID: String) {
  comments (publicationID: $publicationID) {
    _id,
    user {
      _id,
      username
    }
    content,
    createdAt
  }
}
`;

const WRITE_COMMENT = gql`
  mutation ($comment: String, $publicationID: String) {
    writeComment (comment: $comment, publicationID: $publicationID) {
      _id,
      user {
        _id,
        username
      }
      content,
      createdAt
    }
  }
`;

const SAVE = gql`
  mutation ($publicationID: String) {
    toggleSaved(publicationID: $publicationID)
  }
`;

const SET_REACTION = gql`
mutation ($postID: String, $reaction: Reactions) {
  setReaction(postID: $postID, reaction: $reaction)
}
`;

const REACTIONS = gql`
query ($postID: String) {
  reactions (postID: $postID){
    label,
    number,
    selected
  }
}
`;

const style = () => ({
  sx: {
    bgcolor: deepPurple[500],
    textTransform: 'uppercase',
    marginRight: '.5em',
    fontWeight: '1000',
    width: 70, height: 70
  },
})

const stringAvatar = (name) => ({
  children: `${name.split(' ')[0][0]}`,
})

const AdditionalBlock = ({
  avatar,
  username,
  role,
  published,
  views,
  bio,
  saved, onSave = () => {},
  postID,
  token
}) => {
  const [cookie] = useCookies(['token'])
  const [savedValue, setSavedValue] = useState(saved);

  const { data: { reactions } = {} } = useQuery(REACTIONS, {
    variables: { postID },
    onError: (error) => {
      console.log(error.message);
    }
  })
  const [setReaction] = useMutation(SET_REACTION)

  return (
    <>
      <div className="info">
        <div className="profile">
          <div className="user">
            <div>
              {
                avatar ?
                <Avatar {...style()} alt={username} src={avatar} /> :
                <Avatar {...style()} {...stringAvatar(username)} />
              }
            </div>
            
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
          </div>

          {/* <Button>follow</Button> */}
        </div>

        <div className="bio">{bio}</div>

        <hr></hr>

        <div className="post">
          <div className="details">
            <div className="published"><span>publshed: </span>{published.toLocaleString()}</div>
            <div className="views"><span>views: </span>{views}</div>
          </div>

          <div onClick={() => { onSave(); setSavedValue(!savedValue) }}>
            { token && (savedValue ? <Bookmark></Bookmark> : <BookmarkBorderOutlinedIcon></BookmarkBorderOutlinedIcon>) }
          </div>
        </div>

        <Reactions
          key={postID}
          initReactions={reactions}
          onChange={(reaction) => {setReaction({ variables: { postID, reaction }})}}></Reactions>
      </div>

      <style jsx>{`
        .info {
          font-size: 14px;
        }

        .profile {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;

          margin-bottom: 10px;
        }

        .post {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;

          margin-bottom: 20px;
        }

        .username {
          font-weight: 900;
          font-size: 20px;
        }
      `}</style>
    </>
  )
}

const PostPage = () => {
  const router = useRouter()
  const { id: postID } = router.query

  const commentRef = useRef()
  const [comment, setComment] = useState()
  const [comments, setNewComment] = useState([])

  const [errorMessage, setError] = useState()
  const [commentErrorMessage, setCommentError] = useState()

  const [cookies, setCookie] = useCookies(['views'])
  const [cookieToken] = useCookies(['token'])
  
  const [getPublication, { data: { publication, loading } = {}, called }] = useLazyQuery(PUBLICATION,{
    onCompleted: () => {
      setError()
    },
    onError: (error) => {
      console.log(error.message);
    }
  })
  const [incViews, { data: { addViews: newViews } = {}, called: calledIncViews }] = useMutation(ADD_VIEWS,{
    onCompleted: () => {
      setError()
    },
    onError: (error) => {
      console.log(error.message);
    }
  })
  const [addComment, { data: { writeComment: newComment } = {}, error, reset }] = useMutation(WRITE_COMMENT,{
    onCompleted: ({ writeComment: newComment }) => {
      setError()

      setNewComment(oldArray => [newComment, ...oldArray])

      const commentText = commentRef.current?.querySelector('textarea')
      commentText.value = null
      
      setComment()
      reset()
    },
    onError: (error) => {
      console.log(error.message);
      setCommentError(error.graphQLErrors)
    }
  })
  const [toggleSaved, { data: { toggleSaved: saved } = {} }] = useMutation(SAVE,{
    onCompleted: () => {
      setError()
    },
    onError: (error) => {
      console.log(error.message);
    }
  })
  const { data: { comments: commentsData } = {} } = useQuery(COMMENTS, {
    variables: { publicationID: postID },
    onCompleted: ({ comments: commentsData }) => {
      setNewComment(oldArray => [...oldArray, ...commentsData])
    },
    onError: (error) => {
      console.log(error.message);
    }
  })
  
  useEffect(() => {
    if (!called && postID) getPublication({ variables: { id: postID } })
    
    if (postID && !calledIncViews) {
      const views = cookies['views'] || []

      if (!views.length || !views.includes(postID)) {
        views.push(postID)
        incViews({ variables: { id: postID }})
      }

      if (views && views.length) setCookie('views', views, { path: '/' })
    }
  }, [postID]);

  if (!publication || loading || errorMessage) return <>
    <Layout loading={true}></Layout>
  </>

  const body = draftToHtml(JSON.parse(publication.content));

  const Article = styled.div`
    & > * {
      margin-top: 25px;
      margin-bottom: 25px;
    }

    & p {
      text-align: justify;
    }

    & img {
      display: block;
      margin: 0 auto;
      border-radius: 20px;
      max-height: 350px;
    }

    & ul {
      margin-left: 1.7em;

      & li {
        margin-bottom: 5px;
      }
    }

  `

  return (
    <>
      <Layout adminPanel={false} sidebar={
        <AdditionalBlock
          username={publication.user.username}
          role={publication.user?.role}
          published={new Date(Number(publication.user.createdAt))}
          views={newViews || publication.views}
          bio={publication.user.bio}
          saved={publication.saved}
          onSave={() => { toggleSaved({ variables: { publicationID: postID } }) }}
          postID={postID}
          token={cookieToken['token']}
        ></AdditionalBlock>
      }>
        <h2 className="title">{publication.title}</h2>

        <Article
          dangerouslySetInnerHTML={{__html: body}}
        ></Article>

        <div className="comments">
          {cookieToken['token'] ? <div className="comment-input">
            <Error>{commentErrorMessage}</Error>

            <TextField
              ref={commentRef}
              id="outlined-multiline-static"
              label='comment'
              multiline
              rows={2}
              error={commentErrorMessage}
              sx={{
                width: '100%',
              }}
              onChange={(e) => {setComment(e.target.value)}}
            />

            <Button onClick={() => comment && addComment({ variables: { comment, publicationID: postID }})}>send</Button>
          </div> : <hr></hr>}

          {
            comments.map(({ _id, user, createdAt, content }) => 
              <div key={_id}>
                <Comment
                  id={_id}
                  username={user.username}
                  date={new Date(Number(createdAt))}
                  content={content}
                ></Comment>
              </div>
            )
          }
        </div>
      </Layout>

      <style jsx>{`

        .comments {
          margin-top: 50px;
        }

        .comment-input {
          display: flex;
          flex-direction: column;
          gap: 10px;
          align-items: flex-end;
        }
      `}</style>
    </>
  )
}

export default PostPage
