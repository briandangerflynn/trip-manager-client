import axios from "axios";
import humps from "humps";
import {
  API_ENDPOINT,
  formatDateTime,
  getElapsedTime,
  objectExists,
} from "../utils";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function TripRowå({
  trip,
  trips,
  setSelectedTrip,
  setTrips,
  currentUser,
  handleGetTrips,
  setModalOpen,
  setModalType,
  setModalTitle,
}) {
  const [formattedStatus, setFormattedStatus] = useState("");
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

  const handleAction = (trip) => {
    if (trip.status === "Complete") {
      setSelectedTrip(trip);
      setModalOpen(true);
      setModalType("readTrip");
      setModalTitle("Review Trip");
    } else {
      updateTripStatus(trip.id);
      handleGetTrips();
    }
  };

  const updateTripStatus = async (id) => {
    const url = `${API_ENDPOINT}/users/${currentUser.id}/trips/${id}/update_status`;
    const resp = await axios.put(url);
    const updatedTrip = resp.data.trip;
    setTrips(
      trips.map((trip) => {
        if (trip.id === updatedTrip.id) {
          return updatedTrip;
        } else {
          return trip;
        }
      })
    );
    toast.success(resp.data.success, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const handleChangeAssignees = (trip) => {
    setSelectedTrip(trip);
    setModalType("reassignTrip");
    setModalTitle("Reassign Trip");
    setModalOpen(true);
  };

  const checkOverdue = async () => {
    const url = `${API_ENDPOINT}/users/${currentUser.id}/trips/check_overdue`;
    const resp = await axios.put(url);
    const checkedTrips = resp.data.trips;
    setTrips(checkedTrips);
  };

  useEffect(() => {
    if (objectExists(currentUser)) {
      checkOverdue();
    }
  }, [currentUser]);

  useEffect(() => {
    if (trip.status === "In Progress") {
      setFormattedStatus(`In Progress - Total ${getElapsedTime(trip)}`);
      const id = setInterval(
        () => setFormattedStatus(`In Progress - Total ${getElapsedTime(trip)}`),
        60000
      );

      return () => {
        clearInterval(id);
      };
    } else {
      setFormattedStatus(trip.status);
    }
  });

  return (
    <>
      <div className="tripRow" key={trip.id}>
        <div className="col">
          <p>{trip.assignee_name}</p>
        </div>
        <div className="col">
          <p>{trip.owner_name}</p>
        </div>
        <div className="col">
          <p>{trip.location}</p>
        </div>
        <div className="col">
          <p>{formatDateTime(trip.eta)}</p>
        </div>
        <div className="col">
          <p>{formatDateTime(trip.etc)}</p>
        </div>
        <div className="col">
          {
            <div className={`tripStatus ${humps.camelize(trip.status)}`}>
              {formattedStatus}
            </div>
          }
        </div>
        <div className="col actionButtons">
          <div className="actionButton" onClick={() => handleAction(trip)}>
            {actionButtonText(trip.status)}
          </div>
          {trip.status === "Not Started" && (
            <div
              className="actionButton changeAssignees"
              onClick={() => handleChangeAssignees(trip)}
            >
              Reassign
            </div>
          )}
        </div>
      </div>
    </>
  );
}
