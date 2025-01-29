export function LoadingSpinner() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
            <div className="relative w-20 h-20">
                <div className="absolute top-0 w-20 h-20 rounded-full border-8 border-red-600 border-t-transparent animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 bg-red-600 rounded-full animate-pulse" />
                </div>
            </div>
            <p className="text-white text-lg animate-pulse">Loading Pokémon...</p>
        </div>
    )
}  