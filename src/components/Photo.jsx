import { IKImage } from "imagekitio-react";
import { fill, scale } from "@cloudinary/url-gen/actions/resize";
import { Resize } from "@cloudinary/url-gen/actions/resize";
import { useState } from "react";
import Tabs from "./Tabs";

export default function Photo ({num, path, guess, updateGuess, answerCheck, answer, triesComplete, freqArr}) {

    const tabData = [
        {path: "il_lapis_lazuli"},
        {path: "liv_garnet"},
        {path: "yunseul_rhodonite"},
        {path: "nina_labradorite"},
        {path: "black_onyx_"}
    ]
    
    function selectMember (e) {
        
        if (e.target.value == "default") {
            updateGuess(guess.map((elem, i) => {
                if (i == num){
                    return elem = "";
                }
    
                return elem;
            }));

            return;
        }

        updateGuess(guess.map((elem, i) => {
            if (i == num){
                return elem = e.target.value;
            }

            return elem;
        }));
    }

    function titleCase(string){
        if (string == "i.l"){
            return "I.L";
        }

        return string[0].toUpperCase() + string.slice(1).toLowerCase();
    }


    console.log(path);
    return (
        <div className="shrink-0">

            <IKImage className="rounded-md mx-auto" urlEndpoint="https://ik.imagekit.io/y5ttrxfvx/" path={`${path}.svg`} width="268" />
            <br />

            <Tabs tabs={tabData} width="268px" photoIndex={num} guess={guess} updateGuess={updateGuess} />
            <br />

            {/* {answerCheck[num] 
                ? <h4 className="text-green-800 font-bold"> {titleCase(answer[num])} </h4> 
                : triesComplete == "true" 
                    ? <h4 className="text-red-600 font-bold"> {titleCase(JSON.parse(localStorage.guess)[num])} </h4> :
                    <select onChange={selectMember} className="hover:cursor-pointer"> 
                    <option value="default"> Please select a member</option>
                    <option value="i.l" disabled={freqArr[num][0]}>I.L</option>
                    <option value="liv" disabled={freqArr[num][1]}>Liv</option>
                    <option value="yunseul" disabled={freqArr[num][2]}>Yunseul</option>
                    <option value="nina" disabled={freqArr[num][3]}>Nina</option>
                    <option value="nobody" disabled={freqArr[num][4]}>Nobody</option>
                </select>} */}
            
           
        </div>
    )
}