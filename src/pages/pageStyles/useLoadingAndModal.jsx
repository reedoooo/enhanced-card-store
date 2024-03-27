// This is a conceptual example, adjust based on actual logic
import { useModalContext } from '../../context';

const useLoadingAndModal = () => {
  const { isModalOpen, modalContent, closeModal } = useModalContext();

  return {
    isModalOpen,
    modalContent,
    closeModal,
  };
};

export default useLoadingAndModal;
