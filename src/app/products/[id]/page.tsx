import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
export const instant = false;
interface Market {
    market: string;
    division: string;
    min: number;
    max: number;
}

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
    markets: Market[];
}

const toBanglaNumber = (num: number | string) => {
    const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return num.toString().replace(/\d/g, (digit) => bnDigits[parseInt(digit)]);
};

const getUnitBn = (unit: string) => {
    if (unit === "kg") return "কেজি";
    return unit;
};

export default async function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
   
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/sign-in");
    }

    const { id } = await params;

    
    let product: Product | null = null;
    let error = false;

       try {
        const res = await fetch(`https://api.abcz.workers.dev/api/bazardor/products/${id}`, {
            next: { revalidate: 60 }
        });

       
        if (!res.ok) {
            throw new Error(`API returned status ${res.status}`);
        }

       
        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("API did not return JSON. It returned HTML instead.");
        }

        product = await res.json();
    } catch (err) {
        console.error("API Error:", err);
        error = true;
    }

  
    if (error || !product) {
        return (
            <div className="container mx-auto py-20 text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">পণ্যটি পাওয়া যায়নি!</h1>
                <Link href="/" className="text-green-600 hover:underline">হোম পেজে ফিরে যান</Link>
            </div>
        );
    }

   
    const { dir, pct } = product.change;
    const minPrice = product.markets.length > 0 ? Math.min(...product.markets.map(m => m.min)) : 0;
    const maxPrice = product.markets.length > 0 ? Math.max(...product.markets.map(m => m.max)) : 0;
    const avgPrice = product.today; 

    
    return (
        <div className="container mx-auto py-8 px-4 max-w-5xl">
            
            
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
                <Link href={'/'} className="hover:text-green-600">হোম</Link>
                <span>{'>'}</span> 
                <Link href={`/category/${product.category}`} className="hover:text-green-600">{product.categoryNameBn}</Link>
                <span>{'>'}</span>
                <p className="font-medium text-gray-800">{product.nameBn}</p>
            </div>

            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex items-start md:items-center gap-5 w-full md:w-auto">
                    <span className="text-5xl bg-green-50 p-4 rounded-2xl">{product.categoryIcon}</span>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{product.nameBn}</h1>
                        <p className="text-gray-500 mt-1 font-medium">
                            প্রতি {getUnitBn(product.unit)} • {product.categoryNameBn}
                        </p>
                        <p className="text-sm text-gray-400 mt-2">
                            বাজারভিত্তিক তুলনামূলক দাম দেখতে বাজারহাট দেখুন।
                        </p>
                    </div>
                </div>

                <div className=" tex p-5 rounded-2xl flex flex-col items-center justify-center min-w-[180px] shadow-lg">
                    <p className="text-sm text-[#1D271F] mb-1">আজকের দাম</p>
                    <div className="flex items-center gap-1">
                        <span className="text-4xl font-bold">{toBanglaNumber(product.today)}</span>
                    </div>
                    <span className="text-sm font-medium">টাকা / {getUnitBn(product.unit)}</span>
                    <span className={`mt-3 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 ${
                        dir === "up" ? " text-red-600" : dir === "down" ? "text-green-600 " : "bg-gray-500 text-white"
                    }`}>
                        {dir === "up" ? "▲" : dir === "down" ? "▼" : "—"} {toBanglaNumber(Math.abs(pct))}%
                    </span>
                </div>
            </div>

           
            <div className="mt-10">
                <h2 className="text-xl font-bold text-gray-800 mb-4">দামের সারসংক্ষেপ</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <p className="text-sm text-gray-500 mb-2">সর্বনিম্ন দাম</p>
                        <p className="text-3xl font-bold text-green-700">{toBanglaNumber(minPrice)} টাকা</p>
                        <p className="text-xs text-gray-400 mt-2">বাজারের সর্বনিম্ন দাম</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <p className="text-sm text-gray-500 mb-2">সর্বোচ্চ দাম</p>
                        <p className="text-3xl font-bold text-red-600">{toBanglaNumber(maxPrice)} টাকা</p>
                        <p className="text-xs text-gray-400 mt-2">বাজারের সর্বোচ্চ দাম</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <p className="text-sm text-gray-500 mb-2">গড় দাম</p>
                        <p className="text-3xl font-bold text-gray-800">{toBanglaNumber(avgPrice)} টাকা</p>
                        <p className="text-xs text-gray-400 mt-2">আজকের গড় বাজার দাম</p>
                    </div>
                </div>
            </div>

           
            <div className="mt-10">
                <h2 className="text-xl font-bold text-gray-800 mb-4">বাজারভিত্তিক আজকের দাম</h2>
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-[#F2FCF5] text-gray-700 text-sm border-b border-gray-100">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">বাজার</th>
                                    <th className="px-6 py-4 font-semibold">বিভাগ</th>
                                    <th className="px-6 py-4 font-semibold text-right">সর্বনিম্ন</th>
                                    <th className="px-6 py-4 font-semibold text-right">সর্বোচ্চ</th>
                                    <th className="px-6 py-4 font-semibold text-right">গড়</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-500">
                                {product.markets.map((m, index) => {
                                    const avg = Math.round((m.min + m.max) / 2);
                                    return (
                                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 text-gray-800 font-medium">{m.market}</td>
                                            <td className="px-6 py-4 text-gray-500">{m.division}</td>
                                            <td className="px-6 py-4 text-right font-semibold text-gray-700">{toBanglaNumber(m.min)} টাকা</td>
                                            <td className="px-6 py-4 text-right font-semibold text-gray-700">{toBanglaNumber(m.max)} টাকা</td>
                                            <td className="px-6 py-4 text-right font-bold text-black">{toBanglaNumber(avg)} টাকা</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}