import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg('');
    try {
      await axios.post('http://localhost:5000/api/users/login', { email, password });
      setMsg('تم تسجيل الدخول بنجاح!');
    } catch (err) {
      setMsg('بيانات الدخول غير صحيحة');
    }
  };

  return (
    <div className="container">
      <div className="flower-icon">💮</div>
      <h2>تسجيل الدخول</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="البريد الإلكتروني" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="كلمة المرور" value={password} onChange={e => setPassword(e.target.value)} required />
        <input type="submit" value="دخول" />
      </form>
      {msg && <div className={msg.startsWith('تم') ? "success" : "error"}>{msg}</div>}
    </div>
  );
}

export default Login;