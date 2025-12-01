import { Head, Link } from '@inertiajs/react';
import DashboardLayout from '../Layouts/DashboardLayout';

export default function MySimulations({ user, simulations }) {
    const getStatusBadge = (status) => {
        const badges = {
            completed: { color: 'bg-green-100 text-green-800', text: 'Selesai' },
            in_progress: { color: 'bg-amber-100 text-amber-800', text: 'Berlangsung' },
            abandoned: { color: 'bg-gray-100 text-gray-800', text: 'Ditinggalkan' },
        };
        return badges[status] || badges.in_progress;
    };

    const getGradeColor = (grade) => {
        if (grade === 'A' || grade === 'A+') return 'text-green-600';
        if (grade === 'B' || grade === 'B+') return 'text-sky-600';
        if (grade === 'C') return 'text-amber-600';
        return 'text-gray-600';
    };

    return (
        <DashboardLayout user={user}>
            <Head title="Simulasi Saya - SKYLL" />
            
            <div className="p-6">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">Simulasi Saya</h1>
                    <p className="text-gray-600">Riwayat dan progres simulasi karier Anda</p>
                </div>

                {/* Stats Summary */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <p className="text-sm text-gray-600 mb-1">Total Simulasi</p>
                        <p className="text-2xl font-bold text-gray-900">{simulations?.length || 0}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <p className="text-sm text-gray-600 mb-1">Selesai</p>
                        <p className="text-2xl font-bold text-green-600">
                            {simulations?.filter(s => s.status === 'completed').length || 0}
                        </p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <p className="text-sm text-gray-600 mb-1">Berlangsung</p>
                        <p className="text-2xl font-bold text-amber-600">
                            {simulations?.filter(s => s.status === 'in_progress').length || 0}
                        </p>
                    </div>
                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                        <p className="text-sm text-gray-600 mb-1">Rata-rata Skor</p>
                        <p className="text-2xl font-bold text-sky-600">
                            {simulations?.length > 0 
                                ? Math.round(simulations.reduce((sum, s) => sum + (s.total_score || 0), 0) / simulations.length)
                                : 0}
                        </p>
                    </div>
                </div>

                {/* Simulations List */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    {simulations && simulations.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Profesi
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Skor
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Grade
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Tanggal
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {simulations.map((simulation) => {
                                        const statusBadge = getStatusBadge(simulation.status);
                                        return (
                                            <tr key={simulation.id} className="hover:bg-gray-50">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center mr-3">
                                                            <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {simulation.profession?.name}
                                                            </div>
                                                            <div className="text-sm text-gray-500">
                                                                ID: {simulation.id}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusBadge.color}`}>
                                                        {statusBadge.text}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-semibold text-gray-900">
                                                        {simulation.total_score || 0} poin
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        {Math.round((simulation.completion_percentage || 0))}% selesai
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {simulation.grade ? (
                                                        <span className={`text-2xl font-bold ${getGradeColor(simulation.grade)}`}>
                                                            {simulation.grade}
                                                        </span>
                                                    ) : (
                                                        <span className="text-sm text-gray-400">-</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {simulation.completed_at 
                                                        ? new Date(simulation.completed_at).toLocaleDateString('id-ID', { 
                                                            day: 'numeric', 
                                                            month: 'short', 
                                                            year: 'numeric' 
                                                        })
                                                        : new Date(simulation.created_at).toLocaleDateString('id-ID', { 
                                                            day: 'numeric', 
                                                            month: 'short', 
                                                            year: 'numeric' 
                                                        })
                                                    }
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                    {simulation.status === 'completed' ? (
                                                        <Link
                                                            href={`/simulations/${simulation.id}/results`}
                                                            className="text-sky-600 hover:text-sky-900 font-medium"
                                                        >
                                                            Lihat Hasil
                                                        </Link>
                                                    ) : (
                                                        <Link
                                                            href={`/simulations/${simulation.profession_id}/start`}
                                                            className="text-amber-600 hover:text-amber-900 font-medium"
                                                        >
                                                            Lanjutkan
                                                        </Link>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="p-12 text-center">
                            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <p className="text-gray-600 mb-4">Belum ada simulasi</p>
                            <Link
                                href="/professions"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
                            >
                                Mulai Simulasi Pertama
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
