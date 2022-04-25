import React, { useState } from 'react'
import { useCookies } from "react-cookie"
import { useRouter } from 'next/router'
import Link from 'next/link'

import { gql, useLazyQuery } from "@apollo/client";

import Layout from "../../components/Layout"
import Button from '../../components/Button'

import { CircularProgress, TextField } from "@mui/material"

const LOGIN = gql`
  query ($data: LoginInput) {
    login (data: $data) {
      token
    }
  }
`;

const LoginPage = () => {
  const router = useRouter()

  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  const [cookie, setCookie] = useCookies(["token"])

  const [
    getLogin, 
    { loading, data, error }
  ] = useLazyQuery(LOGIN, {
    variables: {
      data: {
        username,
        password,
      }
    }
  });

  const innerBlock = () => {
    if (loading) return (
      <>
        <CircularProgress color="secondary" sx={{ display: 'block', margin: 'auto' }} />
      </>
    )

    if (error) {
      console.log(error);
    }

    if (data && data.login && data.login.token) {
      const { token } = data.login
      setCookie('token', token, { path: '/' })

      router.push('/')
    }

    return (
      <>
        <TextField error={!!error} label="username" fullWidth sx={{ marginBottom: '.5em' }} onChange={(e) => setUsername(e.target.value)} />
        <TextField error={!!error} label="password" type={'password'} fullWidth sx={{ marginBottom: '.5em' }} onChange={(e) => setPassword(e.target.value)}/>
  
        <div className='bottom'>
          <Link href={'/auth/register'} passHref>registration</Link>
  
          <Button type="submit" onClick={() => getLogin()}>log in</Button>
        </div>

        <style jsx>{`

        .bottom {
          margin-top: 20px;
          display: flex;
          justify-content: space-between;
        }
      `}</style>
      </>
    )
  }

  return (
    <>
      <Layout role="guest">
        <div className="projectname">fuze</div>

        <div className="auth-block">
          <h2>Log in</h2>

          <div className="form">
            {innerBlock()}
          </div>
        </div>
      </Layout>

      <style jsx>{`
        .projectname {
          font-size: 64px;
          margin: 1em;
          margin-right: -.5em;
          text-align: center;

          -moz-transform: scale(1, -1);
          -webkit-transform: scale(1, -1);
          -o-transform: scale(1, -1);
          -ms-transform: scale(1, -1);
          transform: scale(1, -1);
        }

        h2 {
          font-weight: 900;
          font-size: 32px;
          text-align: center;
        }

        .form {
          width: 320px;
          margin: 25px auto;
        }
      `}</style>
    </>
  )
}

export default LoginPage
