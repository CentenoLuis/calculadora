async function getBtcPrice() {
    try {
        const response = await fetch('https://api.gemini.com/v2/ticker/btcusd', {
            'mode': 'no-cors',
            'headers': {
                'Access-Control-Allow-Origin': '*',
            }
        });
        const data = await response.json();
        const receivedData = Object.entries(data);
        const currentSymbol = receivedData[0][1];
        const currentBtcPrice = Number(receivedData[6][1]);
        console.log('gemini: ')
        console.log(typeof (receivedData[6][1]));
        //await time(1000);
        printData(currentBtcPrice.toFixed(1), "USD/BTC", "btcprice", 'gemini');
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
        const currentDolarBlue = Number(arrayBlue[1][1])
        //await time(1000);
        printData(currentDolarBlue, "ARS/USD", "blueprice", 'dolar_blue');
        return {
            priceBlue: currentDolarBlue
        }

    } catch {
        console.log("fetch error.");
        return;
    }
}

async function calculateRate() {
    //const gemini = await getBtcPrice();
    const paprika = await getDataFromCoinPaprika();
    //const coincap = await getDataFromCoinCap();
    const coingecko = await getDataFromCoinGecko();
    const dolarBluePrice = await getDolarBlue();
    //await time(1000);
    const average = ((paprika.price + coingecko.price) / 2).toFixed(1);
    printData(average * dolarBluePrice.priceBlue, "ARS/BTC", "totalprice", 'btc price in ARS')
    //console.log(btcPrice.priceBtc * dolarBluePrice.priceBlue);
}

async function getDataFromCoinGecko() {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
    const data = await response.json();
    console.log('coingecko: ' + data.bitcoin.usd);
    const price = Number(data.bitcoin.usd);
    printData(price.toFixed(1), 'USD/BTC', 'coingecko', 'coingecko')
    return {
        price,
    }

}
async function getDataFromCoinPaprika() {
    const response = await fetch('https://api.coinpaprika.com/v1/tickers/btc-bitcoin')
    const data = await response.json();
    console.log('coinpaprika:');
    console.log(data.quotes.USD.price);
    const price = Number(data.quotes.USD.price);
    printData(price.toFixed(1), 'USD/BTC', 'coinpaprika', 'coinpaprika')
    return {
        price,
    }
    //const price = data.bitcoin.usd;
    //printData(price, 'USD/BTC', 'coingecko', 'coingecko')

}

async function getDataFromCoinCap() {
    const response = await fetch('https://api.coincap.io/v2/assets/bitcoin');
    const data = await response.json();
    console.log('coincap:');
    console.log(typeof (data.data.priceUsd));
    const price = Number(data.data.priceUsd);
    printData(price.toFixed(1), 'BTC/USD', 'coincap', 'coincap')
    return {
        price,
    }
}

function printData(price, symbol = '', id, exchange = 'exchange') {
    document.getElementById(`${id}`).innerHTML = `
    <h6>${exchange}</h6>
    <h1>${price}</h1>
    <h6>${symbol}</h6>
    `;
}

function time(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms);
    })
}

async function calculateRate2() {
    //const gemini = await getBtcPrice();
    const paprika = await getDataFromCoinPaprika();
    //const coincap = await getDataFromCoinCap();
    const coingecko = await getDataFromCoinGecko();
    const average = ((paprika.price + coingecko.price) / 2).toFixed(1);
    console.log('Average: ');
    console.log(average);
    const inputAmount = document.getElementById("inputAmount");

    inputAmount.addEventListener('keyup', (event) => {
        const numberToConvert = event.target.value;
        if (numberToConvert != '') {
            const resultOfConversion = numberToConvert * average;
            console.log('1080');
            console.log(resultOfConversion);
            document.getElementById("resultado").innerHTML = `
                <h3>${resultOfConversion}</h3>
                <h6> USD </h6>
            `;
        } else {
            document.getElementById("resultado").innerHTML = ``;
        }
    })
}

async function calculateRate3() {
    //const gemini = await getBtcPrice();
    const paprika = await getDataFromCoinPaprika();
    //const coincap = await getDataFromCoinCap();
    const coingecko = await getDataFromCoinGecko();
    const average = ((paprika.price + coingecko.price) / 2).toFixed(1);
    console.log('Average: ');
    console.log(average);
    const inputAmount = document.getElementById("inputAmount2");

    inputAmount.addEventListener('keyup', (event) => {
        const numberToConvert = event.target.value;
        if (numberToConvert != '') {
            const resultOfConversion = (numberToConvert / average).toFixed(8);
            console.log('1080');
            console.log(resultOfConversion);
            document.getElementById("resultado2").innerHTML = `
                <h3>${resultOfConversion}</h3>
                <h6> BTC </h6>
            `;
        } else {
            document.getElementById("resultado2").innerHTML = ``;
        }
    })
}

calculateRate();
getDolarBlue();
getDataFromCoinGecko();
getDataFromCoinPaprika();
getDataFromCoinCap();
calculateRate2();
calculateRate3();