async function getBtcPrice() {
    try {
        const response = await fetch('https://api.gemini.com/v2/ticker/btcusd');
        const data = await response.json();
        const receivedData = Object.entries(data);
        const currentSymbol = receivedData[0][1];
        const currentBtcPrice = receivedData[6][1];
        await time(1000);
        printData(currentBtcPrice, "USD/BTC", "btcprice");
        return {
            priceBtc: currentBtcPrice
        }

    } catch {
        console.log("fetch error.");
        return;
    }
}

async function getDolarBlue() {
    try {
        const response = await fetch('https://api.bluelytics.com.ar/v2/latest')
        const data = await response.json();
        const arrayBlue = Object.entries(data.blue);
        const currentDolarBlue = arrayBlue[1][1];
        await time(1000);
        printData(currentDolarBlue, "ARS/USD", "blueprice");
        return {
            priceBlue: currentDolarBlue
        }

    } catch {
        console.log("fetch error.");
        return;
    }
}

async function calculateRate() {
    const btcPrice = await getBtcPrice();
    const dolarBluePrice = await getDolarBlue();
    await time(1000);
    printData((btcPrice.priceBtc * dolarBluePrice.priceBlue).toFixed(), "ARS/BTC", "totalprice")
    console.log(btcPrice.priceBtc * dolarBluePrice.priceBlue);
}

function printData(price, symbol, id) {
    document.getElementById(`${id}`).innerHTML = `
    <h1>${symbol}:</h1>
    <h2>${price}$</h2>
    `;
}

function time(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms);
    })
}

calculateRate();