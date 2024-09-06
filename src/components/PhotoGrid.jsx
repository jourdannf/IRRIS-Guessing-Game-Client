export default function PhotoContainer ({children}) {
    return (
        <div className="flex flex-wrap justify-around">
            {children}
        </div>
    )
}