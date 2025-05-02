import { Message } from '../types';

// WebSocket message format as specified in the API docs
interface WebSocketMessage {
  type: 'chat_message';
  message: string;
}

// Incoming message format from the server
interface ServerMessage {
  id: number;
  message: string;
  sender: number;
  receiver: number;
  sent_time: string;
}

export class WebSocketService {
  private ws: WebSocket | null = null;
  private messageHandlers: ((message: ServerMessage) => void)[] = [];
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 3;
  private reconnectTimeout: NodeJS.Timeout | null = null;
  private isConnecting = false;
  private currentRoom: string | null = null;

  /**
   * Connects to the WebSocket Chat API
   * @param roomName - The room name to connect to
   * @param token - JWT token for authentication
   * @returns Promise that resolves when connection is established
   */
  async connect(roomName: string, token: string): Promise<void> {
    if (this.isConnecting) return;
    this.isConnecting = true;

    try {
      // Disconnect existing connection if any
      this.disconnect();

      // Create new WebSocket connection
      const wsUrl = `ws://localhost:8001/ws/chat/${roomName}/?token=${encodeURIComponent(token)}`;
      this.ws = new WebSocket(wsUrl);
      this.currentRoom = roomName;

      return new Promise((resolve, reject) => {
        if (!this.ws) {
          reject(new Error('Failed to create WebSocket connection'));
          return;
        }

        this.ws.onopen = () => {
          console.log('WebSocket Connected to room:', roomName);
          this.isConnecting = false;
          this.reconnectAttempts = 0;
          resolve();
        };

        this.ws.onerror = (error) => {
          console.error('WebSocket Error:', error);
          this.isConnecting = false;
          reject(error);
        };

        this.ws.onclose = (event) => {
          console.log('WebSocket Disconnected:', event.code, event.reason);
          this.isConnecting = false;
          
          // Only attempt reconnect if this is still the current room
          if (this.currentRoom === roomName) {
            this.handleDisconnect(roomName, token);
          }
        };

        this.ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data) as ServerMessage;
            this.messageHandlers.forEach(handler => handler(data));
          } catch (error) {
            console.error('Error parsing WebSocket message:', error);
          }
        };
      });
    } catch (error) {
      this.isConnecting = false;
      throw error;
    }
  }

  private handleDisconnect(roomName: string, token: string) {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 10000);
      
      if (this.reconnectTimeout) {
        clearTimeout(this.reconnectTimeout);
      }

      this.reconnectTimeout = setTimeout(async () => {
        console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
        try {
          await this.connect(roomName, token);
        } catch (error) {
          console.error('Reconnection failed:', error);
        }
      }, delay);
    }
  }

  /**
   * Disconnects from WebSocket server and cleans up resources
   */
  disconnect(): void {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }

    if (this.ws) {
      // Only close if the connection is still open
      if (this.ws.readyState === WebSocket.OPEN) {
        this.ws.close(1000, 'Normal closure');
      }
      this.ws = null;
    }

    this.reconnectAttempts = 0;
    this.isConnecting = false;
    this.currentRoom = null;
  }

  /**
   * Sends a message to the WebSocket server
   * @param message - The message content to send
   */
  sendMessage(message: string) {
    if (!this.isConnected()) {
      throw new Error('WebSocket is not connected');
    }

    try {
      const messageData: WebSocketMessage = {
        type: 'chat_message',
        message
      };
      this.ws?.send(JSON.stringify(messageData));
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }

  /**
   * Registers a handler for incoming messages
   * @param handler - Function to call when a message is received
   * @returns Function to unregister the handler
   */
  onMessage(handler: (message: ServerMessage) => void): () => void {
    this.messageHandlers.push(handler);
    return () => {
      this.messageHandlers = this.messageHandlers.filter(h => h !== handler);
    };
  }

  /**
   * Checks if the WebSocket connection is open
   * @returns True if the connection is open, false otherwise
   */
  isConnected(): boolean {
    return this.ws?.readyState === WebSocket.OPEN;
  }
}
