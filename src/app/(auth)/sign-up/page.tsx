"use client";


import { authClient, signUp } from "@/lib/auth-client";
import {
    Button,
    Description,
    FieldError,
    FieldGroup,
    Fieldset,
    Form,
    Input,
    Label,
    TextField,
} from "@heroui/react";
import Link from "next/link";


const SignUp = () => {
    const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data: Record<string, string> = {}

        formData.forEach((value, key) => {
            data[key] = value.toString();

        });

        const { data: signUpData, error } = await signUp.email({
            name: data.name,
            email: data.email,
            password: data.password,
            callbackURL: "/",
        });



    };
    const handleGoogleSignUp = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
        });
    };

    const handleGithubSignUp = async () => {
        const data = await authClient.signIn.social({
            provider: "github",
        });


    };

    return (
        <div className="container mx-auto flex justify-center mt-10">
            <Form className="w-full max-w-96" onSubmit={onSubmit}>
                <Fieldset>
                    <Fieldset.Legend className="text-center text-2xl font-bold">অ্যাকাউন্ট তৈরি করুন</Fieldset.Legend>
                    <Description className="text-center text-[16px]">বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</Description>
                    <FieldGroup>
                        <TextField
                            isRequired
                            name="name"
                            validate={(value) => {
                                if (value.length < 3) {
                                    return "Name must be at least 3 characters";
                                }
                                return null;
                            }}
                        >
                            <Label>নাম</Label>
                            <Input placeholder="যেমন: রহিম উদ্দিন" />
                            <FieldError />
                        </TextField>
                        <TextField isRequired name="email" type="email">
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

                        <TextField
                            isRequired
                            name="confirmPassword"
                            type="password"
                        >
                            <Label>পাসওয়ার্ড নিশ্চিত করুন</Label>
                            <Input placeholder="আবার লিখুন" />
                            <FieldError />
                        </TextField>

                    </FieldGroup>
                    <Fieldset.Actions className='flex justify-center items-center'>
                        <Button type="submit" className={`bg-green-700 rounded-xl pl-30 pr-30 py-5`}>

                            অ্যাকাউন্ট তৈরি করুন
                        </Button>
                    </Fieldset.Actions>
                    <div className="divider text-[12px]">অথবা</div>
                    <div className="flex items-center">
                        <div>
                            {/* <Image src={'googleicon' } alt="googleicon" width={2} height={2}></Image> */}
                            <Button onClick={handleGoogleSignUp} className='rounded-none bg-white text-black'>Google দিয়ে চালিয়ে যান</Button>
                        </div>
                        <Button onClick={handleGithubSignUp} className='rounded-none  bg-white text-black'>GitHub দিয়ে চালিয়ে যান</Button>

                    </div>

                    <div className="flex items-center justify-center">
                        <p>অ্যাকাউন্ট আছে?</p>
                        <Link href={'/sign-in'}><p className="text-green-800">সাইন ইন করুন</p></Link>
                    </div>
                    <Link href='/'><p className="text-gray-600 flex justify-center items-center">← হোম পেজে ফিরে যান</p></Link>
                </Fieldset>
            </Form>
        </div>
    );
};

export default SignUp;