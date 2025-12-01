import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import DashboardLayout from '../Layouts/DashboardLayout';

export default function LearningShow({ user, learningModule, progress, otherModules, flash }) {
    const [showSuccess, setShowSuccess] = useState(!!flash?.success);

    const handleComplete = () => {
        router.post(`/learning/${learningModule.id}/complete`, {}, {
            preserveScroll: true,
            onSuccess: () => {
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 5000);
            }
        });
    };

    return (
        <DashboardLayout user={user}>
            <Head title={learningModule.title} />

            <div className="py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Success Message */}
                    {showSuccess && (
                        <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg flex items-center justify-between">
                            <span>{flash?.success || 'Materi telah ditandai selesai! +10 XP'}</span>
                            <button onClick={() => setShowSuccess(false)} className="text-green-700 hover:text-green-900">
                                ✕
                            </button>
                        </div>
                    )}

                    {/* Header */}
                    <div className="bg-white rounded-lg shadow p-6 mb-6">
                        <div className="flex justify-between items-start mb-4">
                            <Link
                                href="/learning"
                                className="text-sky-600 hover:text-sky-800 flex items-center"
                            >
                                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Kembali ke Daftar Materi
                            </Link>

                            {progress?.is_completed && (
                                <div className="flex items-center text-green-600">
                                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span className="font-medium">Selesai</span>
                                </div>
                            )}
                        </div>

                        <div className="flex items-start">
                            <div className="text-4xl mr-4">{learningModule.profession.icon || '💼'}</div>
                            <div className="flex-1">
                                <p className="text-sm text-gray-600 mb-2">{learningModule.profession.name}</p>
                                <h1 className="text-3xl font-bold text-gray-900">{learningModule.title}</h1>

                                {learningModule.description && (
                                    <p className="text-gray-700 mt-3">{learningModule.description}</p>
                                )}

                                <div className="flex items-center text-sm text-gray-500 mt-4">
                                    {learningModule.duration_minutes && (
                                        <span className="mr-4">⏱️ {learningModule.duration_minutes} menit</span>
                                    )}
                                    {learningModule.file_size && (
                                        <span>💾 {Math.round(learningModule.file_size / 1024)} KB</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PDF Section */}
                    <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
                        <div className="text-center">
                            <div className="inline-block p-4 bg-red-100 rounded-full mb-4">
                                <svg className="w-16 h-16 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Materi PDF</h2>
                            <p className="text-gray-600 mb-6">Download file PDF untuk mempelajari materi ini</p>

                            <a
                                href={`/learning/${learningModule.id}/download`}
                                className="inline-flex items-center bg-sky-500 text-white px-8 py-3 rounded-lg hover:bg-sky-600 transition font-semibold text-lg"
                            >
                                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                </svg>
                                Download PDF
                            </a>
                        </div>

                        {!progress?.is_completed && (
                            <div className="border-t pt-6 mt-6 text-center">
                                <p className="text-gray-700 mb-4">Sudah selesai membaca materi ini?</p>
                                <button
                                    onClick={handleComplete}
                                    className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                                >
                                    ✓ Tandai Selesai (+10 XP)
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Other Modules */}
                    {otherModules && otherModules.length > 0 && (
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">
                                Materi Lainnya dari {learningModule.profession.name}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {otherModules.map((module) => (
                                    <Link
                                        key={module.id}
                                        href={`/learning/${module.id}`}
                                        className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition"
                                    >
                                        <h4 className="font-semibold text-gray-900 mb-2">{module.title}</h4>
                                        {module.duration_minutes && (
                                            <p className="text-sm text-gray-500">⏱️ {module.duration_minutes} menit</p>
                                        )}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
