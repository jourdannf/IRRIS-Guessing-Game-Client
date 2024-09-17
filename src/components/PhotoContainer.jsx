export default function PhotoContainer ({children}) {
    return (
        <div className="flex flex-wrap justify-around mt-20">
            {children}
        </div>
    )
}