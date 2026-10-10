'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { toast } from "react-toastify";

interface ICategories {
    id: string,
    nameBn: string,
    slug: string,
    icon: string,
}

const Navbar = () => {
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();

    const [date, setDate] = useState("");
    const pathname = usePathname();
    const [categories, setCategories] = useState<ICategories[]>([])

    useEffect(() => {
        const today = new Date().toLocaleDateString("bn-BD", {
            dateStyle: "full",
        });
        setDate(today);
    }, []);

    useEffect(() => {
        fetch('https://openapi.programming-hero.com/api/bazardor/categories')
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(err => console.log(err))
    }, [])
    console.log(categories);

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/sign-in");
                },
            },
        });
        toast.warning('You Are Signed Out')
    }

    const user = session?.user;

    return (
        <div className="w-full">


            <div className="container mx-auto flex justify-between items-center py-3">
                <div className="flex justify-center items-center gap-2">
                    <div className="bg-green-600 rounded-xl p-2 md:p-3 w-fit">
                        <Image src="/logo-icon.png" alt="logo" width={20} height={20} />
                    </div>
                    <div>
                        <Link href="/" className="font-bold text-[18px] md:text-[20px]">বাজার দর</Link>
                        <p className="text-[10px] md:text-[12px] text-[#3b3d3b]">{date}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2 md:gap-4">

                    {isPending ? (
                        <div  className="h-8 w-8 md:h-10 md:w-10"></div>
                    ) : user ? (
                        <div className="flex items-center gap-4">

                            <Link href={"/profile"}>
                                <div className="avatar">
                                    <div className="ring-primary ring-offset-base-100 w-8 h-8 md:w-10 md:h-10 rounded-full ring-2 ring-offset-2 flex items-center justify-center overflow-hidden">


                                        {user.image ? (
                                            <Image
                                                alt="user"
                                                width={40}
                                                height={40}
                                                src={user.image}
                                                className="rounded-full object-cover"
                                            />
                                        ) : (

                                            <div className="w-full h-full bg-green-600 text-white flex items-center justify-center font-bold text-sm">
                                                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                                            </div>
                                        )}

                                    </div>
                                </div>
                            </Link>

                            <Button onClick={handleSignOut} variant="outline" size="sm" className="text-xs md:text-sm" >
                                Log out
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link href='/sign-in' className="border-none rounded-xl text-sm md:text-base">
                                সাইন ইন
                            </Link>
                            <Link href='/sign-up'>
                                <Button className="bg-[#05893E] rounded-xl text-white text-xs md:text-sm">
                                    সাইন আপ
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
            <div className="container mx-auto flex mt-6 md:mt-4">
                {categories.map(cat => {
                    const href = `/category/${cat.slug}`;
                    const isActive = pathname === href;

                    return (
                        <Link href={href} key={cat.id}>
                            <div
                                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg transition-all cursor-pointer text-sm md:text-base ${isActive
                                    ? "bg-[#05893E] text-white shadow-sm"
                                    : "text-gray-700 hover:text-green-600 hover:bg-gray-50"
                                    }`}
                            >
                                <span>{cat.icon}</span>
                                <span>{cat.nameBn}</span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default Navbar;