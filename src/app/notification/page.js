// pages/notifications.js
"use client"
import React from 'react';
import NotificationCard from '@/components/NotificationCard';

// Sample data (you can fetch this from your API)
const notifications = [
    {
      id: 1,
      title: 'New Notification 1',
      message: 'This is the first notification message.',
    },
    {
      id: 2,
      title: 'New Notification 2',
      message: 'This is the second notification message.',
    },
  ];
  
  const NotificationsPage = () => {
    const pageStyles = {
      background: 'linear-gradient(to bottom, #FFFFFF, #FFFFFF)',
      minHeight: '100vh', // Set the container's minimum height to 100vh
    };
  
    return (
      <div style={pageStyles} className="container mx-auto p-6 rounded-lg">
        <h1 className="text-3xl font-semibold mb-6">Notifications</h1>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <NotificationCard key={notification.id} notification={notification} />
          ))}
        </div>
      </div>
    );
  };
  
  export default NotificationsPage;