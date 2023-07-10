import { IconButton, List, ListItem, Slide } from '@mui/material'
import { NobeeLogoWithText } from './icons/NobeeLogoWithText'
import { ButtonWithModal } from './ButtonWithModal'
import { CloseIcon } from './icons/CloseIcon'
import { MenuIcon } from './icons/MenuIcon'
import Avatar from '@mui/material/Avatar'
import { lightGreen } from '@mui/material/colors'
import axios from 'axios'
import router from 'next/router'
type AppHeaderLoggedInProps = {
  email: string
}
export const AppHeaderLoggedIn = ({ email }: AppHeaderLoggedInProps) => {
  const logoutHandler = () => {
    const accessToken = localStorage.getItem('access-token')
    console.log('log out token', accessToken)

    axios
      .post('http://localhost:3000/api/auth/logout', {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then(() => {
        localStorage.removeItem('access-token')
        router.push('/')
      })
      .catch((err) => {
        localStorage.removeItem('access-token')
        router.reload()
      })
  }
  return (
    <div className="h-14 fixed z-20 w-full bg-white py-4 px-3 flex items-center justify-between shadow">
      <ButtonWithModal
        renderButton={({ isModalOpen, openModal, closeModal }) =>
          isModalOpen ? (
            <IconButton
              id="app-header-close-menu-icon-button"
              aria-label="Close app header menu button"
              classes={{ root: 'p-1' }}
              onClick={closeModal}
            >
              <CloseIcon className="h-6 w-6 fill-current text-black" />
            </IconButton>
          ) : (
            <IconButton
              id="app-header-menu-icon-button"
              aria-label="Open app header menu button"
              classes={{ root: 'p-1' }}
              onClick={openModal}
            >
              <MenuIcon className="h-6 stroke-current text-black" />
            </IconButton>
          )
        }
        renderModal={({ Modal, isModalOpen, closeModal }) => (
          <Modal
            classes={{ root: 'z-10' }}
            open={isModalOpen}
            onClose={closeModal}
            closeAfterTransition
          >
            <Slide in={isModalOpen} direction="down">
              <div className="bg-white h-full w-full pt-14">
                <List classes={{ root: 'pt-4' }}>
                  <ListItem
                    button
                    classes={{ root: 'text-base font-semibold py-3' }}
                  >
                    <div onClick={logoutHandler}>Log out</div>
                  </ListItem>
                  <ListItem classes={{ root: 'text-base font-semibold py-3' }}>
                    {email && (
                      <Avatar sx={{ bgcolor: lightGreen[700] }}>
                        {email[0]}
                      </Avatar>
                    )}
                    <div>{email}</div>
                  </ListItem>
                </List>
              </div>
            </Slide>
          </Modal>
        )}
      />

      <a
        href="https://www.rentnobee.com"
        aria-label="Link to https://www.rentnobee.com"
      >
        <NobeeLogoWithText className="h-6" />
      </a>

      <Avatar sx={{ bgcolor: lightGreen[700] }}>{email[0]}</Avatar>
    </div>
  )
}
