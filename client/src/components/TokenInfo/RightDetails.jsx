import { useState } from "react"
import Overview from "./Sections/OverView";

export default function RightDetails({ detailedData }) {

    const [activeSection, setActiveSection] = useState("overview"); 

    const renderSection = () => {
        switch (activeSection) {
            case "overview":
                return <Overview detailedData={detailedData}/>
            case "markets":
                return <div>Markets content here</div>;
            case "historical":
                return <div>Historical Data content here</div>;
            case "community":
                return <div>Community content here</div>;
            default:
                return <div>Overview content here</div>;
        }
    };

    return (
        <div className="right-section">
            <div className="tabs">
                <button className="tabbtn" onClick={() => setActiveSection("overview")}>Overview</button>
                <button className="tabbtn" onClick={() => setActiveSection("markets")}>Markets</button>
                <button className="tabbtn" onClick={() => setActiveSection("community")}>Community</button>
            </div>

            <div className="section-content">
                {renderSection()}
            </div>
        </div>

    );
}

