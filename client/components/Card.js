import React from 'react'

const Card = ({ children, rounded = false, fit = false, sx = {} }) => (
  <>
    <div
      className={`card`}
      style={{
        display: fit ? 'inline-block' : 'block',
        borderRadius: rounded || '20px',
        ...sx
      }}      
      >
        <div>
          {children}
        </div>
    </div>

    <style jsx>{`
      .card {
        background: #FFFFFF;
        -webkit-box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
        border-radius: 10px;

        overflow: hidden;
      }
      
      .card>div {
        margin-bottom: -4px;
      }

      .card-rounded {
        border-radius: 20px;
      }
    `}</style>
  </>
)

export default Card