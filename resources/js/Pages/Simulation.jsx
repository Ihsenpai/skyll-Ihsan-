import { useEffect, useState } from 'react';
import { Head, router } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../Layouts/Layout';
import Card from '../Components/Card';
import ProgressBar from '../Components/ProgressBar';

export default function Simulation({ profession, scenarios, isDaily = false }) {
    const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [scenarioStartTs, setScenarioStartTs] = useState(Date.now());
    const [times, setTimes] = useState({}); // { [scenarioId]: seconds }

    const currentScenario = scenarios[currentScenarioIndex];
    const progress = ((currentScenarioIndex + 1) / scenarios.length) * 100;

    const handleSelectOption = (optionId) => {
        const elapsedSec = Math.max(0, Math.round((Date.now() - scenarioStartTs) / 1000));
        setAnswers(prev => ({
            ...prev,
            [currentScenario.id]: optionId
        }));
        setTimes(prev => ({
            ...prev,
            [currentScenario.id]: elapsedSec
        }));
    };

    const handleNext = () => {
        if (currentScenarioIndex < scenarios.length - 1) {
            setCurrentScenarioIndex(currentScenarioIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentScenarioIndex > 0) {
            setCurrentScenarioIndex(currentScenarioIndex - 1);
        }
    };

    const handleSubmit = () => {
        setIsSubmitting(true);
        
        const formattedAnswers = Object.entries(answers).map(([scenarioId, optionId]) => ({
            scenario_id: parseInt(scenarioId),
            selected_option_id: optionId,
            time_taken_seconds: times[scenarioId] ?? null,
        }));

        router.post('/api/simulations/submit', {
            profession_id: profession.id,
            answers: formattedAnswers,
            is_daily: !!isDaily,
        });
    };

    const isCurrentAnswered = answers[currentScenario?.id];
    const isAllAnswered = scenarios.every(scenario => answers[scenario.id]);

    useEffect(() => {
        setScenarioStartTs(Date.now());
    }, [currentScenarioIndex]);

    return (
        <Layout>
            <Head title={`${profession.name} - Simulasi - SKYLL`} />
            
            <div className="max-w-4xl mx-auto px-4 py-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-3xl font-bold">{isDaily ? 'Tantangan Harian — ' : ''}{profession.name}</h1>
                        <span className="text-sm text-gray-600">
                            Skenario {currentScenarioIndex + 1} dari {scenarios.length}
                        </span>
                    </div>
                    <ProgressBar value={progress} max={100} />
                </motion.div>

                {/* Scenario */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentScenarioIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Card className="mb-8">
                            <h2 className="text-2xl font-bold mb-4">{currentScenario.title}</h2>
                            <p className="text-gray-700 leading-relaxed">{currentScenario.description}</p>
                        </Card>

                        {/* Options */}
                        <div className="space-y-4 mb-8">
                            {currentScenario.options?.map((option, index) => (
                                <motion.button
                                    key={option.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={() => handleSelectOption(option.id)}
                                    className={`w-full text-left p-6 rounded-xl border-2 transition-all ${
                                        answers[currentScenario.id] === option.id
                                            ? 'border-primary-500 bg-primary-50'
                                            : 'border-gray-200 hover:border-primary-300 bg-white'
                                    }`}
                                >
                                    <div className="flex items-start">
                                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mr-4 ${
                                            answers[currentScenario.id] === option.id
                                                ? 'bg-primary-500 text-white'
                                                : 'bg-gray-200 text-gray-600'
                                        }`}>
                                            {String.fromCharCode(65 + index)}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium">{option.option_text}</p>
                                        </div>
                                    </div>
                                </motion.button>
                            ))}
                        </div>

                        {/* Navigation */}
                        <div className="flex justify-between">
                            <button
                                onClick={handlePrevious}
                                disabled={currentScenarioIndex === 0}
                                className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                Sebelumnya
                            </button>

                            {currentScenarioIndex === scenarios.length - 1 ? (
                                <button
                                    onClick={() => setShowConfirm(true)}
                                    disabled={!isAllAnswered || isSubmitting}
                                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting ? 'Mengirim...' : 'Kirim Simulasi'}
                                </button>
                            ) : (
                                <button
                                    onClick={handleNext}
                                    disabled={!isCurrentAnswered}
                                    className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Selanjutnya
                                </button>
                            )}
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Confirm Submit Modal */}
                {showConfirm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="absolute inset-0 bg-black/40" onClick={() => !isSubmitting && setShowConfirm(false)} />
                        <div className="relative bg-white rounded-xl shadow-xl border border-gray-200 w-full max-w-md p-6 mx-4">
                            <h3 className="text-xl font-semibold mb-2">Kirim Simulasi?</h3>
                            <p className="text-sm text-gray-600 mb-4">
                                Kamu telah menjawab {Object.keys(answers).length} dari {scenarios.length} skenario.
                            </p>
                            <div className="flex items-center justify-end gap-3">
                                <button
                                    onClick={() => setShowConfirm(false)}
                                    disabled={isSubmitting}
                                    className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="btn-primary disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Mengirim...' : 'Kirim Sekarang'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}
