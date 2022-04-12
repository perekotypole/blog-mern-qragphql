import React from 'react'
import "@fontsource/roboto/900.css"
import "@fontsource/roboto/300.css"
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'

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

const Layout = ({ children, sidebar, role = 'guest' }) => (
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

                              <Link href={'/profile/publish'} passHref>
                                <EditIcon></EditIcon>
                              </Link>

                              <Link href={'/profile/notifications'} passHref>
                                <NotificationsIcon></NotificationsIcon>
                              </Link>

                              <Link href={'/profile/saved'} passHref>
                                <BookmarkIcon></BookmarkIcon>
                              </Link>

                              <Link href={'/auth/logout'} passHref>
                                <LogoutIcon></LogoutIcon>
                              </Link>
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
                    })(role)
                  }
                </div>
              </Content>
            </Card>
          </header>

          <Card rounded>
            <Image alt='banner' src={'/images/plug1.png'} width={270} height={180}></Image>
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
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search"
              inputProps={{ 'aria-label': 'search=' }}
            />
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>

          {sidebar}
          
          <Card rounded>
            <Image alt='banner' src={'/images/plug2.png'} width={270} height={300}></Image>
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

export default Layout