import { Platform } from 'react-native';
import axios from 'axios';

// N8N Webhook URL - Updated to the correct endpoint
const N8N_WEBHOOK_URL = 'https://aarushjain.app.n8n.cloud/webhook-test/corzoai-ultimate';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string | Array<{ type: 'text' | 'image'; text?: string; image?: string }>;
}

interface AIResponse {
  text: string;
  data?: any;
  type?: string;
  products?: any[];
  groceryItems?: boolean;
  preferences?: any;
  priceComparison?: boolean;
  useCase?: boolean;
  productDetail?: any;
  sources?: any[];
  analysis?: any;
  recommendations?: any[];
}

export const generateAIResponse = async (prompt: string): Promise<AIResponse> => {
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
        'Content-Type': 'application/json',
      }
    });
    
    if (response.status === 200 && response.data) {
      console.log('n8n webhook response:', response.data);
      
      // Handle different response formats from n8n
      if (response.data.response || response.data.text) {
        return { 
          text: response.data.response || response.data.text,
          data: response.data,
          type: response.data.type || detectResponseType(prompt, response.data),
          products: response.data.products,
          groceryItems: response.data.groceryItems,
          preferences: response.data.preferences,
          priceComparison: response.data.priceComparison,
          useCase: response.data.useCase,
          productDetail: response.data.productDetail,
          sources: response.data.sources,
          analysis: response.data.analysis,
          recommendations: response.data.recommendations,
        };
      }
      
      // If it's a string response
      if (typeof response.data === 'string') {
        return { 
          text: response.data, 
          type: detectResponseType(prompt, response.data) 
        };
      }
      
      // If it's structured data (product comparisons, etc.)
      if (response.data.products || response.data.comparisons || response.data.groceryItems) {
        return { 
          text: formatStructuredResponse(response.data),
          data: response.data,
          type: response.data.type || detectResponseType(prompt, response.data),
          products: response.data.products,
          groceryItems: response.data.groceryItems,
          preferences: response.data.preferences,
          priceComparison: response.data.priceComparison,
          useCase: response.data.useCase,
          productDetail: response.data.productDetail,
          sources: response.data.sources,
          analysis: response.data.analysis,
          recommendations: response.data.recommendations,
        };
      }
      
      // Default handling
      return { 
        text: response.data.message || JSON.stringify(response.data),
        data: response.data,
        type: detectResponseType(prompt, response.data)
      };
    }
    
    throw new Error('Invalid response from n8n webhook');
    
  } catch (error) {
    console.error('Error calling n8n webhook:', error);
    
    // Fallback to simulated intelligent responses
    return { 
      text: getIntelligentResponse(prompt),
      type: detectResponseType(prompt, null),
      ...getSimulatedData(prompt)
    };
  }
};

// Helper function to detect response type based on query and response
const detectResponseType = (query: string, data: any): string => {
  const lowerQuery = query.toLowerCase();
  
  // Check data first if available
  if (data) {
    if (data.type) return data.type;
    if (data.products && Array.isArray(data.products)) return 'headphone_comparison';
    if (data.groceryItems) return 'grocery_preferences';
    if (data.priceComparison) return 'price_comparison';
    if (data.useCase) return 'use_case_selection';
    if (data.productDetail) return 'product_detail';
    if (data.analysis) return 'vetted_analysis';
    if (data.sources) return 'research_sources';
  }
  
  // Fallback to query analysis
  if (lowerQuery.includes('headphone') && (lowerQuery.includes('compare') || lowerQuery.includes('under') || lowerQuery.includes('best'))) {
    return 'headphone_comparison';
  }
  if ((lowerQuery.includes('grocery') || lowerQuery.includes('onion') || lowerQuery.includes('tomato') || lowerQuery.includes('garlic')) &&
      (lowerQuery.includes('order') || lowerQuery.includes('buy'))) {
    return 'grocery_preferences';
  }
  if (lowerQuery.includes('headphone') && lowerQuery.includes('10k')) {
    return 'use_case_selection';
  }
  if (lowerQuery.includes('price') || lowerQuery.includes('compare')) {
    return 'price_comparison';
  }
  if (lowerQuery.includes('analysis') || lowerQuery.includes('review')) {
    return 'vetted_analysis';
  }
  if (lowerQuery.includes('source') || lowerQuery.includes('research')) {
    return 'research_sources';
  }
  
  return 'general';
};

// Helper function to get simulated data for fallback
const getSimulatedData = (query: string): Partial<AIResponse> => {
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('headphone') && (lowerQuery.includes('compare') || lowerQuery.includes('under') || lowerQuery.includes('best'))) {
    return {
      products: [
        {
          id: 'h1',
          name: 'Sony WH-1000XM6',
          price: 448,
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          store: 'Amazon',
          features: ['Industry-leading noise cancellation', 'Premium sound quality', '30-hour battery life'],
          cons: ['Expensive', 'Bulky design'],
          rating: 4.8,
          bestOverall: true,
          sources: ['TechRadar', 'CNET', 'What Hi-Fi?']
        },
        {
          id: 'h2',
          name: 'Bose QuietComfort Ultra Headphones',
          price: 449,
          image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
          store: 'Bose',
          features: ['Exceptional comfort', 'Spatial audio', 'Premium build quality'],
          cons: ['Very expensive', 'Limited customization'],
          rating: 4.7,
          premium: true,
          sources: ['SoundGuys', 'RTINGS', 'Consumer Reports']
        }
      ],
      analysis: {
        summary: "For flights, noise-cancelling headphones should ideally cancel both low and high frequencies, and be comfortable for long periods of use.",
        recommendation: "The Sony WH-1000XM6 stands out with class-leading noise cancellation.",
        sources: ['TechRadar', 'CNET', 'What Hi-Fi?', 'SoundGuys']
      }
    };
  }
  
  if ((lowerQuery.includes('grocery') || lowerQuery.includes('onion') || lowerQuery.includes('tomato')) &&
      (lowerQuery.includes('order') || lowerQuery.includes('buy'))) {
    return {
      groceryItems: true,
      preferences: {
        onion: ['250 g', '500 g', '1 kg', '2 kg'],
        garlic: ['100 g', '200 g', '500 g'],
        tomato: ['250 g', '500 g', '1 kg', '2 kg']
      }
    };
  }
  
  if (lowerQuery.includes('headphone') && lowerQuery.includes('10k')) {
    return {
      useCase: true
    };
  }
  
  return {};
};

// Helper function to format structured responses from n8n
const formatStructuredResponse = (data: any): string => {
  if (data.products && Array.isArray(data.products)) {
    const products = data.products;
    let response = "Here are the best options I found for you:\n\n";
    
    products.forEach((product: any, index: number) => {
      response += `${index + 1}. ${product.name}\n`;
      response += `   💰 $${product.price || 'N/A'}\n`;
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
    return "I'll help you order groceries! Let me show you some options to customize your order.";
  }
  
  if (data.priceComparison) {
    return "I've found the best prices across multiple stores. Let me show you the comparison.";
  }
  
  if (data.useCase) {
    return "What's your ideal use case for these headphones?";
  }
  
  if (data.analysis) {
    return data.analysis.summary || "I've analyzed the best options for you based on expert reviews.";
  }
  
  // Default formatting for other structured data
  return data.message || data.response || "I've found some great options for you. Let me show you the details.";
};

const getIntelligentResponse = (prompt: string): string => {
  const lowerPrompt = prompt.toLowerCase();
  
  // Headphone queries
  if (lowerPrompt.includes('headphone') || lowerPrompt.includes('headphones')) {
    if (lowerPrompt.includes('under') && (lowerPrompt.includes('5000') || lowerPrompt.includes('5k'))) {
      return "I found excellent headphones under ₹5,000! Let me show you the best options with detailed comparisons from trusted sources.";
    }
    if (lowerPrompt.includes('10k') || lowerPrompt.includes('10000')) {
      return "For headphones under ₹10,000, I need to understand your use case better to recommend the perfect option.";
    }
    if (lowerPrompt.includes('wireless') || lowerPrompt.includes('bluetooth')) {
      return "For wireless headphones, I'll show you the best options with detailed comparisons across multiple stores and expert reviews.";
    }
    if (lowerPrompt.includes('compare') || lowerPrompt.includes('best')) {
      return "Let me show you a detailed comparison of the best headphones based on expert analysis from multiple sources.";
    }
    return "I can help you find the perfect headphones! Let me show you some expertly vetted options.";
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
    return "I'll help you order fresh groceries! Let me show you customization options for the best prices.";
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
  return "I'm your superhuman AI shopping assistant! I can help you find the best products, compare prices across stores, get exclusive deals, and make smart purchasing decisions. What are you looking to buy today?";
};