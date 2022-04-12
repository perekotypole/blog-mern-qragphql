import React from 'react'

import Layout from "../../../components/Layout"
import Content from "../../../components/Content"
import Card from "../../../components/Card"
import Button from "../../../components/Button"
import Comment from "../../../components/Comment"
import Reactions from "../../../components/Reactions"

import { Avatar, TextField } from "@mui/material"
import Bookmark from "@mui/icons-material/Bookmark"
import { deepPurple } from "@mui/material/colors"

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
  published,
  views,
  bio,
}) => (
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
          
          <div className="username">@{username}</div>
        </div>

        <Button>follow</Button>
      </div>

      <div className="bio">{bio}</div>

      <hr></hr>

      <div className="post">
        <div className="details">
          <div className="published"><span>publshed: </span>{published.toLocaleString()}</div>
          <div className="views"><span>views: </span>{views}</div>
        </div>

        <Bookmark></Bookmark>
      </div>

      <Reactions></Reactions>
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

const PostPage = () => (
  <>
    <Layout role="user" sidebar={
      <AdditionalBlock
        username={'user'}
        published={new Date()}
        views={'5'}
        bio='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam fringilla pulvinar consequat, mattis ornare netus. Arcu, praesent ut a at congue. Lacus sapien diam'
      ></AdditionalBlock>
    }>
      <h2 className="title">Lorem ipsum dolor sit amet, consectetur adipiscing elit</h2>

      <div className="content">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam fringilla pulvinar consequat, mattis ornare netus. Arcu, praesent ut a at congue. Lacus sapien diam iaculis dignissim viverra tellus quis. Suspendisse tincidunt sit dignissim magna amet. Lectus vitae vulputate odio in dolor, arcu tempor malesuada. Id morbi vel, bibendum nam amet quam.
        </p>

        <p>
          Eget sem at nullam blandit luctus phasellus adipiscing lectus. Pellentesque mauris ullamcorper quam sit lacus scelerisque congue penatibus in. Venenatis adipiscing dictum purus malesuada. Et sed id augue adipiscing ante nunc, commodo pharetra. Sed pellentesque cursus dignissim facilisis sit nunc pellentesque tincidunt.
        </p>

        <div className="image">
          <Card rounded fit>
            <img src='/images/plug2.png'></img>
          </Card>

          <div className="image-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam fringilla pulvinar consequat, mattis ornare netus. Arcu, praesent</div>
        </div>

        <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h3>

        <ul>
          <li>Dis enim cras in tempus eu id tristique.</li>
          <li>Vitae sit mauris, nibh imperdiet etiam pharetra eu  senectus</li>
          <li>Non tempor gravida ut turpis. Turpis eget nunc suspendisse auctor urna.</li>
          <li>Nulla senectus risus dictum vel fermentum potenti dui.</li>
          <li>Massa nullam morbi senectus nunc ornare.</li>
        </ul>
      </div>

      <div className="comments">
        <div className="comment-input">
          <TextField
            id="outlined-multiline-static"
            label='comment'
            multiline
            rows={2}
            maxRows={4}
            sx={{
              width: '100%',
            }}
          />

          <Button>send</Button>
        </div>

        <Comment
          id={'1'}
          username={'user'}
          date={new Date()}
          content={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam fringilla pulvinar consequat, mattis ornare netus. Arcu, praesent ut a at congue. Lacus sapien diam iaculis dignissim viverra tellus quis. Suspendisse tincidunt sit dignissim magna amet.'}
        ></Comment>
      </div>
    </Layout>

    <style jsx>{`
      .content>* {
        margin-top: 25px;
        margin-bottom: 25px;
      }

      p {
        text-align: justify;
      }

      .image {
        display: flex;
        flex-direction: column;
        align-items: center;

        text-align: center;
        color: #656565;
        font-size: 12px;
      }

      .image img {
        max-height: 350px;
      }

      .image .image-description {
        margin-top: 10px;
      }

      h3 {
        font-weight: 900;
        font-size: 20px;
      }

      ul {
        margin-left: 1.7em;
      }

      li {
        margin-bottom: 5px;
      }

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

export default PostPage
