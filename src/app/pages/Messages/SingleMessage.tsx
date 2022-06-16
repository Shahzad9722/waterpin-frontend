import * as React from 'react'

import './../../../styles/global-styles'
import styles from './Messages.module.scss'

export const SingleMessage = ({ avatar, name, message, time, chats, title, setChat }) => {
  return (
    <button className={styles['messages-card']} onClick={setChat(chats)}>
      <div className={styles['messages-card__header']}>
        <img
          className={styles['messages-card__header--avatar']}
          src={`${process.env.PUBLIC_URL}/icons/${avatar}`}
          alt="message card avatar"
        />
        <span className={styles['messages-card__header--name']}>{name}</span>
      </div>
      <span className={styles['messages-card__header--title']}>{title}</span>
      <div className={styles['messages-card__body']}>
        <p>{message}</p>
        <small>{time}</small>
      </div>
    </button>
  )
}
