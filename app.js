// app.js

async function checkWhitelist() {
    const contractAddress = document.getElementById('contractAddress').value;
    const resultDiv = document.getElementById('result');
    
    if (!contractAddress) {
        resultDiv.innerHTML = 'Please enter a contract address.';
        resultDiv.classList.remove('success', 'error');
        return;
    }
    
    try {
        const response = await fetch(`https://api.mainnet.hiro.so/extended/v1/tokens/${contractAddress}/metadata`);
        const data = await response.json();

        if (data && data.metadata && data.metadata.is_whitelisted) {
            resultDiv.innerHTML = `Token is <span class="success">whitelisted</span> on official platforms.`;
            resultDiv.classList.add('success');
            resultDiv.classList.remove('error');
        } else {
            resultDiv.innerHTML = `Token is <span class="error">NOT whitelisted</span>.`;
            resultDiv.classList.add('error');
            resultDiv.classList.remove('success');
        }
    } catch (error) {
        resultDiv.innerHTML = 'Error: Could not fetch data. Please try again later.';
        resultDiv.classList.remove('success', 'error');
    }
}
