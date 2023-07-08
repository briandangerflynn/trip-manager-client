export default function TripRowHeaders() {
  const tableHeaders = [
    "Assignee",
    "Owner",
    "Location",
    "ETA",
    "ETC",
    "Status",
    "Actions",
  ];

  return (
    <div className="tripTableHeaders tripRow">
      {tableHeaders.map((header, index) => (
        <div key={index} className="col">
          <p>{header}</p>
        </div>
      ))}
    </div>
  );
}
