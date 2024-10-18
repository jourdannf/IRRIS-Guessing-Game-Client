import { useState } from "react";
// import ilLogo from "../assets/il_lapis_lazuli.svg"

export default function Tab ({label, onClick, isActive}) {

    return (
        <li className={`rounded-md ${isActive ? "bg-gray-300" : "hover:bg-gray-200"} border border-stone-300 p-1 mx-1 hover:cursor-pointer`} onClick={onClick}> <img src={label} alt="" width="48px" /> </li>
    )
}