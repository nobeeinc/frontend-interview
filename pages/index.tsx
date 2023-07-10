import { AppHeader } from '@frontend/components/AppHeader'
import { AppHeaderLoggedIn } from '@frontend/components/AppHeaderLoggedIn'
import axios from 'axios'
import { useState, useEffect } from 'react'

const Home = () => {
  const [user, setUser] = useState(null)
  useEffect(() => {
    const accessToken = localStorage.getItem('access-token')

    if (accessToken) {
      axios
        .get(`/api/auth/user`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        })
        .then((res) => {
          setUser(res.data.email)
        })
    }
  }, [user])

  return <div>{!user ? <AppHeader /> : <AppHeaderLoggedIn email={user} />}</div>
}

export default Home
