export function Loader() {
    return (
      <div className="min-h-screen bg-red-600 flex items-center justify-center">
        <div className="relative w-20 h-20">
          <div className="absolute top-0 w-20 h-20 rounded-full border-8 border-white border-t-transparent animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-white rounded-full" />
          </div>
        </div>
      </div>
    )
  }  