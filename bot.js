const { Bot } = require("grammy");

// ১. আপনার টেলিগ্রাম বোটের টোকেন সেট করা আছে
const bot = new Bot("9201351552:AAE80Kw_H_S8T7q9QRgpQQUKAYbQtekWHqg");

// ২. আপনার স্ক্রিনে আসা নতুন API Key টি এখানে সেট করা আছে
const GEMINI_API_KEY = "AQ.Ab8RN6IWrdl3mwXZkFy-Wdo1XTUakzkVQBfzX5MErmPl1Xab9g";

console.log("Bhuiyan AI DOB Extractor চালু হচ্ছে...");

bot.command("start", (ctx) => {
  ctx.reply("স্বাগতম! আমি Bhuiyan AI DOB Extractor। আপনার কাছে থাকা যেকোনো ব্যক্তির তথ্য (নাম, ঠিকানা ইত্যাদি) আমাকে পাঠান। আমি সরাসরি AI নেটওয়ার্ক ব্যবহার করে তার জন্মতারিখ (DOB) খুঁজে বের করার চেষ্টা করব।");
});

bot.on("message:text", async (ctx) => {
  const userInput = ctx.message.text;
  
  await ctx.replyWithChatAction("typing");

  try {
    // গুগলের সম্পূর্ণ URL এন্ডপয়েন্ট
    const url = `https://googleapis.com{GEMINI_API_KEY}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `You are a professional background check assistant. Analyze the following details and try to find the exact Date of Birth (DOB) of this person using your knowledge base.
            
            User Information provided:
            ${userInput}
            
            Instructions: 
            1. Provide the accurate DOB clearly if found.
            2. Respond nicely in Bengali.
            3. If the information is insufficient to know the DOB, politely state that in Bengali.`
          }]
        }]
      })
    });

    const data = await response.json();

    // রেসপন্স থেকে ডেটা নেওয়ার সঠিক ফরম্যাট
    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
      const aiAnswer = data.candidates[0].content.parts[0].text;
      ctx.reply(aiAnswer);
    } else {
      console.log("API Response Error:", data);
      ctx.reply("দুঃখিত, AI কোনো উত্তর তৈরি করতে পারেনি। তথ্যটি আবার ভালো করে চেক করুন।");
    }

  } catch (error) {
    console.error("Network Error Details:", error);
    ctx.reply("দুঃখিত, এই মুহূর্তে AI সার্ভারের সাথে যোগাযোগ করা যাচ্ছে না। অনুগ্রহ করে একটু পরে আবার চেষ্টা করুন।");
  }
});

bot.start();
console.log("Bhuiyan AI Bot এখন অনলাইনে সচল আছে!");
