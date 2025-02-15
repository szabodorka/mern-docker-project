import { useEffect, useState } from "react";
import "./TokenDetails.css"

export default function TokenDetails({ selectedToken }) {
  const [detailedData, setDetailedData] = useState(null);

  useEffect(() => {
    async function fetchDetailedData() {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${selectedToken.id}`
        );
        const data = await response.json();
        console.log(data);
        setDetailedData(data);
      } catch (error) {
        console.error(error);
      }
    }

    if (selectedToken?.id) {
      fetchDetailedData();
    }
  }, [selectedToken]);

  if (!selectedToken) return <p>Loading...</p>;

  return (
    <div className="tokenDetails">
      <div className="bitcoin-card">
        <div className="header">
        <img src={detailedData?.image?.small} alt={detailedData?.name} />
          <span>{detailedData?.name} ({detailedData?.symbol?.toUpperCase()}) Price</span>
        </div>

        <div className="price">
          <h1>${detailedData?.market_data?.current_price?.usd?.toLocaleString()}</h1>
          <h4>{detailedData?.market_data?.current_price?.btc?.toLocaleString()} BTC</h4>
          <span className="change"></span>
          
        </div>

        <div className="addToBtn">

        <button>Add To Portfolio</button>

        </div>
        <div className="market-stats">
          <p>Market Cap: ${detailedData?.market_data?.market_cap?.usd?.toLocaleString()}</p>
          <p>24 Hour Trading Vol: ${detailedData?.market_data?.total_volume?.usd?.toLocaleString()}</p>
          <p>Circulating Supply: ${detailedData?.market_data?.circulating_supply?.toLocaleString()}</p>
          <p>Total Supply: ${detailedData?.market_data?.total_supply?.toLocaleString()}</p>
          <p>Max Supply: {detailedData?.market_data?.max_supply?.toLocaleString() ? `$` + detailedData?.market_data?.max_supply?.toLocaleString() : <>Infinite</>}</p>
        </div>

        <div className="info">
          <h2>Info</h2>
          <p>
            <strong>Website:</strong> <a href={detailedData?.links?.homepage[0]} target="_blank" rel="noopener noreferrer">{detailedData?.links?.homepage[0]}</a>
          </p>
          <p>
            <strong>Explorers:</strong> <a href={detailedData?.links?.blockchain_site[0]} target="_blank" rel="noopener noreferrer">View on Explorer</a>
          </p>
          <p>
            <strong>Wallets:</strong> <a href="#">Ledger</a>
          </p>
          <p>
            <strong>Community:</strong> 
            <a href={detailedData?.links?.twitter_screen_name ? `https://twitter.com/${detailedData.links.twitter_screen_name}` : "#"} target="_blank" rel="noopener noreferrer"> Twitter</a> | 
            <a href={detailedData?.links?.telegram_channel_identifier ? `https://t.me/${detailedData.links.telegram_channel_identifier}` : "#"} target="_blank" rel="noopener noreferrer"> Telegram</a>
          </p>
          <p>
            <strong>Source Code:</strong> <a href={detailedData?.links?.repos_url?.github[0]} target="_blank" rel="noopener noreferrer">GitHub</a>
          </p>
          <p>
            <strong>API ID:</strong> {detailedData?.id}
          </p>
          <p>
            <strong>Category:</strong> {detailedData?.categories[0]}
          </p>
        </div>

      </div>
    </div>
  );
}
