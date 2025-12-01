import { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { motion } from 'framer-motion';
import Layout from '../Layouts/Layout';
import Logo from '../Components/Logo';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/register');
    };

    return (
        <Layout title="Daftar - SKYLL" minimal>
            {/* Head removed; Layout supplies title */}
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
                        <h2 className="text-3xl font-bold mb-4">Buat Akun Baru</h2>
                        <div className="h-1 w-16 bg-white/60 rounded mb-6" />
                        <p className="text-sm leading-relaxed text-white/90 max-w-sm">
                            Mulai perjalanan belajar berbasis skenario. Bangun portofolio skill, kumpulkan XP dan lencana, serta dapatkan masukan AI yang terarah.
                        </p>
                        <div className="mt-8">
                            <a href="/login" className="inline-block px-5 py-2 border border-white/70 rounded-full text-sm font-medium hover:bg-white hover:text-primary-600 transition-colors">
                                Sudah punya akun?
                            </a>
                        </div>
                    </div>

                    {/* Right Form Panel */}
                    <div className="w-full md:w-1/2 px-8 md:px-12 py-12 relative">
                        <div className="absolute -right-10 top-1/2 -translate-y-1/2 hidden md:block w-24 h-24 bg-gray-100 rounded-2xl" />
                        <div className="flex justify-between items-start mb-8">
                            <h1 className="text-2xl font-semibold text-gray-800">Daftar</h1>
                            <a href="/" className="text-xs font-medium text-gray-500 hover:text-primary-600 transition-colors">Kembali ke Beranda</a>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                    Nama Lengkap
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                                    required
                                />
                                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                                    required
                                />
                                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                    Kata Sandi
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={e => setData('password', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                                    required
                                />
                                {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                            </div>

                            <div>
                                <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-2">
                                    Konfirmasi Kata Sandi
                                </label>
                                <input
                                    id="password_confirmation"
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={e => setData('password_confirmation', e.target.value)}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full h-12 rounded-lg bg-primary-600 hover:bg-primary-500 text-white font-semibold shadow-sm disabled:opacity-50 transition-colors"
                            >
                                {processing ? 'Membuat akun...' : 'Buat Akun'}
                            </button>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-sm text-gray-600">
                                Sudah punya akun?{' '}
                                <a href="/login" className="text-primary-600 hover:text-primary-500 font-medium">
                                    Masuk di sini
                                </a>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </Layout>
    );
}
