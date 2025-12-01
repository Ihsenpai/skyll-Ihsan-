import { Head, Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import DashboardLayout from '../Layouts/DashboardLayout';

export default function Dashboard({ user, stats, recentSimulations, badges }) {
    return (
        <DashboardLayout user={user}>
            <Head title="Dashboard - SKYLL" />
            
            <div className="p-6">
                {/* Welcome Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">Selamat Datang, {user.name}!</h1>
                    <p className="text-gray-600">Lanjutkan perjalanan belajar Anda dan capai target karier impian</p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-sky-50 rounded-lg">
                                <svg className="w-6 h-6 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Total XP</p>
                                <p className="text-2xl font-bold text-gray-900">{stats?.total_xp?.toLocaleString() || 0}</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-50 rounded-lg">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Simulasi Selesai</p>
                                <p className="text-2xl font-bold text-gray-900">{stats?.completed_simulations || 0}</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-amber-50 rounded-lg">
                                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Lencana</p>
                                <p className="text-2xl font-bold text-gray-900">{stats?.badges_count || 0}</p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Recent Activity */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-gray-900">Aktivitas Terakhir</h2>
                                <Link href="/my-simulations" className="text-sm text-sky-600 hover:text-sky-700 font-medium">
                                    Lihat Semua
                                </Link>
                            </div>
                            <div className="divide-y divide-gray-100">
                                {recentSimulations && recentSimulations.length > 0 ? (
                                    recentSimulations.map((simulation) => (
                                        <div key={simulation.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3 flex-1">
                                                    <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
                                                        <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                        </svg>
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <p className="font-medium text-gray-900 truncate">{simulation.profession?.name}</p>
                                                        <p className="text-sm text-gray-500">
                                                            {simulation.completed_at ? new Date(simulation.completed_at).toLocaleDateString('id-ID', { 
                                                                day: 'numeric', 
                                                                month: 'short', 
                                                                year: 'numeric',
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            }) : 'Sedang berlangsung'}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="text-right ml-4">
                                                    {simulation.grade ? (
                                                        <>
                                                            <p className="text-lg font-bold text-sky-600">{simulation.grade}</p>
                                                            <p className="text-xs text-gray-500">{simulation.total_score} poin</p>
                                                        </>
                                                    ) : (
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                                                            Sedang berlangsung
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="px-6 py-12 text-center">
                                        <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <p className="text-gray-600 mb-2">Belum ada simulasi</p>
                                        <Link href="/professions" className="text-sky-600 hover:text-sky-700 font-medium text-sm">
                                            Mulai simulasi pertama Anda
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Badges & Quick Actions */}
                    <div className="space-y-6">
                        {/* Latest Badges */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-gray-900">Lencana Terbaru</h2>
                                <Link href="/badges" className="text-sm text-sky-600 hover:text-sky-700 font-medium">
                                    Semua
                                </Link>
                            </div>
                            <div className="p-6">
                                {badges && badges.length > 0 ? (
                                    <div className="grid grid-cols-3 gap-4">
                                        {badges.slice(0, 6).map((badge) => (
                                            <div key={badge.id} className="text-center">
                                                <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-white text-xl">
                                                    {badge.icon || '🏆'}
                                                </div>
                                                <p className="text-xs text-gray-600 truncate">{badge.name}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-6">
                                        <div className="w-16 h-16 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
                                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                            </svg>
                                        </div>
                                        <p className="text-sm text-gray-600">Belum ada lencana</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Quick Action */}
                        <div className="bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl p-6 text-white">
                            <h3 className="text-lg font-semibold mb-2">Siap Tantangan Baru?</h3>
                            <p className="text-sky-100 text-sm mb-4">
                                Jelajahi berbagai profesi atau coba Tantangan Harian
                            </p>
                            <div className="flex items-center gap-3 flex-wrap">
                                <Link
                                    href="/professions"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-white text-sky-600 rounded-lg font-medium hover:bg-sky-50 transition-colors"
                                >
                                    Mulai Sekarang
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                                <Link
                                    href="/daily-challenge"
                                    className="inline-flex items-center gap-2 px-4 py-2 bg-sky-50/20 text-white rounded-lg font-medium hover:bg-sky-50/30 transition-colors border border-white/20"
                                >
                                    Tantangan Harian
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3M5 11h14M5 19h14M5 11a2 2 0 012-2h10a2 2 0 012 2M5 19a2 2 0 002 2h10a2 2 0 002-2" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
