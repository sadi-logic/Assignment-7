import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-green-200 flex flex-col items-center justify-center px-4">
            
            <div className="text-7xl mb-6">🛒</div>
            
            <h1 className="text-8xl font-bold text-[#0A5C36] mb-4 tracking-tighter">
                404
            </h1>

            
            <h2 className="text-2xl font-bold text-gray-800 mb-3 text-center">
                পেজটি খুঁজে পাওয়া যায়নি!
            </h2>

            <Link
                href="/"
                className="inline-block bg-[#05893E] hover:bg-green-700 text-white font-semibold px-8 py-4 rounded-xl transition-all shadow-md hover:shadow-lg"
            >
                হোম পেজে ফিরে যান
            </Link>

        </div>
    );
}