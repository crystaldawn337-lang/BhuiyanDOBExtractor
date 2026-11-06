const { Bot } = require("grammy");

// ১. আপনার টেলিগ্রাম বোটের টোকেন সেট করা আছে
const bot = new Bot("9201351552:AAE80Kw_H_S8T7q9QRgpQQUKAYbQtekWHqg");

console.log("Bhuiyan AI DOB Extractor চালু হচ্ছে...");

bot.command("start", (ctx) => {
  ctx.reply("স্বাগতম! আমি Bhuiyan AI DOB Extractor। আপনার কাছে থাকা যেকোনো ব্যক্তির তথ্য (নাম, ঠিকানা ইত্যাদি) আমাকে পাঠান। আমি সম্পূর্ণ ফ্রি ও ওপেন সোর্স AI ব্যবহার করে তার জন্মতারিখ (DOB) খুঁজে বের করার চেষ্টা করব।");
});

bot.on("message:text", async (ctx) => {
  const userInput = ctx.message.text;
  
  await ctx.replyWithChatAction("typing");

  try {
    // সম্পূর্ণ ফ্রি এবং কোনো কী (Key) ছাড়া ওপেন সোর্স এআই এন্ডপয়েন্ট
    const url = "https://huggingface.co";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: `<|system|>\nYou are a professional background check assistant. Analyze the details provided by the user and try to find or estimate the exact Date of Birth (DOB) of this person based on your knowledge base. Always respond nicely in Bengali only.<|user|>\n${userInput}<|assistant|>\n`
      })
    });

    const data = await response.json();

    if (data && data[0] && data[0].generated_text) {
      // এআই এর মূল উত্তরটি ফিল্টার করা
      let aiAnswer = data[0].generated_text.split("<|assistant|>\n")[1] || data[0].generated_text;
      ctx.reply(aiAnswer);
    } else {
      ctx.reply("দুঃখিত, AI এই মুহূর্তে কোনো উত্তর তৈরি করতে পারেনি। তথ্যটি আবার চেক করুন।");
    }

  } catch (error) {
    console.error("AI Error:", error);
    ctx.reply("দুঃখিত, এই মুহূর্তে AI সার্ভারের সাথে যোগাযোগ করা যাচ্ছে না। অনুগ্রহ করে একটু পরে আবার চেষ্টা করুন।");
  }
});

bot.start();
console.log("Bhuiyan AI Bot এখন অনলাইনে সচল আছে!");
