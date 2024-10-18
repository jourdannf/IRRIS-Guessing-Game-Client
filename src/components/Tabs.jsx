import { useState } from "react";
import Tab from "./Tab";

export default function Tabs ({tabs, width, photoIndex, guess, updateGuess}) {
    const [activeTab, setActiveTab] = useState(0);

    const names = ["i.l", "liv", "yunseul", "nina", "nobody"]

    function handleTabClick (index) {
        updateGuess(guess.map((elem, i) => {
            if (i == photoIndex) {
                setActiveTab(index);
                return names[index];
            }

            return elem;
        }))
        
        // setActiveTab(index);
    }

    return (
        
            <ul className="tabs flex">
                {tabs.map((tab, index) => {
                    return <Tab key={index} label={tab.label} onClick={() => handleTabClick(index)} isActive={index === activeTab} />
                })}
            </ul>
        
    )

}