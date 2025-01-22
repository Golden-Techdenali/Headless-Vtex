import React from 'react';
import { useLocation } from 'react-router-dom';

function PickupPointsPage() {
  const location = useLocation();
  const { pickupPoints } = location.state || {};

  // Ensure pickupPoints is an array before trying to map over it
  if (!Array.isArray(pickupPoints)) {
    return <div>No pickup points available or data format is incorrect.</div>;
  }

  return (
    <div className="pickup-points-page">
      <h1>Pickup Points</h1>
      {pickupPoints.length === 0 ? (
        <p>No pickup points found.</p>
      ) : (
        <ul>
          {pickupPoints.map((point, index) => (
            <li key={index}>
              <strong>Name:</strong> {point.name}
              <br />
              <strong>Address:</strong> {point.address.street}, {point.address.city}, {point.address.state}
              <br />
              <strong>Postal Code:</strong> {point.address.postalCode}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default PickupPointsPage;
