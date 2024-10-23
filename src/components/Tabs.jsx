import { useState } from "react";
import Tab from "./Tab";

export default function Tabs ({tabs, width, photoIndex, guess, updateGuess}) {
    const [activeTab, setActiveTab] = useState(chooseInitialValue(guess[photoIndex]));

    function chooseInitialValue(name) {
        switch (name) {
            case "i.l":
                return 0;
                break;
            case "liv":
                return 1;
                break;
            case "yunseul":
                return 2;
                break;
            case "nina":
                return 3;
                break;
            case "nobody":
                return 4;
                break;               
            default:
                return 0;
                break;
        }
    }

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