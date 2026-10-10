"use client";

import Link from "next/link";
import { useState } from "react";

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

const toBanglaNumber = (num: number | string) => {
    const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    return num.toString().replace(/\d/g, (digit) => bnDigits[parseInt(digit)]);
};

const getUnitBn = (unit: string) => {
    if (unit === "kg") return "কেজি";
    return unit;
};

const CategoryList = ({ products }: { products: Product[] }) => {
    const [sortOption, setSortOption] = useState("default");

    const sortedProducts = [...products].sort((a, b) => {
        if (sortOption === "price-asc") return a.today - b.today;
        if (sortOption === "price-desc") return b.today - a.today;
        return 0;
    });
    return (

        <>

            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex justify-end items-center gap-4 mt-6">
                <span className="text-gray-600 font-medium">সাজান</span>
                <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-2 bg-gray-50 text-gray-700 outline-none focus:border-green-500 cursor-pointer"
                >
                    <option value="default">ডিফল্ট</option>
                    <option value="price-asc">দাম (কম থেকে বেশি)</option>
                    <option value="price-desc">দাম (বেশি থেকে কম)</option>
                </select>
            </div>

            <p className="text-gray-500 mt-6 mb-4">
                মোট {toBanglaNumber(sortedProducts.length)}টি পণ্য দেখানো হচ্ছে
            </p>


            {sortedProducts.length === 0 ? (

                <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-lg">এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedProducts.map((p) => (
                        <Link key={p.id} href={`/products/${p.id}`} className="block h-full">
                            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col justify-between h-full cursor-pointer">
                                <div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-3xl bg-gray-50 p-2 rounded-lg">{p.categoryIcon}</span>
                                        <div>
                                            <h2 className="font-bold text-xl text-gray-800">{p.nameBn}</h2>
                                            <p className="text-sm text-gray-500">প্রতি {getUnitBn(p.unit)}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between items-end mt-6">
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1">আজকের দাম</p>
                                        <p className="text-3xl font-bold text-gray-800">
                                            {toBanglaNumber(p.today)} টাকা
                                        </p>
                                    </div>

                                    <span className={`font-semibold px-2 py-1 rounded-md text-sm flex items-center gap-1 ${p.change.dir === "up"
                                        ? "text-red-600 bg-red-50"
                                        : p.change.dir === "down"
                                            ? "text-green-600 bg-green-50"
                                            : "text-gray-900 bg-gray-100"
                                        }`}>
                                        {p.change.dir === "up" ? "▲" : p.change.dir === "down" ? "▼" : "—"}
                                        {toBanglaNumber(p.change.pct)}%
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </>
    );
};

export default CategoryList;