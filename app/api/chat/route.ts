import { NextRequest, NextResponse } from 'next/server';

interface MessageContent {
  type: string;
  text: string;
}

interface ChatMessage {
  role: string;
  content: MessageContent[];
}

interface ToolArguments {
  [key: string]: string | number | boolean | null;
}

interface ToolCall {
  arguments: ToolArguments;
  id: string;
  name: string;
}

interface ToolResult {
  content: MessageContent[];
  tool_use_id: string;
}

interface ApiPayload {
  prompt: string;
  message: ChatMessage[];
  tool_calls?: ToolCall[];
  tool_results?: ToolResult[];
}

// Support for HEAD requests for API status checking
export async function HEAD() {
  // Just return 200 to indicate the API route is available
  return new NextResponse(null, { status: 200 });
}

// 輔助函數：添加延遲
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// 輔助函數：帶重試邏輯的fetch
async function fetchWithRetry(url: string, options: RequestInit, maxRetries = 3): Promise<Response> {
  let lastError: Error | null = null;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      // 確保headers存在並添加Connection: keep-alive
      const headers = {
        'Content-Type': 'application/json',
        'Connection': 'keep-alive',
        ...(options.headers || {})
      };
      
      const response = await fetch(url, {
        ...options,
        headers
      });
      
      // 如果不是503錯誤或模型過載錯誤，直接返回
      if (response.status !== 503) {
        return response;
      }
      
      // 檢查是否是模型過載錯誤
      const responseText = await response.text();
      if (!responseText.includes('model is overloaded')) {
        // 如果不是模型過載，創建新的Response並返回
        return new Response(responseText, {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers
        });
      }
      
      console.log(`模型過載，第 ${attempt + 1} 次重試中...`);
      
      // 等待時間隨著嘗試次數指數增加 (1秒、2秒、4秒...)
      const waitTime = Math.pow(2, attempt) * 1000;
      await delay(waitTime);
      
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.error(`第 ${attempt + 1} 次請求失敗:`, lastError);
      
      // 等待時間隨著嘗試次數指數增加
      const waitTime = Math.pow(2, attempt) * 1000;
      await delay(waitTime);
    }
  }
  
  // 如果所有重試都失敗，拋出最後一個錯誤
  throw lastError || new Error('所有重試請求均失敗');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('==== REQUEST FROM FRONTEND ====');
    console.log(JSON.stringify(body, null, 2));
    
    // Extract the user's input
    let userInput = "";
    
    // Try to get the input from different possible formats
    if (body.prompt) {
      // If there's a direct prompt field
      userInput = body.prompt;
    } else if (body.messages && body.messages.length > 0) {
      // Try to find the latest user message
      const userMessages = body.messages.filter(
        (msg: ChatMessage) => msg.role === "user" && msg.content && msg.content.length > 0
      );
      
      if (userMessages.length > 0) {
        const latestUserMsg = userMessages[userMessages.length - 1];
        userInput = latestUserMsg.content[0].text || "";
      }
    }
    
    if (!userInput) {
      return NextResponse.json(
        { error: "No user input found in the request" },
        { status: 400 }
      );
    }
    
    console.log('Extracted user input:', userInput);
    
    // 構建API請求
    const payload: ApiPayload = {
      prompt: userInput,
      message: body.message || [] // Use provided message history or empty array
    };
    
    // 如果有工具調用和結果，也轉發這些信息
    if (body.tool_calls && body.tool_calls.length > 0) {
      payload.tool_calls = body.tool_calls;
    }
    
    if (body.tool_results && body.tool_results.length > 0) {
      payload.tool_results = body.tool_results;
    }
    
    console.log('==== SENDING REQUEST TO BACKEND ====');
    console.log(JSON.stringify(payload, null, 2));
    
    // 使用帶重試邏輯的fetch替代原來的fetch
    const response = await fetchWithRetry('http://localhost:8081/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    
    console.log('Backend response status:', response.status);
    
    // Read the response as text for logging
    const responseText = await response.text();
    console.log('==== RESPONSE FROM BACKEND ====');
    console.log(responseText);
    
    // 先檢查回應是否成功
    if (!response.ok) {
      // 如果回應包含錯誤訊息，則返回錯誤訊息
      if (responseText.includes('Error')) {
        // 嘗試提取錯誤訊息的第一行
        const errorMessage = responseText.split('\n')[0];
        console.log('Extracted error message:', errorMessage);
        
        return NextResponse.json(
          { 
            error: errorMessage,
            content: `Error: ${errorMessage}. Please try again later.`
          },
          { status: response.status }
        );
      }
      
      return NextResponse.json(
        { 
          error: `Backend API responded with status: ${response.status}`,
          content: `Error: Backend server responded with status ${response.status}. Please try again later.`
        },
        { status: response.status }
      );
    }
    
    // 檢查回應是否為有效JSON
    if (responseText && responseText.trim()) {
      try {
        // Try to parse as JSON
        const responseData = JSON.parse(responseText);
        
        // Log the full structured response for debugging
        console.log('Parsed response:', JSON.stringify(responseData, null, 2));
        
        // Keep all original fields in the response
        return NextResponse.json(responseData);
      } catch (error) {
        console.error('Error parsing JSON:', error);
        
        // 如果無法解析為JSON，但回應成功，則將文本包裝為有效回應
        return NextResponse.json({
          content: responseText,
          messages: [
            {
              role: "model",
              content: [{ type: "text", text: responseText }]
            }
          ]
        });
      }
    } else {
      return NextResponse.json(
        { 
          content: "Received empty response from the backend server.",
          messages: [
            {
              role: "model",
              content: [{ type: "text", text: "Received empty response from the backend server." }]
            }
          ]
        }
      );
    }
  } catch (error) {
    console.error('Error in chat API route:', error);
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to process request',
        content: `Error: ${error instanceof Error ? error.message : 'An unknown error occurred'}. Please try again.`
      },
      { status: 500 }
    );
  }
} 