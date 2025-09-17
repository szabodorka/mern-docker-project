import { useState } from "react"
import Overview from "./Sections/OverView";
import Markets from "./Sections/Markets";
import Community from "./Sections/Community";

export default function RightDetails({ detailedData }) {

    const [activeSection, setActiveSection] = useState("overview"); 

    const renderSection = () => {
        switch (activeSection) {
            case "overview":
                return <Overview detailedData={detailedData}/>
            case "markets":
                return <Markets detailedData={detailedData}/>;
            case "historical":
                return <div>Historical Data content here</div>;
            case "community":
                return <Community detailedData={detailedData}/>
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

