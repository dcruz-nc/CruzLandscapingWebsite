require('dotenv').config();
const express = require('express');
const path = require('path');
const livereload = require('livereload');
const connectLivereload = require('connect-livereload');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve static files with live-reload injected - UPDATED PATH
const publicDir = path.join(__dirname, 'public');
app.use(connectLivereload());
app.use(express.static(publicDir));

// LiveReload server watches the src/public directory
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(publicDir);
liveReloadServer.server.once('connection', () => {
  setTimeout(() => {
    liveReloadServer.refresh('/');
  }, 100);
});

// Local equivalent of Netlify function for contact
app.post('/.netlify/functions/contact', async (req, res) => {
  try {
    const { fname, lname, phone, email, message } = req.body || {};
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    if (!webhookUrl) {
      return res.status(500).json({ message: 'Missing webhook URL' });
    }

    const payload = {
      content: `**New Quote Request from Cruz Landscaping Website**\n**Name:** ${fname || ''} ${lname || ''}\n**Phone:** ${phone || ''}\n**Email:** ${email || ''}\n**Message:** ${message || 'No message provided'}`,
    };

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      return res.status(500).json({ message: 'Failed to send message to Discord' });
    }
    return res.json({ message: 'Message sent successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: `Error: ${err.message}` });
  }
});

// Fallback to index.html for root
app.get('/', (req, res) => {
  res.sendFile(path.join(publicDir, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});