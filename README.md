# CorzoAI Shopping Assistant

A sophisticated AI-powered shopping assistant that helps users find the best products at the best prices across multiple stores.

## Features

- AI-powered shopping assistant with natural language understanding
- Voice input and text-to-speech capabilities
- Product comparisons and price tracking
- Grocery ordering with customizable preferences
- Integration with n8n for enhanced AI capabilities

## n8n Workflow Setup Guide

To set up the n8n workflow for CorzoAI:

1. Create a new workflow in n8n
2. Add an HTTP Trigger node:
   - Method: GET
   - Path: /corzoai-ultimate
   - Response Mode: Last Node

3. Add a Function node to parse the query:
   ```javascript
   const message = $input.params.message;
   if (!message) {
     return { error: "No message provided" };
   }
   
   // Decode the URL-encoded message
   const decodedMessage = decodeURIComponent(message);
   
   return {
     query: decodedMessage,
     timestamp: new Date().toISOString()
   };
   ```

4. Add an OpenAI node:
   - Operation: Chat Completion
   - Model: gpt-4
   - Messages: 
     ```
     [
       {
         "role": "system",
         "content": "You are CorzoAI, a sophisticated shopping assistant that helps users find the best products at the best prices. You have deep knowledge of product comparisons, price trends, and shopping recommendations. Keep responses concise and focused on helping users make informed shopping decisions."
       },
       {
         "role": "user",
         "content": "{{$node[\"Function\"].json[\"query\"]}}"
       }
     ]
     ```

5. Add a Function node to process the response:
   ```javascript
   const query = $input.first().query.toLowerCase();
   const aiResponse = $input.last().text;
   
   // Check if the query is about product comparison
   if (query.includes('compare') || query.includes('headphone') || query.includes('price')) {
     // For headphone comparison example
     if (query.includes('headphone')) {
       return {
         response: aiResponse,
         products: [
           {
             id: 'h1',
             name: 'JBL Tune 510BT Wireless On-Ear Headphones',
             price: 3499,
             image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
             store: 'Amazon',
             storeLogo: 'https://images.unsplash.com/photo-1523474253046-8cd2748b5fd2',
             features: [
               'Up to 40 Hours Battery Life',
               'Pure Bass Sound',
               'Multi-Point Connection',
               'Voice Assistant Compatible'
             ],
             rating: 4.3,
             bestValue: true
           },
           {
             id: 'h2',
             name: 'boAt Rockerz 450 Bluetooth On-Ear Headphones',
             price: 1999,
             image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90',
             store: 'Flipkart',
             storeLogo: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da',
             features: [
               'Up to 15 Hours Playback',
               'Padded Ear Cushions',
               'Integrated Controls',
               'Foldable Design'
             ],
             rating: 4.1
           },
           {
             id: 'h3',
             name: 'Noise Buds VS104 Truly Wireless Earbuds',
             price: 1299,
             image: 'https://images.unsplash.com/photo-1606400082777-ef05f3c5cde2',
             store: 'Myntra',
             storeLogo: 'https://images.unsplash.com/photo-1560243563-062bfc001d68',
             features: [
               'Up to 30 Hours Playtime',
               'Environmental Noise Cancellation',
               'Low Latency Gaming Mode',
               'IPX5 Water Resistance'
             ],
             rating: 4.0
           }
         ]
       };
     }
     
     // For grocery comparison
     if (query.includes('grocery') || query.includes('onion') || query.includes('tomato')) {
       return {
         response: aiResponse,
         groceryItems: true,
         preferences: {
           onion: ['250 g', '500 g', '1 kg', '2 kg'],
           garlic: ['100 g', '200 g', '500 g'],
           tomato: ['250 g', '500 g', '1 kg', '2 kg']
         }
       };
     }
   }
   
   // Default response
   return {
     response: aiResponse
   };
   ```

6. Add a Respond to Webhook node:
   - Response Code: 200
   - Response Body: JSON

7. Connect the nodes in sequence:
   HTTP Trigger → Function (Parse) → OpenAI → Function (Process) → Respond to Webhook

8. Save and activate the workflow

This workflow will process incoming queries, generate AI responses, and provide structured data for product comparisons when relevant.