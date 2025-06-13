"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSupabaseSession, supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useSupabaseSession } from "@/hooks/useSupabaseSession";
import Link from "next/link";
import ThemeLogoImageOnly from '@/components/theme-logo-image-only';

import { Mail, Lock, Loader2, LogIn } from "lucide-react";

// Schema Validasi
const loginSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { session, loading } = useSupabaseSession();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    // Check session
    const checkSession = async () => {
      const { session }: any = await getSupabaseSession();
      if (session) router.push("/dashboard");
    };

    checkSession();
  }, []);

  const handleLogin = async (data: LoginFormValues) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) throw error;

      toast({
        title: "Berhasil!",
        description: "Selamat datang kembali.",
        duration: 3000,
      });

      setTimeout(() => {
        router.refresh();
        router.push("/dashboard");
      }, 1000);
    } catch (error: any) {
      toast({
        title: "Gagal",
        description: error.message || "Terjadi kesalahan saat login",
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
        <div className="min-h-[calc(100vh-100px)] flex flex-col items-center justify-center px-4 py-12">
          <ThemeLogoImageOnly className="w-[200px] mx-auto mb-6 animate-pulse" alt="Masjid Logo" priority={true} />

          {/* Card Form */}
          <div className="w-full max-w-md rounded-xl overflow-hidden transition-all duration-300">
            {/* Header */}
            <div className="px-8 text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Masuk ke Akun Anda</h2>
            </div>

            {/* Form */}
            <div className="p-8 space-y-6">
              <form onSubmit={handleSubmit(handleLogin)} className="space-y-3">
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

                {/* Password Input with Tooltip */}
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
                  className="w-full bg-green-600 hover:bg-green-800 font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                      Sedang memproses...
                    </>
                  ) : (
                    <>
                      <LogIn className="mr-2 h-4 w-4" />
                      Masuk
                    </>
                  )}
                </Button>
              </form>

              {/* Footer */}
              <div className="text-center mt-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Belum punya akun?
                  <Link
                    href="/register"
                    className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline underline-offset-2 transition-colors mx-2"
                  >
                    Daftar di sini
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
