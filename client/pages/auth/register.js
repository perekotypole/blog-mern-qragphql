import React, { useState } from 'react'
import { useCookies } from "react-cookie"
import { useRouter } from 'next/router'
import Link from 'next/link'

import { gql, useMutation } from "@apollo/client";

import Layout from "../../components/Layout"
import Button from '../../components/Button'

import { CircularProgress, TextField } from "@mui/material"
import Error from '../../components/Error';

const REGISTER = gql`
mutation ($user: UserInput) {
  registerUser (user: $user) {
    token
  }
}
`;

const RegisterPage = () => {
  const router = useRouter()

  const [username, setUsername] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [passwordRepeat, setPasswordRepeat] = useState()
  
  const [errorMessage, setError] = useState()

  const [cookie, setCookie] = useCookies(["token"])

  const [
    register, 
    { loading, error }
  ] = useMutation(REGISTER, {
    onCompleted: (data) => {
      if (data && data.registerUser && data.registerUser.token) {
        const { token } = data.registerUser
        setCookie('token', token, { path: '/' })
  
        router.push('/')
      // } else {
      //   window.location.reload(false);
      }
    },
    onError: (error) => {
      setError(error.graphQLErrors)
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault()

    if (password !== passwordRepeat) {
      setError('Passwords do not match')
      return
    }

    register({
      variables: {
        user: {
          username,
          password,
          email
        }
      }
    })
  }

  const innerBlock = () => {
    if (loading) return (
      <>
        <CircularProgress color="secondary" sx={{ display: 'block', margin: 'auto' }} />
      </>
    )

    return (
      <>
        <Error>{errorMessage}</Error>

        <TextField error={!!error} label="username" fullWidth sx={{ marginBottom: '.5em' }} onChange={(e) => setUsername(e.target.value)} />
        <TextField error={!!error} label="email" fullWidth sx={{ marginBottom: '.5em' }} onChange={(e) => setEmail(e.target.value)} />
        <TextField error={!!error} label="password" type={'password'} fullWidth sx={{ marginBottom: '.5em' }} onChange={(e) => setPassword(e.target.value)}/>
        <TextField error={!!error} label="passwordRepeat" type={'password'} fullWidth sx={{ marginBottom: '.5em' }} onChange={(e) => setPasswordRepeat(e.target.value)}/>

        <div className='bottom'>
          <Link href={'/auth/login'} passHref>log in</Link>

          <Button type="submit">send</Button>
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
          <h2>Registration</h2>

          <form className="form"
            onSubmit={(e) => { 
              handleSubmit(e)
            }
          }>
            {innerBlock()}
          </form>
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

        .bottom {
          margin-top: 20px;
          display: flex;
          justify-content: space-between;
        }
      `}</style>
    </>
  )
}

export default RegisterPage
