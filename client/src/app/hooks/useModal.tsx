import { useCallback, useState } from 'react';

function useModal() {
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = useCallback(() => {
    setOpen(false);
  }, []);

  return { isOpen, handleOpenModal, handleCloseModal };
}

export default useModal;
