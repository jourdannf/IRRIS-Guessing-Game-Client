export default function PhotoContainer ({children, showModal}) {
    return (
        <div className={`flex flex-wrap justify-around ${showModal ? "blur" : ""} mt-20 2xl:mt-0`}>
            {children}
        </div>
    )
}