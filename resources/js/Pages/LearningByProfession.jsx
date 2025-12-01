import { Head, Link } from '@inertiajs/react';
import DashboardLayout from '../Layouts/DashboardLayout';

export default function LearningByProfession({ user, profession, modules }) {
    return (
        <DashboardLayout user={user}>
            <Head title={`Materi ${profession.name}`} />

            <div className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Back Button */}
                    <Link
                        href="/learning"
                        className="inline-flex items-center text-sky-600 hover:text-sky-800 mb-6"
                    >
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Kembali ke Daftar Profesi
                    </Link>

                    {/* Profession Header */}
                    <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                        <div className="flex items-center">
                            {profession.icon && (
                                <div className="text-6xl mr-6">{profession.icon}</div>
                            )}
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">{profession.name}</h1>
                                {profession.description && (
                                    <p className="text-gray-600 text-lg">{profession.description}</p>
                                )}
                                <p className="text-sm text-gray-500 mt-2">{modules.length} Materi Tersedia</p>
                            </div>
                        </div>
                    </div>

                    {/* Learning Modules Grid */}
                    {modules.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-lg shadow">
                            <p className="text-gray-500 text-lg">Belum ada materi untuk profesi ini.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {modules.map((module) => (
                                <div
                                    key={module.id}
                                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-6 border border-gray-100"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <h3 className="text-xl font-semibold text-gray-900 flex-1">
                                            {module.title}
                                        </h3>
                                        {module.is_completed && (
                                            <div className="flex-shrink-0">
                                                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </div>
                                        )}
                                    </div>

                                    {module.description && (
                                        <p className="text-gray-600 mb-4 line-clamp-3">
                                            {module.description}
                                        </p>
                                    )}

                                    <div className="flex items-center text-sm text-gray-500 mb-4 pb-4 border-b border-gray-100">
                                        {module.duration_minutes && (
                                            <span className="mr-4 flex items-center">
                                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                {module.duration_minutes} menit
                                            </span>
                                        )}
                                        <span className="flex items-center">
                                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                            </svg>
                                            PDF
                                        </span>
                                    </div>

                                    <Link
                                        href={`/learning/${module.id}`}
                                        className="block w-full text-center bg-sky-500 text-white py-2.5 px-4 rounded-lg hover:bg-sky-600 transition font-medium"
                                    >
                                        Buka Materi
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
