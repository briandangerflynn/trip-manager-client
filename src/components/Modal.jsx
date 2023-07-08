import AddTripModalBody from "./AddTripModalBody";
import ReadTripModalBody from "./ReadTripModalBody";
import ReassignTripModalBody from "./ReassignTripModalBody";

export default function Modal({
  selectedTrip,
  trips,
  setTrips,
  assignees,
  getAssignees,
  currentUser,
  modalOpen,
  setModalOpen,
  modalTitle,
  modalType,
}) {
  const ModalBody = ({ modalType }) => {
    switch (modalType) {
      case "addTrip":
        return (
          <AddTripModalBody
            trips={trips}
            setTrips={setTrips}
            assignees={assignees}
            getAssignees={getAssignees}
            currentUser={currentUser}
            setModalOpen={setModalOpen}
          />
        );
      case "readTrip":
        return <ReadTripModalBody selectedTrip={selectedTrip} />;
      case "reassignTrip":
        return (
          <ReassignTripModalBody
            selectedTrip={selectedTrip}
            trips={trips}
            setTrips={setTrips}
            assignees={assignees}
            currentUser={currentUser}
            setModalOpen={setModalOpen}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className={`modalScreen ${modalOpen ? "open" : "closed"}`} />
      <div className={`modalBox ${modalOpen ? "open" : "closed"}`}>
        <div className="modalBoxHeader">
          <h2>{modalTitle}</h2>
          <p className="closeModal" onClick={() => setModalOpen(false)}>
            X
          </p>
        </div>
        <ModalBody modalType={modalType} />
      </div>
    </>
  );
}
