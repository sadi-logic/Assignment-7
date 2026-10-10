'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@heroui/react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

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
    const [categories, setCategories] = useState<ICategories[]>([])

    useEffect(() => {
        const today = new Date().toLocaleDateString("bn-BD", {
            dateStyle: "full",
        });
        setDate(today);
    }, []);

    useEffect(() => {
        fetch('https://api.abcz.workers.dev/api/bazardor/categories')
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
    }

    const user = session?.user;

    return (
        <div>


            <div className="container mx-auto flex justify-between items-center">
                <div className="flex justify-center items-center gap-2">
                    <div className="bg-green-600 rounded-xl p-3 w-fit">
                        <Image src="/logo-icon.png" alt="logo" width={20} height={20} />
                    </div>
                    <div>
                        <Link href="/" className="font-bold text-[20px]">বাজার দর</Link>
                        <p className="text-[12px] text-[#3b3d3b]">{date}</p>
                    </div>
                </div>

                <div>

                    {isPending ? (
                        <div className="h-10 w-10"></div>
                    ) : user ? (
                        <div className="flex items-center gap-4">

                            <Link href={"/profile"}>
                                <div className="avatar">
                                    <div className="ring-primary ring-offset-base-100 w-10 h-10 rounded-full ring-2 ring-offset-2 flex items-center justify-center overflow-hidden">


                                        {user.image ? (
                                            <Image
                                                alt="user"
                                                width={40}
                                                height={40}
                                                src={user.image}
                                                className="rounded-full object-cover"
                                            />
                                        ) : (

                                            <div className="w-full h-full bg-green-600 text-white flex items-center justify-center font-bold">
                                                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                                            </div>
                                        )}

                                    </div>
                                </div>
                            </Link>

                            <Button onClick={handleSignOut} variant="outline">
                                Log out
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link href='/sign-in' className="border-none rounded-xl mr-3">
                                সাইন ইন
                            </Link>
                            <Link href='/sign-up'>
                                <Button className="bg-[#05893E] rounded-xl text-white">
                                    সাইন আপ
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
            <div className="container mx-auto flex mt-6">
                {
                    categories.map(cat => (

                        <Link href={`/category/${cat?.slug}`} key={cat?.id}>
                            <ul className="flex items-center hover:text-green-600 transition-colors cursor-pointer">
                                <li className="mr-1">{cat.icon}</li>
                                <li className="mr-4">{cat.nameBn}</li>
                            </ul>
                        </Link>
                    ))
                }
            </div>
        </div>
    );
};

export default Navbar;