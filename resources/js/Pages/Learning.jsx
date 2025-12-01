import { Head, Link } from '@inertiajs/react';
import DashboardLayout from '../Layouts/DashboardLayout';

export default function Learning({ user, professions }) {
    return (
        <DashboardLayout user={user}>
            <Head title="Materi Pembelajaran" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Materi Pembelajaran</h1>
                        <p className="mt-2 text-gray-600">
                            Pilih profesi untuk mempelajari materi yang tersedia
                        </p>
                    </div>

                    {/* Content */}
                    {professions.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-lg shadow">
                            <p className="text-gray-500 text-lg">Belum ada materi pembelajaran tersedia.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {professions.map((profession) => (
                                profession.active_learning_modules && profession.active_learning_modules.length > 0 && (
                                    <Link
                                        key={profession.id}
                                        href={`/learning/profession/${profession.id}`}
                                        className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-6 border border-gray-100 hover:border-sky-500"
                                    >
                                        {/* Profession Icon & Name */}
                                        <div className="flex items-center mb-4">
                                            {profession.icon && (
                                                <div className="text-5xl mr-4">{profession.icon}</div>
                                            )}
                                            <div className="flex-1">
                                                <h2 className="text-xl font-bold text-gray-900">{profession.name}</h2>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        {profession.description && (
                                            <p className="text-gray-600 mb-4 line-clamp-2">{profession.description}</p>
                                        )}

                                        {/* Stats */}
                                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                            <div className="text-sm text-gray-500">
                                                {profession.active_learning_modules.length} Materi
                                            </div>
                                            <div className="text-sky-600 font-medium flex items-center">
                                                Lihat Materi
                                                <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
