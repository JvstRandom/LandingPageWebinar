import React, { useState } from 'react';
import { supabase } from '../utils'; // Ensure you have the correct path to your supabase instance
import styles from './GantiWebinar.module.css';
import { useNavigate } from 'react-router-dom';

function GantiWebinar() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    date: '',
    place: '',
    additionalInfo: '',
    benefit: '',
    flyer: null,
    namaPemateri: [''], // Start with one empty field
    jabatPemateri: [''], // Start with one empty field
    fotoPemateriUrl: [null], // Start with one empty field
    quotePemateriUrl: [null], // Start with one empty field
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const addPemateriField = () => {
    setFormData({ 
      ...formData, 
      namaPemateri: [...formData.namaPemateri, ''], 
      jabatPemateri: [...formData.jabatPemateri, ''], 
      fotoPemateriUrl: [...formData.fotoPemateriUrl, null],
      quotePemateriUrl: [...formData.quotePemateriUrl, null]
    });
  };

  const handlePemateriChange = (index, type, value) => {
    const newPemateriArray = [...formData[type]];
    newPemateriArray[index] = value;
    setFormData({ ...formData, [type]: newPemateriArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Initialize an object to hold the image URLs
      const imageUrls = {};
  
      // Upload flyer to the bucket
      if (formData.flyer) {
        const { data: flyerData, error: flyerError } = await supabase
          .storage
          .from('gambar')
          .upload(`flyers/${formData.flyer.name}`, formData.flyer);
  
        if (flyerError) throw flyerError;
  
        const flyerUrl = supabase.storage
          .from('gambar')
          .getPublicUrl(`flyers/${formData.flyer.name}`).data.publicUrl;
  
        imageUrls.flyerUrl = flyerUrl;
      }
  
      // Upload foto_pemateri images (multiple)
      const fotoPemateriUrls = await Promise.all(
        formData.fotoPemateriUrl.map(async (file, index) => {
          const { data, error } = await supabase
            .storage
            .from('gambar')
            .upload(`foto_pemateri/${file.name}`, file);
  
          if (error) throw error;
  
          const publicUrl = supabase.storage
            .from('gambar')
            .getPublicUrl(`foto_pemateri/${file.name}`).data.publicUrl;
  
          return publicUrl;
        })
      );
  
      // Upload quote_pemateri images (multiple)
      const quotePemateriUrls = await Promise.all(
        formData.quotePemateriUrl.map(async (file, index) => {
          const { data, error } = await supabase
            .storage
            .from('gambar')
            .upload(`quote_pemateri/${file.name}`, file);
  
          if (error) throw error;
  
          const publicUrl = supabase.storage
            .from('gambar')
            .getPublicUrl(`quote_pemateri/${file.name}`).data.publicUrl;
  
          return publicUrl;
        })
      );
  
      // Insert webinar data into the database
      const { error: insertError } = await supabase
        .from('webinars')
        .insert([
          {
            judul_webinar: formData.title,
            flyer_url: imageUrls.flyerUrl,
            deskripsi_singkat: formData.shortDescription,
            benefit: formData.benefit,
            nama_pemateri: formData.namaPemateri, // This should be an array
            jabat_pemateri: formData.jabatPemateri, // This should be an array
            foto_pemateri_url: fotoPemateriUrls, // Store the array of URLs
            quote_pemateri_url: quotePemateriUrls, // Store the array of URLs
            waktu: formData.date,
            tempat: formData.place,
            info_tambahan: formData.additionalInfo,
          },
        ]);
  
      if (insertError) throw insertError;
  
      // Redirect on success
      alert('Webinar added successfully!');
      navigate('/'); // Redirect to home
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error adding webinar. Please try again.');
    }
  };  

  return (
    <div className={styles.container}>
      <div className={styles.t4logo}>FORM PENAMBAHAN WEBINAR</div>
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
              <textarea
                name="date"
                value={formData.date}
                onChange={handleChange}
                placeholder="Minggu, 23 Januari 2024 (09.00 - 10.00)"
                required
              />
            </div>

            <div className={styles.part}>
              <label>Place:</label>
              <textarea
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

            <div className={styles.part}>
              <label>Benefit:</label>
              <input
                type="text"
                name="benefit"
                value={formData.benefit}
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
          </div>

          {/* Dynamic inputs for pemateri */}
          <div>
            {formData.namaPemateri.map((_, index) => (
              <div key={index} className={styles.part}>
                <label>Nama Pemateri:</label>
                <input
                  type="text"
                  value={formData.namaPemateri[index]}
                  onChange={(e) => handlePemateriChange(index, 'namaPemateri', e.target.value)}
                  required
                />
                <label>Jabatan Pemateri:</label>
                <input
                  type="text"
                  value={formData.jabatPemateri[index]}
                  onChange={(e) => handlePemateriChange(index, 'jabatPemateri', e.target.value)}
                  required
                />
                <label>Foto Pemateri URL:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handlePemateriChange(index, 'fotoPemateriUrl', e.target.files[0])}
                  required
                />
                <label>Quote Pemateri URL:</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handlePemateriChange(index, 'quotePemateriUrl', e.target.files[0])}
                  required
                />
              </div>
            ))}
            <button type="button" onClick={addPemateriField}>
              Add Pemateri
            </button>
          </div>
        </div>

        <button className={styles.tombol} type="submit">Submit</button>
      </form>
    </div>
  );
}

export default GantiWebinar;
