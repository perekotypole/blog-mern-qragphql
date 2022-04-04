import React from 'react'

const Card = ({ children, rounded = false }) => (
  <>
    <div className={`card ${!rounded || 'card-rounded'}`}>
      {children}
    </div>

    <style jsx>{`
      .card {
        background: #FFFFFF;
        -webkit-box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
        border-radius: 10px;

        overflow: hidden;
      }

      .card-rounded {
        border-radius: 20px;
      }
    `}</style>
  </>
)

export default Card