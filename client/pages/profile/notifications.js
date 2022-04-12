import React from 'react'

import Layout from '../../components/Layout'
import NotificationItem from '../../components/Notification'

const NotificationPage = () => {
  const user = {
    username: 'perekotypole'
  }

  const notifications = [
    {
      type: 'report',
      reason: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam fringilla pulvinar consequat, mattis ornare netu',
      publication: {
        _id: '1',
        title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'
      },
      date: new Date(),
    },
    {
      type: 'Block',
      reason: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam fringilla pulvinar consequat, mattis ornare netu',
      date: new Date(),
      period: {
        start: new Date(),
        end: new Date(new Date().getDate() + 1),
      },
    },
  ]

  const notificationsBlocks = notifications.map(({
    type,
    reason,
    publication,
    date,
    period,
  }) =>
    <>
      <NotificationItem
        type={type}
        user={user.username}
        reason={reason}
        publication={publication}
        date={date}
        period={period}
      ></NotificationItem>

      <hr></hr>
    </>
  )
  
  return (
    <>
      <Layout role="user">
        <h2 className='title upper'>Notifications</h2>

        { notificationsBlocks }
      </Layout>

      <style jsx>{`
      `}</style>
    </>
  )
}

export default NotificationPage
