import React, { useEffect, useState } from 'react'
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";

import Layout from '../../components/Layout'

import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import Link from 'next/link';
import { Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const PUBLICATIONS = gql`
query {
  latestPublications {
    _id,
    title,
    user {
      _id,
      username
    },
    createdAt,
    views,
    topic {
      title
    }
  }
}
`

const REMOVE_PUBLICATIONS = gql`
  mutation ($id: String) {
    removePublication (id: $id)
  }
`

const AdminPostsPage = () => {
  const [getPublications, { data, loading, called }] = useLazyQuery(PUBLICATIONS)
  const [removePublication, { loading: removingPublication }] = useMutation(REMOVE_PUBLICATIONS)

  if (!called) getPublications()
  
  const columns = [
    { field: 'title', headerName: 'Post', width: 300, cellClassName: 'post',
      renderCell: (params) => (
        params.value && <Link href="/post/[user]/[id]" as={`/post/${params.row.username}/${params.row.id}`}>{params.value}</Link>
      ),
    },
    { field: 'username', headerName: 'Author', width: 150,
      renderCell: (params) => (
        params.value && <Link href="/profile/[username]" as={`/profile/@${params.value}`}>{`@${params.value}`}</Link>
      ),
    },
    { field: 'created', headerName: 'Published', type: 'date',
      renderCell: (params) => (
        params.value && new Date(Number(params.value)).toLocaleDateString()
      ),
    },
    { field: 'views', headerName: 'Views' },
    { field: 'topic', headerName: 'Topic' },
    {
      field: 'actions', headerName: '',
      type: 'actions',
      width: 75,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Link href={{ pathname: `/post/edit/${params.row.id}`, query: { author: params.row.author } }}><EditIcon /></Link>}
          label="Edit"></GridActionsCellItem>,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => {
            removePublication({ variables: { id: params.row.id }});
            getPublications()
          }}
        />,
      ],
    }
  ];
  
  const [rows, setRows] = useState([])

  useEffect(() => {
    if (data?.latestPublications)
      setRows(data.latestPublications.map(el => ({
        id: el._id,
        title: el.title,
        author: el.user?._id,
        username: el.user?.username,
        created: el.createdAt,
        views: el.views,
        topic: el.topic?.title,
      })))
  }, [data]);

  if (loading && !rows && rows.length) return <Layout loading/>

  return (
    <>
      <Layout>
        <Box
          sx={{
            '& .post': {
              fontWeight: '1000',
            },
          }}
        >
          <DataGrid 
            sx={{ bgcolor: '#ffffff', height: 'calc(100vh - 100px)' }}
            rows={rows}
            columns={columns}
            pageSize={12}
          />
        </Box>
      </Layout>

      <style jsx>{`
      `}</style>
    </>
  )
}

export default AdminPostsPage
