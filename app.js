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

        // Verificar si la respuesta tiene un estado que indique "whitelisted" o alguna otra propiedad relevante
        if (data && data.whitelisted) {
            document.getElementById('whitelistStatus').textContent = "Token is on the official whitelist.";
            document.getElementById('whitelistStatus').style.color = "green";
        } else if (data && !data.whitelisted) {
            // Caso cuando el token no está en la whitelist
            document.getElementById('whitelistStatus').textContent = "Token is not on the official whitelist. It may not be verified.";
            document.getElementById('whitelistStatus').style.color = "orange";
        } else {
            // Si no se encontró información, indicar que es desconocido
            document.getElementById('whitelistStatus').textContent = "Unable to verify token status. Further research needed.";
            document.getElementById('whitelistStatus').style.color = "gray";
        }

        // Información adicional para ayudar a los usuarios
        document.getElementById('additionalInfo').style.display = 'block';

    } catch (error) {
        // Manejo de errores si algo sale mal
        document.getElementById('whitelistStatus').textContent = "Error checking token status.";
        document.getElementById('whitelistStatus').style.color = "red";
        document.getElementById('additionalInfo').style.display = 'none'; // Ocultar información adicional en caso de error
    }
});
