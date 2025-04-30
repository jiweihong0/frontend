"use client";

import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ReloadIcon } from "@radix-ui/react-icons";

interface Message {
  role: "user" | "assistant" | "tool";
  content: string;
  toolId?: string;
}

interface ApiMessageContent {
  type: string;
  text: string;
}

interface ApiMessage {
  role: string;
  content: ApiMessageContent[];
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
  content: ApiMessageContent[];
  tool_use_id: string;
}

interface ApiResponse {
  content?: string;
  messages?: ApiMessage[];
  tool_calls?: ToolCall[];
  tool_results?: ToolResult[];
  error?: string;
  details?: string;
}

interface ApiStatus {
  isAvailable: boolean;
  message: string;
  isChecking: boolean;
}

// 定義API請求體類型
interface ApiRequestBody {
  prompt: string;
  message: ApiMessage[];
  tool_calls?: ToolCall[];
  tool_results?: ToolResult[];
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [apiMessages, setApiMessages] = useState<ApiMessage[]>([]);
  const [toolCalls, setToolCalls] = useState<ToolCall[]>([]);
  const [toolResults, setToolResults] = useState<ToolResult[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiStatus, setApiStatus] = useState<ApiStatus>({
    isAvailable: true,
    message: "",
    isChecking: true
  });

  // Check API availability function
  const checkApiStatus = useCallback(async () => {
    try {
      setApiStatus(prev => ({ ...prev, isChecking: true }));
      
      // Use a simple timeout promise instead of AbortController
      const fetchWithTimeout = async () => {
        const timeoutPromise = new Promise((_, reject) => {
          // Increase timeout to 10 seconds
          setTimeout(() => reject(new Error("Timeout")), 10000);
        });
        
        return Promise.race([
          fetch("/api/chat", { method: "HEAD" }),
          timeoutPromise
        ]);
      };
      
      await fetchWithTimeout();
      setApiStatus({ isAvailable: true, message: "", isChecking: false });
    } catch (error) {
      console.error("Error checking API status:", error);
      setApiStatus({
        isAvailable: false,
        message: "後端服務回應緩慢或目前無法連接。您可以繼續嘗試，或稍後重試。",
        isChecking: false
      });
    }
  }, []);

  // Check API availability on component mount
  useEffect(() => {
    checkApiStatus();
  }, [checkApiStatus]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message to the chat UI
    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    
    // Create API format user message
    const apiUserMessage: ApiMessage = {
      role: "user",
      content: [{ type: "text", text: input }]
    };
    
    // Add to API messages history
    const updatedApiMessages = [...apiMessages, apiUserMessage];
    setApiMessages(updatedApiMessages);
    
    // Clear input field
    setInput("");
    
    // Set loading state
    setIsLoading(true);
    
    try {
      // 準備完整的請求包含訊息歷史、工具調用和工具結果
      const requestBody: ApiRequestBody = {
        prompt: input,
        message: updatedApiMessages
      };
      
      // 如果有工具調用和結果，也包含在請求中
      if (toolCalls.length > 0) {
        requestBody.tool_calls = toolCalls;
      }
      
      if (toolResults.length > 0) {
        requestBody.tool_results = toolResults;
      }
      
      console.log("Sending request to API:", JSON.stringify(requestBody, null, 2));
      
      // Use a timeout promise with Promise.race instead of AbortController
      const fetchWithTimeout = async () => {
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error("Request timed out")), 30000);
        });
        
        const fetchPromise = fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });
        
        return Promise.race([fetchPromise, timeoutPromise]);
      };
      
      const response = await fetchWithTimeout() as Response;
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const responseData: ApiResponse = await response.json();
      console.log("API response:", responseData);
      
      // Handle the API response
      if (responseData.error) {
        throw new Error(responseData.error);
      }
      
      // 準備要更新的消息列表
      const updatedUIMessages = [...messages, userMessage];
      
      // Extract model response from either content field or messages
      let modelContent = "";
      
      if (responseData.content) {
        modelContent = responseData.content;
      } else if (responseData.messages) {
        // Find the last model message
        const modelMessages = responseData.messages.filter(msg => msg.role === "model");
        if (modelMessages.length > 0) {
          const lastModelMessage = modelMessages[modelMessages.length - 1];
          modelContent = lastModelMessage.content
            .filter(item => item.type === "text")
            .map(item => item.text)
            .join("\n");
        }
      }
      
      if (modelContent) {
        // Add assistant message to the chat UI
        const assistantMessage: Message = {
          role: "assistant",
          content: modelContent
        };
        updatedUIMessages.push(assistantMessage);
      }
      
      // 處理並更新工具調用和結果
      let newToolCalls = [...toolCalls];
      let newToolResults = [...toolResults];
      
      // 處理工具調用
      if (responseData.tool_calls && responseData.tool_calls.length > 0) {
        // 更新工具調用狀態
        newToolCalls = responseData.tool_calls;
        setToolCalls(newToolCalls);
        
        // 添加到UI
        responseData.tool_calls.forEach(toolCall => {
          // 添加工具呼叫信息到聊天界面
          const toolCallMessage: Message = {
            role: "assistant",
            content: `執行工具: ${toolCall.name}\n參數: ${JSON.stringify(toolCall.arguments, null, 2)}`,
            toolId: toolCall.id
          };
          updatedUIMessages.push(toolCallMessage);
        });
      }
      
      // 處理工具結果
      if (responseData.tool_results && responseData.tool_results.length > 0) {
        // 更新工具結果狀態
        newToolResults = responseData.tool_results;
        setToolResults(newToolResults);
        
        // 添加到UI
        responseData.tool_results.forEach(result => {
          // 獲取工具結果文本
          const resultText = result.content
            .filter(item => item.type === "text")
            .map(item => item.text)
            .join("\n");
          
          if (resultText.trim()) {
            const toolResultMessage: Message = {
              role: "tool",
              content: resultText,
              toolId: result.tool_use_id
            };
            updatedUIMessages.push(toolResultMessage);
          }
        });
      }
      
      // 更新 UI 消息
      setMessages(updatedUIMessages);
      
      // Update the API messages history with the complete message history from the response
      if (responseData.messages) {
        setApiMessages(responseData.messages);
      } else {
        // 構建更新的 API 消息數組
        const newApiMessages = [...updatedApiMessages];
        
        // 添加模型回應（如果有）
        if (responseData.content) {
          const apiModelMessage: ApiMessage = {
            role: "model",
            content: [{ type: "text", text: responseData.content }]
          };
          newApiMessages.push(apiModelMessage);
        }
        
        setApiMessages(newApiMessages);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      
      let errorMessage = "Sorry, there was an error processing your request.";
      
      if (error instanceof Error) {
        if (error.message === "Request timed out") {
          errorMessage = "Request timed out. Please try again or check if the server is running.";
        } else {
          errorMessage = `Error: ${error.message}`;
        }
      }
      
      // Add error message to chat
      const assistantErrorMessage: Message = {
        role: "assistant",
        content: errorMessage
      };
      setMessages((prev) => [...prev, assistantErrorMessage]);
      
      // Update API status if it's a connection error
      if (error instanceof TypeError && error.message.includes("Failed to fetch")) {
        setApiStatus({
          isAvailable: false,
          message: "Cannot connect to API. Please check if the server is running.",
          isChecking: false
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl p-4">
      <Card className="h-[80vh] flex flex-col">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Chat with AI Assistant</CardTitle>
            
            {!apiStatus.isAvailable && (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => checkApiStatus()}
                disabled={apiStatus.isChecking}
              >
                {apiStatus.isChecking ? (
                  <>
                    <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                    檢查中...
                  </>
                ) : (
                  <>
                    <ReloadIcon className="mr-2 h-4 w-4" />
                    重試連接
                  </>
                )}
              </Button>
            )}
          </div>
          
          {!apiStatus.isAvailable && (
            <div className="text-amber-500 text-sm font-medium mt-1">
              {apiStatus.message}
            </div>
          )}
        </CardHeader>
        
        <CardContent className="flex-grow overflow-y-auto">
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="text-center text-muted-foreground py-12">
                Send a message to start the conversation
              </div>
            ) : (
              messages.map((message, index) => (
                <div 
                  key={index} 
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[80%] rounded-lg p-4 ${
                    message.role === "user" 
                      ? "bg-primary text-primary-foreground" 
                      : message.role === "tool"
                        ? "bg-green-100 text-green-800 border border-green-300"
                        : "bg-muted"
                  }`}>
                    {message.toolId && (
                      <div className="text-xs text-slate-500 mb-1">
                        {message.role === "tool" ? "工具結果" : "工具調用"}: {message.toolId}
                      </div>
                    )}
                    <div className="whitespace-pre-wrap">{message.content}</div>
                  </div>
                </div>
              ))
            )}

            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg p-4 bg-muted">
                  <div className="flex space-x-2">
                    <div className="h-2 w-2 bg-current rounded-full animate-bounce" />
                    <div className="h-2 w-2 bg-current rounded-full animate-bounce delay-100" />
                    <div className="h-2 w-2 bg-current rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
        
        <CardFooter className="border-t p-4">
          <div className="flex w-full items-center space-x-2">
            <Textarea
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              disabled={isLoading}
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={isLoading || !input.trim()}
            >
              {isLoading ? 
                <ReloadIcon className="h-4 w-4 animate-spin" /> : 
                "Send"
              }
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
} 