import { useState } from "react";
import axios from "axios";
import { API_ENDPOINT, FORM_HEADERS, prepFormData } from "../utils";
import { toast } from "react-toastify";

export default function ReassignTripModalBody({
  trip,
  trips,
  setTrips,
  assignees,
  currentUser,
  setModalOpen,
}) {
  const [reassignForm, setReassignForm] = useState({
    assigneeId: "",
    assigneeName: "",
  });

  const handleChange = (event) => {
    const el = event.target;
    const assigneeId = el.value;
    const assigneeName = el.options[el.selectedIndex].text;
    setReassignForm({
      ...reassignForm,
      assigneeId: assigneeId,
      assigneeName: assigneeName,
    });
  };

  const handleReassign = async () => {
    const formData = prepFormData(reassignForm);
    const url = `${API_ENDPOINT}/users/${currentUser.id}/trips/${trip.id}`;
    const resp = await axios.put(url, formData, FORM_HEADERS);
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
    setModalOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleReassign();
    event.target.reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <select
          name="assigneeId"
          onChange={handleChange}
          defaultValue="default"
          required
        >
          <option value="default" disabled>
            Select Assignee
          </option>
          {assignees.map((assignee) => (
            <option key={assignee.id} value={assignee.id}>
              {`${assignee.firstname} ${assignee.lastname}`}
            </option>
          ))}
        </select>
        <button>Done</button>
      </form>
    </>
  );
}
