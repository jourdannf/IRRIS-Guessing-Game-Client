export default function Photo ({num, link}) {

    return (
        <div>
        
            <img src={link} alt={`Cropped Photo of Member ${num}`} />
            <br />
            <select> 
                <option value="Please select a member"> Please select a member</option>
                <option value="i.l">I.L</option>
                <option value="liv">Liv</option>
                <option value="yunseul">Yunseul</option>
                <option value="nina">Nina</option>
                <option value="nobody">Nobody</option>
            </select>
           
        </div>
    )
}