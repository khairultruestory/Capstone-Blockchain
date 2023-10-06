const cryptoSymbols = ['bitcoin', 'ethereum', 'dogecoin'];
const platforms = ['apeswap', 'uniswap', 'quickswap_polygon'];

function fetchCryptoPrices() {
    for (const platform of platforms) {
        const platformPricesDiv = document.getElementById(`${platform}-prices`);
        
        // Show a loading message initially
        platformPricesDiv.innerHTML = `<p>Loading...</p>`;
        
        // Fetch and update prices every second
        setInterval(async () => {
            platformPricesDiv.innerHTML = ''; // Clear previous prices

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
        }, 3000); // Refresh every 1000 milliseconds (1 second)
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
        case 'quickswap_polygon':
            return '0xb5c064f955d8e7f38fe0460c556a72987494ee17'; // quickSwap-polygon contract address
        default:
            return '';
    }
}

// Fetch prices on page load
fetchCryptoPrices();
