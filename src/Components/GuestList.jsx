import { useState } from "react";

function GuestItem({ guest, onToggleConfirm, onToggleRSVP, onRemove, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(guest.name);
  const [email, setEmail] = useState(guest.email);

  function save() {
    onEdit(guest.id, { name, email });
    setIsEditing(false);
  }

  return (
    <div style={{ marginBottom: "10px" }}>
      {isEditing ? (
        <>
          <input value={name} onChange={(e) => setName(e.target.value)} />
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
          <button onClick={save}>Save</button>
        </>
      ) : (
        <>
          {/* Styling confirmed guests */}
          <span
            style={{
              textDecoration: guest.confirmed ? "underline" : "none",
              color: guest.confirmed ? "green" : "black",
            }}
          >
            {guest.name} — {guest.email}
          </span>

          <button style={{ marginLeft: "10px" }} onClick={() => setIsEditing(true)}>Edit</button>
          <button style={{ marginLeft: "10px" }} onClick={() => onToggleConfirm(guest.id)}>
            {guest.confirmed ? "Unconfirm" : "Confirm"}
          </button>
          <button style={{ marginLeft: "10px" }} onClick={() => onToggleRSVP(guest.id)}>
            {guest.rsvp ? "Undo RSVP" : "RSVP"}
          </button>
          <button style={{ marginLeft: "10px" }} onClick={() => onRemove(guest.id)}>Remove</button>
        </>
      )}
    </div>
  );
}

export default function GuestList({ guests, onToggleConfirm, onToggleRSVP, onRemove, onEdit }) {
  return (
    <div>
      <h3>Guest List</h3>
      {guests.map((guest) => (
        <GuestItem
          key={guest.id}
          guest={guest}
          onToggleConfirm={onToggleConfirm}
          onToggleRSVP={onToggleRSVP}
          onRemove={onRemove}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}