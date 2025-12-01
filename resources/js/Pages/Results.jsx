import { Head, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import Layout from '../Layouts/Layout';
import Card from '../Components/Card';
import ProgressBar from '../Components/ProgressBar';

export default function Results({ simulation, profession, results, aiFeedback }) {
    const { flash } = usePage().props || {};
    const [showConfetti, setShowConfetti] = useState(false);

    const shouldCelebrate = useMemo(() => {
        const gradeA = results?.grade === 'A';
        const gotBadge = typeof flash?.success === 'string' && flash.success.includes('Badge Daily Challenger didapat');
        return gradeA || gotBadge;
    }, [results?.grade, flash?.success]);

    useEffect(() => {
        if (shouldCelebrate) {
            setShowConfetti(true);
            const t = setTimeout(() => setShowConfetti(false), 3000);
            return () => clearTimeout(t);
        }
    }, [shouldCelebrate]);
    const getGradeColor = (grade) => {
        const colors = {
            'A': 'text-green-500',
            'B': 'text-blue-500',
            'C': 'text-yellow-500',
            'D': 'text-orange-500',
            'F': 'text-red-500',
        };
        return colors[grade] || 'text-gray-500';
    };

    const getGradeBg = (grade) => {
        const colors = {
            'A': 'bg-green-50 border-green-200',
            'B': 'bg-blue-50 border-blue-200',
            'C': 'bg-yellow-50 border-yellow-200',
            'D': 'bg-orange-50 border-orange-200',
            'F': 'bg-red-50 border-red-200',
        };
        return colors[grade] || 'bg-gray-50 border-gray-200';
    };

    return (
        <Layout>
            <Head title={`Hasil - ${profession.name} - SKYLL`} />
            {showConfetti && <ConfettiOverlay />}
            
            <div className="max-w-4xl mx-auto px-4 py-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl font-bold mb-2">Simulasi Selesai</h1>
                    <p className="text-gray-600">{profession.name}</p>
                </motion.div>

                {/* Grade Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mb-8"
                >
                    <div className={`p-8 rounded-2xl border-2 ${getGradeBg(results.grade)}`}>
                        <div className="text-center">
                            <div className={`text-8xl font-bold mb-4 ${getGradeColor(results.grade)}`}>
                                {results.grade}
                            </div>
                            <div className="text-3xl font-bold text-gray-900 mb-2">
                                {simulation.total_score} / {simulation.max_possible_score}
                            </div>
                            <p className="text-gray-600">{results.summary}</p>
                        </div>
                        <div className="mt-6">
                            <ProgressBar value={Number(simulation.completion_percentage || 0)} max={100} />
                        </div>
                    </div>
                </motion.div>

                {/* XP Earned */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-8"
                >
                    <Card>
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold">XP Didapat</h3>
                                <p className="text-sm text-gray-600">Ditambahkan ke profil kamu</p>
                            </div>
                            <div className="text-3xl font-bold text-primary-500">
                                +{results.xp_earned} XP
                            </div>
                        </div>
                    </Card>
                </motion.div>

                {/* Accuracy Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.33 }}
                    className="mb-8"
                >
                    <Card>
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-semibold">Akurasi</h3>
                                <p className="text-sm text-gray-600">Keputusan benar dibanding total</p>
                            </div>
                            <div className="text-right">
                                <div className="text-2xl font-bold text-gray-900">
                                    {results.correct_choices ?? 0}/{results.total_choices ?? 0}
                                </div>
                                {typeof results.accuracy === 'number' && (
                                    <div className="text-xs text-gray-500">{results.accuracy}%</div>
                                )}
                            </div>
                        </div>
                    </Card>
                </motion.div>

                {/* Timing Summary */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="mb-8"
                >
                    <Card>
                        {(() => {
                            const times = (simulation.user_answers || [])
                                .map(a => a.time_taken_seconds)
                                .filter(v => typeof v === 'number' && !isNaN(v));
                            const total = times.reduce((s, v) => s + v, 0);
                            const avg = times.length ? Math.round(total / times.length) : 0;
                            return (
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-semibold">Kecepatan Menjawab</h3>
                                        <p className="text-sm text-gray-600">Rata-rata waktu per skenario</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-gray-900">{avg}s</div>
                                        <div className="text-xs text-gray-500">Total {total}s</div>
                                    </div>
                                </div>
                            );
                        })()}
                    </Card>
                </motion.div>

                {/* AI Feedback */}
                {aiFeedback && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mb-8"
                    >
                        <Card title="Masukan dari AI">
                            <div className="prose max-w-none">
                                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                    {aiFeedback}
                                </p>
                            </div>
                        </Card>
                    </motion.div>
                )}

                {/* Scenario Results */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mb-8"
                >
                    <h2 className="text-2xl font-bold mb-6">Rincian Hasil</h2>
                    {/* Skill Breakdown */}
                    {results.skill_breakdown && Object.keys(results.skill_breakdown).length > 0 && (
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-3">Ringkasan Keterampilan</h3>
                            <div className="space-y-2">
                                {Object.entries(results.skill_breakdown).map(([skill, pts]) => (
                                    <div key={skill} className="flex items-center gap-3">
                                        <div className="w-40 text-sm text-gray-700">{skill}</div>
                                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                                            <div className="bg-primary-500 h-2 rounded-full" style={{ width: `${Math.min(100, Math.round((pts / (simulation.max_possible_score || 1)) * 100))}%` }} />
                                        </div>
                                        <div className="w-14 text-right text-sm text-gray-600">{Math.round(pts)}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className="space-y-4">
                        {simulation.user_answers?.map((answer, index) => (
                            <Card key={answer.id}>
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="font-semibold flex-1">
                                        {index + 1}. {answer.scenario?.title}
                                    </h3>
                                    <span className="font-bold text-primary-500 ml-4">
                                        {answer.score_earned} poin
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 mb-3">
                                    Jawaban kamu: <span className={`font-medium ${answer.selected_option?.is_best_choice ? 'text-green-700' : 'text-gray-900'}`}>
                                        {answer.selected_option?.option_text}
                                    </span>
                                </p>
                                {answer.selected_option && (
                                    <div className={`inline-flex items-center text-xs font-medium px-2 py-1 rounded-full mb-3 ${answer.selected_option.is_best_choice ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-gray-50 text-gray-600 border border-gray-200'}`}>
                                        {answer.selected_option.is_best_choice ? 'Pilihan terbaik' : 'Bukan pilihan terbaik'}
                                    </div>
                                )}
                                {answer.selected_option?.explanation && (
                                    <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                                        <p className="text-sm text-gray-700">
                                            <span className="font-semibold">Penjelasan:</span> {answer.selected_option.explanation}
                                        </p>
                                    </div>
                                )}
                            </Card>
                        ))}
                    </div>
                </motion.div>

                {/* Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex gap-4 justify-center"
                >
                    <a
                        href="/professions"
                        className="px-8 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-all"
                    >
                        Coba Profesi Lain
                    </a>
                    <a
                        href="/dashboard"
                        className="btn-primary"
                    >
                        Ke Dashboard
                    </a>
                </motion.div>
            </div>
        </Layout>
    );
}

function ConfettiOverlay() {
    const [pieces] = useState(() => Array.from({ length: 80 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.6,
        duration: 1.2 + Math.random() * 0.8,
        size: 6 + Math.random() * 10,
        rotate: Math.random() * 360,
        color: ['#60A5FA', '#34D399', '#FBBF24', '#F472B6', '#A78BFA'][Math.floor(Math.random() * 5)],
    })));

    return (
        <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
            <style>{`
                @keyframes confetti-fall {
                  0% { transform: translate3d(0, -100%, 0) rotate(0deg); opacity: 0; }
                  10% { opacity: 1; }
                  100% { transform: translate3d(0, 120vh, 0) rotate(720deg); opacity: 0; }
                }
            `}</style>
            {pieces.map(p => (
                <span
                    key={p.id}
                    style={{
                        position: 'absolute',
                        top: '-10vh',
                        left: `${p.left}%`,
                        width: p.size,
                        height: p.size * 0.6,
                        backgroundColor: p.color,
                        transform: `rotate(${p.rotate}deg)`,
                        borderRadius: 2,
                        animation: `confetti-fall ${p.duration}s ease-in forwards`,
                        animationDelay: `${p.delay}s`,
                        boxShadow: '0 0 0 1px rgba(0,0,0,0.04)'
                    }}
                />
            ))}
        </div>
    );
}
