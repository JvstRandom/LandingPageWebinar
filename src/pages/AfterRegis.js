import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';  // Import useParams
import { supabase } from '../utils';
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
  const phoneNumber = '62818524862';
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  const handleClick = () => {
    window.open(whatsappLink, '_blank');
  };

  // Function to copy text to clipboard
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert('Rekening berhasil disalin ke clipboard!');
      })
      .catch((err) => {
        console.error('Error copying to clipboard: ', err);
      });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <div className={styles.cont}>
        <h2>ANDA SUDAH BERHASIL MENDAFTAR</h2>
        <h4>Untuk tahap berikutnya, Anda dapat mentransfer ke rekening BCA di bawah ini:</h4>
        <h4> Rekening BCA: 3841354123 (atas nama: Dini Fitri Sari)</h4>
        
        {/* Copy button to copy bank account number */}
        <div 
          className={styles.copyButton} 
          onClick={() => handleCopy('3841354123')}
        >
          Salin Rekening
        </div>

        <div className={styles.button} onClick={handleClick}>
          Konfirmasi disini!
        </div>
      </div>
    </div>
  );
}

export default AfterRegis;
