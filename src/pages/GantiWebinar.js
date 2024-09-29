import React from 'react'
import React, { useState, useEffect } from 'react';
import { supabase } from '../utils';
import styles from './GantiWebinar.module.css'

function GantiWebinar() {

    const [formData, setFormData] = useState({
        title: '',
        shortDescription: '',
        date: '',
        place: '',
        additionalInfo: '',
        benefit1: '',
        benefit2: '',
        flyer: null,
        hostName: '',
        hostPicture: null,
        hostSocialMedia: ''
      });

      // Function to handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just log the form data
    console.log(formData);
    // You can send the formData to the server or further process it here
    alert("Form Submitted!");
  };

  return (
    <div className={styles.container}>
        <div className={styles.t4logo}> FORM PENAMBAHAN WEBINAR</div>
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.isianform}>
                <div>
                <div className={styles.part}>
                        <label>Title:</label>
                        <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        />
                    </div>

                    <div className={styles.part}>
                        <label>Short Description:</label>
                        <textarea
                        name="shortDescription"
                        value={formData.shortDescription}
                        onChange={handleChange}
                        required
                        />
                    </div>

                    <div className={styles.part}>
                        <label>Date:</label>
                        <input
                        type="text"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        placeholder="Minggu, 23 Januari 2024 (09.00 - 10.00)"
                        required
                        />
                    </div>

                    <div className={styles.part}>
                        <label>Place:</label>
                        <input
                        type="text"
                        name="place"
                        value={formData.place}
                        onChange={handleChange}
                        required
                        />
                    </div>

                    <div className={styles.part}>
                        <label>Additional Info:</label>
                        <textarea
                        name="additionalInfo"
                        value={formData.additionalInfo}
                        onChange={handleChange}
                        />
                    </div>
                </div>

                <div>
                <div className={styles.part}>
                        <label>Benefit 1:</label>
                        <input
                        type="text"
                        name="benefit1"
                        value={formData.benefit1}
                        onChange={handleChange}
                        required
                        />
                    </div>

                    <div className={styles.part}>
                        <label>Benefit 2:</label>
                        <input
                        type="text"
                        name="benefit2"
                        value={formData.benefit2}
                        onChange={handleChange}
                        required
                        />
                    </div>

                    <div className={styles.part}>
                        <label>Upload Photo Flyer:</label>
                        <input
                        type="file"
                        name="flyer"
                        accept="image/*"
                        onChange={handleChange}
                        required
                        />
                    </div>

                    <div className={styles.part}>
                        <label>Host Name:</label>
                        <input
                        type="text"
                        name="hostName"
                        value={formData.hostName}
                        onChange={handleChange}
                        required
                        />
                    </div>

                    <div className={styles.part}>
                        <label>Upload Host Picture:</label>
                        <input
                        type="file"
                        name="hostPicture"
                        accept="image/*"
                        onChange={handleChange}
                        required
                        />
                    </div>

                    <div className={styles.part}>
                        <label>Host Social Media Link:</label>
                        <input
                        type="url"
                        name="hostSocialMedia"
                        value={formData.hostSocialMedia}
                        onChange={handleChange}
                        />
                    </div>
                </div>
            </div>

            <button className={styles.tombol} type="submit">Submit</button>
            </form>
    </div>
  )
}

export default GantiWebinar