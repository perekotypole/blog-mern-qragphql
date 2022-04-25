import React from 'react'
import MButton from '@mui/material/Button'

const Button = ({ children, onClick, type }) => (
  <>
    <MButton
      onClick={onClick}
      type={type}
      variant="contained"
      sx={{
        fontWeight: '900',
        textTransform: 'lowercase',
        padding: '5px 20px',
        borderRadius: '2em',
        letterSpacing: '.4em',
        backgroundColor: "#9B00FF",
        '&:hover': {
          backgroundColor: "#7B00D5",
        }
      }}
    >{children}</MButton>

    <style jsx>{`

    `}</style>
  </>
)

export default Button