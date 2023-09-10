"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '@/styles/editProfile.module.css';
import axios from 'axios';
import { toast } from 'react-toastify';

// import 'bootstrap/dist/css/bootstrap.min.css';


export default function EditProfile() {
  const router = useRouter();

  // Create state variables to manage form input
  const [formData, setFormData] = useState({
    user_id:0,
    first_name: '',
    last_name: '',
    emailAddress: '',
    old_PASSWORD: '',
    PASSWORD: '',
    password_confirmation: '',
    dietaryRestriction: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    console.log('submitting');
    axios.post('/api/update_user', formData).then((res) => {
      console.log(res);
      if(res.data.success){
        toast.success('Profile Updated Successfully');
        router.push('/profile');
      }
      else{
        toast.error('Error Updating Profile');
      }
    }).catch((err) => {
      console.log(err);
      toast.error('Error Updating Profile');
    });
    // router.push('/profile');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a URL for the selected file
      const imageUrl = URL.createObjectURL(file);
      // setAvatar(imageUrl); // Update the avatar image
    }
  };

  useEffect(() => {
    axios.get('/api/user_details').then((res) => {
      setFormData({
        user_id:res.data.details[0].USER_ID,
        first_name: res.data.details[0].FIRST_NAME,
        last_name: res.data.details[0].LAST_NAME,
        emailAddress: res.data.details[0].EMAIL_ADDRESS,
        old_PASSWORD: null,
        PASSWORD: null,
        password_confirmation: null,
        dietaryRestriction: res.data.dietaries[0].RESTRICTION,
      });
      })
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={`${styles.editProfileHeading}`}>Edit Profile</h1>
      <hr />
      <div className="row ">
        {/* left column */}
        <div className="col-md-8">
          <div className={`${styles.photoUploadContainer}`}>
            {/* <img src={avatar} className={`${styles.avatar} ${styles['img-circle']}`} alt="avatar" /> */}
            <h4 className={`${styles.editProfileHeading}`}>Upload a different photo</h4>
            <input type="file" className={`custom-file-input ${styles.formcontrol}`} onChange={handleFileChange} />
          </div>
        </div>
        {/* edit form column */}
        <div className="col-md-9 personal-info bg-slate-200" style={{ border: '2px solid black', padding: '40px', borderRadius: '10px' }}>
          <h3 className={`${styles.editProfileHeading}`}>Personal info</h3>
          <form className="form-horizontal " role="form" onChange={handleChange}>
            <div classname={styles.formgroup}>
              <label className={`col-lg-3 control-label ${styles.editProfileHeading}`}>First name:</label>
              <div className="col-lg-12">
                <input classname={styles.formcontrol} name="first_name" type="text" defaultValue={formData.first_name} />
              </div>
            </div>
            <div classname={styles.formgroup}>
              <label className={`col-lg-3 control-label ${styles.editProfileHeading}`}>Last name:</label>
              <div className="col-lg-12">
                <input name="last_name" classname={styles.formcontrol} type="text" defaultValue={formData.last_name} />
              </div>
            </div>
            <div classname={styles.formgroup}>
              <label className={`col-lg-3 control-label ${styles.editProfileHeading}`}>Email:</label>
              <div className="col-lg-12">
                <input name="emailAddress" classname={styles.formcontrol} type="email" defaultValue={formData.emailAddress} />
              </div>
            </div>
            <div classname={styles.formgroup}>
              <label className={`col-md-3 control-label ${styles.editProfileHeading}`}>Old Password:</label>
              <div className="col-md-12">
                <input name="old_PASSWORD" classname={styles.formcontrol} type="password" defaultValue={''} placeholder='Enter old pass to verify' />
              </div>
            </div>
            <div classname={styles.formgroup}>
              <label className={`col-md-3 control-label ${styles.editProfileHeading}`}>New Password:</label>
              <div className="col-md-12">
                <input name="PASSWORD" classname={styles.formcontrol} type="password" placeholder='keep blank not to update' />
              </div>
            </div>
            <div classname={styles.formgroup}>
              <label className={`control-label ${styles.editProfileHeading}`}>Confirm Password:</label>
              <div className="col-md-12">
                <input name="password_confirmation" classname={styles.formcontrol} type="password" placeholder='only if new pass' />
              </div>
            </div>
            <div classname={styles.formgroup}>
              <label className={`control-label ${styles.editProfileHeading}`}>Update Dietary Restriction:</label>
              <div className="col-lg-12">
                <input name="dietaryRestriction" classname={styles.formcontrol} type="text" placeholder='Give Restriction if you have any' />
              </div>
            </div>
            <div className={styles.formgroup}>
              <label className="col-md-3 control-label" />
              <div className="col-md-8">
                <input type="button" className={styles.btnprimary} onClick={handleSubmit} defaultValue="Save Changes" />
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