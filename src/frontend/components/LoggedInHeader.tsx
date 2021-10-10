import { IconButton, List, ListItem, Slide } from '@mui/material'
import { NobeeLogoWithText } from './icons/NobeeLogoWithText'
import { ButtonWithModalLogged } from './ButtonWithModalLogged'
import { CloseIcon } from './icons/CloseIcon'
import { MenuIcon } from './icons/MenuIcon'
import router from 'next/router'
import { useState } from 'react'
import { LogOutIcon } from './icons/LogOutIcon'
import { parseCookies, destroyCookie } from 'nookies';
export const LoggedInHeader = (props: any) => {
  const [show, setShow] = useState(false);
  const cookies = parseCookies();
  const email = props.user.email;
  const character = email[0];
  const handleShow = () => {
    setShow(!show);
  }
  const handleLogout = async (accessToken: string) => {
    try {
      const resp = await fetch('http://localhost:3000/api/auth/logout', {
        method: 'POST',
        headers: { ContentType: "application/json", Authorization: `Bearer ${accessToken}` }
      }
      )
      destroyCookie(null, 'accessToken');
      router.replace(router.asPath);
    }
    catch (error) {
    }
  }
  return (
    <div className="h-14 fixed z-20 w-full bg-white py-4 px-3 flex items-center justify-between shadow">
      <ButtonWithModalLogged
        handleShow={handleShow}
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
                    <div className="bg-primary h-7 w-7 rounded-full text-white flex items-center justify-center uppercase mr-2">
                      {character}
                    </div>
                    {email}
                  </ListItem>
                  <ListItem
                    button
                    classes={{ root: 'text-base font-semibold py-3' }} onClick={() => handleLogout(cookies.accessToken)}
                  >
                    <LogOutIcon className="w-6 h-6 mr-2" /> Log Out
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
      {show && <div className="w-7 h-7" />}
      {!show && <div className="bg-primary h-7 w-7 rounded-full text-white flex items-center justify-center uppercase">
        {character}
      </div>}
    </div>
  )
}
