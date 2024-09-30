import { useState, useEffect, useRef } from 'react';
import React from 'react';
import styles from './LandingPage.module.css';
import contoh from './flyer.jpg';
import iconJam from '../icons/clock_solid.svg';
import iconLoc from '../icons/location_dot_solid.svg';
import iconInfo from '../icons/circle_info_solid.svg';
import iconInsta from '../icons/instagram_brands_solid.svg';
import iconPhone from '../icons/phone_solid.svg';
import iconMail from '../icons/envelope_solid.svg';
import iconFB from '../icons/facebookfbrandssolid.svg';
import iconYT from '../icons/youtubebrandssolid.svg';
import comingsoon from '../gambar/comingsoon.jpg'
import logoberdayaberjaya from '../gambar/berdayaberjayalogo.png';
import logo3 from '../gambar/3logo.png';
import { supabase } from '../utils';
import { useNavigate } from 'react-router-dom';
import DisplayDescription from './components/DisplayDescription';

function LandingPage() {
    const navigate = useNavigate();
    const targetDivRef = useRef(null);

    const handleScrollToDiv = () => {
        if (targetDivRef.current) {
            targetDivRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const [webinar, setWebinar] = useState(null);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState('');
    const [instansi, setInstansi] = useState('');
    const [noHp, setNoHp] = useState('');
    const [investment, setInvestment] = useState('');
    const [offlineOnline, setOfflineOnline] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        const fetchWebinar = async () => {
            const { data, error } = await supabase
                .from('webinars')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(1);

            if (error) {
                console.error('Error fetching webinar:', error);
            } else {
                setWebinar(data[0]);
                setLoading(false);
            }
        };
        fetchWebinar();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { data, error } = await supabase
            .from('participants')
            .insert([{
                name: name,
                asal_instansi: instansi,
                no_hp: noHp,
                investment_amount: investment,
                offlineonline: offlineOnline,
                webinar_id: webinar.id
            }]);

        if (error) {
            console.error('Error submitting registration:', error);
        } else {
            navigate(`/after-regis/${webinar.id}`);
        }
    };

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    if (loading) {
        return <div>
            loading
        </div>
    }

    return (
        <div className={styles.container}>
            {webinar ? (
                <>
                    {/* HERO PART */}
                    <div className={styles.hero}>
                        <div className={styles.logo}>
                            <img src={logo3} alt='logo' />
                        </div>
                        <div className={styles.jdlWebinar}>
                            {webinar.judul_webinar}
                        </div>
                        <div className={styles.t4Flyer}>
                            <img src={webinar.flyer_url} className={styles.gambarFlyer} alt='gambarflyer' />
                        </div>
                        <div className={styles.aboutWeb}>
                            <div className={styles.shortDesc}>
                                <DisplayDescription description={webinar.deskripsi_singkat}/>
                            </div>
                            <div onClick={handleScrollToDiv} className={styles.button}>
                                Daftar Sekarang!
                            </div>
                        </div>
                    </div>

                    {/* BENEFIT PART */}
                    <div className={styles.part}>
                        <div className={styles.t4Label}>
                            <div className={styles.garis}>
                                <div className={styles.partJdl}>
                                    BENEFIT YANG DIDAPATKAN
                                </div>
                            </div>
                        </div>
                        <div className={styles.containerbenefit}>
                            <div className={styles.agcourses_item}>
                                <div className={styles.agcoursesitem_link}>
                                    <div className={styles.agcoursesitem_bg}></div>
                                    <div className={styles.agcoursesitem_title}>
                                        {webinar.benefit}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PEMATERI PART */}
                    <div className={`${styles.part} ${styles.pemateripart}`}>
                        <div className={styles.t4Label}>
                            <div className={styles.garis}>
                                <div className={styles.partJdl}>
                                    PEMATERI
                                </div>
                            </div>
                        </div>

                        {/* <div className={styles.cardcon}>
                            <div className={styles.card}>
                                <div className={styles.img_bx}>
                                    <img src={pemateri2} alt="img" />
                                </div>
                                <div className={styles.content}>
                                    <div className={styles.detail}>
                                        <h2>Pungky<br /><span>Owner De'Ale <br /> Coffee Shop</span></h2>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.card}>
                                <div className={styles.img_bx}>
                                    <img src={pemateri1} alt="img" />
                                </div>
                                <div className={styles.content}>
                                    <div className={styles.detail}>
                                        <h2>Chindar<br /><span>Owner MoMo Carwash & Detailing</span></h2>
                                    </div>
                                </div>
                            </div>
                            
                        </div> */}

                        <div className={styles.cardcon}>
                        {webinar.nama_pemateri.map((name, index) => (
                                <div key={index} className={styles.card}>
                                    <div className={styles.img_bx}>
                                    <img src={webinar.foto_pemateri_url[index]} alt={name} />    
                                    </div>
                                    <div className={styles.content}>
                                        <div className={styles.detail}>
                                            <h2>{name}</h2>
                                            <span className={styles.jabatan}>{webinar.jabat_pemateri[index]}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className={styles.cardcon}>
                            {webinar.nama_pemateri.map((name,index) => (
                                    <img className={styles.katapemateri} src={webinar.quote_pemateri_url[index]} alt="img" />
                            ))}
                        </div>

                        {/* <div className={styles.kataPemateri}>
                            <img src={katapemateri1} alt="img" />
                            <img src={katapemateri2} alt="img" />
                        </div> */}
                    </div>

                    {/* INFO TAMBAHAN PART */}
                    <div className={styles.part}>
                        <div className={styles.t4Label}>
                            <div className={styles.garis}>
                                <div className={styles.partJdl}>
                                    INFO TAMBAHAN
                                </div>
                            </div>
                        </div>

                        <div className={styles.t4info}>
                            <div className={styles.t4detInfo}>
                                <img src={iconJam} className={styles.icon} />
                                <h2>Waktu</h2>
                                <h4><DisplayDescription description={webinar.waktu}/></h4>
                            </div>

                            <div className={styles.t4detInfo}>
                                <img src={iconLoc} className={styles.icon} />
                                <h2>Tempat</h2>
                                <h4><DisplayDescription description={webinar.tempat}/></h4>
                            </div>

                            <div className={styles.t4detInfo}>
                                <img src={iconInfo} className={styles.icon} />
                                <h2>Info Tambahan</h2>
                                <h4><DisplayDescription description={webinar.info_tambahan}/></h4>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <div>Loading webinar details...</div>
            )}

            {/* FORM PENDAFTARAN PART */}
            <div className={styles.t4formDaftar} ref={targetDivRef}>
                <div className={styles.t4logo}> FORM PENDAFTARAN </div>
                <form className={styles.formDaftar} onSubmit={handleSubmit}>
                    <label htmlFor="name">Nama:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Masukkan Nama Anda ( contoh = Budi Susilo )"
                        required
                    />

                    <label htmlFor="instansi">Alumnus SMA / Angkatan :</label>
                    <input
                        type="text"
                        value={instansi}
                        onChange={(e) => setInstansi(e.target.value)}
                        placeholder="Masukkan Alumnus SMA (contoh = SMAN 16 Surabaya / 2020 )"
                        required
                    />

                    <label htmlFor="noHp">Nomor HP :</label>
                    <input
                        type="text"
                        value={noHp}
                        onChange={(e) => setNoHp(e.target.value)}
                        placeholder="Masukkan nomor hp anda (contoh = 081099090909)"
                        required
                    />

                    <label htmlFor="offlineOnline">Pilihan Offline atau Online :</label>
                    <select
                        value={offlineOnline}
                        onChange={(e) => setOfflineOnline(e.target.value)}
                        className={styles.dropdown}
                        required
                    >
                        <option value="">Pilih</option>
                        <option value="offline">Offline</option>
                        <option value="online">Online</option>
                    </select>

                    <label htmlFor="investasi">Jumlah Kontribusi:</label>
                    <select 
                        value={investment} 
                        onChange={(e) => setInvestment(e.target.value)} 
                        className={styles.dropdown}
                        required
                    >
                        <option value="">Pilih Jumlah Kontribusi</option>
                        <option value="25000">25.000</option>
                        <option value="50000">50.000</option>
                        <option value="75000">75.000</option>
                        <option value="100000">100.000</option>
                    </select>

                    <button className={styles.button} type="submit">Daftar</button>
                </form>
            </div>

            {/* COMING SOON PART */}
            <div className={styles.part}>
                        <div className={styles.t4Label}>
                            <div className={styles.garis}>
                                <div className={styles.partJdl}>
                                    COMING SOON
                                </div>
                            </div>
                        </div>
                        <div className={styles.containercomingsoon}>
                            <div>
                                <img src={comingsoon} className={styles.gambarFlyer}/>
                            </div>
                        </div>
                    </div>

             {/* FOOTER */}
            <div className={styles.bgfooter}>
                <div className={styles.t4footer}>
                    <div className={styles.footer}>
                        <div className={styles.logo}>
                            <img src={logoberdayaberjaya}/>
                        </div>

                        <div className={styles.t4detInfo}>
                            <img src={iconFB} className={styles.icon}/>
                            <h4>Bersatu Bersama</h4>
                        </div>
                        <div className={styles.t4detInfo}>
                            <img src={iconYT} className={styles.icon}/>
                            <h4>Berdaya Berjaya</h4>
                        </div>
                        <div className={styles.t4detInfo}>
                            <img src={iconPhone} className={styles.icon}/>
                            <h4>0818524862 (WA only) </h4>
                        </div>
                        <div className={styles.t4detInfo}>
                            <img src={iconInsta} className={styles.icon}/>
                            <h4>@berdayaberjaya</h4>
                        </div>
                    </div>
                    <div className={styles.cr}>Copyright BerdayaBerjaya @2024</div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
