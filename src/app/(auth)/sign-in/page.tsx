"use client";
import { authClient } from "@/lib/auth-client";
import { Button, Description, Fieldset, FieldError, Form, Input, Label, TextField } from "@heroui/react";

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

    const login = async () => {
        const data = await authClient.signIn.social({
            provider: "google",
        });
    };



    return (
        <div className="container mx-auto flex justify-center">
            <Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
                <div className="text-center">
                    <Fieldset.Legend >সাইন ইন</Fieldset.Legend>
                    <Description>বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।</Description>
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
                <div>
                    <Fieldset.Actions className='flex justify-center items-center'>
                        <Button type="submit" className={`bg-green-700 rounded-xl pl-30 pr-30 py-5`}>

                            সাইন ইন
                        </Button>
                    </Fieldset.Actions>

                </div>
                <div className="divider text-[12px]">অথবা</div>
                <Button onClick={login}>Google Sign In</Button>
            </Form>
            
        </div>
    );
};

export default SignIn;