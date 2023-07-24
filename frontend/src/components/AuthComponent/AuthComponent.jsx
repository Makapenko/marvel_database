import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { authenticateWithGoogle } from './authService'
import { loginAC, logoutAC } from '../../redux/reducers/userReducer.js'

const AuthComponent = () => {
  const dispatch = useDispatch()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      dispatch(loginAC(storedUser.readComics))
    }
  }, [dispatch])

  useEffect(() => {
    if (!window.google || user) return

    const handleCredentialResponse = async response => {
      try {
        const user = await authenticateWithGoogle(response.credential)
        console.log('User authenticated:', user)
        setUser(user)
        localStorage.setItem('user', JSON.stringify(user))
      } catch (error) {
        console.error('Authentication error:', error)
      }
    }

    window.google.accounts.id.initialize({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
      auto_select: false,
    })

    window.google.accounts.id.renderButton(
      document.getElementById('google-signin-button'),
      {
        theme: 'outline',
        size: 'large',
      }
    )
  }, [user])

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
    dispatch(logoutAC())
  }

  return (
    <div>
      {user ? (
        <div>
          <p>Добро пожаловать, {user.email}!</p>
          <button onClick={logout}>Выйти</button>
        </div>
      ) : (
        <div id="google-signin-button"></div>
      )}
    </div>
  )
}

export default AuthComponent
