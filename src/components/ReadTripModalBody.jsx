import { formatDateTime } from "../utils";

export default function ReadTripModalBody({ trip }) {
  return (
    <>
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
    </>
  );
}
