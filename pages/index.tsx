import { AppHeader } from '@frontend/components/AppHeader'
import { LoggedInHeader } from '@frontend/components/LoggedInHeader'
import axios from 'axios'
import nookies from 'nookies'
import { GetServerSideProps } from 'next'
interface User {
  email: string
}
const Home = ({ user }: { user: User }) => {
  if (!user) return <AppHeader />
  else {
    return <LoggedInHeader emailProps={user.email} />
  }
}
export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = nookies.get(context)
  let user = null
  try {
    const resp = await axios.get('http://localhost:3000/api/auth/user', {
      headers: { Authorization: `Bearer ${cookies.accessToken}` },
    })
    user = resp.data
  } catch (error) {}
  return {
    props: {
      user,
    },
  }
}
