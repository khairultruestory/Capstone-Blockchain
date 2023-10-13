// Connect to the CoinGecko WebSocket API
const socket = new WebSocket('wss://stream.coingecko.com/')

// Define the message to subscribe to the required cryptocurrencies
const subscriptionMessage = {
    type: 'subscribe',
    channels: [
        {
            name: 'ticker',
            product_ids: ['bitcoin', 'ethereum', 'solana', 'dydx', 'uniswap', '1inch']
        }
    ]
}

socket.onopen = () => {
    socket.send(JSON.stringify(subscriptionMessage))
}

socket.onmessage = (event) => {
    const data = JSON.parse(event.data)
    if (data.type === 'ticker') {
        const { product_id, price } = data.data
        const [crypto, base] = product_id.split('-')
        const cellId = `${crypto.toLowerCase()}-${base.toLowerCase()}-price`
        document.getElementById(cellId).textContent = price
    }
}
