const cryptoSymbols = ['bitcoin'];
const platforms = ['1inch', 'mdx', 'bakeryswap','mcdex','burgerswap','paraswap'];



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
        
        case '1inch':
            return '0x111111111117dC0aa78b770fA6A738034120C302'; // ApeSwap contract address
        case 'mdx':
            return '0x9C65AB58d8d978DB963e63f2bfB7121627e3a739'; // UniSwap contract address
        case 'bakeryswap':
            return '0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5';
        case 'mcdex':
            return '0x5fE80d2CD054645b9419657d3d10d26391780A7B';
        case 'burgerswap':
            return '0xAe9269f27437f0fcBC232d39Ec814844a51d6b8f';
        case 'paraswap':
            return '0xcAfE001067cDEF266AfB7Eb5A286dCFD277f3dE5';
        default:
            return '';
    }
}

// Fetch prices on page load
fetchCryptoPrices();

/*
1inch (1INCH)0x111111111117dC0aa78b770fA6A738034120C302
mdx(MDX) 0x9C65AB58d8d978DB963e63f2bfB7121627e3a739
BakeryToken(BAKE) 0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5
MCDEX Token(MCB) 0x5fE80d2CD054645b9419657d3d10d26391780A7B
Burger Swap(BURGER) 0xAe9269f27437f0fcBC232d39Ec814844a51d6b8f
ParaSwap(PSP) 0xcAfE001067cDEF266AfB7Eb5A286dCFD277f3dE5
        case 'apeswap':
            return '0x603c7f932ed1fc6575303d8fb018fdcbb0f39a95'; // ApeSwap contract address
        case 'uniswap':
            return '0x2b4aee6b95db1094a3f1b1e682fa60a6516f60f0'; // UniSwap contract address
        case 'quickswap':
            return '0xd2ba23de8a19316a638dc1e7a9adda1d74233368'; // quickSwap-polygon contract address
            */
