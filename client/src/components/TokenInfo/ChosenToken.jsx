import LeftDetails from "./LeftDetails.jsx";
import RightDetails from "./RightDetails.jsx";

import "./ChosenToken.css"
import { useState, useEffect } from "react";

export default function ChosenToken({ user, selectedToken, portfolio, setPortfolio }) {

    const [detailedData, setDetailedData] = useState(null)

    console.log(user);

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
        <div className="chosen-token">
            <div className="left-section">
                <LeftDetails detailedData={detailedData} portfolio={portfolio} setPortfolio={setPortfolio} user={user} />
            </div>
            <div className="right-section">
                <RightDetails detailedData = {detailedData}/>
            </div>
        </div>
    );
}
