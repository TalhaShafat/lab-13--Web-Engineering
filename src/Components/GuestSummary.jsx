export default function GuestSummary({ guests }) {
  const total = guests.length;
  const confirmed = guests.filter((g) => g.confirmed).length;
  const unconfirmed = total - confirmed;
  const rsvpCount = guests.filter((g) => g.rsvp).length;

  return (
    <div>
      <h3>Summary</h3>
      <p>Total Guests: {total}</p>
      <p>Confirmed: {confirmed}</p>
      <p>Unconfirmed: {unconfirmed}</p>
      <p>RSVP: {rsvpCount}</p>
    </div>
  );
}