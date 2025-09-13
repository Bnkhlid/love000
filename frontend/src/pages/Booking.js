import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

function Booking() {
  const [userId, setUserId] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [date, setDate] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg('');
    try {
      await axios.post('http://localhost:5000/api/bookings', {
        userId,
        recipientName,
        date,
      });
      setMsg('تم الحجز! سنذكرك بالمناسبة في وقتها.');
    } catch (err) {
      setMsg('حدث خطأ! حاول مرة أخرى.');
    }
  };

  return (
    <div className="container">
      <div className="flower-icon">🌷</div>
      <h2>احجز تذكير مناسبة</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="رقم المستخدم (User ID)" value={userId} onChange={e => setUserId(e.target.value)} required />
        <input type="text" placeholder="اسم المهدى إليه" value={recipientName} onChange={e => setRecipientName(e.target.value)} required />
        <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
        <input type="submit" value="حجز التذكير" />
      </form>
      {msg && <div className={msg.startsWith('تم') ? "success" : "error"}>{msg}</div>}
    </div>
  );
}

export default Booking;
