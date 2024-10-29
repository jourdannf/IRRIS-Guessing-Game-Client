export default function Modal ({showModal, logoMap, setShowModal}) {
    function titleCase(string){
        if (string == "i.l"){
            return "I.L";
        }
    
        return string[0].toUpperCase() + string.slice(1).toLowerCase();
    }

    return (
        <div className={`fixed z-10 inset-0 ${showModal ? "" : "hidden"}`}  >
            <div className="flex itmes-center justify-center bg-gray-500 bg-opacity-75 transition-all h-screen place-items-center w-screen" onClick={() => setShowModal(!showModal)}>

                {/* Modal Box */}
                <div className="bg-white px-10 rounded text-left text-sm h-3/4 relative w-screen sm:w-[447px] sm:h-[500px] overflow-scroll" onClick={e => e.stopPropagation()}>

                    <button type="button" className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-529 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 absolute right-2 top-2" onClick={() => setShowModal(!showModal)}>
                    <span className="sr-only">Close menu</span>
                    {/* Heroicon name: outline/x */}
                    <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    </button>

                    
                    <h2 className="text-3xl mb-2 mt-20 font-lilita">HOW TO PLAY</h2>

                    <p className='text-base'>View the photos.</p>
                    <p className='text-base'>Guess the IRRIS member featured in each photo using the picture key based off their representative stones below.</p>
                    <p className='text-base'>Submit your answer.</p>
                    <p className='text-base'>You get three tries.</p>

                    <br/>

                    <h3 className="text-3xl mb-2 mt-9 font-lilita">PICTURE KEY</h3>

                    <div className='flex flex-wrap'>
                        {Object.keys(logoMap).map((e, i) => {
                            return <div key={i} className='text-xl w-28'><img src={logoMap[e]} alt="" width="40px" className='inline' /> {titleCase(e)} </div>
                        })}       
                    </div>
                    
                    
                </div>
            </div>
      </div>
    )
}