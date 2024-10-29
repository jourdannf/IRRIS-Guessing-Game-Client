import ReactPlayer from "react-player"
import Modal from "../components/Modal";
import Header from "../components/Header";

export default function LoserPage ({answer, logoMap, showModal, setShowModal}) {
    

    return (
        <div className="font-dosis">
           <Header showModal={showModal} setShowModal={setShowModal} hide={true} />
            <div className={`flex-col place-content-center place-items-center w-screen h-[calc(100vh-80px)] text-center relative m-auto ${showModal ? "blur" : ""}`}>
                
                <p className="font-bold text-2xl">Don’t wanna cry, cry, cry...</p>
                <p className="text-2xl">But you were unable to guess today’s puzzle. Try again tomorrow.</p>

                <div className="my-10 mx-auto w-11/12 sm:w-2/5">
                    <ReactPlayer url="https://youtu.be/DgYax563zAo?si=unoiFwktMqk6NGsM" height="auto" width="100%" muted="true" controls="true" style={{margin: "auto", aspectRatio: "16/9"}} config={{youtube: {playerVars: {autoplay: 1}}}} />
                </div>
                

                <div>
                <p className="font-bold text-2xl mb-5">Today's Answer:</p>
                {answer.map((e,i) => {
                    return <img src={logoMap[e]} alt="" className='inline mx-1 w-10 sm:w-[6%]' />;
                })}
                </div>
            </div>

            <Modal showModal={showModal} setShowModal={setShowModal} logoMap={logoMap} />
        </div>
    )
}