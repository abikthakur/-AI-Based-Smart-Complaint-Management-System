const axios = require('axios');

const analyzeComplaint = async (complaintText) => {
  try {
    const prompt = `
    Analyze the following public complaint and provide structured JSON output.
    Classify into categories: Water issues, Electricity issues, Garbage complaints, Road damage, Internet/network issues, Drainage issues, or Other.
    
    Determine the following:
    1. priority: "High", "Medium", or "Low"
    2. department: The most relevant government/municipal department responsible for this.
    3. summary: A concise one-sentence summary of the issue.
    4. response: A professional automatic response to the user acknowledging the specific issue.

    Complaint: "${complaintText}"
    
    Output strictly in valid JSON format matching this structure:
    {
      "priority": "...",
      "department": "...",
      "summary": "...",
      "response": "..."
    }
    `;

    // Try OpenRouter API if key is available
    if (process.env.OPENROUTER_API_KEY) {
      const response = await axios.post(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          model: 'openai/gpt-3.5-turbo', // You can change this to another supported model
          messages: [{ role: 'user', content: prompt }],
          response_format: { type: "json_object" }
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const content = response.data.choices[0].message.content;
      return JSON.parse(content);
    } else {
      console.warn("OPENROUTER_API_KEY not found. Using fallback mock AI response.");
      // Fallback for development without API key
      return {
        priority: "Medium",
        department: "General Services",
        summary: "Issue reported by user.",
        response: "Your complaint has been received and is being processed."
      };
    }
  } catch (error) {
    console.error("AI Analysis Error:", error.message);
    // Return a safe default if API fails
    return {
      priority: "Medium",
      department: "General Review",
      summary: "Could not auto-analyze.",
      response: "We have received your complaint and will review it shortly."
    };
  }
};

module.exports = { analyzeComplaint };
