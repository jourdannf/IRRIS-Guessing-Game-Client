export default function PhotoContainer ({children, showModal}) {
    return (
        <div className={`flex flex-wrap justify-around ${showModal ? "blur" : ""}`}>
            {children}
        </div>
    )
}