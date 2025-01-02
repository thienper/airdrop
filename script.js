// // URL của API để lấy giá Bitcoin (BTC)
// const apiURL = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd";

// // Lấy giá đồng coin
// fetch(apiURL)
//     .then(response => response.json())
//     .then(data => {
//         const price = data.bitcoin.usd; // Lấy giá BTC bằng USD
//         document.getElementById("coin-price").textContent = `$${price}`;
//     })
//     .catch(error => console.error("Error fetching coin price:", error));
// BTC
const socketBtc = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade');
socketBtc.onmessage = (event) => {
    const data = JSON.parse(event.data);
    const price = parseFloat(data.p).toFixed(2); // Lấy giá giao dịch hiện tại
    document.getElementById('coin-price').textContent = `$${price}`;
};
// GRASS
const socketGrass = new WebSocket('wss://ws.bitgetapi.com/spot/v1/stream');

// Kiểm tra khi kết nối WebSocket mở
socketGrass.onopen = () => {
    console.log("WebSocket connected");
    const subscribeMessage = {
        "op": "subscribe",
        "args": [
            {
                "channel": "marketData",
                "instId": "GRASS_USDT"  // Cặp giao dịch GRASS-USDT
            }
        ]
    };
    socketGrass.send(JSON.stringify(subscribeMessage));
};

// Kiểm tra khi có dữ liệu nhận được
socketGrass.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log("Received data:", data); // Log dữ liệu để kiểm tra

    if (data.data && data.data[0]) {
        const price = parseFloat(data.data[0].last).toFixed(2);  // Giá mới nhất
        document.getElementById('grass-price').textContent = `$${price}`;
    } else {
        console.log("No price data found in the response.");
    }
};

// Kiểm tra lỗi kết nối
socketGrass.onerror = (error) => {
    console.error('WebSocket Error:', error);
};

// Kiểm tra khi kết nối đóng
socketGrass.onclose = () => {
    console.log('WebSocket connection closed');
};
