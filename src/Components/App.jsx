import { useState, useEffect } from "react";
import GuestForm from "./GuestForm";
import GuestList from "./GuestList";
import GuestSummary from "./GuestSummary";

export default function App() {
  const [guests, setGuests] = useState([
    { id: 1, name: "Alice", email: "alice@email.com", confirmed: false, rsvp: false },
    { id: 2, name: "Bob", email: "bob@email.com", confirmed: false, rsvp: false },
  ]);

  function toggleConfirm(id) {
    setGuests((prev) =>
      prev.map((g) =>
        g.id === id ? { ...g, confirmed: !g.confirmed } : g
      )
    );
  }

  function toggleRSVP(id) {
    setGuests((prev) =>
      prev.map((g) =>
        g.id === id ? { ...g, rsvp: !g.rsvp } : g
      )
    );
  }

  function removeGuest(id) {
    setGuests((prev) => prev.filter((g) => g.id !== id));
  }

  function updateGuest(id, updates) {
    setGuests((prev) =>
      prev.map((g) => (g.id === id ? { ...g, ...updates } : g))
    );
  }

  useEffect(() => {
    console.log("Guests updated:", guests);
  }, [guests]);

  return (
    <>
      <GuestForm />
      <GuestSummary guests={guests} />

      {/* Conditional Rendering */}
      {guests.length === 0 ? (
        <p>No guests added yet.</p>
      ) : (
        <GuestList
          guests={guests}
          onToggleConfirm={toggleConfirm}
          onToggleRSVP={toggleRSVP}
          onRemove={removeGuest}
          onEdit={updateGuest}
        />
      )}
    </>
  );
}