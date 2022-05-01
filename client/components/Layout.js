import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { useCookies } from 'react-cookie'
import { gql, useLazyQuery, useQuery } from '@apollo/client'

import "@fontsource/roboto/900.css"
import "@fontsource/roboto/300.css"

import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import EditIcon from '@mui/icons-material/Edit';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BookmarkIcon from '@mui/icons-material/Bookmark';

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

import Card from './Card'
import Content from './Content'
import { CircularProgress } from '@mui/material'

const ROLE = gql`query { role }`

const Layout = ({ children, sidebar, loading: pageLoading = false, adminPanel = true }) => {
  const [cookie, setCookie, removeToken] = useCookies(['token'])
  const [getRole, { data, loading }] = useLazyQuery(ROLE)

  const router = useRouter()

  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    getRole()
    pageLoading = loading
  }, [cookie]);

  if (pageLoading) return (
    <>
      <Head>
        <title>f u z e</title>
        <link rel="icon" href="/favicon.ico" />

        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <main>
        <CircularProgress color="secondary" />
      </main>

      <style jsx>{`
        html,
        body {
          font-family: Roboto, -apple-system, BlinkMacSystemFont, Segoe UI, 
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
          font-weight: 300;
          background-color: #FAFAFA;
        }

        * {
          padding: 0;margin: 0;
          box-sizing: border-box;
        }

        main {
          display: flex;
          width: 100%; height: 90vh;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </>
  )

  return (
    <>
      <Head>
        <title>f u z e</title>
        <link rel="icon" href="/favicon.ico" />

        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <main>
        <div className='sidebar sidebar-left'>
          <div className='container'>
            <header>
              <Card>
                <Content>
                  <Link href={'/'} passHref>
                    <h1 className='projectname' data-before="fuze">fuze</h1>
                  </Link>

                  <hr></hr>

                  <div className='menu'>
                    {
                      ((role) => {
                        switch (role) {
                          case 'admin':
                          case 'moderator':
                          case 'user':
                            return (
                              <>
                                <Link href={'/profile'} passHref>
                                  <PersonIcon></PersonIcon>
                                </Link>

                                <Link href={'/post/publish'} passHref>
                                  <EditIcon></EditIcon>
                                </Link>

                                <Link href={'/profile/notifications'} passHref>
                                  <NotificationsIcon></NotificationsIcon>
                                </Link>

                                <Link href={'/profile/saved'} passHref>
                                  <BookmarkIcon></BookmarkIcon>
                                </Link>

                                <a>
                                  <LogoutIcon onClick={() => { removeToken('token', {path: '/'}); router.reload(window.location.pathname) }}></LogoutIcon>
                                </a>
                              </>
                            )
                            
                          case 'guest':
                          default:
                            return (
                              <>
                                <span></span>

                                <Link href={'/auth/login'} passHref>
                                  <LoginIcon></LoginIcon>
                                </Link>
                              </>
                            )
                        }
                      })(data?.role)
                    }
                  </div>
                </Content>
              </Card>
            </header>

            <Card rounded>
              <div><img loading="lazy" alt='banner' src={'/images/plug1.png'} width={270} height={180}></img></div>
            </Card>

            <footer>
              <Card>
                <Content>
                  <div className='footer-menu'>
                    <Link href={'/privacy'}>privacy</Link>
                    <Link href={'/license'}>license</Link>
                    <Link href={'/about'}>about</Link>
                    <Link href={'/help'}>help</Link>
                  </div>

                  <div className='footer-desc'>
                    {`©${new Date().getFullYear()}`}
                    &nbsp;&nbsp;
                    {`f u s e`}
                  </div>
                </Content>
              </Card>
            </footer>
          </div>
        </div>

        <div className='container content'>
          <Content>
            {children}
          </Content>
        </div>

        <div className='sidebar sidebar-left'>
          <div className='container'>
            <Paper
              component="form"
              sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
              onSubmit={(e) => { e.preventDefault(); if (searchQuery) router.push(`/search/${searchQuery}`) }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search"
                inputProps={{ 'aria-label': 'search=' }}
                defaultValue=''
                onChange={(e) => { setSearchQuery(e.target.value) }}
              />
              <IconButton
                type="submit" sx={{ p: '10px' }} aria-label="search"
              >
                <SearchIcon />
              </IconButton>
            </Paper>

            {sidebar}

            {
              adminPanel && ((role) => {
                switch (role) {
                  case 'admin':
                  case 'moderator':
                    return (
                      <Card>
                        <Content>
                          <h3>Admin Panel</h3>
                          <hr></hr>
                          <div className='admin-menu'>
                            <Link href={'/admin/users'} passHref><div style={{ fontWeight: '1000', textTransform: 'uppercase', padding: '5px 0' }}>Users list</div></Link>
                            <Link href={'/admin/posts'} passHref><div style={{ fontWeight: '1000', textTransform: 'uppercase', padding: '5px 0' }}>Post list</div></Link>
                            {role === 'admin' && <>
                              {/* <Link href={'/admin/posts'} passHref><div style={{ fontWeight: '1000', textTransform: 'uppercase', padding: '5px 0' }}>Info pages</div></Link> */}
                            </>}
                          </div>
                        </Content>
                      </Card>
                    )
                }
              })(data?.role)
            }
            
            <Card rounded>
              <div><img loading="lazy" alt='banner' src={'/images/plug2.png'} width={270} height={300}></img></div>
            </Card>
          </div>
        </div>
      </main>

      <style jsx>{`
        main {
          display: flex;
          max-width: 1280px;
          margin: auto;

          display: grid;
          grid-template-columns: 320px 1fr 320px;
        }

        .sidebar {
          overflow: hidden;
        }

        .sidebar>* {
          width: 320px;
          height: 100vh;

          display: flex;
          flex-direction: column;
          gap: 30px;

          position: fixed;
        }

        .projectname {
          font-size: 32px;
        }

        .menu {
          margin-left: auto;
          display: flex;
          justify-content: space-between;
        }

        .admin-menu {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .footer-menu {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5em;
        }

        .footer-desc {
          margin-top: 1em;
          display: flex;
          justify-content: flex-end;
        }
      `}</style>

      <style jsx global>{`
          html,
          body {
            font-family: Roboto, -apple-system, BlinkMacSystemFont, Segoe UI, 
              Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
              sans-serif;
            font-weight: 300;

            background-color: #FAFAFA;
          }

          * {
            padding: 0;margin: 0;
            box-sizing: border-box;
          }

          :root {
            --color-contrast: #9B00FF;
          }

          .container {
            padding: 30px 25px;
          }

          hr {
            margin: 15px 0;
            height: 3px;
            background: #000000;
          }

          a {
            color: black;
            cursor: pointer;
          }

          *[href] {
            cursor: pointer;
          }

          input {
            caret-color: var(--color-contrast);
          }

          h2.title {
            font-size: 32px;
            font-weight: 1000;
            margin-bottom: .5em;
          }

          h2.title.upper {
            text-transform: uppercase;
          }

          .projectname {
            color: rgba(155, 0, 255, 0.7);
            text-shadow: .01em .07em .05em #fff,
                        0 0 0 #000,
                        .01em .07em .05em #fff;

            line-height: 1em;
            letter-spacing: 1.5em;
            text-transform: uppercase;
            font-weight: 1000;
          }
        `}</style>
    </>
  )
}

export default Layout