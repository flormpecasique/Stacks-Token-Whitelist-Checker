// app.js

async function checkWhitelist() {
    const contractAddress = document.getElementById('contractAddress').value;
    const resultDiv = document.getElementById('result');
    
    // Input validation
    if (!contractAddress) {
        resultDiv.innerHTML = '<span style="color: red;">Please enter a contract address.</span>';
        return;
    }

    // Loading state
    resultDiv.innerHTML = '<span style="color: #007bff;">Checking...</span>';

    try {
        const response = await fetch(`https://api.mainnet.hiro.so/extended/v1/tokens/${contractAddress}/metadata`);
        const data = await response.json();

        // Display results based on the API response
        if (data && data.metadata && data.metadata.is_whitelisted) {
            resultDiv.innerHTML = `<span style="color: green;">Token is whitelisted on official platforms.</span>`;
        } else {
            resultDiv.innerHTML = `<span style="color: red;">Token is NOT whitelisted.</span>`;
        }
    } catch (error) {
        resultDiv.innerHTML = '<span style="color: red;">Error: Could not fetch data. Please try again later.</span>';
    }
}
