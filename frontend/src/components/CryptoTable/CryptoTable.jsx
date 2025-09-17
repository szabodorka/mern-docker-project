import { useState, useEffect } from "react";
import "./CryptoTable.css";

export default function CryptoTable() {
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/markets");
        const data = await response.json();
        setCryptoData(data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }
    fetchData();
  }, []);

  return cryptoData.length === 0 ? (
    <p>Loading...</p>
  ) : (
    <div>
      <table>
        <thead>
          <tr>
            <th>Coin</th>
            <th>Price (USD)</th>
            <th>24h Volume (USD)</th>
            <th>Market Cap (USD)</th>
          </tr>
        </thead>
        <tbody>
          {cryptoData.map((coin) => (
            <tr key={coin.id}>
              <td>
                <img src={coin.image} alt={coin.name} width="30" height="30" />
                {coin.name}
              </td>
              <td>${coin.current_price.toLocaleString()}</td>
              <td>${coin.total_volume.toLocaleString()}</td>
              <td>${coin.market_cap.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
