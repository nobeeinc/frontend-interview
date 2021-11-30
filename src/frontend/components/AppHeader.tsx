import { Fragment } from 'react'
import { Close as CloseIcon } from '@mui/icons-material'
import { IconButton, Slide } from '@mui/material'
import { NobeeLogoWithText } from '../core/icons/NobeeLogoWithText'
import { BurgerMenuDrawer } from './AppHeader/BurgerMenuDrawer'
import { ButtonWithModal } from '../core/ButtonWithModal'
import { MenuIcon } from '../core/icons/MenuIcon'

export const AppHeader = () => {
  return (
    <Fragment>
      <div
        style={{ height: '3.5rem' }}
        className="fixed z-20 w-full bg-white py-4 px-3 flex items-center justify-between"
      >
        {/** Hamburger Button */}
        <ButtonWithModal
          renderButton={({ isModalOpen, openModal, closeModal }) =>
            isModalOpen ? (
              <IconButton
                id="app-header-close-menu-icon-button"
                aria-label="Close app header menu button"
                classes={{ root: 'p-1' }}
                onClick={closeModal}
              >
                <CloseIcon
                  classes={{ root: 'h-6 w-6 fill-current text-black' }}
                />
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
                  <BurgerMenuDrawer />
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
    </Fragment>
  )
}

// eslint-disable-next-line import/no-default-export
export default AppHeader
