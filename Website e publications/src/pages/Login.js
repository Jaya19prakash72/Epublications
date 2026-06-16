import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('phone');

  const sendOtp = async () => {
    await axios.post('/api/auth/send-otp', { phone });
    setStep('otp');
  };

  const verifyOtp = async () => {
    const res = await axios.post('/api/auth/verify-otp', { phone, code: otp });
    if (res.data.success) {
      alert('Login successful!');
    } else {
      alert('Invalid OTP');
    }
  };

  return (
    <div>
      {step === 'phone' && (
        <>
          <h2>Enter Mobile Number</h2>
          <input value={phone} onChange={e => setPhone(e.target.value)} />
          <button onClick={sendOtp}>Send OTP</button>
        </>
      )}
      {step === 'otp' && (
        <>
          <h2>Enter OTP</h2>
          <input value={otp} onChange={e => setOtp(e.target.value)} />
          <button onClick={verifyOtp}>Verify OTP</button>
        </>
      )}
    </div>
  );
}

export default Login;
