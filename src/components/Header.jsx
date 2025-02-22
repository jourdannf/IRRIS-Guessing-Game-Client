import { IKImage } from "imagekitio-react"
import irrisLogo from "../assets/irrislogo_transparent.svg"

export default function Header ({showModal, setShowModal, hide}) {
    return (
        <div id="header" className={`bg-fuchsia-950 h-20 w-screen relative ${showModal ? "blur" : ""} flex justify-between px-5 sm:px-12 place-items-center`}>
            <h1 className={`relative text-5xl font-bold text-left text-white hidden sm:block font-lilita`}>IRRISGUESS</h1>
            <IKImage urlEndpoint="https://ik.imagekit.io/y5ttrxfvx/" path={`irrislogo_transparent.svg`} width="268" className="block sm:hidden w-11 bg-white rounded-lg" />

            <div className="flex h-12 w-64 justify-end">
                
                <a className="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-fuchsia-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 " href="https://github.com/jourdannf/IRRIS-Guessing-Game-Client/">
                <svg fill="#ffffff" width="35px" height="35px" viewBox="0 0 0.9 0.9" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path d="M0.45 0.084a0.375 0.375 0 0 0 -0.119 0.731c0.019 0.003 0.026 -0.008 0.026 -0.018 0 -0.009 0 -0.038 0 -0.07 -0.094 0.017 -0.119 -0.023 -0.126 -0.044a0.137 0.137 0 0 0 -0.038 -0.053c-0.013 -0.007 -0.032 -0.024 0 -0.025a0.075 0.075 0 0 1 0.058 0.038 0.08 0.08 0 0 0 0.109 0.031 0.079 0.079 0 0 1 0.024 -0.05c-0.083 -0.009 -0.171 -0.042 -0.171 -0.185a0.146 0.146 0 0 1 0.038 -0.101 0.135 0.135 0 0 1 0.004 -0.099s0.031 -0.01 0.103 0.038a0.354 0.354 0 0 1 0.188 0c0.072 -0.049 0.103 -0.038 0.103 -0.038a0.135 0.135 0 0 1 0.004 0.099 0.145 0.145 0 0 1 0.038 0.101c0 0.144 -0.088 0.176 -0.171 0.185a0.089 0.089 0 0 1 0.025 0.069c0 0.05 0 0.09 0 0.103 0 0.01 0.007 0.022 0.026 0.018A0.375 0.375 0 0 0 0.45 0.084"/></svg>
                </a>
              
                <button type="button" className=" rounded-md p-2 inline-flex items-center justify-center text-white hover:text-white hover:bg-fuchsia-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 " onClick={() => setShowModal(!showModal)}>
                <svg width="30" height="30" viewBox="0 0 0.78 0.78" xmlns="http://www.w3.org/2000/svg"><path d="M0.375 0.075a0.3 0.3 0 1 0 0 0.6 0.3 0.3 0 0 0 0 -0.6m-0.265 0.035A0.375 0.375 0 1 1 0.64 0.64 0.375 0.375 0 0 1 0.11 0.11z" fill="#ffffff"/><path d="M0.417 0.488H0.337V0.445c0 -0.074 0.018 -0.085 0.052 -0.104q0.005 -0.003 0.011 -0.007c0.027 -0.017 0.048 -0.039 0.048 -0.071 0 -0.036 -0.028 -0.059 -0.062 -0.059 -0.032 0 -0.062 0.015 -0.064 0.057H0.236c0.002 -0.086 0.07 -0.131 0.15 -0.131 0.086 0 0.146 0.054 0.146 0.131 0 0.052 -0.026 0.086 -0.068 0.111l-0.009 0.005c-0.03 0.018 -0.038 0.023 -0.038 0.067zm0.006 0.075a0.05 0.05 0 0 1 -0.05 0.05 0.05 0.05 0 0 1 -0.046 -0.069 0.05 0.05 0 0 1 0.046 -0.03c0.027 0 0.05 0.022 0.05 0.049z" fill="#ffffff"/></svg>
                </button>

                <a href="https://ko-fi.com/jourcreations" type="button" className="border-white rounded-3xl border-2 text-center text-base font-bold p-4 leading-none text-white ml-2 hover:bg-fuchsia-800">
                Support Me
                </a>
            </div>
            

            <h3 className={`absolute right-5 sm:right-12 top-28 font-semibold ${showModal ? "blur" : ""} text-lg sm:text-2xl ${hide ? "hidden" : ""}`}>Tries Left: {localStorage.triesLeft}</h3>
          </div>  
    )
}