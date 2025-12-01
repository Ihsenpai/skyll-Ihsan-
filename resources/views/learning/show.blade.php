<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $learningModule->title }} - SKYLL</title>
    @vite(['resources/css/app.css'])
</head>
<body class="bg-gray-50">
    <div class="min-h-screen">
        <!-- Header -->
        <header class="bg-white shadow">
            <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div class="flex justify-between items-center mb-4">
                    <a href="{{ route('learning.index') }}" class="text-blue-600 hover:text-blue-800">
                        ← Kembali ke Daftar Materi
                    </a>
                    
                    @auth
                        @if($progress && $progress->is_completed)
                            <div class="flex items-center text-green-600">
                                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                                </svg>
                                <span class="font-medium">Selesai</span>
                            </div>
                        @endif
                    @endauth
                </div>
                
                <div class="flex items-start">
                    <div class="text-4xl mr-4">{{ $learningModule->profession->icon ?? '💼' }}</div>
                    <div class="flex-1">
                        <p class="text-sm text-gray-600 mb-2">{{ $learningModule->profession->name }}</p>
                        <h1 class="text-3xl font-bold text-gray-900">{{ $learningModule->title }}</h1>
                        
                        @if($learningModule->description)
                            <p class="text-gray-700 mt-3">{{ $learningModule->description }}</p>
                        @endif

                        <div class="flex items-center text-sm text-gray-500 mt-4">
                            @if($learningModule->duration_minutes)
                                <span class="mr-4">⏱️ {{ $learningModule->duration_minutes }} menit</span>
                            @endif
                            @if($learningModule->file_size)
                                <span>💾 {{ number_format($learningModule->file_size / 1024, 0) }} KB</span>
                            @endif
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <!-- Main Content -->
        <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            @if(session('success'))
                <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                    {{ session('success') }}
                </div>
            @endif

            <!-- PDF Viewer / Download Section -->
            <div class="bg-white rounded-lg shadow-lg p-8">
                <div class="text-center mb-6">
                    <div class="inline-block p-4 bg-red-100 rounded-full mb-4">
                        <svg class="w-16 h-16 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"/>
                        </svg>
                    </div>
                    <h2 class="text-2xl font-bold text-gray-900 mb-2">Materi PDF</h2>
                    <p class="text-gray-600 mb-6">Download file PDF untuk mempelajari materi ini</p>
                    
                    <a href="{{ route('learning.download', $learningModule) }}" 
                       class="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition font-semibold text-lg">
                        <svg class="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                        </svg>
                        Download PDF
                    </a>
                </div>

                @auth
                    @if(!$progress || !$progress->is_completed)
                        <div class="border-t pt-6 mt-6">
                            <form action="{{ route('learning.complete', $learningModule) }}" method="POST" class="text-center">
                                @csrf
                                <p class="text-gray-700 mb-4">Sudah selesai membaca materi ini?</p>
                                <button type="submit" 
                                        class="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">
                                    ✓ Tandai Selesai (+10 XP)
                                </button>
                            </form>
                        </div>
                    @endif
                @endauth
            </div>

            <!-- Navigation to Other Modules -->
            @php
                $otherModules = $learningModule->profession->activeLearningModules
                    ->where('id', '!=', $learningModule->id)
                    ->take(3);
            @endphp

            @if($otherModules->isNotEmpty())
                <div class="mt-8">
                    <h3 class="text-xl font-bold text-gray-900 mb-4">Materi Lainnya dari {{ $learningModule->profession->name }}</h3>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        @foreach($otherModules as $module)
                            <a href="{{ route('learning.show', $module) }}" 
                               class="bg-white rounded-lg shadow p-4 hover:shadow-lg transition">
                                <h4 class="font-semibold text-gray-900 mb-2">{{ $module->title }}</h4>
                                @if($module->duration_minutes)
                                    <p class="text-sm text-gray-500">⏱️ {{ $module->duration_minutes }} menit</p>
                                @endif
                            </a>
                        @endforeach
                    </div>
                </div>
            @endif
        </main>
    </div>
</body>
</html>
