document.getElementById("checkToken").addEventListener("click", async function () {
    const contractAddress = document.getElementById("contractAddress").value.trim(); // Obtiene el valor del input
    const resultDiv = document.getElementById("result");

    // Verifica que se haya introducido una dirección
    if (!contractAddress) {
        resultDiv.innerHTML = `<p class="error">Please enter a contract address.</p>`;
        return;
    }

    // Lista de contratos verificados en stxtools.io
    const verifiedContracts = [
        "SP4SZE494VC2YC5JYG7AYFQ44F5Q4PYV7DVMDPBG.ststx-token",
        "SP1Y5YSTAHZ88XYK1VPDH24GY0HPX5J4JECTMY4A1.velar-token",
        "SPN5AKG35QZSK2M8GAMR4AFX45659RJHDW353HSG.usdh-token-v1",
        "SP3NE50GEXFG9SZGTT51P40X2CKYSZ5CC4ZTZ7A2G.welshcorgicoin-token",
        "SP1AY6K3PQV5MRT6R4S671NWW2FRVPKM0BR162CT6.leo-token",
        "SP3M31QFF6S96215K4Y2Z9K5SGHJN384NV6YM6VM8.satoshai",
        "SP2EEV5QBZA454MSMW9W3WJNRXVJF36VPV17FFKYH.DROID",
        "SP32AEEF6WW5Y0NMJ1S8SBSZDAY8R5J32NBZFPKKZ.nope",
        "SP3W69VDG9VTZNG7NTW1QNCC1W45SNY98W1JSZBJH.flat-earth-stxcity",
        "SP1Z92MPDQEWZXW36VX71Q25HKF5K2EPCJ304F275.tokensoft-token-v4k68639zxz",
        "SPD1R8A962EKB8JEHFQTFNXGZTRR93J0NG5KCM81.gangnam-rose-apt-stxcity",
        "SP2TT71CXBRDDYP2P8XMVKRFYKRGSMBWCZ6W6FDGT.notastrategy",
        "SP3HNEXSXJK2RYNG5P6YSEE53FREX645JPJJ5FBFA.meme-stxcity",
        "SP1PW804599BZ46B4A0FYH86ED26XPJA7SFYNK1XS.play",
        "SP1JFFSYTSH7VBM54K29ZFS9H4SVB67EA8VT2MYJ9.gus-token",
        "SM3VDXK3WZZSA84XXFKAFAF15NNZX32CTSG82JFQ4.sbtc-token",
        "SP102V8P0F7JX67ARQ77WEA3D3CFB5XW39REDT0AM.token-alex",
        "SP102V8P0F7JX67ARQ77WEA3D3CFB5XW39REDT0AM.auto-alex-v3",
        "SP673Z4BPB4R73359K9HE55F2X91V5BJTN5SXZ5T.token-liabtc",
        "SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.arkadiko-token",
        "SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR.usda-token",
        "SP2C1WREHGM75C7TGFAEJPFKTFTEGZKF6DFT6E2GE.kangaroo"
    ];

    // Verifica si el contrato está en la lista verificada
    if (verifiedContracts.includes(contractAddress)) {
        resultDiv.innerHTML = `<p class="verified">✅ This token is verified and safe.</p>`;
        return;
    }

    // Si no está en la lista verificada, consulta la API de Hiro
    const apiUrl = `https://api.mainnet.hiro.so/extended/v1/tokens/${contractAddress}/metadata`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Token not found in the API.");

        const data = await response.json();
        if (data && data.contract) {
            resultDiv.innerHTML = `<p class="warning">⚠️ Token is not on the official whitelist. Proceed with caution.</p>`;
        } else {
            resultDiv.innerHTML = `<p class="error">❌ Token not found. It may be a scam.</p>`;
        }
    } catch (error) {
        resultDiv.innerHTML = `<p class="error">❌ Error fetching token data. Please try again.</p>`;
    }
});
