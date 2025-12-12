import { useState, useEffect } from "react";
import './App.css'

export default function App() {
  const [guests, setGuests] = useState([
    { id: 1, name: "Alice", email: "alice@email.com", confirmed: false, rsvp: false },
    { id: 2, name: "Bob", email: "bob@email.com", confirmed: false, rsvp: true },
    { id: 3, name: "Charlie", email: "charlie@email.com", confirmed: true, rsvp: true },
  ]);

  function handleAddGuest(guestData) {
    const newGuest = {
      id: Math.max(...guests.map(g => g.id), 0) + 1,
      ...guestData,
      confirmed: false,
      rsvp: false
    };
    setGuests((prev) => [...prev, newGuest]);
    console.log("Guest added:", newGuest);
  }

  function handleConfirm(id) {
    console.log("BEFORE confirm update - guests:", guests);
    
    setGuests((prev) =>
      prev.map((guest) =>
        guest.id === id ? { ...guest, confirmed: !guest.confirmed } : guest
      )
    );

    console.log("AFTER confirm setState (still using old state):", guests);
  }

  function handleRSVP(id) {
    console.log("BEFORE RSVP update - guests:", guests);
    
    setGuests((prev) =>
      prev.map((guest) =>
        guest.id === id ? { ...guest, rsvp: !guest.rsvp } : guest
      )
    );

    console.log("AFTER RSVP setState (still using old state):", guests);
  }

  function handleRemoveGuest(id) {
    console.log("Removing guest with id:", id);
    setGuests((prev) => prev.filter((guest) => guest.id !== id));
  }

  function handleEditGuest(id, updatedData) {
    console.log("Editing guest:", id, updatedData);
    setGuests((prev) =>
      prev.map((guest) =>
        guest.id === id ? { ...guest, ...updatedData } : guest
      )
    );
  }

  useEffect(() => {
    console.log("useEffect: State has been updated! Current guests:", guests);
  }, [guests]);

  const totalGuests = guests.length;
  const confirmedCount = guests.filter((g) => g.confirmed).length;
  const unconfirmedCount = totalGuests - confirmedCount;
  const rsvpCount = guests.filter((g) => g.rsvp).length;
  const notRsvpCount = totalGuests - rsvpCount;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", maxWidth: "1000px", margin: "0 auto" }}>
      <h1>🎉 Guest Manager - Complete App</h1>
      
      <GuestForm onAddGuest={handleAddGuest} />
      
      {totalGuests > 0 && (
        <GuestSummary 
          total={totalGuests}
          confirmed={confirmedCount}
          unconfirmed={unconfirmedCount}
          rsvp={rsvpCount}
          notRsvp={notRsvpCount}
        />
      )}
      
      <GuestList 
        guests={guests} 
        onConfirm={handleConfirm}
        onRSVP={handleRSVP}
        onRemove={handleRemoveGuest}
        onEdit={handleEditGuest}
      />
    </div>
  );
}

function GuestForm({ onAddGuest }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      alert("Please fill in both fields!");
      return;
    }
    const formData = { name, email };
    console.log("Form Data Submitted:", formData);
    onAddGuest(formData);
    setName("");
    setEmail("");
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px", border: "2px solid #2196F3", padding: "15px", borderRadius: "5px", backgroundColor: "#f5f5f5" }}>
      <h2>➕ Add New Guest</h2>
      
      <div style={{ marginBottom: "10px" }}>
        <label><strong>Name:</strong> </label>
        <input
          type="text"
          placeholder="Enter guest name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ marginLeft: "10px", padding: "8px", width: "300px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label><strong>Email:</strong> </label>
        <input
          type="email"
          placeholder="Enter guest email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ marginLeft: "10px", padding: "8px", width: "300px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
      </div>

      <button type="submit" style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer", backgroundColor: "#2196F3", color: "white", border: "none", borderRadius: "4px", fontWeight: "bold" }}>
        Add Guest
      </button>
    </form>
  );
}

function GuestSummary({ total, confirmed, unconfirmed, rsvp, notRsvp }) {
  return (
    <div style={{ marginBottom: "20px", border: "2px solid #FF9800", padding: "15px", borderRadius: "5px", backgroundColor: "#fff3e0" }}>
      <h2>📊 Guest Summary</h2>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px" }}>
        <div>
          <p><strong>👥 Total Guests:</strong> <span style={{ fontSize: "18px", color: "#2196F3" }}>{total}</span></p>
          <p><strong>✓ Confirmed:</strong> <span style={{ fontSize: "18px", color: "#4CAF50" }}>{confirmed}</span></p>
          <p><strong>✗ Unconfirmed:</strong> <span style={{ fontSize: "18px", color: "#FF9800" }}>{unconfirmed}</span></p>
        </div>
        <div>
          <p><strong>✓ RSVP Yes:</strong> <span style={{ fontSize: "18px", color: "#4CAF50" }}>{rsvp}</span></p>
          <p><strong>✗ RSVP No:</strong> <span style={{ fontSize: "18px", color: "#FF5252" }}>{notRsvp}</span></p>
        </div>
      </div>
    </div>
  );
}

function GuestList({ guests, onConfirm, onRSVP, onRemove, onEdit }) {
  return (
    <div style={{ border: "2px solid #4CAF50", padding: "15px", borderRadius: "5px", backgroundColor: "#f1f8f4" }}>
      <h2>👥 Guest List ({guests.length})</h2>
      
      {guests.length === 0 ? (
        <div style={{ 
          padding: "40px", 
          textAlign: "center", 
          backgroundColor: "#fff", 
          borderRadius: "4px",
          border: "2px dashed #ccc"
        }}>
          <p style={{ fontSize: "18px", color: "#999" }}>
            📭 No guests added yet.<br/>
            <span style={{ fontSize: "14px" }}>Add a guest using the form above!</span>
          </p>
        </div>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {guests.map((guest) => (
            <GuestItem 
              key={guest.id} 
              guest={guest} 
              onConfirm={onConfirm}
              onRSVP={onRSVP}
              onRemove={onRemove}
              onEdit={onEdit}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

function GuestItem({ guest, onConfirm, onRSVP, onRemove, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(guest.name);
  const [editEmail, setEditEmail] = useState(guest.email);

  function handleSave() {
    if (!editName.trim() || !editEmail.trim()) {
      alert("Name and email cannot be empty!");
      return;
    }
    onEdit(guest.id, { name: editName, email: editEmail });
    setIsEditing(false);
    console.log("Guest updated:", guest.id);
  }

  function handleCancel() {
    setEditName(guest.name);
    setEditEmail(guest.email);
    setIsEditing(false);
  }

  return (
    <li
      style={{
        marginBottom: "12px",
        padding: "15px",
        border: "2px solid #ddd",
        backgroundColor: guest.confirmed ? "#e8f5e9" : "#fff3e0",
        borderRadius: "4px",
        borderLeft: `5px solid ${guest.confirmed ? "#4CAF50" : "#FF9800"}`,
      }}
    >
      {isEditing ? (
        <div>
          <h3 style={{ marginTop: 0 }}>✏️ Edit Guest</h3>
          
          <div style={{ marginBottom: "10px" }}>
            <label><strong>Name:</strong> </label>
            <input
              type="text"
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              style={{ marginLeft: "10px", padding: "6px", width: "250px", borderRadius: "4px", border: "1px solid #ccc" }}
            />
          </div>

          <div style={{ marginBottom: "10px" }}>
            <label><strong>Email:</strong> </label>
            <input
              type="email"
              value={editEmail}
              onChange={(e) => setEditEmail(e.target.value)}
              style={{ marginLeft: "10px", padding: "6px", width: "250px", borderRadius: "4px", border: "1px solid #ccc" }}
            />
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={handleSave}
              style={{
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                padding: "8px 16px",
                cursor: "pointer",
                borderRadius: "4px",
                fontWeight: "bold",
              }}
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              style={{
                backgroundColor: "#999",
                color: "white",
                border: "none",
                padding: "8px 16px",
                cursor: "pointer",
                borderRadius: "4px",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div style={{ marginBottom: "10px" }}>
            <h3 style={{ margin: 0, color: guest.confirmed ? "#2E7D32" : "#E65100" }}>
              {guest.confirmed && "✓"} {guest.name}
            </h3>
            <p style={{ margin: "5px 0", color: "#666", fontSize: "14px" }}>
              📧 {guest.email}
            </p>
          </div>
          
          <div style={{ marginBottom: "12px", fontSize: "14px" }}>
            <span style={{ marginRight: "20px" }}>
              <strong>Confirmed:</strong>
              <span style={{ marginLeft: "8px", fontWeight: "bold", color: guest.confirmed ? "#4CAF50" : "#FF5252" }}>
                {guest.confirmed ? "✓ Yes" : "✗ No"}
              </span>
            </span>
            <span>
              <strong>RSVP:</strong>
              <span style={{ marginLeft: "8px", fontWeight: "bold", color: guest.rsvp ? "#4CAF50" : "#FF5252" }}>
                {guest.rsvp ? "✓ Yes" : "✗ No"}
              </span>
            </span>
          </div>

          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <button
              onClick={() => onConfirm(guest.id)}
              style={{
                backgroundColor: guest.confirmed ? "#f44336" : "#4caf50",
                color: "white",
                border: "none",
                padding: "6px 12px",
                cursor: "pointer",
                borderRadius: "4px",
                fontSize: "13px",
                fontWeight: "bold",
              }}
            >
              {guest.confirmed ? "Unconfirm" : "Confirm"}
            </button>
            
            <button
              onClick={() => onRSVP(guest.id)}
              style={{
                backgroundColor: guest.rsvp ? "#ff9800" : "#2196f3",
                color: "white",
                border: "none",
                padding: "6px 12px",
                cursor: "pointer",
                borderRadius: "4px",
                fontSize: "13px",
                fontWeight: "bold",
              }}
            >
              {guest.rsvp ? "RSVP: Yes" : "RSVP: No"}
            </button>

            <button
              onClick={() => setIsEditing(true)}
              style={{
                backgroundColor: "#9C27B0",
                color: "white",
                border: "none",
                padding: "6px 12px",
                cursor: "pointer",
                borderRadius: "4px",
                fontSize: "13px",
                fontWeight: "bold",
              }}
            >
              ✏️ Edit
            </button>

            <button
              onClick={() => {
                if (window.confirm(`Remove ${guest.name} from the guest list?`)) {
                  onRemove(guest.id);
                }
              }}
              style={{
                backgroundColor: "#f44336",
                color: "white",
                border: "none",
                padding: "6px 12px",
                cursor: "pointer",
                borderRadius: "4px",
                fontSize: "13px",
                fontWeight: "bold",
              }}
            >
              🗑️ Remove
            </button>
          </div>
        </div>
      )}
    </li>
  );
}