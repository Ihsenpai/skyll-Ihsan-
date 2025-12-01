import { Link, usePage } from '@inertiajs/react';
import Logo from './Logo';

export default function Sidebar({ user }) {
    const { url } = usePage();
    
    const isActive = (path) => {
        if (path === '/dashboard') return url === path;
        if (path === '/professions') return url.startsWith(path);
        if (path === '/learning') return url.startsWith(path);
        return url === path;
    };

    const navigation = [
        { 
            name: 'Dashboard', 
            href: '/dashboard', 
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            ),
            current: isActive('/dashboard')
        },
        { 
            name: 'Pembelajaran', 
            href: '/learning', 
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            ),
            current: isActive('/learning')
        },
        { 
            name: 'Profesi', 
            href: '/professions', 
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            current: isActive('/professions')
        },
        { 
            name: 'Simulasi Saya', 
            href: '/my-simulations', 
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
            current: isActive('/my-simulations')
        },
        { 
            name: 'Lencana', 
            href: '/badges', 
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
            ),
            current: isActive('/badges')
        },
        { 
            name: 'Leaderboard', 
            href: '/leaderboard', 
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
            current: isActive('/leaderboard')
        },
    ];

    const maxXp = Math.ceil(user.xp / 1000) * 1000 || 1000;
    const xpPercentage = (user.xp / maxXp) * 100;

    return (
        <div className="flex flex-col h-full bg-white border-r border-gray-200">
            {/* Logo & Upload Button */}
            <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-center -mt-9 -mb-8">
                    <Logo className="h-32" showText={false} />
                </div>
                <Link
                    href="/professions"
                    className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-sky-500 hover:bg-sky-600 text-white rounded-full transition-colors shadow-sm"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    <span className="font-medium">Mulai Simulasi</span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
                {navigation.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                            item.current
                                ? 'bg-sky-50 text-sky-600'
                                : 'text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                        <span className={item.current ? 'text-sky-600' : 'text-gray-500'}>
                            {item.icon}
                        </span>
                        <span className="font-medium">{item.name}</span>
                    </Link>
                ))}
            </nav>

            {/* XP Progress (like Storage in Google Drive) */}
            <div className="p-4 border-t border-gray-100">
                <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-gray-600 font-medium">Total XP</span>
                    <span className="text-gray-900 font-semibold">{user.xp.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                        className="bg-gradient-to-r from-sky-400 to-sky-600 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(xpPercentage, 100)}%` }}
                    />
                </div>
                <p className="text-xs text-gray-500">
                    {user.xp.toLocaleString()} dari {maxXp.toLocaleString()} XP
                </p>
                <Link 
                    href="/leaderboard"
                    className="mt-3 text-xs text-sky-600 hover:text-sky-700 font-medium flex items-center gap-1"
                >
                    Lihat Peringkat
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>
        </div>
    );
}
