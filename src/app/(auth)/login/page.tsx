import { Metadata } from "next";
import OAuthButtons from "@/components/CustomUI/OAuthButtons";
import { EmptyCartSVG, GroceriesSVG, TextLogoSVG } from "@/assets/SVGs";
import LoginForm from "@/components/Forms/LoginForm";

export const metadata: Metadata = {
  title: 'Login | NextMart',
  description: 'Unlock a world of shopping delights at Next Mart! Your gateway to a seamless shopping experience awaits. Log in securely to access a vast array of products, from trendy fashion to cutting-edge electronics. Discover personalized recommendations and exclusive deals. Join us now and redefine the way you shop!',
}

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <section className='section_style grid grid-cols-1 sm:grid-cols-3 gap-8 px-4 sm:px-16 w-full h-full my-auto'>
      <GroceriesSVG className='hidden sm:block px-8 max-w-[500px]' />

      <div className="flex justify-around items-center flex-col gap-2 w-full py-4 my-auto">
        <div className='text-[1.8em] font-medium flex_center sm:gap-4 flex-col sm:flex-row'>
          <h1>Welcome to</h1>
          <TextLogoSVG width="200px" />
        </div>

        <LoginForm />

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
