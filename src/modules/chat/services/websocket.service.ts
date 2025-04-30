import { Message } from '../types';

// WebSocket message format as specified in the API docs
interface WebSocketMessage {
  type: 'chat_message';
  message: string;
}

// Incoming message format
interface ChatMessage {
  message: string;
  timestamp: string;
  sender: number;
}

export class WebSocketService {
  private ws: WebSocket | null = null;
  private messageHandlers: ((message: ChatMessage) => void)[] = [];
  private broadcastChannel: BroadcastChannel | null = null;
  private currentRoom: string | null = null;

  /**
   * Connects to the WebSocket Chat API
   * @param roomName - The room name to connect to
   * @param token - JWT token for authentication
   * @returns Promise that resolves when connection is established
   */
  connect = (roomName: string, token: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      try {
        // Set up broadcast channel for cross-tab communication
        this.currentRoom = roomName;
        this.broadcastChannel = new BroadcastChannel(`chat-${roomName}`);
        
        // Listen for messages from other tabs
        this.broadcastChannel.onmessage = (event) => {
          const data = event.data as ChatMessage;
          this.messageHandlers.forEach((handler) => handler(data));
        };

        // Connect URL: ws://localhost:8001/ws/chat/<room_name>/?token=<your_jwt_token>
        this.ws = new WebSocket(
          `ws://localhost:8001/ws/chat/${roomName}/?token=${token}`
        );

        this.ws.onopen = () => {
          console.log('WebSocket Connected to room:', roomName);
          resolve();
        };

        this.ws.onerror = (error: Event) => {
          console.error('WebSocket Error:', error);
          reject(error);
        };

        this.ws.onmessage = (event: MessageEvent) => {
          try {
            const data = JSON.parse(event.data) as ChatMessage;
            // Broadcast the message to other tabs
            if (this.broadcastChannel) {
              this.broadcastChannel.postMessage(data);
            }
            // Handle the message in current tab
            this.messageHandlers.forEach((handler) => handler(data));
          } catch (error) {
            console.error('Error parsing WebSocket message:', error);
          }
        };

        this.ws.onclose = () => {
          console.log('WebSocket Disconnected');
          this.cleanup();
        };
      } catch (error) {
        console.error('WebSocket Connection Error:', error);
        reject(error);
      }
    });
  };

  /**
   * Disconnects from WebSocket server and cleans up resources
   */
  disconnect = (): void => {
    this.cleanup();
  };

  private cleanup = (): void => {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    if (this.broadcastChannel) {
      this.broadcastChannel.close();
      this.broadcastChannel = null;
    }
    this.currentRoom = null;
    this.messageHandlers = [];
  };

  /**
   * Sends a message to the WebSocket server
   * @param message - The message content to send
   */
  sendMessage = (message: string): void => {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      const messageData: WebSocketMessage = {
        type: 'chat_message',
        message,
      };
      this.ws.send(JSON.stringify(messageData));
    } else {
      console.error('WebSocket is not connected');
    }
  };

  /**
   * Registers a handler for incoming messages
   * @param handler - Function to call when a message is received
   * @returns Function to unregister the handler
   */
  onMessage = (handler: (message: ChatMessage) => void): (() => void) => {
    this.messageHandlers.push(handler);
    return () => {
      this.messageHandlers = this.messageHandlers.filter((h) => h !== handler);
    };
  };

  /**
   * Checks if the WebSocket connection is open
   * @returns True if the connection is open, false otherwise
   */
  isConnected = (): boolean => {
    return this.ws !== null && this.ws.readyState === WebSocket.OPEN;
  };
}
