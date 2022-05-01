import React, { useEffect, useState } from 'react'
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";

import Layout from '../../components/Layout'

import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import Link from 'next/link';
import { Avatar, Box } from '@mui/material';
import { deepPurple } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';

const USERS = gql`
query {
  profiles {
    _id,
    username,
    image,
    contact,
    role,
    email,
    paymant,
    createdAt
  }
}
`
const CHANGE_ROLE = gql`
mutation ($userID: String, $role: String) {
  changeRole (user: $userID, role: $role)
}
`

const REMOVE_USER = gql`
  mutation ($id: String) {
    removeUser (id: $id)
  }
`

const ROLE = gql`query { role }`

const style = () => ({
  sx: {
    bgcolor: deepPurple[500],
    textTransform: 'uppercase',
    float: 'left',
    fontWeight: '1000',
    marginRight: '.5em',
  },
})

const stringAvatar = (name) => ({
  children: `${name?.split(' ')[0][0]}`,
})

const AdminUsersPage = () => {
  const { data: { role } = {} } = useQuery(ROLE)
  const [getUsers, { data, loading, called }] = useLazyQuery(USERS)
  const [changeRole, { loading: changingRole }] = useMutation(CHANGE_ROLE)
  const [removeUser] = useMutation(REMOVE_USER)

  if (!called) getUsers()

  const deleteUserField = role === 'admin' ? {
    field: 'actions', headerName: '',
    type: 'actions',
    width: 50,
    getActions: (params) => [
      <GridActionsCellItem
        icon={<DeleteIcon />}
        label="Delete"
        onClick={() => {
          removeUser({ variables: { id: params.row.id }});
          getUsers()
        }}
      />,
    ],
  } : {}

  const columns = [
    { field: 'avatar', headerName: '', width: 24,
      renderCell: (params) => (
        params.value ?
        <Link href="/profile/[username]" as={`/profile/@${params.row.username}`}>
          <Avatar {...style()} alt={params.row.username} src={params.value} /> 
        </Link>:
        <Link href="/profile/[username]" as={`/profile/@${params.row.username}`}>
          <Avatar {...style()} {...stringAvatar(params.row.username)}></Avatar>
        </Link>
      ),
    },
    { field: 'username', headerName: 'User', width: 150, cellClassName: 'username',
      renderCell: (params) => (
        params.value && <Link href="/profile/[username]" as={`/profile/@${params.value}`}>{`@${params.value}`}</Link>
      ),
    },
    { field: 'role', headerName: 'Role',
      type: 'singleSelect',
      valueOptions: ['user', 'moderator', 'admin'],
      cellClassName: role === 'admin' && 'role',
      editable: role === 'admin',
    },
    { field: 'created', headerName: 'Register', type: 'date',
      renderCell: (params) => (
        params.value && new Date(Number(params.value)).toLocaleDateString()
      ),
    },
    { field: 'email', headerName: 'E-Mail',
      renderCell: (params) => (
        params.value && <Link href={`mailto:${params.value}`}>{params.value}</Link>
      ),
    },
    { field: 'contact', headerName: 'Contact',
      renderCell: (params) => (
        params.value && <Link href={params.value}>{params.value}</Link>
      ),
    },
    { field: 'paymant', headerName: 'Wallet',
      renderCell: (params) => (
        params.value && <Link href={params.value}>{params.value}</Link>
      ),
    },
    deleteUserField
  ];
  
  const [rows, setRows] = useState([])

  useEffect(() => {
    if (data?.profiles)
      setRows(data.profiles.map(el => ({
        id: el._id,
        avatar: el.image,
        username: el.username,
        role: el.role,
        created: el.createdAt,
        email: el.email,
        contact: el.contact,
        paymant: el.paymant,
      })))
  }, [data]);

  if (loading && !rows && rows.length) return <Layout loading/>

  const handleRowEditCommit = React.useCallback(
    ({ id: userID, field, value }) => {
      if (field === 'role') changeRole({ variables: {
        userID,
        role: value,
      } })
    }, []
  );

  return (
    <>
      <Layout>
        <Box
          sx={{
            '& .username': {
              fontWeight: '1000',
            },
            '& .role': {
              backgroundColor: '#9030c4',
              color: '#ffffff',
              fontWeight: '1000',
            },
          }}
        >
          <DataGrid
            sx={{ bgcolor: '#ffffff', height: 'calc(100vh - 100px)' }}
            rows={rows}
            columns={columns}
            pageSize={12}
            onCellEditCommit={handleRowEditCommit}
          />
        </Box>
      </Layout>

      <style jsx>{`
      `}</style>
    </>
  )
}

export default AdminUsersPage
