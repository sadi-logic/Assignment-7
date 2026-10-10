"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

const ProfilePage = () => {
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();

    // State for the form input
    const [name, setName] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);

    const user = session?.user;

    // Pre-fill the input with the user's current name when session loads
    useEffect(() => {
        if (user?.name) {
            setName(user.name);
        }
    }, [user]);

    // Handle Sign Out
    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/sign-in");
                },
            },
        });
    };

    // Handle Form Update
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsUpdating(true);

        // Update user profile in Better Auth
        const { data, error } = await authClient.updateUser({
            name: name,
        });

        setIsUpdating(false);

        if (error) {
            alert(error.message || "Failed to update profile");
            return;
        }

        alert("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
        router.refresh(); // Refresh to show new data in Navbar
    };

    // Loading State
    if (isPending || !user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-500">লোড হচ্ছে...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] py-10 px-4">
            <div className="container mx-auto max-w-2xl">
                
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">আমার প্রোফাইল</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        আপনার অ্যাকাউন্টের তথ্য এখান লিখুন
                    </p>
                </div>

                {/* 1. User Info Card */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-4 w-full">
                        {/* Avatar with fallback */}
                        <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 bg-green-600 flex items-center justify-center">
                            {user.image ? (
                                <Image 
                                    src={user.image} 
                                    alt={user.name || "User"} 
                                    width={56} 
                                    height={56} 
                                    className="object-cover w-full h-full"
                                />
                            ) : (
                                <span className="text-white font-bold text-xl">
                                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                                </span>
                            )}
                        </div>
                        <div>
                            <h2 className="font-bold text-lg text-gray-800">{user.name || "Unknown User"}</h2>
                            <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                    </div>

                    {/* Sign Out Button */}
                    <button
                        onClick={handleSignOut}
                        className=" gap-2 border border-red-200 text-red-600 font-semibold px-8 py-2 rounded-xl hover:bg-red-50 transition-colors w-full sm:w-auto justify-center"
                    >
                        {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                        </svg> */}

                       ↩ সাইন আউট
                    </button>
                </div>

                {/* 2. Update Info Form */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mt-6">
                    <h3 className="font-bold text-lg text-gray-800 mb-6">তথ্য</h3>

                    <form onSubmit={handleUpdate}>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">নাম</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
                                placeholder="আপনার নাম লিখুন"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isUpdating}
                            className="w-full bg-[#0A5C36] hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-70"
                        >
                            {isUpdating ? "আপডেট হচ্ছে..." : "আপডেট"}
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default ProfilePage;