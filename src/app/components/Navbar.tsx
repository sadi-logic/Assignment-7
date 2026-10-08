'use client'
import Image from "next/image";
import Logo from "../../../public/logo-icon.png"
import { useEffect, useState } from "react";
import { Button } from "@heroui/react";


const Navbar = () => {
    const [date, setDate] = useState("");

    useEffect(() => {
        const today = new Date().toLocaleDateString("bn-BD", {
            dateStyle: "full",
        });
        setDate(today);
    }, []);

    return (
        <div className="container mx-auto flex justify-between items-center">
            <div className="flex justify-center items-center gap-2">
                <div className="bg-green-600 rounded-xl p-3 w-fit">
                    <Image src={Logo} alt="logo" width={20} height={20} />
                </div>
                <div>
                    <h1 className="font-bold text-[20px]">বাজার দর</h1>
                    <p className="text-[12px] text-[#3b3d3b]">{date}</p>
                </div>
            </div>
            <div>
                <Button className="border-none rounded-xl mr-3">সাইন ইন</Button>
                <Button className="bg-[#05893E] rounded-xl  text-white">সাইন আপ</Button>
                {/* <button className="btn border-none rounded-xl mr-3">সাইন ইন</button> */}
                {/* <button className="btn bg-[#05893E] rounded-xl text-white">সাইন আপ</button> */}
            </div>

        </div>

    );
};

export default Navbar;