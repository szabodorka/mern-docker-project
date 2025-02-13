import { useEffect, useState } from "react";
import "./Banner.css";

export default function Banner() {
  const [globalCryptoData, setGlobalCryptoData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://api.coingecko.com/api/v3/global");
        const data = await response.json();
        console.log(data);
        setGlobalCryptoData(data.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }
    fetchData();
  }, []);

  return !globalCryptoData ? (
    <p>Loading crypto data...</p>
  ) : (
    <div className="banner">
      <div className="banner-elements">
        <span>
          🪙 Active CryptoCurrencies: $
          {globalCryptoData.active_cryptocurrencies}
        </span>
        <span> 🔄 Markets: ${globalCryptoData.markets}</span>
        <span>
          🌎 Total Market Cap: $
          {globalCryptoData.total_market_cap.usd.toLocaleString()}
        </span>
        <span>
          📈 24h Trading Volume: $
          {globalCryptoData.total_volume.usd.toLocaleString()}
        </span>
        <span>
          ₿ Bitcoin Dominancy:{" "}
          {globalCryptoData.market_cap_percentage.btc.toFixed(2)}%
        </span>
      </div>
    </div>
  );
}
