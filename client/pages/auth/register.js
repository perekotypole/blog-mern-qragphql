import React from 'react'
import Link from 'next/link'

import Layout from "../../components/Layout"
import Button from '../../components/Button'

import { TextField } from "@mui/material"

const RegisterPage = () => {
  return (
    <>
      <Layout role="guest">
        <div className="projectname">fuze</div>

        <div className="auth-block">
          <h2>Registration</h2>

          <div className="form">
            <TextField label="username" fullWidth sx={{ marginBottom: '.5em' }} />
            <TextField label="e-mail" fullWidth sx={{ marginBottom: '.5em' }} />
            <TextField label="password" fullWidth sx={{ marginBottom: '.5em' }} />
            <TextField label="repeat password" fullWidth sx={{ marginBottom: '.5em' }} />

            <div className='bottom'>
              <Link href={'/auth/register'} passHref>log in</Link>

              <Button>send</Button>
            </div>
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
