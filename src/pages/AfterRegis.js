import React from 'react'
import contohgmbr from './contoh.jpg'
import styles from './AfterRegis.module.css'

function AfterRegis() {
  return (
    <div className={styles.container}>
        <div className={styles.cont}>
            <h2>ANDA SUDAH BERHASIL MENDAFTAR</h2>
            <h4>untuk tahap berikutnya anda dapat mentransfer 
            melalui qris dibawah ini</h4>
            <img src={contohgmbr} className={styles.gambarQris} alt='gambarQris'/>            <h4>Untuk Alternatif lain, anda dapat mentransfer melalui:</h4>
            <h4>BCA: </h4>
            <h4>Mandiri: </h4>
            <div className={styles.button}>
                Konfirmasi disini!
            </div>
        </div>
    </div>
  )
}

export default AfterRegis