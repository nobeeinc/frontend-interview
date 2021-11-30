import { ButtonWithAuthForm } from '../ButtonWithAuthForm'
import { Button } from '../../core/Button'
import { useCurrentUser } from '../../store/auth/auth.queries'
import { LogoutIcon } from '../../core/icons/LogoutIcon'
import { useLogout } from '../../store/auth/auth.mutations'
import {
  ListItemIcon,
  ListItemText,
  ListItem,
  Avatar,
  List,
} from '@mui/material'

export const BurgerMenuDrawer = () => {
  const { currentUser } = useCurrentUser()

  return (
    <div className="shadow-inner">
      {currentUser ? <ProtectedNavs /> : <AuthNavs />}
    </div>
  )
}

const ProtectedNavs = () => {
  const { currentUser } = useCurrentUser()
  const { logout } = useLogout()

  const handleLogout = () => {
    logout().finally(() => {
      location.reload()
    })
  }

  return (
    <List>
      {/* User email */}
      <ListItem>
        <ListItemIcon>
          <Avatar
            style={{ marginLeft: '-3px' }}
            classes={{ root: 'h-8 w-8 bg-primary' }}
            src={currentUser?.avatar}
            alt={currentUser?.name}
          />
        </ListItemIcon>
        <ListItemText>
          <span className="font-semibold">{currentUser?.name}</span>
        </ListItemText>
      </ListItem>

      {/** Logout button */}
      <ListItem button onClick={handleLogout}>
        <ListItemIcon classes={{ root: 'ml-[2px]' }}>
          <LogoutIcon className="h-6 stroke-current text-black" />
        </ListItemIcon>
        <ListItemText>
          <span className="text-base">Logout</span>
        </ListItemText>
      </ListItem>
    </List>
  )
}

const AuthNavs = () => {
  return (
    <div className="flex flex-col py-2">
      <ButtonWithAuthForm
        renderButton={({ openModal }) => (
          <Button
            fullWidth
            color="inherit"
            classes={{
              root: 'text-base normal-case px-[17px] py-3 justify-start',
            }}
            onClick={openModal}
          >
            Register
          </Button>
        )}
      />
      <ButtonWithAuthForm
        renderButton={({ openModal }) => (
          <Button
            fullWidth
            color="inherit"
            classes={{
              root: 'text-base normal-case px-[17px] py-3 justify-start',
            }}
            onClick={openModal}
          >
            Login
          </Button>
        )}
      />
    </div>
  )
}
