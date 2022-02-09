import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import React from 'react';
import Backdrop from '../Backdrop';

type ModalProps = DialogProps & {
  isLoading?: boolean;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ open, onClose, title, isLoading = false, children }) => {
  return (
    <>
      {isLoading ? (
        <Backdrop open={true} />
      ) : (
        <Dialog className='modal' onClose={onClose} open={open} keepMounted>
          <DialogTitle className='modal-title'>
            {title}
            <IconButton className='modal-btn__close' onClick={onClose}>
              <CloseIcon aria-label='close' />
            </IconButton>
          </DialogTitle>
          {children}
        </Dialog>
      )}
    </>
  );
};

export default Modal;
