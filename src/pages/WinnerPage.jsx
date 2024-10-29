import ReactPlayer from "react-player"
import Modal from "../components/Modal"
import Header from "../components/Header"

export default function WinnerPage ({amountTries, logoMap, showModal, setShowModal}) {
    return (
        <div className="font-dosis">
            <Header showModal={showModal} setShowModal={setShowModal} hide={true} />
            <div className={`flex-col place-content-center place-items-center w-screen h-[calc(100vh-80px)] text-center relative m-auto ${showModal ? "blur" : ""}`}>
                
                <p className="font-bold text-2xl">Hey, Whatcha Wanna Know!</p>
                <p className="text-2xl">You solved today’s puzzle in {amountTries} tries! New puzzle tomorrow ^u^ </p>

                <div className="my-10 mx-auto w-11/12 sm:w-2/5">
                    <ReactPlayer url="https://youtu.be/HfRa3Jfy__Q?si=k6W-F90Mc3582Tii" height="auto" width="100%" muted="true" controls="true" style={{margin: "auto", aspectRatio: "16/9"}} config={{youtube: {playerVars: {autoplay: 1}}}} />
                </div>
                
            </div>

            <Modal showModal={showModal} setShowModal={setShowModal} logoMap={logoMap} />
        </div>
    )
}