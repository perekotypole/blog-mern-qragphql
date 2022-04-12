import React from 'react'

import { Chip } from '@mui/material'

const Reactions = ({ children }) => (
  <>
    <div className='reactions'>
      <Chip label={`😂 5`} />
      <Chip label={`😒 5`} sx={{ bgcolor: '#9B00FF' }} />
      <Chip label={`❤️ 5`} />
      <Chip label={`👍 5`} />
      <Chip label={`👎 5`} />
      <Chip label={`🔥 5`} />
    </div>

    <style jsx>{`
      .reactions {
        display: flex;
        flex-wrap: wrap;
        gap: .5em;
      }
    `}</style>
  </>
)

export default Reactions