export default function Photo ({num, link, guess, updateGuess, answerCheck, answer}) {

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

    return (
        <div>
        
            <img src={link} alt={`Cropped Photo of Member ${num + 1}`} />
            <br />

            {answerCheck[num] 
                ? <h4> {titleCase(answer[num])} </h4> 
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