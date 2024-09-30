import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';  // Import useParams
import { supabase } from '../utils';
import contohgmbr from './contoh.jpg';
import qris from '../gambar/qris.jpg'
import styles from './AfterRegis.module.css';

function AfterRegis() {
  const { webinarId } = useParams();  // Retrieve the webinarId from the URL
  const [webinarName, setWebinarName] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch the webinar details from Supabase
  const fetchWebinarDetails = async () => {
    const { data, error } = await supabase
      .from('webinars')  // Replace with your actual table name
      .select('judul_webinar')
      .eq('id', webinarId)
      .single();

    if (error) {
      console.error('Error fetching webinar details:', error);
    } else {
      setWebinarName(data.judul_webinar);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (webinarId) {
      fetchWebinarDetails();
    }
  }, [webinarId]);

  const message = `Hi, saya mau konfirmasi pendaftaran di acara ${webinarName}.`;
  const encodedMessage = encodeURIComponent(message);
  const phoneNumber = '0818524862';
  const whatsappLink = `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`;

  const handleClick = () => {
    window.open(whatsappLink, '_blank');
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <div className={styles.cont}>
        <h2>ANDA SUDAH BERHASIL MENDAFTAR</h2>
        <h4>Untuk tahap berikutnya, Anda dapat mentransfer melalui QRIS di bawah ini:</h4>
        <img src={qris} className={styles.gambarQris} alt='gambarQris'/>
        {/* <h4>Untuk Alternatif lain, anda dapat mentransfer melalui:</h4>
        <h4>BCA:</h4>
        <h4>Mandiri:</h4> */}
        <div className={styles.button} onClick={handleClick}>
          Konfirmasi disini!
        </div>
      </div>
    </div>
  );
}

export default AfterRegis;
