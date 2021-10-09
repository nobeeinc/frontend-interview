import { AppHeader } from '@frontend/components/AppHeader'
import { LoggedInHeader } from '@frontend/components/LoggedInHeader';
import axios from 'axios';
import nookies from 'nookies'
const Home = ({user}:any) => {
  if(!user) return <AppHeader />
  else {
    return <LoggedInHeader user = {user}/>
  }
}
export default Home

export async function getServerSideProps(ctx:any) {
  const cookies = nookies.get(ctx)
  let user = null;
  try{
      const resp = await axios.get('http://localhost:3000/api/auth/user', {
          headers: { Authorization: `Bearer ${cookies.accessToken}`}
      });
      user = resp.data;
  }
  catch(error){
  }
  return {
    props: {
      user,
    },
  }
}