import React from 'react'
import { gql } from "@apollo/client";
import client from "../../apollo-client";

import Layout from '../../components/Layout'
import PostItem from '../../components/PostItem'
import Button from '../../components/Button'

import { Avatar, Link, TextField } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';

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

const profile = {
  username: 'perekotypole',
  // email: 'instagram.com',
  contact: 'instagram.com',
  bio: ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam fringilla pulvinar consequat, mattis ornare netus. Arcu, praesent',
}

const ProfilePage = () => {
  
  return (
    <>
      <Layout role="user"
        sidebar={<Button>save</Button>}
      >
        <div className='profile'>
          {
            profile.avatar ?
            <Avatar {...style()} alt={username} src={avatar} /> :
            <Avatar {...style()} {...stringAvatar(profile.username)} />
          }

          <TextField
            label={'username'}
            defaultValue={profile.username}
          ></TextField>

          <TextField
            label={'email'}
            defaultValue={profile.email}
            type='email'
          ></TextField>

          <TextField
            label={'password'}
            type='password'
          ></TextField>

          <TextField
            label={'repeat password'}
            type='password'
          ></TextField>

          <TextField
            id="outlined-multiline-static"
            label='bio'
            multiline
            rows={2}
            maxRows={4}
            sx={{
              width: '100%',
            }}
          />

          <TextField
            label={'contact'}
            defaultValue={profile.contact}
          ></TextField>

          <TextField
            label={'paypal wallet'}
            defaultValue={profile.paypal}
          ></TextField>
        </div>
      </Layout>

      <style jsx>{`

      `}</style>
    </>
  )
}

export default ProfilePage
