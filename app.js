// app.js

async function checkWhitelist() {
    const contractAddress = document.getElementById('contractAddress').value;
    const resultDiv = document.getElementById('result');
    
    if (!contractAddress) {
        resultDiv.innerHTML = 'Please enter a contract address.';
        return;
    }
    
    try {
        const response = await fetch(`https://api.mainnet.hiro.so/extended/v1/tokens/${contractAddress}/metadata`);
        const data = await response.json();

        if (data && data.metadata && data.metadata.is_whitelisted) {
            resultDiv.innerHTML = `Token is <span style="color: green;">whitelisted</span> on official platforms.`;
        } else {
            resultDiv.innerHTML = `Token is <span style="color: red;">NOT whitelisted</span>.`;
        }
    } catch (error) {
        resultDiv.innerHTML = 'Error: Could not fetch data. Please try again later.';
    }
}
