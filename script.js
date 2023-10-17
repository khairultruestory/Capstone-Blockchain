// Define the API endpoint for CoinGecko
const apiUrl = 'https://api.coingecko.com/api/v3/simple/price';

// Define the parameters for the request
const params = {
  ids: 'bitcoin,ethereum,chainlink,cardano,vechain', // Added Chainlink, Cardano, and VeChain
  vs_currencies: 'usdc', // Specify USDC as the desired currency
};

// Create the URL with the parameters
const url = new URL(apiUrl);
url.search = new URLSearchParams(params).toString();

// Make the API request
fetch(url)
  .then(response => response.json())
  .then(data => {
    // Process the data here, and update your webpage
    console.log(data);
  })
  .catch error => {
    console.error('Error fetching data:', error);
  });
