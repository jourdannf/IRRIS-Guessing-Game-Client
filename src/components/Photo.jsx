import { AdvancedImage } from "@cloudinary/react";
import { CloudinaryImage } from "@cloudinary/url-gen/index";
import { Cloudinary } from "@cloudinary/url-gen/index";
import { fill, scale } from "@cloudinary/url-gen/actions/resize";
import { Resize } from "@cloudinary/url-gen/actions/resize";
import { useState } from "react";

export default function Photo ({num, publicID, guess, updateGuess, answerCheck, answer, triesComplete, submitted, setSubmit, freqArr}) {

    
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

    const cld = new Cloudinary({
        cloud: {
            cloudName: "djkg6bufv"
        }
    });


    const memberImg = cld.image(publicID);
    return (
        <div className="text-center shrink-0">
        
            <AdvancedImage className="rounded-md mx-auto" width="200" cldImg={memberImg} />
            {/* <img src={publicID} alt={`Cropped Photo of Member ${num + 1}`} /> */}
            <br />

            {answerCheck[num] 
                ? <h4 className="text-green-800 font-bold"> {titleCase(answer[num])} </h4> 
                : triesComplete == "true" 
                    ? <h4 className="text-red-600 font-bold"> {titleCase(JSON.parse(localStorage.guess)[num])} </h4> :
                    <select onChange={selectMember}> 
                    <option value="default"> Please select a member</option>
                    <option value="i.l" disabled={freqArr[num][0]}>I.L</option>
                    <option value="liv" disabled={freqArr[num][1]}>Liv</option>
                    <option value="yunseul" disabled={freqArr[num][2]}>Yunseul</option>
                    <option value="nina" disabled={freqArr[num][3]}>Nina</option>
                    <option value="nobody" disabled={freqArr[num][4]}>Nobody</option>
                </select>}
            
           
        </div>
    )
}