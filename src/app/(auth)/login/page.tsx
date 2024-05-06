import { Metadata } from "next";
import OAuthButtons from "@/components/CustomUI/OAuthButtons";
import LoginForm from "@/components/Forms/LoginForm";
import { EmptyCartSVG, GroceriesSVG, TextLogoSVG } from "@/assets/SVGs";

export const metadata: Metadata = {
  title: 'Login | NextMart',
  description: 'Unlock a world of shopping delights at Next Mart! Your gateway to a seamless shopping experience awaits. Log in securely to access a vast array of products, from trendy fashion to cutting-edge electronics. Discover personalized recommendations and exclusive deals. Join us now and redefine the way you shop!',
}

const Login = () => {
  return (
    <section className='section_style flex_center gap-8 px-4 sm:px-16 w-full h-full my-auto'>
      <GroceriesSVG className='hidden sm:block px-8' />

      <div className="flex justify-around items-center flex-col gap-2 w-full sm:w-1/2 py-4">
        <div className='text-[1.8em] font-medium flex_center sm:gap-4 flex-col sm:flex-row'>
          <h1>Welcome to</h1>
          <TextLogoSVG width="200px" />
        </div>

        <LoginForm />

        <div className=" w-full sm:max-w-md sm:px-4 flex_center gap-2 font-bold">
          <span className='flex w-[15em] h-[2px] bg-border'></span>
          <span>OR</span>
          <span className='flex w-[15em] h-[2px] bg-border'></span>
          L</div>

        <OAuthButtons />
      </div>

      <EmptyCartSVG className='hidden sm:block px-8' />
    </section>
  );
}

export default Login