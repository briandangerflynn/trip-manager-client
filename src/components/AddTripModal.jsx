import { useEffect, useState } from "react";
import axios from "axios";
import humps from "humps";
import { API_ENDPOINT } from "../utils";

export default function AddTripModal({
  currentUser,
  open,
  setAddTripModal,
  setTrips,
  trips,
}) {
  const [assignees, setAssignees] = useState([]);
  const [addTripForm, setAddTripForm] = useState({
    ownerId: currentUser.id,
    status: "Not Started",
    assigneeId: "",
    location: "",
    eta: "",
    etc: "",
  });

  const getAssignees = async () => {
    const url = `${API_ENDPOINT}/users`;
    const resp = await axios.get(url);
    const users = resp.data.users;
    setAssignees(users);
  };

  useEffect(() => {
    getAssignees();
  }, []);

  const handleChange = (event) => {
    console.log(addTripForm);
    const value = event.target.value;
    setAddTripForm({
      ...addTripForm,
      [event.target.name]: value,
    });
  };

  const handleAddTrip = async () => {
    const formData = prepData();
    const url = `${API_ENDPOINT}/users/${currentUser.id}/trips`;
    const resp = await axios.post(url, formData, {
      "Content-Type": "multipart/form-data",
      Accept: "application/json",
    });
    const newTrip = resp.data.trip;
    setTrips([...trips, newTrip]);
    setAddTripModal(false);
  };

  const prepData = () => {
    const formData = new FormData();
    Object.keys(addTripForm).forEach((key) => {
      const formattedKey = humps.decamelize(key);
      formData.append(formattedKey, addTripForm[key]);
    });
    return formData;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddTrip();
  };

  return (
    <>
      <div className={`modalScreen ${open ? "open" : "closed"}`} />
      <div className={`modalBox ${open ? "open" : "closed"}`}>
        <div className="modalBoxHeader">
          <h2>Create New Trip</h2>
          <p className="closeModal" onClick={() => setAddTripModal(false)}>
            X
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <select name="assigneeId" onChange={handleChange} required>
            <option value="" disabled defaultValue>
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
      </div>
    </>
  );
}
