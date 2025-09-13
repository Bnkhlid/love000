import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

function Order() {
  const [userId, setUserId] = useState('');
  const [bouquet, setBouquet] = useState('ورد أحمر');
  const [quantity, setQuantity] = useState(1);
  const [msg, setMsg] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg('');
    try {
      await axios.post('http://localhost:5000/api/orders', {
        userId,
        products: [{ id: bouquet, quantity }],
        total: quantity * 100, // سعر افتراضي، يمكن تعديله
      });
      setMsg('تم إرسال طلبك بنجاح! سنتواصل معك قريباً.');
    } catch (err) {
      setMsg('حدث خطأ، جرّب مرة أخرى.');
    }
  };

  return (
    <div className="container">
      <div className="flower-icon">💐</div>
      <h2>اطلب باقة ورد</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="رقم المستخدم (User ID)" value={userId} onChange={e => setUserId(e.target.value)} required />
        <select value={bouquet} onChange={e => setBouquet(e.target.value)}>
          <option>ورد أحمر</option>
          <option>ورد أبيض</option>
          <option>مكس ورد</option>
          <option>توليب وردي</option>
        </select>
        <input type="number" min="1" max="10" value={quantity} onChange={e => setQuantity(e.target.value)} />
        <input type="submit" value="إرسال الطلب" />
      </form>
      {msg && <div className={msg.startsWith('تم') ? "success" : "error"}>{msg}</div>}
    </div>
  );
}

export default Order;