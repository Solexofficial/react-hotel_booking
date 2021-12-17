import { useCallback, useState } from 'react';

export function useModal() {
  const [isOpen, setOpen] = useState(false);

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = useCallback(() => {
    setOpen(false);
  }, []);

  return { isOpen, handleOpenModal, handleCloseModal };
}
