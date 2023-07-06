import { useEffect, useState } from "react";
import axios from "axios";
import humps from "humps";
import { API_ENDPOINT, objectExists, formatDateTime } from "../utils";
import AddTripModal from "./AddTripModal";

export default function Trips({ currentUser }) {
  const [trips, setTrips] = useState([]);
  const [addTripModal, setAddTripModal] = useState(false);
  const tableHeaders = [
    "Assignee",
    "Owner",
    "Location",
    "ETA",
    "ETC",
    "Status",
    "Actions",
  ];

  const handleGetTrips = async () => {
    const url = `${API_ENDPOINT}/users/${currentUser.id}/trips`;
    const resp = await axios.get(url);
    const trips = resp.data.trips;
    if (trips.length) {
      setTrips(trips);
    }
  };

  const actionButtonText = (status) => {
    switch (status) {
      case "Not Started":
        return "Check In";
      case "In Progress":
      case "Overdue":
        return "Check Out";
      default:
        return "Review";
    }
  };

  const handleAction = async (id) => {
    const url = `${API_ENDPOINT}/users/${currentUser.id}/trips/${id}`;
    const resp = await axios.put(url);
    const updatedTrip = resp.data.trip;

    setTrips(
      trips.map((trip) => {
        if (trip.id === updatedTrip.id) {
          return { updatedTrip };
        } else {
          return trip;
        }
      })
    );
  };

  useEffect(() => {
    if (objectExists(currentUser)) {
      handleGetTrips();
    }
  }, [currentUser]);

  return (
    <div id="trips">
      <AddTripModal
        currentUser={currentUser}
        open={addTripModal}
        setAddTripModal={setAddTripModal}
        trips={trips}
        setTrips={setTrips}
      />
      <button id="addTrip" onClick={() => setAddTripModal(true)}>
        + Add Trip
      </button>
      <div className="tripTableHeaders">
        {tableHeaders.map((header, index) => (
          <p key={index}>{header}</p>
        ))}
      </div>

      {trips.length > 0 &&
        trips.map((trip) => (
          <div className="tripRow" key={trip.id}>
            <p>{trip.assignee_name}</p>
            <p>{trip.owner_name}</p>
            <p>{trip.location}</p>
            <p>{formatDateTime(trip.eta)}</p>
            <p>{formatDateTime(trip.etc)}</p>
            <p>{trip.status}</p>
            <div
              className={`actionButton ${humps.camelize(trip.status)}`}
              onClick={() => handleAction(trip.id)}
            >
              {actionButtonText(trip.status)}
            </div>
          </div>
        ))}
    </div>
  );
}
