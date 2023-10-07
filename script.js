// Connect to the WebSocket server
const socket = new WebSocket('wss://stream.coingecko.com/v2/coins');

// Define the currencies and exchanges you want to track
const currencies = ['bitcoin', 'ethereum', 'solana'];
const exchanges = ['dydx', 'uniswap', '1inch'];

// Listen for messages from the WebSocket server
socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    
    // Update the table with real-time prices
    currencies.forEach((currency) => {
        exchanges.forEach((exchange) => {
            const rowId = `${currency}-${exchange}`;
            const row = document.getElementById(rowId);
            
            if (row) {
                const price = data[`${currency}-${exchange}`].usd;
                row.cells[2].textContent = price.toFixed(2);
            }
        });
    });
};

// Handle WebSocket connection errors
socket.onerror = (error) => {
    console.error('WebSocket error:', error);
};

// Handle WebSocket connection closure
socket.onclose = (event) => {
    if (event.wasClean) {
        console.log('WebSocket connection closed cleanly, code=' + event.code + ', reason=' + event.reason);
    } else {
        console.error('WebSocket connection abruptly closed');
    }
};
