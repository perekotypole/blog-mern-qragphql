import React from 'react'
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

const Layout = ({ children, role = 'guest' }) => (
  <>
    <Head>
      <title>f u z e</title>
      <link rel="icon" href="/favicon.ico" />

      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>

    <main>
      <div className='container sidebar sidebar-left'>
        <header>
          <Card>
            <Content>
              <h1 className='projectname' data-before="fuze">fuze</h1>

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
                            <Link href={'/profile'}>
                              <PersonIcon></PersonIcon>
                            </Link>

                            <Link href={'/publish'}>
                              <EditIcon></EditIcon>
                            </Link>

                            <Link href={'/notifications'}>
                              <NotificationsIcon></NotificationsIcon>
                            </Link>

                            <Link href={'/saved'}>
                              <BookmarkIcon></BookmarkIcon>
                            </Link>

                            <Link href={'/auth'}>
                              <LogoutIcon></LogoutIcon>
                            </Link>
                          </>
                        )
                        
                      case 'guest':
                      default:
                        return (
                          <>
                            <span></span>

                            <Link href={'/auth'}>
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
          <Image src={'/images/plug1.png'} width={270} height={180}></Image>
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

      <div className='container content'>
        {children}
      </div>

      <div className='container sidebar sidebar-left'>
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
        <Card rounded>
          <Image src={'/images/plug2.png'} width={270} height={300}></Image>
        </Card>
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
        width: 320px;
        height: 100vh;
        overflow: hidden;

        display: flex;
        flex-direction: column;
        gap: 30px;
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
  </>
)

export default Layout