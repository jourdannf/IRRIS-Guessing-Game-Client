import { useState } from "react";
import Tab from "./Tab";

export default function Tabs ({tabs, width}) {
    const [activeTab, setActiveTab] = useState(0);

    function handleTabClick (index) {
        setActiveTab(index);
    }

    return (
        
            <ul className="tabs flex">
                {tabs.map((tab, index) => {
                    return <Tab key={index} label={tab.label} onClick={() => handleTabClick(index)} isActive={index === activeTab} />
                })}
            </ul>
        
    )

}