require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();

// Middleware
app.use(cors({
    origin: ['https://fernandoagui01.github.io', 'http://127.0.0.1:5500', 'http://localhost:5500', 'http://127.0.0.1:3000', 'http://localhost:3000']
})); // Lets your frontend bypass security blocks to talk to this server
app.use(express.json()); // Allows the server to read incoming JSON messages

// Securely initialize the AI client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Create the route your frontend will call
app.post('/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;

    

    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
    
    // Send the user's message to the AI
    const result = await model.generateContent(userMessage);
    const botResponse = result.response.text();

    // Send the AI's response back to your website
    res.json({ reply: botResponse });

  } catch (error) {
    console.error("Error communicating with AI:", error);
    res.status(500).json({ reply: "Sorry, I'm having trouble connecting right now." });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend server is running on port ${PORT}`);
});



