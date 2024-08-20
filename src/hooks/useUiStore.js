import { useDispatch, useSelector } from "react-redux";
import { onCloseDateModal, onOpenDateModal } from "../store/ui/uiSlice";

export const useUiStore = () => {
  // le decimos al store que ejecute alguna accion (hacemos un dispatch de una accion)
  const dispatch = useDispatch();

  // con el useSelector accedemos al state que querramos
  const { isDateModalOpen } = useSelector((state) => state.ui);

  // funcion que abre el model, hace el dispatch de dicha accion de mi reducer
  const openDateModal = () => {
    dispatch(onOpenDateModal());
  };

  // funcion que cierra el model, hace el dispatch de dicha accion de mi reducer
  const closeDateModal = () => {
    dispatch(onCloseDateModal());
  };

  const toggleDateModal = () => {
    isDateModalOpen ? openDateModal() : closeDateModal();
  };

  return {
    // Propiedades
    isDateModalOpen,
    hasIsDateModalOpen: !!isDateModalOpen,

    // Métodos
    openDateModal,
    closeDateModal,
    toggleDateModal,
  };
};
