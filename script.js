const cryptoSymbols = ['bitcoin', 'ethereum', 'dogecoin'];
const platforms = ['apeswap', 'uniswap', 'atomicswap'];

function fetchCryptoPrices() {
    for (const platform of platforms) {
        const platformPricesDiv = document.getElementById(`${platform}-prices`);
        platformPricesDiv.innerHTML = `<p>Loading...</p>`;

        for (const symbol of cryptoSymbols) {
            fetchPrice(platform, symbol)
                .then(price => {
                    platformPricesDiv.innerHTML += `<p>${symbol.toUpperCase()}: $${price}</p>`;
                })
                .catch(error => {
                    console.error(`Error fetching ${symbol} price on ${platform}: ${error}`);
                    platformPricesDiv.innerHTML += `<p>Error fetching ${symbol} price</p>`;
                });
        }
    }
}

async function fetchPrice(platform, symbol) {
    try {
        const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${symbol}&vs_currencies=usd&contract_addresses=${getContractAddress(platform)}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        const price = data[symbol].usd;
        return price;
    } catch (error) {
        throw error;
    }
}

function getContractAddress(platform) {
    switch (platform) {
        case 'apeswap':
            return '0x603c7f932ed1fc6575303d8fb018fdcbb0f39a95'; // ApeSwap contract address
        case 'uniswap':
            return '0x2b4aee6b95db1094a3f1b1e682fa60a6516f60f0'; // UniSwap contract address
        case 'atomicswap':
            return '0x603c7f932ed1fc6575303d8fb018fdcbb0f39a95'; // Replace with AtomicSwap contract address
        default:
            return '';
    }
}

// Fetch prices on page load
fetchCryptoPrices();
