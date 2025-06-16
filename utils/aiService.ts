import { Platform } from 'react-native';
import axios from 'axios';

// Initialize OpenAI with your API key
const OPENAI_API_KEY = 'sk-proj-6pJX7bfi56gxArgCoaqWT3BlbkFJRdmtydhnsIHCQZPUvPPY';
const N8N_WEBHOOK_URL = 'https://aarushjain.app.n8n.cloud/webhook-test/corzoai-ultimate';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string | Array<{ type: 'text' | 'image'; text?: string; image?: string }>;
}

export const generateAIResponse = async (prompt: string): Promise<string> => {
  try {
    // System message to define the AI's behavior
    const messages: Message[] = [
      {
        role: 'system',
        content: `You are CorzoAI, a sophisticated shopping assistant that helps users find the best products at the best prices. You have deep knowledge of:
        - Product comparisons and specifications
        - Price trends and market analysis
        - Shopping recommendations based on user preferences
        - Brand quality and reliability
        Keep responses concise, informative and focused on helping users make informed shopping decisions.`
      },
      {
        role: 'user',
        content: prompt
      }
    ];

    // Try n8n webhook first
    try {
      const encodedMessage = encodeURIComponent(prompt);
      const webhookUrl = `${N8N_WEBHOOK_URL}?message=${encodedMessage}`;
      
      console.log('Calling n8n webhook:', webhookUrl);
      const response = await axios.get(webhookUrl);
      
      if (response.status === 200 && response.data) {
        console.log('n8n webhook response:', response.data);
        
        // If the response contains a structured format, use it
        if (response.data.response) {
          return response.data.response;
        }
        
        // If it's a different format, handle accordingly
        if (typeof response.data === 'string') {
          return response.data;
        }
        
        return JSON.stringify(response.data);
      }
      
      throw new Error('Invalid response from n8n webhook');
    } catch (webhookError) {
      console.log('n8n webhook failed, trying alternative methods:', webhookError);
      
      // Try the streaming API as fallback
      if (Platform.OS !== 'web') {
        try {
          const streamResponse = await fetch('https://toolkit.rork.com/text/llm/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ messages }),
          });

          if (!streamResponse.ok) {
            throw new Error('Streaming API failed');
          }

          const data = await streamResponse.json();
          return data.completion;
        } catch (streamError) {
          console.log('Streaming failed, falling back to direct OpenAI:', streamError);
          
          // Fallback to direct OpenAI call
          const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
              model: "gpt-4",
              messages: messages,
              temperature: 0.7,
              max_tokens: 500,
            }),
          });
          
          if (!openaiResponse.ok) {
            throw new Error('OpenAI API failed');
          }
          
          const openaiData = await openaiResponse.json();
          return openaiData.choices[0].message.content || getSimulatedResponse(prompt);
        }
      } else {
        // For web, use simulated responses
        return getSimulatedResponse(prompt);
      }
    }
  } catch (error) {
    console.error('Error generating AI response:', error);
    return getSimulatedResponse(prompt);
  }
};

const getSimulatedResponse = (prompt: string): string => {
  const lowerPrompt = prompt.toLowerCase();
  
  if (lowerPrompt.includes('headphone') || lowerPrompt.includes('headphones')) {
    return "I found several headphones under ₹5,000. The JBL Tune 510BT is available for ₹3,499 on Amazon, while the boAt Rockerz 450 is ₹1,999 on Flipkart. The Noise Buds VS104 are on sale for ₹1,299. Would you like more details on any of these?";
  }
  
  if (lowerPrompt.includes('protein') || lowerPrompt.includes('whey')) {
    return "I found some chemical-free whey protein options. MuscleBlaze Whey Protein is ₹2,699 for 1kg on their website. Optimum Nutrition Gold Standard is ₹3,999 on Amazon. Both have clean ingredient lists without artificial sweeteners. Would you like me to compare their nutritional profiles?";
  }
  
  if (lowerPrompt.includes('tomato') || lowerPrompt.includes('onion') || lowerPrompt.includes('milk')) {
    return "I've added tomatoes, onions, and milk to your cart. Blinkit has the best prices right now with tomatoes at ₹14/500g, onions at ₹29/250g. For milk, Amul Toned Milk (500ml) is ₹27. The total comes to approximately ₹70. Would you like to checkout?";
  }
  
  if (lowerPrompt.includes('lipstick') || lowerPrompt.includes('moisturiser')) {
    return "For purple lipsticks with moisturizing ingredients, I recommend Maybelline Color Sensational (₹299) or MAC Matte Lipstick in Heroine (₹1,950). Both contain shea butter and vitamin E. Nykaa has a 15% discount on Maybelline today. Would you like to see more options?";
  }

  if (lowerPrompt.includes('myntra') || lowerPrompt.includes('deals')) {
    return "Myntra currently has a 5% cashback offer through CorzoAI plus their ongoing End of Season Sale with up to 70% off on selected items. Top deals include H&M t-shirts starting at ₹399, Nike running shoes at 40% off, and Lakme makeup kits with a buy-one-get-one offer. Would you like me to show you specific categories?";
  }

  if (lowerPrompt.includes('compare') || lowerPrompt.includes('price')) {
    return "I can compare prices across multiple stores for you. Just tell me what product you're looking for, and I'll find the best deals from Amazon, Flipkart, Myntra, and other retailers. I can also alert you when prices drop on items you're watching.";
  }
  
  return "I can help you find the best deals across multiple stores. What are you looking for today? I can compare prices, suggest alternatives, or help you build a shopping cart with the best prices.";
};