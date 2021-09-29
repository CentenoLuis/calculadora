/* async function getBtcPrice() {
    try {
        const response = await fetch('https://api.gemini.com/v2/ticker/btcusd');
        const data = await response.json();
        const receivedData = Object.entries(data);
        const currentSymbol = receivedData[0][1];
        const currentBtcPrice = receivedData[6][1];
        printData(currentBtcPrice, "USD/BTC", "btcprice");
        return currentBtcPrice;
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
        printData(currentDolarBlue, "ARS/USD", "blueprice");
        return currentDolarBlue;
    } catch {
        console.log("fetch error.");
        return;
    }
} */

async function calculateRate() {
    try {
        const response = await fetch('https://api.gemini.com/v2/ticker/btcusd');
        const data = await response.json();
        const receivedData = Object.entries(data);
        const currentSymbol = receivedData[0][1];
        const currentBtcPrice = receivedData[6][1];
        const response1 = await fetch('https://api.bluelytics.com.ar/v2/latest')
        const data1 = await response1.json();
        const arrayBlue = Object.entries(data1.blue);
        const currentDolarBlue = arrayBlue[1][1];
        const totalPrice = (Math.round(currentDolarBlue * currentBtcPrice));
        printData(currentDolarBlue, "ARS/USD", "blueprice");
        printData(currentBtcPrice, "USD/BTC", "btcprice");
        printData(totalPrice, "ARS/BTC", "totalprice");
    } catch {
        console.log("fetch error.");
        return;
    }
}

calculateRate();
/* const btcPrice = getBtcPrice();
console.log(btcPrice);
const dolarBluePrice = getDolarBlue();
console.log(dolarBluePrice);
 */

function printData(price, symbol, id) {
    document.getElementById(`${id}`).innerHTML = `
    <h1>${symbol}:</h1>
    <h2>el precio es: ${price}$</h2>
    `;
}