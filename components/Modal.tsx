import React, { Dispatch, SetStateAction } from 'react'

type ModalProps = {
    children: React.ReactNode,
    isVisible?: boolean,
    hideModal: Dispatch<SetStateAction<boolean>>,
}

const Modal = ({ children, isVisible = false, hideModal }: ModalProps) => {
    return (
        <div style={isVisible ? { display: 'flex' } : { display: "none" }}
            onClick={() => hideModal(false)}
            className='bg-black/50 w-screen h-screen absolute'>
            {children}
        </div>
    )
}

export default Modal