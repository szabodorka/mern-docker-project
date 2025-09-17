import LeftDetails from "./LeftDetails.jsx";
import RightDetails from "./RightDetails.jsx";

import "./ChosenToken.css";
import { useState, useEffect } from "react";

export default function ChosenToken({
  user,
  selectedToken,
  portfolio,
  setPortfolio,
}) {
  const [detailedData, setDetailedData] = useState(null);

  useEffect(() => {
    async function fetchDetailedData() {
      try {
        const response = await fetch(`/api/coins/${selectedToken.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch token");
        }
        const data = await response.json();
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
    <div className="chosen-token">
      <div className="left-section">
        <LeftDetails
          detailedData={detailedData}
          portfolio={portfolio}
          setPortfolio={setPortfolio}
          user={user}
        />
      </div>
      <div className="right-section">
        <RightDetails detailedData={detailedData} />
      </div>
    </div>
  );
}
