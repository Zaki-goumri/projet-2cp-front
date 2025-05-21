// websocket.service.ts
import { Message } from '../types';

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
  // Singleton instance
  private static instance: WebSocketService | null = null;

  private ws: WebSocket | null = null;
  private messageHandlers: ((message: ServerMessage) => void)[] = [];
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 3;
  private reconnectTimeout: NodeJS.Timeout | null = null;
  private isConnecting = false;
  private currentRoom: string | null = null;
  private token: string | null = null;

  // Private constructor to prevent direct instantiation
  private constructor() {
    console.log('WebSocketService instance created');
  }

  /**
   * Get the singleton instance of WebSocketService
   */
  public static getInstance(): WebSocketService {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  /**
   * Connects to the WebSocket Chat API
   * @param roomName - The room name to connect to
   * @param token - JWT token for authentication
   * @returns Promise that resolves when connection is established
   */
  async connect(roomName: string, token: string): Promise<void> {
    // If already connected to this room, don't reconnect
    if (this.isConnected() && this.currentRoom === roomName) {
      console.log('Already connected to room:', roomName);
      return Promise.resolve();
    }

    if (this.isConnecting) {
      console.log('Connection already in progress');
      return Promise.resolve();
    }

    this.isConnecting = true;
    this.token = token;

    try {
      // Disconnect existing connection if connecting to a different room
      if (this.currentRoom !== roomName && this.ws) {
        console.log(`Switching from room ${this.currentRoom} to ${roomName}`);
        this.disconnect();
      }

      // Create new WebSocket connection
      const wsUrl = `ws://localhost:8001/chat/${roomName}/?token=${encodeURIComponent(token)}`;
      console.log(`Creating new WebSocket connection to ${roomName}`);
      this.ws = new WebSocket(wsUrl);
      this.currentRoom = roomName;

      return new Promise((resolve, reject) => {
        if (!this.ws) {
          this.isConnecting = false;
          reject(new Error('Failed to create WebSocket connection'));
          return;
        }

        this.ws.onopen = () => {
          console.log(
            `WebSocket OPENED to room: ${roomName} at ${new Date().toISOString()}`
          );
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
          console.log(
            `WebSocket CLOSED for room: ${roomName}, Code: ${event.code}, Reason: ${event.reason}, Time: ${new Date().toISOString()}`
          );
          this.isConnecting = false;
          if (this.currentRoom === roomName) {
            this.handleDisconnect(roomName, token);
          }
        };

        this.ws.onmessage = (event) => {
          try {
            // Fixed: Parse the event.data property instead of the event object
            const data = JSON.parse(event.data);
            // Ensure we're accessing the right structure based on your server's response format
            const messageData = data.data || data;
            console.log('Received message:', messageData);
            this.messageHandlers.forEach((handler) => handler(messageData));
          } catch (error) {
            console.error(
              'Error parsing WebSocket message:',
              error,
              event.data
            );
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
        console.log(
          `Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`
        );
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
      console.log(`Disconnecting WebSocket for room: ${this.currentRoom}`);
      if (
        this.ws.readyState === WebSocket.OPEN ||
        this.ws.readyState === WebSocket.CONNECTING
      ) {
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
  sendMessage(message: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      try {
        // Check if connected, reconnect if needed
        if (!this.isConnected()) {
          if (!this.currentRoom || !this.token) {
            reject(
              new Error(
                'Cannot send message: No active connection and missing connection details'
              )
            );
            return;
          }

          console.log(
            'Connection lost, reconnecting before sending message...'
          );
          try {
            await this.connect(this.currentRoom, this.token);
          } catch (error) {
            reject(new Error(`Failed to reconnect: ${error}`));
            return;
          }
        }

        // Now send the message
        const messageData: WebSocketMessage = {
          type: 'chat_message',
          message,
        };

        console.log(`Sending message to room: ${this.currentRoom}`);
        this.ws?.send(JSON.stringify(messageData));
        resolve();
      } catch (error) {
        console.error('Error sending message:', error);
        reject(error);
      }
    });
  }

  /**
   * Registers a handler for incoming messages
   * @param handler - Function to call when a message is received
   * @returns Function to unregister the handler
   */
  onMessage(handler: (message: ServerMessage) => void): () => void {
    this.messageHandlers.push(handler);
    return () => {
      this.messageHandlers = this.messageHandlers.filter((h) => h !== handler);
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
