"use client"
import React, { useState } from 'react';
import ReactSwitch from 'react-switch';
import styles from './toggleSwitch.module.css'; // Import the CSS module

function ToggleSwitch() {
  const [checked, setChecked] = useState(true);

  const handleChange = val => {
    setChecked(val)
  }

  return (
    <div className={`${styles.app} ${styles.center}`}>
      {/* Use the new local class for the heading */}
      <h4 className={styles.heading}>Recommendation On</h4>
      <label className={styles['react-switch-label']}>
        <ReactSwitch
          checked={checked}
          onChange={handleChange}
          className={styles['react-switch-checkbox']}
          id="toggle-switch"
        />
        <div className={styles['react-switch-background']}>
          <div className={styles['react-switch-handle']}></div>
        </div>
      </label>
    </div>
  );
}

export default ToggleSwitch;
