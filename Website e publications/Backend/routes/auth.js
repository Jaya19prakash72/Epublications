// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const twilio = require('twilio');

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH;
const client = twilio(accountSid, authToken);

// Send OTP
router.post('/send-otp', async (req, res) => {
  const { phone } = req.body;
  await client.verify.v2.services(process.env.TWILIO_SERVICE)
    .verifications.create({ to: phone, channel: 'sms' });
  res.json({ message: 'OTP sent!' });
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
  const { phone, code } = req.body;
  const check = await client.verify.v2.services(process.env.TWILIO_SERVICE)
    .verificationChecks.create({ to: phone, code });
  if (check.status === 'approved') {
    res.json({ success: true, token: 'session_token_here' });
  } else {
    res.json({ success: false });
  }
});

module.exports = router;
