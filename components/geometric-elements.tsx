interface GeometricElementsProps {
  variant?: "wireframe" | "filled" | "minimal" | "none"
  position?: "right" | "left" | "center"
  opacity?: number
}

export default function GeometricElements({
  variant = "wireframe",
  position = "right",
  opacity = 0.4,
}: GeometricElementsProps) {
  if (variant === "none") return null

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <div className="absolute inset-0">
        {/* Large Diamond Shape */}
        <div className="absolute top-1/4 right-8 lg:right-16 xl:right-24">
          <div
            className="w-40 h-40 lg:w-56 lg:h-56 xl:w-64 xl:h-64 border-2 border-gray-300 transform rotate-45"
            style={{ opacity }}
          >
            {/* Cross lines inside diamond */}
            <div className="absolute inset-0">
              <div className="absolute top-1/2 left-0 w-full h-px bg-gray-300 transform -translate-y-1/2"></div>
              <div className="absolute left-1/2 top-0 h-full w-px bg-gray-300 transform -translate-x-1/2"></div>
            </div>
          </div>
        </div>

        {/* Triangle Shape */}
        <div className="absolute top-1/2 right-4 lg:right-8 xl:right-12">
          <div
            className="w-28 h-28 lg:w-40 lg:h-40 xl:w-48 xl:h-48 border-2 border-gray-300 transform rotate-12"
            style={{ opacity: opacity * 0.7 }}
          >
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <path d="M50 15 L85 85 L15 85 Z" fill="none" stroke="rgb(209 213 219)" strokeWidth="2" />
              <path d="M50 15 L50 85" stroke="rgb(209 213 219)" strokeWidth="1" />
            </svg>
          </div>
        </div>

        {/* Small Circle */}
        <div className="absolute bottom-1/3 right-20 lg:right-32 xl:right-40">
          <div
            className="w-12 h-12 lg:w-16 lg:h-16 xl:w-20 xl:h-20 border-2 border-gray-200 rounded-full"
            style={{ opacity: opacity * 0.6 }}
          ></div>
        </div>

        {/* Additional small elements */}
        <div className="absolute top-3/4 right-12 lg:right-20">
          <div
            className="w-6 h-6 lg:w-8 lg:h-8 border border-gray-200 transform rotate-45"
            style={{ opacity: opacity * 0.5 }}
          ></div>
        </div>
      </div>
    </div>
  )
}
