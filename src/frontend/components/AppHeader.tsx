import { IconButton, List, ListItem, Slide } from '@mui/material'
import { NobeeLogoWithText } from './icons/NobeeLogoWithText'
import { ButtonWithModal } from './ButtonWithModal'
import { CloseIcon } from './icons/CloseIcon'
import { MenuIcon } from './icons/MenuIcon'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import jwt_decode from 'jwt-decode'
import { JWTtokenParseInfo } from '../../../interface/JWTtokenParseInfo'
// import { useRouter } from 'next/router'

export const AppHeader = () => {
  const [isLogIn, setIsLogIn] = useState<JWTtokenParseInfo>()
  const signOutRef = useRef<HTMLAnchorElement | null>(null)
  // const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const getAccessToken = localStorage.getItem('accessToken: ')
      const token = getAccessToken
      const decoded: JWTtokenParseInfo = token ? jwt_decode(token) : {}
      if (decoded.exp && decoded.exp - Math.floor(Date.now() / 1000) > 0) {
        setIsLogIn(decoded)
      }
    }
  }, [])

  // useEffect(() => {
  //   const handleSignOut = () => localStorage.clear()
  //   signOutRef.current?.addEventListener('click', handleSignOut)

  //   router.push('/')
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   return () => signOutRef.current?.removeEventListener('click', handleSignOut)
  // }, [signOutRef])

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
                    {isLogIn ? (
                      <Link href="/" passHref>
                        {isLogIn.email}
                      </Link>
                    ) : (
                      <Link href="./signup/" passHref>
                        Sign up
                      </Link>
                    )}
                  </ListItem>
                  <ListItem
                    button
                    classes={{ root: 'text-base font-semibold py-3' }}
                  >
                    {isLogIn ? (
                      <Link href="/">
                        <a ref={signOutRef}>Log out</a>
                      </Link>
                    ) : (
                      <Link href="./login/" passHref>
                        Login
                      </Link>
                    )}
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

      <div />
    </div>
  )
}
