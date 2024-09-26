import Letter from "@/components/icons/letter";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "@/utils/auth";
import { RegisterDto, RegisterZodSchema } from "@/schema/auth";
import toast from "react-hot-toast"; // Importa toast
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterDto>({
    resolver: zodResolver(RegisterZodSchema),
  });

  const router = useRouter(); 

  const onSubmit = async (data: RegisterDto) => {
    setLoading(true);
    try {
  
      await registerUser(data);
      
      toast.success("Registration successful!");

      const responseNextAuth = await signIn("credentials", {
        email: data.email,
        password: data.password, 
        redirect: false,
      });

      if (responseNextAuth?.error) {
        toast.error(responseNextAuth.error);
        return;
      }

      router.push("/");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full md:w-[1320px] h-[720px] flex items-center justify-center p-4 bg-transparent backdrop-blur-xl rounded-md border border-gray-600">
      <div className="flex flex-col w-full items-center gap-10">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-4 text-black font-bold"
        >
          <input
            className={`w-full md:w-[400px] h-[46px] rounded-lg p-2 ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            type="text"
            placeholder="Name"
            {...register("name")}
          />
          {errors.name && (
            <span className="text-red-500">{errors.name.message}</span>
          )}

          <input
            className={`w-full md:w-[400px] h-[46px] rounded-lg p-2 ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}

          <input
            className={`w-full md:w-[400px] h-[46px] rounded-lg p-2 ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}

          <button
            type="submit"
            className={`bg-[#F0B90B] flex w-[400px] h-[46px] rounded-lg items-center justify-center gap-3 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading} 
          >
            {loading ? "Registering..." : "Register"}
            <Letter className="h-4 w-4" />
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
          src="/image-login.png"
          className="flex"
          alt="Login illustration"
          width={546}
          height={691}
        />
      </div>
    </div>
  );
};

export default SignUp;
