import { useCalendarStore, useUiStore } from "../../hooks";

export const FabDelete = () => {
  const { startDeletingEvent, hasEventSelected } = useCalendarStore();
  const { hasIsDateModalOpen } = useUiStore();

  const handleDelete = () => {
    startDeletingEvent();
  };

  return (
    <button
      className="btn btn-danger fab-danger"
      onClick={handleDelete}
      style={{ display: hasEventSelected && !hasIsDateModalOpen ? "" : "none" }}
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};
