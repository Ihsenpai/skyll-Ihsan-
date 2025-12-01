import Layout from '@/Layouts/Layout';
import Card from '@/Components/Card';
import FeatureCard from '@/Components/FeatureCard';
import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';

export default function Welcome({ professions = [], badges = [], totalUsers = 0 }) {
    const topProfessions = professions.slice(0, 6);

    return (
        <Layout title="SKYLL – Simulasi Karier Masa Depan">
            {/* Hero Section */}
            <section className="pt-20 pb-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6"
                    >
                        Tingkatkan <span className="text-primary-500">Keterampilan Karier</span> Anda
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
                    >
                        SKYLL adalah platform simulasi karier. Latih keputusan di skenario nyata, dapatkan XP & lencana, dan terima masukan dari AI untuk mempercepat perkembangan profesional Anda.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.25 }}
                        className="flex flex-col sm:flex-row justify-center gap-4"
                    >
                        <Link href="/register" className="btn-primary px-8 py-3 text-base">
                            Daftar Gratis
                        </Link>
                        <Link href="/professions" className="px-8 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-all">
                            Jelajahi Profesi
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Stats Strip */}
            <section className="bg-gray-50 py-8">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                        <div className="card-futuristic py-6">
                            <div className="text-3xl font-bold text-gray-900">{Number(totalUsers).toLocaleString('id-ID')}</div>
                            <div className="text-sm text-gray-600">Total Pengguna</div>
                        </div>
                        <div className="card-futuristic py-6">
                            <div className="text-3xl font-bold text-gray-900">{professions.length}</div>
                            <div className="text-sm text-gray-600">Profesi Ditampilkan</div>
                        </div>
                        <div className="card-futuristic py-6">
                            <div className="text-3xl font-bold text-gray-900">{badges.length}</div>
                            <div className="text-sm text-gray-600">Lencana Ditampilkan</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Value Props */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold mb-3">Kenapa SKYLL?</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Platform pembelajaran yang komprehensif untuk mempersiapkan karier masa depan Anda.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <FeatureCard
                            title="Materi Pembelajaran"
                            description="Pelajari teori dan konsep melalui materi PDF yang terstruktur sebelum simulasi."
                            delay={0.05}
                        />
                        <FeatureCard
                            title="Simulasi Interaktif"
                            description="Praktikkan keputusan dalam skenario profesional nyata dan rasakan dampaknya."
                            delay={0.1}
                        />
                        <FeatureCard
                            title="Umpan Balik AI"
                            description="Pendampingan personal dengan analisis mendalam dari AI canggih."
                            delay={0.15}
                        />
                        <FeatureCard
                            title="Gamifikasi & Progress"
                            description="Raih XP, lencana, dan pantau perkembangan kemampuan Anda."
                            delay={0.2}
                        />
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-14">
                        <h2 className="text-3xl font-bold mb-3">Cara Kerja</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Lima langkah untuk menguasai keterampilan karier yang Anda inginkan.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                        {[
                            { step: '01', title: 'Pilih Profesi', text: 'Pilih jalur karier yang ingin Anda kuasai.' },
                            { step: '02', title: 'Pelajari Materi', text: 'Baca materi pembelajaran dalam format PDF.' },
                            { step: '03', title: 'Mainkan Simulasi', text: 'Hadapi skenario nyata dan buat keputusan strategis.' },
                            { step: '04', title: 'Terima Feedback AI', text: 'Dapatkan analisis mendalam dan saran peningkatan.' },
                            { step: '05', title: 'Raih Pencapaian', text: 'Kumpulkan XP, lencana, dan naik level.' },
                        ].map((item, i) => (
                            <motion.div
                                key={item.step}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="relative"
                            >
                                <div className="card-futuristic h-full">
                                    <div className="text-primary-500 font-bold text-4xl mb-4">{item.step}</div>
                                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{item.text}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Profession Preview (no emoji icons) */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
                        <div>
                            <h2 className="text-3xl font-bold mb-2">Profesi Unggulan</h2>
                            <p className="text-gray-600">Mulai dari jalur simulasi yang populer.</p>
                        </div>
                        <Link href="/professions" className="btn-primary">Lihat Semua</Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
                        {topProfessions.map((profession, index) => (
                            <motion.div
                                key={profession.id}
                                initial={{ opacity: 0, y: 25 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <Card hover>
                                    <div className="flex flex-col h-full">
                                        <h3 className="text-xl font-semibold mb-2">{profession.name}</h3>
                                        <p className="text-gray-600 text-sm line-clamp-4 mb-4">{profession.description}</p>
                                        <div className="mt-auto flex justify-between items-center">
                                            <Link href={`/simulations/${profession.id}/start`} className="text-primary-500 font-medium text-sm hover:text-primary-600">
                                                Mulai →
                                            </Link>
                                            {profession.scenarios_count && (
                                                <span className="text-xs text-gray-500">{profession.scenarios_count} skenario</span>
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* AI Feedback Section (no emoji bullets) */}
            <section className="py-24">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl font-bold mb-4">Pembelajaran Terstruktur</h2>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                Setiap profesi dilengkapi dengan materi pembelajaran dalam format PDF yang mudah diakses. Pelajari teori dan konsep fundamental sebelum mencoba simulasi praktis.
                            </p>
                            <ul className="space-y-2 text-sm text-gray-700 list-disc pl-5">
                                <li>Materi pembelajaran per profesi yang terstruktur</li>
                                <li>Format PDF yang mudah diunduh dan dipelajari</li>
                                <li>Progress tracking untuk setiap materi yang diselesaikan</li>
                                <li>Reward XP saat menyelesaikan pembelajaran</li>
                            </ul>
                            <Link href="/learning" className="btn-primary mt-8 inline-block">Mulai Belajar</Link>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="card-futuristic p-8">
                                <div className="text-sm text-gray-500 mb-4">Pendekatan Belajar</div>
                                <div className="space-y-4">
                                    <div className="flex items-start">
                                        <div className="bg-sky-100 rounded-full p-2 mr-3">
                                            <svg className="w-5 h-5 text-sky-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-1">Baca Materi</h4>
                                            <p className="text-sm text-gray-600">Pelajari konsep dan teori fundamental</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="bg-green-100 rounded-full p-2 mr-3">
                                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-1">Praktik Simulasi</h4>
                                            <p className="text-sm text-gray-600">Terapkan pengetahuan dalam skenario nyata</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="bg-purple-100 rounded-full p-2 mr-3">
                                            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-1">Feedback AI</h4>
                                            <p className="text-sm text-gray-600">Terima analisis dan saran peningkatan</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* AI Feedback Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl font-bold mb-4">Pendamping Karier Cerdas</h2>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                Setiap simulasi dianalisis oleh AI untuk menghasilkan masukan yang dapat ditindaklanjuti. Pahami alasan di balik pilihan yang lebih baik, belajar lebih cepat, dan percepat jalur menuju kemahiran.
                            </p>
                            <ul className="space-y-2 text-sm text-gray-700 list-disc pl-5">
                                <li>Evaluasi keputusan yang memahami konteks</li>
                                <li>Rincian kekuatan dan area peningkatan</li>
                                <li>Panduan langkah berikutnya yang jelas</li>
                            </ul>
                            <Link href="/register" className="btn-primary mt-8 inline-block">Coba Simulasi Gratis</Link>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="card-futuristic p-8">
                                <div className="text-sm text-gray-500 mb-2">Contoh Masukan</div>
                                <blockquote className="text-gray-800 text-lg leading-relaxed">
                                    “Penalaran analitis yang kuat. Pertimbangkan validasi asumsi lebih awal untuk mengurangi rework. Strategi mitigasi risiko sangat baik. Lain kali, selaraskan pemangku kepentingan sebelum eksekusi teknis.”
                                </blockquote>
                                <div className="mt-6 text-xs text-gray-500">Didukung oleh model AI canggih.</div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Badges Showcase (no icons) */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
                        <div>
                            <h2 className="text-3xl font-bold mb-2">Raih Pengakuan</h2>
                            <p className="text-gray-600">Kumpulkan lencana pencapaian saat profil skill Anda berkembang.</p>
                        </div>
                        <Link href="/dashboard" className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-100 transition-all">Lihat Profil</Link>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
                        {(badges || []).slice(0, 10).map((badge, i) => (
                            <motion.div
                                key={badge.id || i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.05 }}
                                className="card-futuristic text-center py-6"
                            >
                                <div className="text-sm font-semibold mb-1">{badge.name || 'Achievement'}</div>
                                <div className="text-xs text-gray-600 line-clamp-3">{badge.description || 'Unlock this badge by completing advanced simulations.'}</div>
                            </motion.div>
                        ))}
                        {(!badges || badges.length === 0) && (
                            <div className="col-span-full text-center text-gray-500 text-sm">
                                Lencana akan muncul di sini seiring progres Anda.
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold mb-3">Apa Kata Pengguna</h2>
                        <p className="text-gray-600">Cerita singkat dari mereka yang sudah mencoba SKYLL</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[{
                            name: 'Rani — Data Analyst',
                            text: 'Simulasinya bikin mikir seperti kerja nyata. Feedback AI-nya membantu banget untuk tahu apa yang bisa ditingkatkan.'
                        },{
                            name: 'Dimas — Product Manager',
                            text: 'Keputusan-keputusan strategisnya relevan. Suka sistem XP & lencana yang bikin termotivasi lanjut.'
                        },{
                            name: 'Sinta — UX Designer',
                            text: 'Belajarnya cepat karena ada konteks. Penjelasan pilihan terbaiknya jelas dan aplikatif.'
                        }].map((t, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: i * 0.1 }}
                                className="card-futuristic p-6"
                            >
                                <p className="text-gray-800 leading-relaxed mb-4">“{t.text}”</p>
                                <div className="text-sm text-gray-600 font-medium">{t.name}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24">
                <div className="max-w-4xl mx-auto text-center px-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl font-bold mb-6"
                    >
                        Siap Membangun Kapabilitas Masa Depan?
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="text-gray-600 text-lg max-w-2xl mx-auto mb-8"
                    >
                        Bergabunglah dengan ribuan pembelajar yang mengejar keunggulan profesional. Simulasi, belajar, dan berkembang—satu keputusan setiap kali.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <Link href="/register" className="btn-primary px-10 py-4 text-base">
                            Buat Akun
                        </Link>
                        <Link href="/professions" className="px-10 py-4 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-all">
                            Jelajahi Simulasi
                        </Link>
                    </motion.div>
                </div>
            </section>
        </Layout>
    );
}
