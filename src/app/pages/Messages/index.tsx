import * as React from 'react'
import { Helmet } from 'react-helmet-async'
import { Divider, Box, Table, TableBody, TableCell, TableRow, TableContainer } from '@mui/material'

import { Nav } from '../../components/Nav'
import { Search } from '../../components/Search'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components/macro'
import { IoMdSend } from 'react-icons/io'
import { useMessagesSlice } from './slice'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import styles from './Messages.module.scss'
import messagesData from './messagesData.json'
import { MessageProps } from './types'

import { SingleMessage } from './SingleMessage'

// import {
//   selectLoading,
//   selectPayload,
//   selectError,
//   selectUser,
//   selectToken,
//   selectSuccess,
//   selectLoginSuccess
// } from '../../slice/selectors';

export function Messages() {
  const history = useHistory()
  const { actions } = useMessagesSlice()
  const dispatch = useDispatch()

  // const authUser = useSelector(selectUser)
  // const loading = useSelector(selectLoading)
  // const errors = useSelector(selectError)
  // const success = useSelector(selectSuccess)
  // const payload = useSelector(selectPayload)

  const [user, set_user] = React.useState({
    username: '',
    firstName: '',
    lastName: '',
    profile_image: '',
    notifications: [],
    role_id: 1,
    is_owner: false,
  })

  const [messages, setMessages] = React.useState<MessageProps[]>([])

  React.useEffect(() => {
    //setMessages(messagesData)
  }, [])

  const [chat, setChat] = React.useState([{text:"",type:"outgoing", timeStamp:"outgoing"}])

  const { t, i18n } = useTranslation()

  // React.useEffect(() => {
  //   if(authUser !== null && authUser !== undefined){
  //     set_user(authUser)
  //   }
  // },[authUser])
  //
  // React.useEffect(() => {
  //   setTimeout(() => dispatch(actions.getDashboardData()), 100);
  // },[])

  function createData(name, info) {
    return { name, info }
  }

  const rows = [
    createData('Dates:', '11/25/20 - 11/28/20'),
    createData('Duration:', 237),
    createData('Time:', 262),
    createData('Guests:', 305),
    createData('Location:', 356),
  ]

  const handleMessageSubmit = e => {
    e.preventDefault()
  }

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
        <meta name="description" content="The water platform for everyone" />
      </Helmet>
      <Nav />
      {!messages ? (
        <>
          <header>
            <h2>Messages</h2>
          </header>
          <section>
            <Box
              display={'flex'}
              justifyContent={'center'}
              flexDirection={'column'}
              width={'100%'}
              height={'70vh'}
              textAlign={'center'}
              paddingX={'70vh'}
            >
              <div>
                <img src={`${process.env.PUBLIC_URL}/icons/no-messages.svg`} alt="no messages" />
              </div>

              <h1>No Messages, Yet.</h1>
              <text>
                Start exploring our yachts and connect <br /> with owners all around the world.
              </text>
            </Box>
          </section>
        </>
      ) : (
        <section>
          <aside>
            <header>
              <h2>Messages</h2>
            </header>
            <div className={styles.messages}>
              {messages?.map(msg => (
                <SingleMessage
                  key={msg.id}
                  avatar={msg.avatar}
                  name={msg.name}
                  time={msg.timeStamp}
                  message={msg.message}
                  title={msg.title}
                  chats={msg.chats}
                  setChat={setChat}
                />
              ))}
            </div>
          </aside>
          <section className={styles.conversations}>
            <header className={styles['conversations-header']}>
              <div className={styles['conversations-header__avatar']}>
                <img
                  src={`${process.env.PUBLIC_URL}/icons/message-avatar.png`}
                  alt="conversation"
                />
              </div>
              <div>
                <h3>Tom Harry</h3>
                <small>5 min ago</small>
              </div>
            </header>
            <div className={styles['conversations-body']}>
              <div className={styles['conversations-body__chats']}>
                {chat !== null
                  ? (
                    <>
                      {chat.map(msg => {
                        return (
                          <div
                            className={`${styles['conversations-body__chat']} ${
                              msg.type === 'outgoing' && 'conversations-body__chat--right'
                            }`}
                          >
                            <div
                              className={`${styles['conversations-body__chat']} ${
                                styles[`conversations-body__chat--${msg.type}`]
                              }`}
                            >
                              {msg.text}
                            </div>
                            <small>{msg.timeStamp}</small>
                          </div>
                        )
                      })}
                    </>
                  )
                  : null
                }

              </div>

              <form
                className={styles['conversations-body__footer']}
                action="submit"
                onSubmit={handleMessageSubmit}
              >
                <input type="text" name="message" id="message" placeholder="Write something ..." />
                <button
                  style={{
                    backgroundColor: '#00c2cb',
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    border: 'none',
                    color: 'white',
                  }}
                  type="submit"
                >
                  <IoMdSend color="white" fontSize={'20px'} />
                </button>
              </form>
            </div>
          </section>
          <section className={styles['details']}>
            <header>
              <h2>Boat Details</h2>
            </header>
            <div className={styles['messages']}>
              <h3>103’ Johnson Luxury Super Yacht (Jaccuzi, Jetski’s, & More)!</h3>
              <img src={process.env.PUBLIC_URL + '/message-boat.png'} />
              <TableContainer>
                <Table sx={{ minWidth: 250 }} aria-label="simple table">
                  <TableBody>
                    {rows.map(row => (
                      <TableRow
                        key={row.name}
                        sx={{
                          '&:last-child td, &:last-child th': { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {row.name}
                        </TableCell>
                        <TableCell align="right">{row.info}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Divider variant="middle" />
              </TableContainer>
            </div>
          </section>
        </section>
      )}
    </>
  )
}
