import { useState } from "react";
import { IKImage } from "imagekitio-react";

export default function Tab ({onClick, isActive, path}) {

    return (
        <li className={`rounded-md ${isActive ? "bg-gray-300" : "hover:bg-gray-200"} border border-stone-300 p-1 mx-1 hover:cursor-pointer`} onClick={onClick}> <IKImage urlEndpoint="https://ik.imagekit.io/y5ttrxfvx/" path={`${path}.svg`} width="48px"/> </li>
    )
}