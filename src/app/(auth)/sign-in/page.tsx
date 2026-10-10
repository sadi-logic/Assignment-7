"use client";
import { authClient } from "@/lib/auth-client";
import { Button, Description, Fieldset, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import Link from "next/link";
const SignIn = () => {

    const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data: Record<string, string> = {};

        formData.forEach((value, key) => {
            data[key] = value.toString();
        });

        const { data: signInData, error } = await authClient.signIn.email({
            email: data.email,
            password: data.password,
            callbackURL: "/",
        });

        alert(`Form submitted with: ${JSON.stringify(data, null, 2)}`);
    }

    const handleGoogleSignIn = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
        });
    };

    const handleGithubSignIn = async () => {
        const data = await authClient.signIn.social({
            provider: "github",
        });


    };



    return (
        <div className="container mx-auto flex justify-center">
            <Form className="flex w-96 flex-col gap-4 max-w-sm" onSubmit={onSubmit}>
                <div className="flex flex-col justify-center items-center">
                    <Fieldset.Legend className="text-center text-2xl font-bold mt-10" >সাইন ইন</Fieldset.Legend>
                    <Description className="text-center">বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।</Description>
                </div>
                <TextField
                    isRequired
                    name="email"
                    type="email"
                    validate={(value) => {
                        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                            return "Please enter a valid email address";
                        }
                        return null;
                    }}
                >
                    <Label>ইমেইল</Label>
                    <Input placeholder="you@example.com" />
                    <FieldError />
                </TextField>
                <TextField
                    isRequired
                    minLength={8}
                    name="password"
                    type="password"
                    validate={(value) => {
                        if (value.length < 8) {
                            return "Password must be at least 8 characters";
                        }
                        if (!/[A-Z]/.test(value)) {
                            return "Password must contain at least one uppercase letter";
                        }
                        if (!/[0-9]/.test(value)) {
                            return "Password must contain at least one number";
                        }
                        return null;
                    }}
                >
                    <Label>পাসওয়ার্ড</Label>
                    <Input placeholder="কমপক্ষে ৮ অক্ষর" />
                    <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
                    <FieldError />
                </TextField>

                <Fieldset.Actions className='flex justify-center'>
                    <Button type="submit" className={`bg-green-700 rounded-xl pl-40 pr-40 py-5`}>

                        সাইন ইন
                    </Button>
                </Fieldset.Actions>


                <div className="divider text-[12px]">অথবা</div>
                <div className="flex items-center">
                    <div>
                        {/* <Image src={'googleicon' } alt="googleicon" width={2} height={2}></Image> */}
                        <Button onClick={handleGoogleSignIn} className='rounded-none hover:bg-green-200 bg-white text-black'>Google দিয়ে চালিয়ে যান</Button>
                    </div>
                    <Button onClick={handleGithubSignIn} className='rounded-none  hover:bg-green-200 bg-white text-black'>GitHub দিয়ে চালিয়ে যান</Button>
                </div>
                
                <div className="flex items-center justify-center">
                    <p>অ্যাকাউন্ট নেই?</p>
                    <Link href={'/sign-up'}><p className="text-green-800">সাইন আপ করুন</p></Link>
                </div>
                <Link href='/'><p className="text-gray-600 flex justify-center items-center">← হোম পেজে ফিরে যান</p></Link>
            </Form>

        </div>
    );
};

export default SignIn;