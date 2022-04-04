import React from 'react'

const Content = ({ children, rounded = false }) => (
  <>
    <div className='content'>
      {children}
    </div>

    <style jsx>{`
      .content {
        padding: 20px 25px;
      }
    `}</style>
  </>
)

export default Content