import type { ReactNode } from 'react'

import { Fragment, useState } from 'react'
import { Modal } from '@mui/material'

export const ButtonWithModalLogged = ({
  handleShow,
  renderButton,
  renderModal,
}: ButtonWithModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
    handleShow()
  }

  const closeModal = () => {
    setIsModalOpen(false)
    handleShow()
  }

  return (
    <Fragment>
      {renderButton({ isModalOpen, openModal, closeModal })}
      {renderModal({ Modal, isModalOpen, openModal, closeModal })}
    </Fragment>
  )
}

export type ButtonWithModalProps = {
  handleShow: () => void
  renderButton: RenderButtonFn
  renderModal: RenderModalFn
}

export type RenderButtonFn = (inputs: ModalState) => ReactNode
export type RenderModalFn = (
  inputs: ModalState & { Modal: typeof Modal }
) => ReactNode

type ModalState = {
  isModalOpen: boolean
  openModal: () => void
  closeModal: () => void
}
