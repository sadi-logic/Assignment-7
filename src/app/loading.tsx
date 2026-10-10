export default function HomeLoading() {
    const ProductCardSkeleton = () => (
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-[160px] animate-pulse">
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                </div>
            </div>
            <div className="flex justify-between items-end mt-6">
                <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-16"></div>
                    <div className="h-6 bg-gray-200 rounded w-24"></div>
                </div>
                <div className="h-6 bg-gray-200 rounded w-12"></div>
            </div>
        </div>
    );

    return (
        <div className="container mx-auto pb-16">
            
            <div className="bg-[#F2FCF5] rounded-3xl p-8 md:p-12 border border-gray-100 flex flex-col md:flex-row items-center gap-10 my-8 animate-pulse">
                <div className="flex-1 space-y-6 w-full">
                    <div className="h-8 bg-gray-200 rounded-full w-32"></div>
                    <div className="h-12 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-12 bg-gray-200 rounded-xl w-40 mt-4"></div>
                </div>
                <div className="flex-1 w-full flex justify-center md:justify-end">
                    <div className="w-full max-w-[350px] h-[250px] md:h-[300px] bg-gray-200 rounded-2xl"></div>
                </div>
            </div>

            {/* Section Skeletons */}
            {[1, 2, 3].map((section) => (
                <div key={section} className="mt-14">
                    <div className="h-8 bg-gray-200 rounded w-48 mb-6 animate-pulse"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <ProductCardSkeleton key={i} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}