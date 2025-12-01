export default function Logo({ className = 'h-10 w-auto', showText = true }) {
    return (
        <a href="/" className="flex items-center group" aria-label="SKYLL Home">
            <img
                src="/images/logo.png"
                alt="SKYLL Logo"
                className={className + ' transition-opacity duration-200 group-hover:opacity-90'}
                loading="lazy"
            />
            {showText && (
                <span className="ml-3 text-xl font-bold text-primary-600 tracking-tight">SKYLL</span>
            )}
        </a>
    );
}
