// This is a conceptual example, adjust based on actual logic
import { useModalContext, usePageContext } from '../../context';

const useLoadingAndModal = () => {
  const { returnDisplay } = usePageContext();
  const { isModalOpen, modalContent, closeModal } = useModalContext();

  return {
    returnDisplay,
    isModalOpen,
    modalContent,
    closeModal,
  };
};

export default useLoadingAndModal;
