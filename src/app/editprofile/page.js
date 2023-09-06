"use client"
import React, { useState,useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/editProfile.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function EditProfile() {
  const router = useRouter();

  // Create state variables to manage form input
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add code here to update the user's profile data
    // You can make an API request to update the user's data
    // For example: axios.put('/api/update_profile', { firstName, lastName, email });
    // After successful update, you can redirect the user to their profile page
    router.push('/profile');
  };

  useEffect(() => {
    // This code will only run on the client-side
    // Initialize Bootstrap JavaScript when the component mounts
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/bootstrap/dist/js/bootstrap.bundle.min.js';
    script.async = true;
    script.onload = () => {
      // Bootstrap JavaScript has loaded
      // You can safely open the modal here
    };
    document.body.appendChild(script);
  }, []);

  return (
        <div className={styles.container}>
          <h1>Edit Profile</h1>
          <hr />
          <div className="row">
            {/* left column */}
            <div className="col-md-3">
              <div className="text-center">
                <img src="//placehold.it/100" className="avatar img-circle" alt="avatar" />
                <h6>Upload a different photo...</h6>
                <input type="file" className="form-control" />
              </div>
            </div>
            {/* edit form column */}
            <div className="col-md-9 personal-info" style={{ border: '2px solid black', padding: '40px', borderRadius: '5px' }}>
              <h3>Personal info</h3>
              <form className="form-horizontal" role="form">
                <div className="form-group">
                  <label className="col-lg-3 control-label">First name:</label>
                  <div className="col-lg-12">
                    <input className="form-control" type="text" defaultValue="Jane" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-lg-3 control-label">Last name:</label>
                  <div className="col-lg-12">
                    <input className="form-control" type="text" defaultValue="Bishop" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-lg-3 control-label">Email:</label>
                  <div className="col-lg-12">
                    <input className="form-control" type="text" defaultValue="janesemail@gmail.com" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-md-3 control-label">Password:</label>
                  <div className="col-md-12">
                    <input className="form-control" type="password" defaultValue={11111122333} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-md-3 control-label">Confirm password:</label>
                  <div className="col-md-12">
                    <input className="form-control" type="password" defaultValue={11111122333} />
                  </div>
                </div>
                <div className="form-group">
                  <label className="col-md-3 control-label" />
                  <div className="col-md-8">
                    <input type="button" className="btn btn-primary" defaultValue="Save Changes" />
                    <span />
                    <input type="reset" className="btn btn-default" defaultValue="Cancel" />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
  );
}
