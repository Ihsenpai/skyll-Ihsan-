import { Head } from '@inertiajs/react';

export default function Layout({ children, title = 'SKYLL', minimal = false }) {
    return (
        <>
            <Head title={title} />
            <div className="min-h-screen bg-white">
                {!minimal && (
                    <nav className="border-b border-gray-200">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex justify-between h-16">
                                <div className="flex items-center">
                                    <a href="/" className="flex items-center group" aria-label="SKYLL Home">
                                        <img
                                            src="/images/logo.png"
                                            alt="SKYLL Logo"
                                            className="h-10 w-auto transition-opacity duration-200 group-hover:opacity-90"
                                            loading="lazy"
                                        />
                                        <span className="ml-3 text-xl font-bold text-primary-600 tracking-tight">SKYLL</span>
                                    </a>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <a href="/login" className="text-gray-700 hover:text-primary-600">Login</a>
                                    <a href="/register" className="btn-primary">Get Started</a>
                                </div>
                            </div>
                        </div>
                    </nav>
                )}
                <main>{children}</main>
            </div>
        </>
    );
}
