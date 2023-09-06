"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/editProfile.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function EditProfile() {
  const router = useRouter();

  // Create state variables to manage form input
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('/avatar/avatar.png');
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add code here to update the user's profile data
    // You can make an API request to update the user's data
    // For example: axios.put('/api/update_profile', { firstName, lastName, email });
    // After successful update, you can redirect the user to their profile page
    router.push('/profile');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a URL for the selected file
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl); // Update the avatar image
    }
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
      <h1 className={`${styles.editProfileHeading}`}>Edit Profile</h1>
      <hr />
      <div className="row">
        {/* left column */}
        <div className="col-md-8">
          <div className={`${styles.photoUploadContainer}`}>
            <img src={avatar} className={`${styles.avatar} ${styles['img-circle']}`} alt="avatar" />
            <h4 className={`${styles.editProfileHeading}`}>Upload a different photo</h4>
            <input type="file" className={`custom-file-input ${styles.formcontrol}`} onChange={handleFileChange} />
          </div>
        </div>
        {/* edit form column */}
        <div className="col-md-9 personal-info" style={{ border: '2px solid black', padding: '40px', borderRadius: '10px' }}>
          <h3 className={`${styles.editProfileHeading}`}>Personal info</h3>
          <form className="form-horizontal" role="form">
            <div classname={styles.formgroup}>
              <label className={`col-lg-3 control-label ${styles.editProfileHeading}`}>First name:</label>
              <div className="col-lg-12">
                <input classname={styles.formcontrol} type="text" defaultValue="Jane" />
              </div>
            </div>
            <div classname={styles.formgroup}>
              <label className={`col-lg-3 control-label ${styles.editProfileHeading}`}>Last name:</label>
              <div className="col-lg-12">
                <input classname={styles.formcontrol} type="text" defaultValue="Bishop" />
              </div>
            </div>
            <div classname={styles.formgroup}>
              <label className={`col-lg-3 control-label ${styles.editProfileHeading}`}>Email:</label>
              <div className="col-lg-12">
                <input classname={styles.formcontrol} type="text" defaultValue="janesemail@gmail.com" />
              </div>
            </div>
            <div classname={styles.formgroup}>
              <label className={`col-md-3 control-label ${styles.editProfileHeading}`}>Password:</label>
              <div className="col-md-12">
                <input classname={styles.formcontrol} type="password" defaultValue={11111122333} />
              </div>
            </div>
            <div classname={styles.formgroup}>
              <label className={`control-label ${styles.editProfileHeading}`}>Confirm Password:</label>
              <div className="col-md-12">
                <input classname={styles.formcontrol} type="password" defaultValue={11111122333} />
              </div>
            </div>
            <div classname={styles.formgroup}>
              <label className={`control-label ${styles.editProfileHeading}`}>Update Dietary Restriction:</label>
              <div className="col-lg-12">
                <input classname={styles.formcontrol} type="text" defaultValue="Vegeterian"/>
              </div>
            </div>
            <div className={styles.formgroup}>
              <label className="col-md-3 control-label" />
              <div className="col-md-8">
                <input type="button" className={styles.btnprimary} defaultValue="Save Changes" />
                <span style={{ margin: '0 10px' }} /> {/* Add margin to create space */}
                <input type="reset" className={styles.btnsecondary} defaultValue="Cancel" />
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
