"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useSupabaseSession } from "@/hooks/useSupabaseSession";
import Link from "next/link";
import ThemeLogoImageOnly from "@/components/theme-logo-image-only";

// Lucide Icons
import { Mail, Lock, Loader2, Users, LogIn } from "lucide-react";

// Schema Validasi
const registerSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { session, loading } = useSupabaseSession();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const handleRegister = async (data: RegisterFormValues) => {
    try {
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (error) throw error;

      toast({
        title: "Berhasil!",
        description: "Silakan cek email Anda untuk verifikasi.",
        duration: 5000,
      });

      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (error: any) {
      toast({
        title: "Gagal",
        description: error.message || "Terjadi kesalahan saat registrasi",
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  const handleGoogleSignUp = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });

    if (error) {
      toast({
        title: "Gagal",
        description: error.message,
        variant: "destructive",
        duration: 5000,
      });
    }
  };

  if (loading) {
    setTimeout(() => {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <p>Loading...</p>
        </div>
      );
    }, 200);
  } else {
    if (session) {
      setTimeout(() => {
        return router.back();
      }, 100);
    } else {
      return (
        <div className="min-h-[calc(100vh-100px)] flex flex-col items-center justify-center md:px-4">
          <ThemeLogoImageOnly className="w-[200px] mx-auto mb-6 animate-pulse" alt="Masjid Logo" priority={true} />

          {/* Card Form */}
          <div className="w-full max-w-md rounded-xl overflow-hidden transition-all duration-300">
            {/* Header */}
            <div className="px-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Daftar Akun</h2>
            </div>

            {/* Form */}
            <div className="py-8 md:px-8 space-y-6">
              <form onSubmit={handleSubmit(handleRegister)} className="space-y-3">
                {/* Email Input with Tooltip */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="relative group">
                        <div className="absolute h-10 inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 dark:text-gray-400">
                          <Mail className="h-4 w-4" />
                        </div>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Email"
                          {...register("email")}
                          className="w-full pl-10 pr-4 py-3"
                        />
                        {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email.message}</div>}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Masukkan email aktif Anda</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {/* Password Input with Strength Indicator */}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="relative group">
                        <div className="absolute h-10 inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 dark:text-gray-400">
                          <Lock className="h-4 w-4" />
                        </div>
                        <Input
                          id="password"
                          type="password"
                          placeholder="Password"
                          {...register("password")}
                          className="w-full pl-10 pr-4 py-3"
                        />
                        {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password.message}</div>}
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Password minimal 6 karakter</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-800 font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                      Sedang memproses...
                    </>
                  ) : (
                    <>
                      <Users className="mr-2 h-4 w-4" />
                      Daftar
                    </>
                  )}
                </Button>
              </form>

              {/* Divider */}
              <div className="flex items-center justify-between my-4">
                <hr className="w-full border-gray-300 dark:border-gray-700" />
                <span className="mx-4 text-sm text-gray-500 dark:text-gray-400">atau</span>
                <hr className="w-full border-gray-300 dark:border-gray-700" />
              </div>

              {/* Google Sign Up */}
              <Button
                variant="outline"
                className="w-full hover:bg-orange-300 font-semibold"
                onClick={handleGoogleSignUp}
                disabled={isSubmitting}
              >
                <LogIn className="mr-2 h-4 w-4" />
                Daftar dengan Google
              </Button>

              {/* Footer */}
              <div className="text-center mt-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Sudah punya akun?
                  <Link
                    href="/login"
                    className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline underline-offset-2 transition-colors mx-2"
                  >
                    Masuk di sini
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
