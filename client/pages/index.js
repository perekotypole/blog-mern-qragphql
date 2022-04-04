import "@fontsource/roboto"

import Layout from '../components/Layout'
import PostItem from '../components/PostItem'

export default function Home() {
  return (
    <>
      <Layout role="user">
        <PostItem
          username={'user'}
          avatar={'/images/plug1.png'}
          title={'Lorem ipsum dolor sit amet, consectetur adipiscing elit ipsum dolor sit amet, consectetur adipiscing elit'}
          date={new Date('2020/02/03')}
          topic={'politic'}
          content={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam fringilla pulvinar consequat, mattis ornare netus...'}
        ></PostItem>

        <hr></hr>

        <PostItem
          username={'user1'}
          title={'Lorem ipsum dolor sit amet, consectetur adipiscing elit ipsum dolor sit amet, consectetur adipiscing elit'}
          date={new Date('2020/02/03')}
          topic={'IT'}
          content={'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam fringilla pulvinar consequat, mattis ornare netus...'}
        ></PostItem>
      </Layout>

      <style jsx>{`
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
        }

        input {
          caret-color: var(--color-contrast);
        }

        .projectname {
          color: rgba(155, 0, 255, 0.7);
          text-shadow: .01em .07em .05em #fff,
                       0 0 0 #000,
                       .01em .07em .05em #fff;

          line-height: 1em;
          letter-spacing: 1.5em;
          text-transform: uppercase;
        }
      `}</style>
    </>
  )
}
