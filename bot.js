const { Bot } = require("grammy");

// ১. আপনার টেলিগ্রাম বোটের টোকেন সেট করা আছে
const bot = new Bot("9201351552:AAE80Kw_H_S8T7q9QRgpQQUKAYbQtekWHqg");

console.log("Bhuiyan AI DOB Extractor চালু হচ্ছে...");

bot.command("start", (ctx) => {
  ctx.reply("স্বাগতম! আমি Bhuiyan AI DOB Extractor। আপনার কাছে থাকা যেকোনো ব্যক্তির তথ্য (নাম, ঠিকানা ইত্যাদি) আমাকে পাঠান। আমি সম্পূর্ণ ফ্রি ও পাবলিক এআই নেটওয়ার্ক ব্যবহার করে তার জন্মতারিখ (DOB) খুঁজে বের করার চেষ্টা করব।");
});

bot.on("message:text", async (ctx) => {
  const userInput = ctx.message.text;
  
  await ctx.replyWithChatAction("typing");

  try {
    // সম্পূর্ণ ফ্রি এবং কোনো API Key ছাড়া ওপেন সোর্স এআই গেটওয়ে ইউআরএল
    const url = "https://huggingface.co";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: `<|system|>\nYou are a professional OSINT and background check assistant. Analyze the details provided by the user and find or estimate the exact Date of Birth (DOB) of this person based on your knowledge base. Always respond nicely in Bengali only.<|user|>\n${userInput}<|assistant|>\n`
      })
    });

    const data = await response.json();

    // রেসপন্স থেকে টেক্সট ফিল্টার করার শতভাগ নিরাপদ মেথড
    if (data && data[0] && data[0].generated_text) {
      const fullText = data[0].generated_text;
      let aiAnswer = fullText.split("<|assistant|>\n")[1] || fullText;
      ctx.reply(aiAnswer.trim());
    } else {
      ctx.reply("দুঃখিত, এআই কোনো উত্তর তৈরি করতে পারেনি। তথ্যটি আবার ভালো করে চেক করুন।");
    }

  } catch (error) {
    console.error("AI Cloud Error:", error);
    ctx.reply("দুঃখিত, এই মুহূর্তে এআই সার্ভারের সাথে যোগাযোগ করা যাচ্ছে না। অনুগ্রহ করে একটু পরে আবার চেষ্টা করুন।");
  }
});

bot.start();
console.log("Bhuiyan AI Bot এখন অনলাইনে সচল আছে!");
