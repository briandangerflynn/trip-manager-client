import { formatDateTime } from "../utils";

export default function ReadTripModal({ open, trip, setReadTripModal }) {
  return (
    <>
      <div className={`modalScreen ${open ? "open" : "closed"}`} />
      <div className={`modalBox ${open ? "open" : "closed"}`}>
        <div className="modalBoxHeader">
          <h2>Review Trip</h2>
          <p className="closeModal" onClick={() => setReadTripModal(false)}>
            X
          </p>
        </div>
        <div id="readTripModalBody">
          <label>Assignee</label>
          <p>{trip.assignee_name}</p>
          <label>Location</label>
          <p>{trip.location}</p>
          <div>
            <label>ETA</label>
            <label>Check In</label>
          </div>
          <div>
            <p>{formatDateTime(trip.eta)}</p>
            <p>{formatDateTime(trip.start_time)}</p>
          </div>
          <div>
            <label>ETC</label>
            <label>Check Out</label>
          </div>
          <div>
            <p>{formatDateTime(trip.etc)}</p>
            <p>{formatDateTime(trip.end_time)}</p>
          </div>
        </div>
      </div>
    </>
  );
}
