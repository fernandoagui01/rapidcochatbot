require('dotenv').config();
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-3-pro-preview" }); // Dummy init
    console.log("Checking available models...");
    
    // This is the magic part—it asks Google what you can use
    // Note: We have to use the direct API call structure if the helper isn't exposed, 
    // but let's try a simple fetch first to verify the key works at all.
    
    // Actually, let's use the simplest reliable model name first:
    console.log("Trying 'gemini-3-pro-preview'...");
    const result = await genAI.getGenerativeModel({ model: "gemini-3-pro-preview" }).generateContent("Hello");
    console.log("Success! 'gemini-3-pro-preview' worked.");
    console.log("Response:", result.response.text());

  } catch (error) {
    console.log("\n❌ ERROR DETAILS:");
    console.log(error.message);
    
    // If the above failed, let's try to guess the issue based on the key
    if (error.message.includes("API key not valid")) {
        console.log("-> YOUR KEY IS INVALID. Check your .env file.");
    } else if (error.message.includes("404")) {
        console.log("-> MODEL NAME ERROR. The API Key is good, but the model name is wrong.");
    }
  }
}

listModels();