import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import DashboardLayout from '../Layouts/DashboardLayout';

export default function Settings({ user }) {
    const [activeTab, setActiveTab] = useState('profile');
    
    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put('/settings/profile');
    };

    const tabs = [
        { id: 'profile', name: 'Profil', icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
        )},
        { id: 'security', name: 'Keamanan', icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
        )},
        { id: 'notifications', name: 'Notifikasi', icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
        )},
        { id: 'preferences', name: 'Preferensi', icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
        )},
    ];

    return (
        <DashboardLayout user={user}>
            <Head title="Pengaturan - SKYLL" />
            
            <div className="p-6">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">Pengaturan</h1>
                    <p className="text-gray-600">Kelola akun dan preferensi Anda</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Tabs Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2">
                            <nav className="space-y-1">
                                {tabs.map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                                            activeTab === tab.id
                                                ? 'bg-sky-50 text-sky-600'
                                                : 'text-gray-700 hover:bg-gray-50'
                                        }`}
                                    >
                                        {tab.icon}
                                        <span className="font-medium">{tab.name}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            {activeTab === 'profile' && (
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 mb-6">Informasi Profil</h2>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Foto Profil
                                            </label>
                                            <div className="flex items-center gap-4">
                                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center text-white font-bold text-2xl">
                                                    {user.name.charAt(0).toUpperCase()}
                                                </div>
                                                <button type="button" className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                                                    Ubah Foto
                                                </button>
                                            </div>
                                        </div>

                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                                Nama Lengkap
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                                            />
                                            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                                            />
                                            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                                        </div>

                                        <div className="pt-4 border-t border-gray-200">
                                            <button
                                                type="submit"
                                                disabled={processing}
                                                className="px-6 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors disabled:opacity-50"
                                            >
                                                Simpan Perubahan
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}

                            {activeTab === 'security' && (
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 mb-6">Keamanan Akun</h2>
                                    <form className="space-y-6">
                                        <div>
                                            <label htmlFor="current_password" className="block text-sm font-medium text-gray-700 mb-2">
                                                Password Saat Ini
                                            </label>
                                            <input
                                                type="password"
                                                id="current_password"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="new_password" className="block text-sm font-medium text-gray-700 mb-2">
                                                Password Baru
                                            </label>
                                            <input
                                                type="password"
                                                id="new_password"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700 mb-2">
                                                Konfirmasi Password Baru
                                            </label>
                                            <input
                                                type="password"
                                                id="confirm_password"
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                                            />
                                        </div>

                                        <div className="pt-4 border-t border-gray-200">
                                            <button
                                                type="submit"
                                                className="px-6 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
                                            >
                                                Ubah Password
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            )}

                            {activeTab === 'notifications' && (
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 mb-6">Pengaturan Notifikasi</h2>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between py-3 border-b border-gray-100">
                                            <div>
                                                <p className="font-medium text-gray-900">Email Notifikasi</p>
                                                <p className="text-sm text-gray-500">Terima update tentang aktivitas Anda</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-500"></div>
                                            </label>
                                        </div>

                                        <div className="flex items-center justify-between py-3 border-b border-gray-100">
                                            <div>
                                                <p className="font-medium text-gray-900">Notifikasi Lencana</p>
                                                <p className="text-sm text-gray-500">Saat mendapatkan lencana baru</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-500"></div>
                                            </label>
                                        </div>

                                        <div className="flex items-center justify-between py-3">
                                            <div>
                                                <p className="font-medium text-gray-900">Update Leaderboard</p>
                                                <p className="text-sm text-gray-500">Notifikasi perubahan peringkat</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" className="sr-only peer" />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-500"></div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'preferences' && (
                                <div>
                                    <h2 className="text-lg font-semibold text-gray-900 mb-6">Preferensi Aplikasi</h2>
                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Bahasa
                                            </label>
                                            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent">
                                                <option value="id">Indonesia</option>
                                                <option value="en">English</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Tema
                                            </label>
                                            <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent">
                                                <option value="light">Terang</option>
                                                <option value="dark">Gelap</option>
                                                <option value="auto">Otomatis</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
