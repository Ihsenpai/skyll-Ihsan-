import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import DashboardLayout from '../Layouts/DashboardLayout';

export default function Professions({ user, professions }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const categories = [
        { id: 'all', label: 'Semua' },
        { id: 'tech', label: 'Teknologi', keywords: ['data', 'ai', 'ml', 'cyber', 'devops', 'cloud', 'developer', 'mobile', 'full stack'] },
        { id: 'business', label: 'Bisnis', keywords: ['product', 'business', 'marketing', 'hr', 'financial', 'analyst'] },
        { id: 'creative', label: 'Kreatif', keywords: ['ux', 'ui', 'designer', 'content', 'graphic', 'event'] },
        { id: 'operations', label: 'Operasional', keywords: ['supply', 'chain', 'guru', 'pendidik', 'teacher'] }
    ];

    const getCategoryForProfession = (profession) => {
        const nameDesc = (profession.name + ' ' + (profession.description || '')).toLowerCase();
        for (const cat of categories) {
            if (cat.keywords && cat.keywords.some(kw => nameDesc.includes(kw))) {
                return cat.id;
            }
        }
        return 'all';
    };

    const filteredProfessions = professions?.filter(profession => {
        const matchesSearch = profession.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            profession.description?.toLowerCase().includes(searchQuery.toLowerCase());
        const profCategory = getCategoryForProfession(profession);
        const matchesCategory = selectedCategory === 'all' || profCategory === selectedCategory;
        return matchesSearch && matchesCategory;
    }) || [];

    return (
        <DashboardLayout user={user}>
            <Head title="Profesi - SKYLL" />
            
            <div className="p-6">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">Jelajahi Profesi</h1>
                    <p className="text-gray-600">Pilih profesi yang ingin Anda pelajari dan mulai simulasi karier</p>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Cari profesi..."
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                                />
                            </div>
                        </div>

                        {/* Category Filter */}
                        <div className="flex gap-2 overflow-x-auto">
                            {categories.map(category => (
                                <button
                                    key={category.id || category}
                                    onClick={() => setSelectedCategory(category.id || category)}
                                    className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                                        selectedCategory === (category.id || category)
                                            ? 'bg-sky-500 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                                >
                                    {category.label || category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Professions Grid */}
                {filteredProfessions.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProfessions.map((profession) => (
                            <Link
                                key={profession.id}
                                href={`/simulations/${profession.id}/start`}
                                className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:border-sky-200 transition-all"
                            >
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-sky-400 to-sky-600 rounded-lg flex items-center justify-center">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-sky-100 text-sky-800">
                                            {profession.scenarios_count || 0} Skenario
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-sky-600 transition-colors">
                                        {profession.name}
                                    </h3>
                                    <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                                        {profession.description || 'Pelajari keterampilan dan tantangan dalam profesi ini'}
                                    </p>
                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span>~30 menit</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                            <span>+100 XP</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 group-hover:bg-sky-50 transition-colors">
                                    <span className="text-sm font-medium text-sky-600 group-hover:text-sky-700">
                                        Mulai Simulasi →
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                        <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <p className="text-gray-600">Tidak ada profesi yang ditemukan</p>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}

