import { AdvancedImage } from "@cloudinary/react";
import { CloudinaryImage } from "@cloudinary/url-gen/index";
import { Cloudinary } from "@cloudinary/url-gen/index";
import { fill, scale } from "@cloudinary/url-gen/actions/resize";
import { Resize } from "@cloudinary/url-gen/actions/resize";

export default function Photo ({num, publicID, guess, updateGuess, answerCheck, answer}) {

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
        <div className="basis-1/5 text-center">
        
            <AdvancedImage className="rounded-md mx-auto" width="300" cldImg={memberImg} />
            {/* <img src={publicID} alt={`Cropped Photo of Member ${num + 1}`} /> */}
            <br />

            {answerCheck[num] 
                ? <h4 className="text-green-800 font-bold"> {titleCase(answer[num])} </h4> 
                : <select onChange={selectMember}> 
                    <option value="default"> Please select a member</option>
                    <option value="i.l">I.L</option>
                    <option value="liv">Liv</option>
                    <option value="yunseul">Yunseul</option>
                    <option value="nina">Nina</option>
                    <option value="nobody">Nobody</option>
                </select>}
            
           
        </div>
    )
}