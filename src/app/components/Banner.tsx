"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
const Banner = () => {
      const [date, setDate] = useState("");

    useEffect(() => {
        const today = new Date().toLocaleDateString("bn-BD", {
            dateStyle: "full",
        });
        setDate(today);
    }, []);

    return (

        <section className="bg-[#F2FCF5] rounded-3xl p-8 md:p-12 border border-gray-100 flex flex-col md:flex-row items-center gap-10 my-8">
            
            {/* Left Side: Text Content */}
            <div className="flex-1 space-y-6 w-full">
                {/* Date Badge */}
                <span className="inline-block bg-[#E6F4EA] text-[#05893E] text-sm md:text-base px-4 py-1.5 rounded-full font-medium">
                    {date || "লোড হচ্ছে..."}
                </span>

                {/* Main Title */}
                <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                    আজকের বাজার দাম এক নজরে
                </h1>

                {/* Description */}
                <p className="text-gray-600 text-base md:text-lg leading-relaxed max-w-2xl">
                    চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
                </p>

                {/* CTA Button */}
                <Link 
                    href="#all-products" 
                    className="inline-block bg-[#05893E] hover:bg-green-700 text-white font-medium px-6 py-3 rounded-xl transition-colors mt-2"
                >
                    সব পণ্য দেখুন
                </Link>
            </div>

            {/* Right Side: Image */}
            <div className="flex-1 w-full flex justify-center md:justify-end">
                <div className="relative w-full max-w-[350px] h-[250px] md:h-[300px]">
                    <Image 
                        src="/bazar-hero.png" 
                        alt="Bazar Hero Illustration" 
                        fill
                        className="object-contain"
                        priority
                    />
                </div>
            </div>

        </section>
       
    );
};

export default Banner;