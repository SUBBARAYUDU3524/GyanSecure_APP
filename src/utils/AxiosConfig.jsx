import axios from "axios";

const API_KEY = "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"; // Replace with your OpenAI API key

const translateText = async (text, targetLanguage) => {
  const prompt = `
    Translate the following text to ${targetLanguage}:
    "${text}"
  `;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4", // Use "gpt-3.5-turbo" if you prefer
        messages: [{ role: "system", content: "You are a translator." }, { role: "user", content: prompt }],
        max_tokens: 100,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    const translatedText = response.data.choices[0].message.content.trim();
    return translatedText;
  } catch (error) {
    console.error("Error translating text:", error.response?.data || error.message);
    return null;
  }
};

// Usage Example:
translateText("Hello, world!", "French").then((translation) =>
  console.log("Translated text:", translation)
);
