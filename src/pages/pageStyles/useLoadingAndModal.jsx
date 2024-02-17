// This is a conceptual example, adjust based on actual logic
import { useModalContext, usePageContext } from '../../context';

const useLoadingAndModal = () => {
  const { loadingStatus, returnDisplay } = usePageContext();
  const { isModalOpen, modalContent, closeModal } = useModalContext();

  return {
    loadingStatus,
    returnDisplay,
    isModalOpen,
    modalContent,
    closeModal,
  };
};

export default useLoadingAndModal;
