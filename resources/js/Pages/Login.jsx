import { useState } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import Layout from '../Layouts/Layout';
import Logo from '../Components/Logo';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);
    const { flash } = usePage().props;

    const submit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <Layout title="Login - SKYLL" minimal>
            {/* Head removed; Layout handles title */}
            <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gray-50">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-5xl rounded-3xl overflow-hidden shadow-xl flex flex-col md:flex-row bg-white relative"
                >
                    {/* Left Info Panel */}
                    <div className="hidden md:flex w-1/2 bg-primary-600 text-white flex-col justify-center px-12 py-16 relative">
                        <div className="absolute -bottom-12 right-8 w-40 h-40 bg-white/10 rounded-full backdrop-blur-sm" />
                        <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/10 rounded-full backdrop-blur-sm" />
                        <Logo showText={false} className="h-12 w-auto mb-8" />
                        <h2 className="text-3xl font-bold mb-4">Selamat Datang Kembali</h2>
                        <div className="h-1 w-16 bg-white/60 rounded mb-6" />
                        <p className="text-sm leading-relaxed text-white/90 max-w-sm">
                            Masuk untuk melanjutkan latihan simulasi dan kembangkan kapabilitas profesional kamu. Tingkatkan keputusan strategis dan raih lebih banyak XP.
                        </p>
                        <div className="mt-8">
                            <a href="/professions" className="inline-block px-5 py-2 border border-white/70 rounded-full text-sm font-medium hover:bg-white hover:text-primary-600 transition-colors">
                                Jelajahi Profesi
                            </a>
                        </div>
                    </div>

                    {/* Right Form Panel */}
                    <div className="w-full md:w-1/2 px-8 md:px-12 py-12 relative">
                        <div className="absolute -right-10 top-1/2 -translate-y-1/2 hidden md:block w-24 h-24 bg-gray-100 rounded-2xl" />
                        <div className="flex justify-between items-start mb-8">
                            <h1 className="text-2xl font-semibold text-gray-800">Masuk</h1>
                            <a href="/" className="text-xs font-medium text-gray-500 hover:text-primary-600 transition-colors">Kembali ke Beranda</a>
                        </div>

                        {flash?.error && (
                            <div className="mb-6 p-4 rounded-lg border border-red-200 bg-red-50 text-sm text-red-700" role="alert">
                                {flash.error}
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    autoComplete="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    aria-invalid={errors.email ? 'true' : 'false'}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                                    required
                                />
                                {errors.email && <p className="mt-1 text-sm text-red-600" role="alert">{errors.email}</p>}
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                    Kata Sandi
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        autoComplete="current-password"
                                        value={data.password}
                                        onChange={e => setData('password', e.target.value)}
                                        aria-invalid={errors.password ? 'true' : 'false'}
                                        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(p => !p)}
                                        className="absolute inset-y-0 right-3 flex items-center text-xs font-medium text-gray-500 hover:text-gray-700"
                                        aria-label={showPassword ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                                    >
                                        {showPassword ? 'Sembunyi' : 'Tampil'}
                                    </button>
                                </div>
                                {errors.password && <p className="mt-1 text-sm text-red-600" role="alert">{errors.password}</p>}
                                <div className="mt-2 text-right">
                                    <a href="/password/forgot" className="text-xs text-primary-600 hover:text-primary-500 font-medium">Lupa kata sandi?</a>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    checked={data.remember}
                                    onChange={e => setData('remember', e.target.checked)}
                                    className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                                />
                                <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                                    Ingat saya
                                </label>
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full h-12 rounded-lg bg-primary-600 hover:bg-primary-500 text-white font-semibold shadow-sm disabled:opacity-50 transition-colors"
                            >
                                {processing ? 'Memproses...' : 'Masuk'}
                            </button>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-sm text-gray-600">
                                Belum punya akun?{' '}
                                <a href="/register" className="text-primary-600 hover:text-primary-500 font-medium">
                                    Daftar sekarang
                                </a>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </Layout>
    );
}
