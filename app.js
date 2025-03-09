document.getElementById('checkWhitelistBtn').addEventListener('click', async function() {
    const contractAddress = document.getElementById('contractAddressInput').value.trim();
    
    // Verificar si la dirección de contrato no está vacía
    if (!contractAddress) {
        alert("Please enter a contract address.");
        return;
    }

    // Mostrar mensaje de carga
    document.getElementById('whitelistStatus').textContent = "Checking...";

    try {
        // Llamada a la API para obtener los metadatos del token
        const response = await fetch(`https://api.mainnet.hiro.so/extended/v1/tokens/${contractAddress}/metadata`);
        const data = await response.json();

        // Verificar si la respuesta es exitosa y si el token está en la whitelist
        if (data && data.whitelisted) {
            document.getElementById('whitelistStatus').textContent = "Token is on the official whitelist.";
            document.getElementById('whitelistStatus').style.color = "green";
        } else {
            document.getElementById('whitelistStatus').textContent = "Token is not on the official whitelist.";
            document.getElementById('whitelistStatus').style.color = "red";
        }
    } catch (error) {
        // Manejo de errores si algo sale mal
        document.getElementById('whitelistStatus').textContent = "Error checking token status.";
        document.getElementById('whitelistStatus').style.color = "red";
    }
});
