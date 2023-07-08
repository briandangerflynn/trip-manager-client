import { useEffect, useState } from "react";
import axios from "axios";
import { API_ENDPOINT, objectExists } from "../utils";
import Modal from "./Modal";
import TripRow from "./TripRow";
import TripRowHeaders from "./TripRowHeaders";

export default function Trips({ currentUser }) {
  const [selectedTrip, setSelectedTrip] = useState({});
  const [trips, setTrips] = useState([]);
  const [assignees, setAssignees] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const getAssignees = async () => {
    const url = `${API_ENDPOINT}/users`;
    const resp = await axios.get(url);
    const users = resp.data.users;
    setAssignees(users);
  };

  const handleGetTrips = async () => {
    const url = `${API_ENDPOINT}/users/${currentUser.id}/trips`;
    const resp = await axios.get(url);
    const trips = resp.data.trips;
    if (trips.length) {
      setTrips(trips);
    }
  };

  const handleAddTrip = () => {
    setModalTitle("Create New Trip");
    setModalType("addTrip");
    setModalOpen(true);
  };

  useEffect(() => {
    getAssignees();
    if (objectExists(currentUser)) {
      handleGetTrips();
    }
  }, [currentUser]);

  return (
    <div id="trips">
      <Modal
        trip={selectedTrip}
        trips={trips}
        setTrips={setTrips}
        assignees={assignees}
        getAssignees={getAssignees}
        currentUser={currentUser}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        modalType={modalType}
        modalTitle={modalTitle}
      />
      <button id="addTrip" onClick={() => handleAddTrip()}>
        + Add Trip
      </button>
      <TripRowHeaders />
      {trips.length > 0 &&
        trips.map((trip) => (
          <TripRow
            key={trip.id}
            trip={trip}
            trips={trips}
            setSelectedTrip={setSelectedTrip}
            setTrips={setTrips}
            currentUser={currentUser}
            handleGetTrips={handleGetTrips}
            setModalOpen={setModalOpen}
            setModalType={setModalType}
            setModalTitle={setModalTitle}
          />
        ))}
    </div>
  );
}
