import { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

import Input from "@/components/CustomUI/Input";
import OAuthButtons from "@/components/CustomUI/OAuthButtons";
import SubmitButton from "@/components/CustomUI/SubmitButton";
import { EmptyCartSVG, GroceriesSVG, TextLogoSVG } from "@/assets/SVGs";

export const metadata: Metadata = {
  title: 'Login | NextMart',
  description: 'Unlock a world of shopping delights at Next Mart! Your gateway to a seamless shopping experience awaits. Log in securely to access a vast array of products, from trendy fashion to cutting-edge electronics. Discover personalized recommendations and exclusive deals. Join us now and redefine the way you shop!',
}

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {

  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/");
  };



  return (
    <section className='section_style flex justify-center items-end gap-8 px-4 sm:px-16 w-full h-full my-auto'>
      <GroceriesSVG className='hidden sm:block px-8 max-w-[500px]' />

      <div className="flex justify-around items-center flex-col gap-2 w-full sm:w-1/2 py-4 my-auto">
        <div className='text-[1.8em] font-medium flex_center sm:gap-4 flex-col sm:flex-row'>
          <h1>Welcome to</h1>
          <TextLogoSVG width="200px" />
        </div>

        <form action={signIn} className='bg-baseClr py-4 sm:p-4 pt-8 flex flex-col gap-8 sm:gap-4 w-full sm:max-w-md'>
          <Input type='email' name="email" label='Email' placeholder='example@email.com' />

          <div className="flex flex-col gap-2">
            <Input type='password' name="password" label='Password' placeholder='Enter Password' isPassword />
            <div className="text-primaryClr text-[0.9em] sm:text-[0.8em] w-full flex justify-end">Forgot Password?</div>
          </div>

          <SubmitButton />

          <div className="w-full flex gap-2 justify-center">
            New to NextMart?
            <Link
              href='/register'
              className='text-primaryClr font-bold capitalize tracking-wider'>
              Register
            </Link>
          </div>
        </form>

        <div className=" w-full sm:max-w-md sm:px-4 flex_center gap-2 text-primaryClr font-medium">
          <span className='flex w-[15em] h-[2px] bg-secondaryDarkClr'></span>
          <span>OR</span>
          <span className='flex w-[15em] h-[2px] bg-secondaryDarkClr'></span>
        </div>

        <OAuthButtons />
      </div>

      <EmptyCartSVG className='hidden sm:block px-8 max-w-[500px]' />
    </section>
  );
}
