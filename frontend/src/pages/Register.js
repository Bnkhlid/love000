import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg('');
    try {
      await axios.post('http://localhost:5000/api/users/register', { email, password });
      setMsg('تم إنشاء الحساب بنجاح!');
    } catch (err) {
      setMsg('حدث خطأ أو البريد مستخدم من قبل');
    }
  };

  return (
    <div className="container">
      <div className="flower-icon">🌹</div>
      <h2>تسجيل حساب جديد</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="البريد الإلكتروني" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="كلمة المرور" value={password} onChange={e => setPassword(e.target.value)} required />
        <input type="submit" value="تسجيل" />
      </form>
      {msg && <div className={msg.startsWith('تم') ? "success" : "error"}>{msg}</div>}
    </div>
  );
}

export default Register;