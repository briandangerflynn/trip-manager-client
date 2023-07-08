import { useState } from "react";
import axios from "axios";
import { API_ENDPOINT, FORM_HEADERS, prepFormData } from "../utils";
import { toast } from "react-toastify";

export default function AddTripModalBody({
  currentUser,
  setModalOpen,
  setTrips,
  trips,
  assignees,
}) {
  const [addTripForm, setAddTripForm] = useState({
    ownerId: currentUser.id,
    status: "Not Started",
    assigneeId: "",
    location: "",
    eta: "",
    etc: "",
  });

  const handleChange = (event) => {
    const value = event.target.value;
    setAddTripForm({
      ...addTripForm,
      [event.target.name]: value,
    });
  };

  const handleAddTrip = async () => {
    const formData = prepFormData(addTripForm);
    const url = `${API_ENDPOINT}/users/${currentUser.id}/trips`;
    const resp = await axios.post(url, formData, FORM_HEADERS);
    const newTrip = resp.data.trip;
    setTrips([...trips, newTrip]);
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
    handleAddTrip();
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
        <input
          name="location"
          type="text"
          placeholder="Assign Location"
          onChange={handleChange}
          required
        />
        <input
          name="eta"
          type="datetime-local"
          placeholder="Enter ETA"
          onChange={handleChange}
          required
        />
        <input
          name="etc"
          type="datetime-local"
          placeholder="Enter ETC"
          onChange={handleChange}
          required
        />
        <button type="submit">Create</button>
      </form>
    </>
  );
}
