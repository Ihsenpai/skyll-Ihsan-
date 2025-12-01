import { Head } from '@inertiajs/react';
import DashboardLayout from '../Layouts/DashboardLayout';

export default function Leaderboard({ user, topUsers, currentUserRank }) {
    const getRankBadge = (rank) => {
        if (rank === 1) return { emoji: '🥇', color: 'from-yellow-400 to-yellow-600', text: 'text-yellow-600' };
        if (rank === 2) return { emoji: '🥈', color: 'from-gray-300 to-gray-500', text: 'text-gray-600' };
        if (rank === 3) return { emoji: '🥉', color: 'from-amber-600 to-amber-800', text: 'text-amber-700' };
        return { emoji: '', color: 'from-gray-100 to-gray-200', text: 'text-gray-700' };
    };

    return (
        <DashboardLayout user={user}>
            <Head title="Leaderboard - SKYLL" />
            
            <div className="p-6">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">Papan Peringkat</h1>
                    <p className="text-gray-600">Lihat peringkat pengguna berdasarkan XP yang dikumpulkan</p>
                </div>

                {/* Current User Stats */}
                <div className="bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl p-6 text-white mb-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sky-100 text-sm mb-1">Peringkat Anda</p>
                            <p className="text-4xl font-bold">#{currentUserRank}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-sky-100 text-sm mb-1">Total XP</p>
                            <p className="text-3xl font-bold">{user.xp.toLocaleString()}</p>
                        </div>
                    </div>
                </div>

                {/* Top 3 Podium */}
                {topUsers && topUsers.length >= 3 && (
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        {/* 2nd Place */}
                        <div className="mt-8">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
                                <div className="text-4xl mb-2">🥈</div>
                                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                    {topUsers[1].name.charAt(0).toUpperCase()}
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-1 truncate">{topUsers[1].name}</h3>
                                <p className="text-2xl font-bold text-gray-600">{topUsers[1].xp.toLocaleString()}</p>
                                <p className="text-xs text-gray-500">XP</p>
                            </div>
                        </div>

                        {/* 1st Place */}
                        <div>
                            <div className="bg-white rounded-xl shadow-lg border-2 border-yellow-400 p-6 text-center">
                                <div className="text-5xl mb-2">🥇</div>
                                <div className="w-20 h-20 mx-auto mb-3 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                                    {topUsers[0].name.charAt(0).toUpperCase()}
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-1 truncate">{topUsers[0].name}</h3>
                                <p className="text-3xl font-bold text-yellow-600">{topUsers[0].xp.toLocaleString()}</p>
                                <p className="text-xs text-gray-500">XP</p>
                            </div>
                        </div>

                        {/* 3rd Place */}
                        <div className="mt-8">
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center">
                                <div className="text-4xl mb-2">🥉</div>
                                <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                    {topUsers[2].name.charAt(0).toUpperCase()}
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-1 truncate">{topUsers[2].name}</h3>
                                <p className="text-2xl font-bold text-amber-700">{topUsers[2].xp.toLocaleString()}</p>
                                <p className="text-xs text-gray-500">XP</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Full Leaderboard */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100">
                        <h2 className="text-lg font-semibold text-gray-900">Semua Peringkat</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Peringkat
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Pengguna
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        XP
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Level
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {topUsers && topUsers.map((topUser, index) => {
                                    const rank = index + 1;
                                    const badge = getRankBadge(rank);
                                    const isCurrentUser = topUser.id === user.id;
                                    
                                    return (
                                        <tr key={topUser.id} className={isCurrentUser ? 'bg-sky-50' : 'hover:bg-gray-50'}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <span className={`text-2xl font-bold ${badge.text}`}>
                                                        {badge.emoji || `#${rank}`}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold mr-3 bg-gradient-to-br ${badge.color}`}>
                                                        {topUser.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {topUser.name}
                                                            {isCurrentUser && (
                                                                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-sky-100 text-sky-800">
                                                                    Anda
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="text-sm text-gray-500">{topUser.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-bold text-gray-900">
                                                    {topUser.xp.toLocaleString()}
                                                </div>
                                                <div className="text-xs text-gray-500">Experience Points</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    Level {Math.floor(topUser.xp / 1000) + 1}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
