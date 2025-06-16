# CorzoAI - Superhuman Shopping Assistant

A sophisticated AI-powered shopping assistant that helps users find the best products at the best prices across multiple stores. Built with React Native, Expo, and integrated with n8n for intelligent response processing.

## 🚀 Features

- **AI-Powered Chat**: Natural language understanding with intelligent responses
- **Voice Integration**: Voice input with ElevenLabs text-to-speech
- **Product Comparisons**: Smart product comparison with detailed specs
- **Price Tracking**: Real-time price comparison across multiple stores
- **Grocery Ordering**: Customizable grocery preferences with smart suggestions
- **Superhuman UI**: Modern, responsive design inspired by iOS and Linear
- **N8N Integration**: Advanced workflow automation for intelligent responses

## 🛠 Tech Stack

- **Frontend**: React Native with Expo
- **State Management**: Zustand with AsyncStorage persistence
- **Styling**: StyleSheet with LinearGradient effects
- **Voice**: ElevenLabs API + Web Speech API
- **Backend**: N8N webhook integration
- **Icons**: Lucide React Native

## 📱 Key Components

### Chat Interface
- Real-time AI responses with typing indicators
- Voice input/output capabilities
- Contextual UI components (product cards, preferences)
- Smooth animations and transitions

### Product Features
- **Headphone Comparison**: Detailed specs, pros/cons, store prices
- **Grocery Preferences**: Weight/quantity selectors with smart defaults
- **Use Case Selection**: Tailored recommendations based on user needs
- **Product Details**: Comprehensive product information with reviews

### AI Integration
- **N8N Webhook**: `https://aarushjain.app.n8n.cloud/webhook-test/corzoai-ultimate`
- **Intelligent Parsing**: Handles different query types (products, groceries, comparisons)
- **Structured Responses**: JSON data for UI components
- **Fallback Responses**: Smart defaults when API is unavailable

## 🔧 N8N Workflow Setup

### 1. HTTP Trigger Node
```javascript
// Method: GET
// Path: /corzoai-ultimate
// Response Mode: Last Node
```

### 2. Query Parser Function
```javascript
const message = $input.params.message;
if (!message) {
  return { error: "No message provided" };
}

const decodedMessage = decodeURIComponent(message);
return {
  query: decodedMessage,
  timestamp: new Date().toISOString(),
  queryType: detectQueryType(decodedMessage)
};

function detectQueryType(query) {
  const lower = query.toLowerCase();
  if (lower.includes('headphone') || lower.includes('compare')) return 'product_comparison';
  if (lower.includes('grocery') || lower.includes('onion') || lower.includes('tomato')) return 'grocery_order';
  if (lower.includes('price') || lower.includes('deal')) return 'price_check';
  return 'general';
}
```

### 3. OpenAI Node Configuration
```json
{
  "model": "gpt-4",
  "messages": [
    {
      "role": "system",
      "content": "You are CorzoAI, a superhuman shopping assistant. Provide intelligent, concise responses focused on helping users make informed purchasing decisions. Always consider price, quality, and user needs."
    },
    {
      "role": "user",
      "content": "{{$node['Function'].json['query']}}"
    }
  ],
  "temperature": 0.7,
  "max_tokens": 500
}
```

### 4. Response Processor Function
```javascript
const query = $input.first().query.toLowerCase();
const aiResponse = $input.last().text;
const queryType = $input.first().queryType;

// Handle different response types
switch(queryType) {
  case 'product_comparison':
    if (query.includes('headphone')) {
      return {
        response: aiResponse,
        products: generateHeadphoneData(),
        type: 'headphone_comparison'
      };
    }
    break;
    
  case 'grocery_order':
    return {
      response: "I'll help you order groceries! Let me show you customization options.",
      groceryItems: true,
      preferences: {
        onion: ['250 g', '500 g', '1 kg', '2 kg'],
        garlic: ['100 g', '200 g', '500 g'],
        tomato: ['250 g', '500 g', '1 kg', '2 kg']
      },
      type: 'grocery_preferences'
    };
    
  case 'price_check':
    return {
      response: aiResponse,
      priceComparison: true,
      type: 'price_comparison'
    };
    
  default:
    return {
      response: aiResponse,
      type: 'general'
    };
}

function generateHeadphoneData() {
  return [
    {
      id: 'h1',
      name: 'Sennheiser Accentum Wireless Bluetooth Over Ear Headphones',
      price: 12989,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
      store: 'Amazon',
      features: ['Impressive sound', 'Exceptional battery life', 'Noise Cancellation'],
      cons: ['Average mic quality'],
      rating: 4.5,
      bestValue: true
    },
    {
      id: 'h2',
      name: 'Sony WH-CH720N Wireless Noise Canceling Headphones',
      price: 8990,
      image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90',
      store: 'Flipkart',
      features: ['Active Noise Cancellation', '35 Hours Battery', 'Quick Charge'],
      cons: ['Build quality could be better'],
      rating: 4.2
    }
  ];
}
```

### 5. Response Webhook
```json
{
  "responseCode": 200,
  "responseBody": "{{$json}}"
}
```

## 🎨 Design Philosophy

### Superhuman UI Principles
1. **Minimal Cognitive Load**: Clean, focused interfaces
2. **Contextual Intelligence**: UI adapts to user intent
3. **Smooth Interactions**: 60fps animations and transitions
4. **Information Hierarchy**: Clear visual hierarchy with proper spacing
5. **Accessibility**: High contrast, readable fonts, touch-friendly targets

### Color Palette
- **Primary**: `#34D399` (Emerald Green)
- **Background**: `#000000` (Pure Black)
- **Cards**: `#121212` (Dark Gray)
- **Text**: `#FFFFFF` (White)
- **Secondary**: `#8A8A8E` (Light Gray)

### Typography
- **Headers**: 700 weight, 20-32px
- **Body**: 500-600 weight, 14-16px
- **Captions**: 500 weight, 12-14px

## 🚀 Getting Started

1. **Install Dependencies**
```bash
npm install
```

2. **Configure Environment**
```bash
# Add to your environment
EXPO_PUBLIC_RORK_API_BASE_URL=your_api_base_url
```

3. **Set up N8N Webhook**
- Create workflow with provided configuration
- Update webhook URL in `utils/aiService.ts`

4. **Configure ElevenLabs** (Optional)
```javascript
// In utils/voiceService.ts
const ELEVENLABS_API_KEY = 'your_api_key';
const VOICE_ID = 'your_voice_id';
```

5. **Start Development**
```bash
npm start
```

## 📱 Key Features Implementation

### Smart Query Processing
The app intelligently processes different types of queries:
- **Product Comparisons**: Shows detailed comparison cards
- **Grocery Orders**: Displays preference selectors
- **Price Checks**: Shows price comparison tables
- **General Queries**: Provides conversational responses

### Responsive Design
- **Mobile-First**: Optimized for mobile devices
- **Web Compatible**: Works on web with fallbacks
- **Adaptive Layouts**: Adjusts to different screen sizes
- **Touch Optimized**: Large touch targets, smooth scrolling

### Performance Optimizations
- **Lazy Loading**: Components load on demand
- **Optimized Images**: Proper image sizing and caching
- **Smooth Animations**: Hardware-accelerated animations
- **Memory Management**: Proper cleanup and state management

## 🔮 Future Enhancements

1. **Advanced AI Features**
   - Image recognition for product search
   - Personalized recommendations
   - Price prediction algorithms

2. **Enhanced Integrations**
   - Real-time inventory checking
   - Direct store APIs
   - Payment gateway integration

3. **Social Features**
   - Shared wishlists
   - Product reviews and ratings
   - Community recommendations

4. **Analytics**
   - User behavior tracking
   - Purchase pattern analysis
   - Recommendation optimization

## 📱 Overlay Functionality

### System-Level Integration (Advanced)

For overlay functionality over other apps (Amazon, Flipkart, etc.), you would need:

1. **Native Module Development**
   - Custom Android overlay permissions
   - iOS screen recording/sharing capabilities
   - System-level hooks for app detection

2. **Implementation Approach**
   ```javascript
   // This would require custom native modules
   import { OverlayManager } from './native-modules/OverlayManager';
   
   // Detect when user opens shopping apps
   OverlayManager.detectApp(['com.amazon.mShop.android.shopping', 'com.flipkart.android'])
     .then((appInfo) => {
       // Show CorzoAI overlay
       OverlayManager.showOverlay({
         component: 'PriceComparison',
         position: 'bottom',
         data: { currentApp: appInfo.packageName }
       });
     });
   ```

3. **Required Permissions**
   - `SYSTEM_ALERT_WINDOW` (Android)
   - Screen recording permissions (iOS)
   - Accessibility service permissions

4. **Alternative Approaches**
   - Browser extension for web shopping
   - Deep linking integration
   - Share sheet extensions
   - Keyboard extensions

**Note**: This functionality requires significant native development and may face App Store restrictions.

## 📄 License

MIT License - see LICENSE file for details.

---

Built with ❤️ for the future of shopping

## 🔧 Advanced N8N Workflow Suggestions

### 1. Enhanced Query Classification
```javascript
function classifyIntent(query) {
  const intents = {
    product_search: {
      keywords: ['find', 'search', 'show me', 'looking for'],
      confidence: 0.8
    },
    price_comparison: {
      keywords: ['compare', 'price', 'cheapest', 'best deal', 'under'],
      confidence: 0.9
    },
    grocery_order: {
      keywords: ['order', 'buy', 'grocery', 'vegetables', 'onion', 'tomato'],
      confidence: 0.85
    },
    product_details: {
      keywords: ['details', 'specs', 'features', 'review'],
      confidence: 0.7
    }
  };
  
  let bestMatch = { intent: 'general', confidence: 0 };
  
  for (const [intent, config] of Object.entries(intents)) {
    const matches = config.keywords.filter(keyword => 
      query.toLowerCase().includes(keyword)
    ).length;
    
    const confidence = (matches / config.keywords.length) * config.confidence;
    
    if (confidence > bestMatch.confidence) {
      bestMatch = { intent, confidence };
    }
  }
  
  return bestMatch;
}
```

### 2. Dynamic Product Database Integration
```javascript
// Connect to real-time product APIs
const productSources = {
  amazon: 'https://api.amazon.com/products',
  flipkart: 'https://api.flipkart.com/search',
  myntra: 'https://api.myntra.com/products'
};

async function fetchRealTimeProducts(query, budget) {
  const results = await Promise.all(
    Object.entries(productSources).map(async ([store, api]) => {
      try {
        const response = await fetch(`${api}?q=${query}&budget=${budget}`);
        return { store, products: await response.json() };
      } catch (error) {
        return { store, products: [], error: error.message };
      }
    })
  );
  
  return results;
}
```

### 3. Personalization Engine
```javascript
// User preference learning
function updateUserPreferences(userId, interaction) {
  const preferences = getUserPreferences(userId);
  
  // Update based on user behavior
  if (interaction.type === 'product_view') {
    preferences.categories[interaction.category] = 
      (preferences.categories[interaction.category] || 0) + 1;
  }
  
  if (interaction.type === 'price_range') {
    preferences.budgetRange = {
      min: Math.min(preferences.budgetRange.min, interaction.price),
      max: Math.max(preferences.budgetRange.max, interaction.price)
    };
  }
  
  saveUserPreferences(userId, preferences);
}
```

### 4. Smart Response Generation
```javascript
function generateContextualResponse(query, userHistory, products) {
  const context = {
    previousQueries: userHistory.slice(-5),
    preferredStores: userHistory.getPreferredStores(),
    budgetRange: userHistory.getAverageBudget(),
    categories: userHistory.getTopCategories()
  };
  
  // Generate personalized response
  if (products.length > 0) {
    return {
      response: generateProductResponse(products, context),
      type: 'product_comparison',
      products: products,
      personalization: {
        recommendedStore: context.preferredStores[0],
        budgetFit: calculateBudgetFit(products, context.budgetRange),
        categoryMatch: calculateCategoryMatch(products, context.categories)
      }
    };
  }
  
  return {
    response: generateFallbackResponse(query, context),
    type: 'general'
  };
}
```

This creates a truly intelligent shopping assistant that learns from user behavior and provides increasingly personalized recommendations.