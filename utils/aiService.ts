import { Platform } from 'react-native';
import axios from 'axios';

// N8N Webhook URL
const N8N_WEBHOOK_URL = 'https://aarushjain.app.n8n.cloud/webhook-test/corzoai-ultimate';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string | Array<{ type: 'text' | 'image'; text?: string; image?: string }>;
}

export const generateAIResponse = async (prompt: string): Promise<{ text: string; data?: any }> => {
  try {
    // Call n8n webhook with the user's message
    const encodedMessage = encodeURIComponent(prompt);
    const webhookUrl = `${N8N_WEBHOOK_URL}?message=${encodedMessage}`;
    
    console.log('Calling n8n webhook:', webhookUrl);
    
    const response = await axios.get(webhookUrl, {
      timeout: 30000, // 30 second timeout
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'CorzoAI/1.0',
      }
    });
    
    if (response.status === 200 && response.data) {
      console.log('n8n webhook response:', response.data);
      
      // Handle different response formats from n8n
      if (response.data.response) {
        return { 
          text: response.data.response,
          data: response.data
        };
      }
      
      // If it's a string response
      if (typeof response.data === 'string') {
        return { text: response.data };
      }
      
      // If it's structured data (product comparisons, etc.)
      if (response.data.products || response.data.comparisons || response.data.groceryItems) {
        return { 
          text: formatStructuredResponse(response.data),
          data: response.data
        };
      }
      
      // Default handling
      return { 
        text: response.data.message || JSON.stringify(response.data),
        data: response.data
      };
    }
    
    throw new Error('Invalid response from n8n webhook');
    
  } catch (error) {
    console.error('Error calling n8n webhook:', error);
    
    // Fallback to simulated intelligent responses
    return { text: getIntelligentResponse(prompt) };
  }
};

// Helper function to format structured responses from n8n
const formatStructuredResponse = (data: any): string => {
  if (data.products && Array.isArray(data.products)) {
    const products = data.products;
    let response = "Here are the best options I found for you:\n\n";
    
    products.forEach((product: any, index: number) => {
      response += `${index + 1}. ${product.name}\n`;
      response += `   💰 ₹${product.price?.toLocaleString() || 'N/A'}\n`;
      response += `   🏪 ${product.store || 'Unknown Store'}\n`;
      if (product.features && Array.isArray(product.features)) {
        response += `   ✨ ${product.features.slice(0, 2).join(', ')}\n`;
      }
      response += '\n';
    });
    
    response += "Would you like more details on any of these products?";
    return response;
  }
  
  if (data.groceryItems) {
    return "I can help you order groceries! Let me show you some options to customize your order.";
  }
  
  // Default formatting for other structured data
  return data.message || "I've found some great options for you. Let me show you the details.";
};

const getIntelligentResponse = (prompt: string): string => {
  const lowerPrompt = prompt.toLowerCase();
  
  // Headphone queries
  if (lowerPrompt.includes('headphone') || lowerPrompt.includes('headphones')) {
    if (lowerPrompt.includes('under') && (lowerPrompt.includes('5000') || lowerPrompt.includes('5k'))) {
      return "I found excellent headphones under ₹5,000! The JBL Tune 510BT offers 40-hour battery life for ₹3,499, while the boAt Rockerz 450 provides great value at ₹1,999. For true wireless, the Noise Buds VS104 at ₹1,299 offers 30-hour playtime with noise cancellation. Which type interests you most?";
    }
    if (lowerPrompt.includes('wireless') || lowerPrompt.includes('bluetooth')) {
      return "For wireless headphones, I recommend the JBL Tune 510BT with Pure Bass sound and 40-hour battery, or the Sony WH-CH720N with noise cancellation. Both offer excellent connectivity and sound quality. Would you like to compare their features?";
    }
    return "I can help you find the perfect headphones! Are you looking for wireless, wired, gaming, or studio headphones? What's your budget range?";
  }
  
  // Protein queries
  if (lowerPrompt.includes('protein') || lowerPrompt.includes('whey')) {
    if (lowerPrompt.includes('chemical free') || lowerPrompt.includes('natural')) {
      return "For chemical-free protein, I recommend MuscleBlaze Raw Whey (₹2,699) with zero artificial sweeteners, or Optimum Nutrition Gold Standard (₹3,999) with minimal ingredients. Both are third-party tested for purity. Would you like to see their nutritional profiles?";
    }
    return "I found some excellent protein options! MuscleBlaze Whey Protein is ₹2,699 for 1kg, while Optimum Nutrition Gold Standard is ₹3,999. Both have clean ingredient lists. What's your fitness goal?";
  }
  
  // Grocery queries
  if (lowerPrompt.includes('tomato') || lowerPrompt.includes('onion') || lowerPrompt.includes('garlic') || lowerPrompt.includes('grocery')) {
    return "I can help you order fresh groceries! Let me show you the best prices and let you customize quantities for items like tomatoes, onions, and garlic.";
  }
  
  // Shopping and deals
  if (lowerPrompt.includes('deal') || lowerPrompt.includes('discount') || lowerPrompt.includes('offer')) {
    return "Great timing! I found some amazing deals: Myntra has 70% off on fashion, Amazon has electronics sale with up to 50% off, and Flipkart has grocery discounts. Which category interests you?";
  }
  
  // Price comparison
  if (lowerPrompt.includes('compare') || lowerPrompt.includes('price') || lowerPrompt.includes('best price')) {
    return "I'll compare prices across all major stores for you! Just tell me what product you're looking for, and I'll find the best deals from Amazon, Flipkart, Myntra, and other retailers.";
  }
  
  // Default intelligent response
  return "I'm your AI shopping assistant! I can help you find the best products, compare prices across stores, get exclusive deals, and make smart purchasing decisions. What are you looking to buy today?";
};