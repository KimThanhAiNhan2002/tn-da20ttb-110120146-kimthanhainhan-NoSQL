const WebSocketClient = () => {
    const socket = new WebSocket('ws://localhost:3000/ws');
  
    socket.onopen = () => {
      console.log('WebSocket connection opened');
    };
  
    socket.onmessage = (event) => {
      console.log('WebSocket message received:', event.data);
    };
  
    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };
  
    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  };
  
  export default WebSocketClient;
  