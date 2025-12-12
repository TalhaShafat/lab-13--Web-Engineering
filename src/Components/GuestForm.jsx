import { useState } from "react";

export default function GuestForm({ onAddGuest }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const guestData = { name, email };
    console.log("Submitted Guest:", guestData);

    if (onAddGuest) onAddGuest(guestData);

    setName("");
    setEmail("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Guest</h3>

      <input
        type="text"
        placeholder="Guest name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Guest email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button>Add Guest</button>
    </form>
  );
}