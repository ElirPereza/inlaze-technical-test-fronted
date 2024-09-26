import Ticket from "@/components/icons/ticket";
import { LoginDto } from "@/schema/auth";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form"; // Importa useForm
import toast from "react-hot-toast";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginDto>();

  const handleSignIn: SubmitHandler<LoginDto> = async (data) => {
    setLoading(true);
    try {
      const { email, password } = data;
      const responseNextAuth = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
  
      if (responseNextAuth?.error) {
        throw new Error(responseNextAuth.error);
      }
  
      toast.success("Signed in successfully!");
      router.push("/"); 
    } catch (error: unknown) { 

      if (error instanceof Error) {
        toast.error(error.message || "Sign-in failed. Please try again.");
      } else {
        toast.error("Sign-in failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="w-[400px] md:w-[1320px] h-[720px] flex items-center justify-center p-4 bg-transparent backdrop-blur-xl rounded-md border border-gray-600">
      <div className="flex flex-col w-full items-center gap-4">
        <h2 className="text-white mb-10">We love having you back</h2>

        <form onSubmit={handleSubmit(handleSignIn)} className="flex flex-col text-black font-bold w-full items-center gap-4">
          <input
            className="w-full md:w-[400px] h-[46px] rounded-lg p-2"
            type="text"
            placeholder="Email"
            {...register("email", { required: "Email is required" })} 
          />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>} 

          <input
            className="w-full md:w-[400px] h-[46px] rounded-lg p-2"
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })} 
          />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>} 

          <button
            className={`bg-[#F0B90B] flex w-full md:w-[400px] h-[46px] rounded-lg items-center justify-center gap-3 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            type="submit" // Cambia a tipo submit
            disabled={loading}
          >
            {loading ? "Signing in..." : "Continue"}
            <Ticket className="h-4 w-4" />
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-white">
          For any questions, reach out to{" "}
          <a
            href="mailto:support@Quickbetdmovies.com"
            className="text-blue-500 hover:underline"
          >
            support@Quickbetdmovies.com
          </a>
        </p>
      </div>
      <div className="hidden lg:flex w-2/3 h-full">
        <Image
          src="/image-sign-in.png"
          className="flex"
          alt="Sign in illustration"
          width={546}
          height={691}
        />
      </div>
    </div>
  );
};

export default SignIn;
