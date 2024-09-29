import React from 'react'
import { useState, useEffect } from 'react';
import styles from './AdminDashboard.module.css'
import ReactPaginate from 'react-paginate'
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils';
import { CSVLink } from 'react-csv';

function AdminDashboard() {
  const navigate = useNavigate();

  // States for participants, webinars, and other controls
  const [participants, setParticipants] = useState([]);
  const [webinars, setWebinars] = useState([]);
  const [selectedWebinar, setSelectedWebinar] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);

  // Fetch participants from Supabase
  const fetchParticipants = async () => {
    let query = supabase.from('participants').select('*').order('id', { ascending: false });
  
    if (selectedWebinar) {
      query = query.eq('webinar_id', selectedWebinar);
    }
  
    const { data, error } = await query;
    if (error) {
      console.error('Error fetching participants:', error);
    } else {
      console.log('Fetched Participants:', data); // Log the fetched participants data
      setParticipants(data);
    }
  };

  // Fetch webinars from Supabase
  const fetchWebinars = async () => {
    const { data, error } = await supabase.from('webinars').select('*');
    if (error) {
      console.error('Error fetching webinars:', error);
    } else {
      setWebinars(data);
    }
  };

  useEffect(() => {
    fetchParticipants();
    fetchWebinars();
  }, [selectedWebinar]); // Refetch participants when webinar changes

  // Handle Paid/Unpaid toggle
  const togglePayment = async (id, payment_status) => {
    const { error } = await supabase
      .from('participants')
      .update({ payment_status: !payment_status })
      .eq('id', id);

    if (error) {
      console.error('Error updating payment status:', error);
    } else {
      fetchParticipants(); // Refresh participants after update
    }
  };

  // Handle Delete row
  const deleteRow = async (id) => {
    const { error } = await supabase.from('participants').delete().eq('id', id);
    if (error) {
      console.error('Error deleting participant:', error);
    } else {
      fetchParticipants(); // Refresh participants after deletion
    }
  };

  // Pagination calculations
  const pageCount = Math.ceil(participants.length / rowsPerPage);
  const offset = currentPage * rowsPerPage;
  const currentPageData = participants.slice(offset, offset + rowsPerPage);

  // Handle page click
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  // Prepare CSV data
  const csvData = participants.map((participant) => ({
    UserID: participant.id || 'N/A',
    Name: participant.name || 'N/A',
    Instansi: participant.asal_instansi || 'N/A',
    PhoneNumber: participant.no_hp || 'N/A',
    OfflineOnline: participant.offlineonline || 'N/A',
    PaymentStatus: participant.payment_status ? 'Paid' : 'Unpaid',
    InvestmentAmount: participant.investment_amount || 'N/A',
    RegisteredAt: new Date(participant.registered_at).toLocaleDateString(),
  }));

  const headers = [
    { label: "User ID", key: "UserID" },
    { label: "Name", key: "Name" },
    { label: "Instansi", key: "Instansi" },
    { label: "Phone Number", key: "PhoneNumber" },
    { label: "Offline/Online", key: "OfflineOnline" },
    { label: "Payment Status", key: "PaymentStatus" },
    { label: "Investment Amount", key: "InvestmentAmount" },
    { label: "Registered At", key: "RegisteredAt" }
  ];

  const fileName = `participants_${selectedWebinar || 'all'}_webinars.csv`;
  
  

  return (
    <div className={styles.container}>
        <div className={styles.header}>
            <h2>Admin</h2>
            <div className={styles.tombol} onClick={() => navigate('/ganti-webinar')}>
                Ganti Webinar
            </div>  
        </div>

        <div className={styles.TableCont}>
              {/* Controls at the top of the table */}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center' }}>
                {/* Dropdown to select rows per page */}
                <div className={styles.showrow}>
                  <label>Show rows: </label>
                  <select
                    value={rowsPerPage}
                    onChange={(e) => setRowsPerPage(parseInt(e.target.value, 10))}
                  >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                  </select>
                </div>

                {/* Dropdown to select webinar */}
                <div>
                  <label>Select Webinar: </label>
                  <select
                    value={selectedWebinar}
                    onChange={(e) => setSelectedWebinar(e.target.value)}
                  >
                    <option value="">All Webinars</option>
                    {webinars.map((webinar) => (
                      <option key={webinar.id} value={webinar.id}>
                        {webinar.judul_webinar}
                      </option>
                    ))}
                  </select>
                </div>

                {/* CSV Download Button */}
                <div>
                  {/* <CSVLink
                    data={data}
                    filename={`webinar_table_${new Date().toISOString()}.csv`}
                    className="btn"
                  >
                    Download CSV
                  </CSVLink> */}
                  <button className={styles.tombol}>
                    <CSVLink
                      data={csvData}
                      headers={headers}
                      filename={fileName}
                    >
                      Download CSV
                    </CSVLink>
                  </button>
                </div>
              </div>

              {/* Table */}
              <table border="1" cellPadding="10" cellSpacing="0" className={styles.table}>
                <thead>
                  <tr>
                    <th>User ID</th>
                    <th>Name</th>
                    <th>Asal Sekolah</th>
                    <th>No HP</th>
                    <th>Offline/Online</th>
                    <th>Payment Status</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                {currentPageData.map((row) => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{row.name}</td>
                    <td>{row.asal_instansi}</td>
                    <td>{row.no_hp}</td>
                    <td>{row.offlineonline}</td>
                    <td>
                      <button 
                        className={row.payment_status ? styles.paid : styles.unpaid}
                        onClick={() => togglePayment(row.id, row.paid)}>
                        {row.payment_status ? 'Already Paid' : 'Unpaid'}
                      </button>
                    </td>
                    <td>
                      <button 
                        onClick={() => deleteRow(row.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
                </tbody>
              </table>

              {/* Pagination */}
              <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={styles.pagination}
                activeClassName={styles.active}
              />
            </div>
  
    </div>
  )
}

export default AdminDashboard