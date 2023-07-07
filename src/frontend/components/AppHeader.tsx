import { IconButton, List, ListItem, Slide } from '@mui/material'
import { NobeeLogoWithText } from './icons/NobeeLogoWithText'
import { ButtonWithModal } from './ButtonWithModal'
import { CloseIcon } from './icons/CloseIcon'
import { MenuIcon } from './icons/MenuIcon'
import Link from 'next/link'
export const AppHeader = () => {
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
                    <Link href="/loginorsignup">Sign up</Link>
                  </ListItem>
                  <ListItem
                    button
                    classes={{ root: 'text-base font-semibold py-3' }}
                  >
                    <Link href="/loginorsignup">Log in</Link>
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
