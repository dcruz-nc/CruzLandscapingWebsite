exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' })
    };
  }

  try {
    console.log("📩 Incoming body:", event.body);

    const { fname, lname, phone, email, message } = JSON.parse(event.body);

    const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
    console.log("🔑 Webhook URL present?", !!webhookUrl);

    if (!webhookUrl) {
      return { 
        statusCode: 500, 
        body: JSON.stringify({ message: "Missing webhook URL" })
      };
    }

    const fullName = `${fname} ${lname}`;
    
    const payload = {
      content: `**New Quote Request from Cruz Landscaping Website**\n**Name:** ${fullName}\n**Phone:** ${phone}\n**Email:** ${email}\n**Message:** ${message || 'No message provided'}`,
    };

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    console.log("📡 Discord response status:", response.status);

    if (!response.ok) {
      return { 
        statusCode: 500, 
        body: JSON.stringify({ message: "Failed to send message to Discord" })
      };
    }

    return { 
      statusCode: 200, 
      body: JSON.stringify({ message: "Message sent successfully" })
    };
  } catch (err) {
    console.error("❌ Function error:", err);
    return { 
      statusCode: 500, 
      body: JSON.stringify({ message: `Error: ${err.message}` })
    };
  }
};