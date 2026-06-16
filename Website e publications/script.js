// script.js
async function sendOtp() {
  const phone = document.getElementById('phone').value;
  try {
    const res = await fetch('http://localhost:5000/api/auth/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone })
    });
    const data = await res.json();
    alert(data.message);
  } catch (err) {
    console.error(err);
    alert('Error sending OTP');
  }
}

async function verifyOtp() {
  const phone = document.getElementById('phone').value;
  const otp = document.getElementById('otp').value;
  try {
    const res = await fetch('http://localhost:5000/api/auth/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, code: otp })
    });
    const data = await res.json();
    if (data.success) {
      alert('Login successful!');
      // redirect to home page
      window.location.href = 'index.html';
    } else {
      alert('Invalid OTP');
    }
  } catch (err) {
    console.error(err);
    alert('Error verifying OTP');
  }
}
