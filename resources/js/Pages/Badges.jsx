import { Head } from '@inertiajs/react';
import DashboardLayout from '../Layouts/DashboardLayout';

export default function Badges({ user, userBadges, allBadges }) {
    const earnedBadgeIds = userBadges?.map(ub => ub.badge_id) || [];
    const earnedBadges = userBadges?.map(ub => ub.badge) || [];
    const lockedBadges = allBadges?.filter(badge => !earnedBadgeIds.includes(badge.id)) || [];

    return (
        <DashboardLayout user={user}>
            <Head title="Lencana - SKYLL" />
            
            <div className="p-6">
                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">Koleksi Lencana</h1>
                    <p className="text-gray-600">
                        {earnedBadges.length} dari {allBadges?.length || 0} lencana terkumpul
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">Progres Koleksi</span>
                        <span className="text-sm font-semibold text-sky-600">
                            {allBadges?.length > 0 ? Math.round((earnedBadges.length / allBadges.length) * 100) : 0}%
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                            className="bg-gradient-to-r from-sky-400 to-sky-600 h-3 rounded-full transition-all duration-500"
                            style={{ width: `${allBadges?.length > 0 ? (earnedBadges.length / allBadges.length) * 100 : 0}%` }}
                        />
                    </div>
                </div>

                {/* Earned Badges */}
                {earnedBadges.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Lencana Terkumpul</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {earnedBadges.map((badge) => {
                                const userBadge = userBadges.find(ub => ub.badge_id === badge.id);
                                return (
                                    <div key={badge.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
                                        <div className="text-center">
                                            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center text-4xl shadow-lg">
                                                {badge.icon || '🏆'}
                                            </div>
                                            <h3 className="font-semibold text-gray-900 mb-1">{badge.name}</h3>
                                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{badge.description}</p>
                                            <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
                                                <div className="flex items-center gap-1">
                                                    <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                    <span>+{badge.xp_reward} XP</span>
                                                </div>
                                                <div className="text-gray-400">•</div>
                                                <div>
                                                    {userBadge?.earned_at 
                                                        ? new Date(userBadge.earned_at).toLocaleDateString('id-ID', { 
                                                            day: 'numeric', 
                                                            month: 'short', 
                                                            year: 'numeric' 
                                                        })
                                                        : 'Baru saja'
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Locked Badges */}
                {lockedBadges.length > 0 && (
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Lencana Terkunci</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                            {lockedBadges.map((badge) => (
                                <div key={badge.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 opacity-60 hover:opacity-80 transition-opacity">
                                    <div className="text-center">
                                        <div className="w-20 h-20 mx-auto mb-4 bg-gray-300 rounded-full flex items-center justify-center text-4xl grayscale relative">
                                            {badge.icon || '🏆'}
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                </svg>
                                            </div>
                                        </div>
                                        <h3 className="font-semibold text-gray-700 mb-1">{badge.name}</h3>
                                        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{badge.description}</p>
                                        <div className="flex items-center justify-center gap-1 text-xs text-gray-500">
                                            <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            <span>+{badge.xp_reward} XP</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Empty State */}
                {earnedBadges.length === 0 && lockedBadges.length === 0 && (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center">
                        <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                        <p className="text-gray-600">Belum ada lencana tersedia</p>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
}
