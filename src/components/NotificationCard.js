// components/NotificationCard.js
import React from 'react';

const NotificationCard = ({ notification }) => {
  const cardStyles = {
    background: 'linear-gradient(to bottom, #FFD700, #FFA500)', // Golden gradient
  };

  return (
    <div
      style={cardStyles}
      className="shadow-lg p-4 rounded-lg mb-4 w-full transition-transform transform hover:scale-105"
    >
      <h2 className="text-xl font-semibold">{notification.title}</h2>
      <p className="text-gray-600">{notification.message}</p>
    </div>
  );
};

export default NotificationCard;
