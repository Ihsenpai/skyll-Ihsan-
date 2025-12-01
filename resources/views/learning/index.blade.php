<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Materi Pembelajaran - SKYLL</title>
    @vite(['resources/css/app.css'])
</head>
<body class="bg-gray-50">
    <div class="min-h-screen">
        <!-- Header -->
        <header class="bg-white shadow">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div class="flex justify-between items-center">
                    <h1 class="text-3xl font-bold text-gray-900">📚 Materi Pembelajaran</h1>
                    <a href="{{ route('dashboard') }}" class="text-blue-600 hover:text-blue-800">
                        ← Kembali ke Dashboard
                    </a>
                </div>
            </div>
        </header>

        <!-- Main Content -->
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            @if($professions->isEmpty())
                <div class="text-center py-12">
                    <p class="text-gray-500 text-lg">Belum ada materi pembelajaran tersedia.</p>
                </div>
            @else
                @foreach($professions as $profession)
                    @if($profession->activeLearningModules->isNotEmpty())
                        <div class="mb-12">
                            <!-- Profession Header -->
                            <div class="flex items-center mb-6">
                                <div class="text-4xl mr-4">{{ $profession->icon ?? '💼' }}</div>
                                <div>
                                    <h2 class="text-2xl font-bold text-gray-900">{{ $profession->name }}</h2>
                                    <p class="text-gray-600">{{ $profession->description }}</p>
                                </div>
                            </div>

                            <!-- Learning Modules Grid -->
                            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                @foreach($profession->activeLearningModules as $module)
                                    <div class="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6">
                                        <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ $module->title }}</h3>
                                        
                                        @if($module->description)
                                            <p class="text-gray-600 mb-4">{{ Str::limit($module->description, 100) }}</p>
                                        @endif

                                        <div class="flex items-center text-sm text-gray-500 mb-4">
                                            @if($module->duration_minutes)
                                                <span class="mr-4">⏱️ {{ $module->duration_minutes }} menit</span>
                                            @endif
                                            <span>📄 PDF</span>
                                        </div>

                                        @auth
                                            @php
                                                $isCompleted = $module->isCompletedBy(auth()->user());
                                            @endphp
                                            
                                            @if($isCompleted)
                                                <div class="flex items-center text-green-600 mb-3">
                                                    <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                                                    </svg>
                                                    <span class="font-medium">Selesai</span>
                                                </div>
                                            @endif
                                        @endauth

                                        <a href="{{ route('learning.show', $module) }}" 
                                           class="block w-full text-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
                                            Buka Materi
                                        </a>
                                    </div>
                                @endforeach
                            </div>
                        </div>
                    @endif
                @endforeach
            @endif
        </main>
    </div>
</body>
</html>
