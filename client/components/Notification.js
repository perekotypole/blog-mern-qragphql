import React from 'react'
import Link from 'next/link'

import Stack from '@mui/material/Stack';

const NotificationItem = ({
  type,
  user,
  reason,
  publication,
  date,
  period,
}) => (
  <>
    <div className='notification'>
      <Stack alignItems="center" direction="row" spacing={2}>
        <div className='type'>{type}</div>
        <div className='date'>{date.toLocaleString()}</div>
      </Stack>

      {
        !publication || (
          <div className='publication'>
            Post: <span><Link passHref href="/post/[user]/[id]" as={`/post/@${user}/${publication.id}`}>{publication.title}</Link></span>
          </div>
        )
      }

      {
        !period || (
          <div className='period'>
            Period: <span>{period.start.toLocaleDateString()} - {period.end.toLocaleDateString()}</span>
          </div>
        )
      }

      {
        !reason || (
          <div className='reason'>
            Reason: <span>{reason}</span>
          </div>
        )
      }
    </div>

    <style jsx>{`
      .type {
        font-weight: 1000;
        text-transform: uppercase;
        color: #FF0000;
      }

      .date {
        font-size: .8em;
      }

      .publication span {
        font-weight: 1000;
      }
    `}</style>
  </>
)

export default NotificationItem