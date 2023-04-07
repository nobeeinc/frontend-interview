import { IconButton, List, ListItem, Slide } from '@mui/material'
import { NobeeLogoWithText } from '@frontend/components/icons/NobeeLogoWithText'
import { ButtonWithModal } from '@frontend/components/ButtonWithModal'
import { CloseIcon } from '@frontend/components/icons/CloseIcon'
import { MenuIcon } from '@frontend/components/icons/MenuIcon'
import { useRouter } from 'next/dist/client/router'
import { useEffect, useState } from 'react'
import { LogoutIcon } from '@frontend/components/icons/LogoutIcon'
import style from '@frontend/assets/styles/SignupLogin.module.css'
/* eslint-disable */
const loginSuccess = () => {
  const router = useRouter()
  const token = router.query.token as string
  const [email, setEmail] = useState<string>(' ')

  useEffect(() => {
    //get username from token
    async function fetchData() {
      const response = await fetch('http://localhost:3000/api/auth/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
      const data = await response.json()
      setEmail(data['email'])
    }

    fetchData()
  })
  const Logout = () => {
    async function logout() {
      await fetch('http://localhost:3000/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }).then((response) => {
        if (response.ok) {
          router.push('/')
        } else {
          alert('Cannot log out!')
        }
      })
    }
    logout()
  }

  return (
    <>
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
                    <ListItem>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                      >
                        <div className={style.avatar}>
                          {email[0].toLocaleUpperCase()}
                        </div>
                        <div
                          style={{
                            margin: '0 10px',
                            fontSize: '16px',
                            lineHeight: '24px',
                            fontWeight: 600,
                          }}
                        >
                          {' '}
                          {email}{' '}
                        </div>
                      </div>
                    </ListItem>
                    <ListItem
                      // Log out button
                      button
                      onClick={Logout}
                      classes={{ root: 'text-base font-semibold py-3' }}
                    >
                      <LogoutIcon className="h-12 w-16 text-black" />
                      <div className={style.logout}>Log out</div>
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

        <div className={style.avatar}>{email[0].toLocaleUpperCase()}</div>
      </div>
    </>
  )
}
export default loginSuccess
