import Link from "next/link";
import CategoryProductsList from "./categoryList";
import CategoryList from "./categoryList";

export const instant = false;

interface Product {
    id: number;
    nameBn: string;
    category: string;
    categoryNameBn: string;
    categoryIcon: string;
    unit: string;
    today: number;
    change: {
        dir: "up" | "down" | "flat";
        pct: number;
    };
}
const getCategoryProducts = async (categorySlug: string): Promise<Product[]> => {
    const res = await fetch(`https://api.abcz.workers.dev/api/bazardor/products?category=${categorySlug}`)
    const data = await res.json()
    return data;
}

const CategorieProduct = async ({ params }: { params: Promise<{ categorySlug: string }> }) => {

    const { categorySlug } = await params;

    //  const allData = await getCategoryProducts(categorySlug);

    //   const categoryProducts = allData.filter((p) => p.category === categorySlug);
    const categoryProducts = await getCategoryProducts(categorySlug);
    console.log(categoryProducts);




    const categoryNameBn = categoryProducts.length > 0 ? categoryProducts[0].categoryNameBn : categorySlug;
    const categoryIcon = categoryProducts.length > 0 ? categoryProducts[0].categoryIcon : "📦";



    if (categoryProducts.length === 0) {
        return (
            <div className="container mx-auto py-20 px-4 max-w-6xl flex flex-col items-center justify-center min-h-[60vh]">
                <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100 text-center max-w-md w-full">
                    <div className="text-6xl mb-4">🔍</div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">দুঃখিত!</h1>
                    <p className="text-gray-500 mb-8">
                        এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি। অনুগ্রহ করে অন্য ক্যাটাগরি থেকে দেখুন।
                    </p>
                    <Link 
                        href="/" 
                        className="inline-block bg-[#05893E] text-white font-medium px-6 py-3 rounded-xl hover:bg-green-700 transition-colors"
                    >
                        হোম পেজে ফিরে যান
                    </Link>
                </div>
            </div>
        );
    }
    return (
        <div className="container mx-auto py-8 px-4 max-w-6xl">

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
                <Link href={'/'} className="hover:text-green-600 transition-colors">হোম</Link>
                <span>⪢</span>
                <p className="font-medium text-gray-800">{categoryNameBn}</p>
            </div>

            {/* Header Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="bg-green-50 p-4 rounded-xl text-4xl">
                    {categoryIcon}
                </div>
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">{categoryNameBn}</h1>
                    <p className="text-gray-500 mt-1">{categoryProducts.length}টি পণ্যের আজকের দাম ও পরিবর্তন</p>
                </div>
            </div>

            <CategoryList products={categoryProducts}></CategoryList>
        </div>
    );
};

export default CategorieProduct;