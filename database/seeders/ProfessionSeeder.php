<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Profession;
use App\Models\Scenario;
use App\Models\ScenarioOption;

class ProfessionSeeder extends Seeder
{
    public function run(): void
    {
        // Data Scientist
        $dataScientist = Profession::create([
            'name' => 'Data Scientist',
            'description' => 'Mengekstrak insight dari data kompleks menggunakan analisis statistik dan machine learning untuk mendukung keputusan bisnis.',
            'is_active' => true,
        ]);

        $scenario1 = Scenario::create([
            'profession_id' => $dataScientist->id,
            'title' => 'Menangani Dataset Tidak Seimbang',
            'description' => 'Anda memiliki dataset deteksi fraud di mana hanya 2% transaksi yang terdeteksi sebagai penipuan. Bagaimana Anda menangani ini?',
            'context' => 'Membangun model deteksi fraud untuk institusi finansial dengan persyaratan akurasi yang ketat.',
            'order' => 1,
            'is_active' => true,
        ]);

        ScenarioOption::create([
            'scenario_id' => $scenario1->id,
            'option_text' => 'Gunakan teknik SMOTE atau undersampling dikombinasikan dengan metrik evaluasi yang tepat',
            'score_impact' => 100,
            'is_best_choice' => true,
            'explanation' => 'Ini adalah pendekatan standar untuk menangani dataset tidak seimbang dalam deteksi fraud.',
        ]);

        ScenarioOption::create([
            'scenario_id' => $scenario1->id,
            'option_text' => 'Abaikan ketidakseimbangan dan gunakan akurasi sebagai metrik utama',
            'score_impact' => 10,
            'is_best_choice' => false,
            'explanation' => 'Akurasi menyesatkan dengan data tidak seimbang; model bisa mencapai 98% akurasi dengan memprediksi semua sebagai non-fraud.',
        ]);

        ScenarioOption::create([
            'scenario_id' => $scenario1->id,
            'option_text' => 'Hapus semua transaksi non-fraud untuk menyeimbangkan dataset',
            'score_impact' => 20,
            'is_best_choice' => false,
            'explanation' => 'Ini akan menghilangkan informasi berharga dan membuat model tidak realistis.',
        ]);

        // AI/ML Engineer
        $aiEngineer = Profession::create([
            'name' => 'AI/ML Engineer',
            'description' => 'Merancang dan mengembangkan sistem kecerdasan buatan dan machine learning untuk menyelesaikan masalah kompleks.',
            'is_active' => true,
        ]);

        $scenario2 = Scenario::create([
            'profession_id' => $aiEngineer->id,
            'title' => 'Pemilihan Model untuk Pengenalan Gambar',
            'description' => 'Tim Anda perlu membangun sistem pengenalan gambar untuk aplikasi diagnosis medis. Pendekatan mana yang akan Anda pilih?',
            'context' => 'Anda bekerja pada proyek AI kesehatan kritis yang memerlukan akurasi dan keandalan tinggi.',
            'order' => 1,
            'is_active' => true,
        ]);

        ScenarioOption::create([
            'scenario_id' => $scenario2->id,
            'option_text' => 'Gunakan model CNN pre-trained seperti ResNet dan fine-tune dengan gambar medis',
            'score_impact' => 100,
            'is_best_choice' => true,
            'explanation' => 'Transfer learning dengan model pre-trained sangat efektif untuk tugas medical imaging.',
        ]);

        ScenarioOption::create([
            'scenario_id' => $scenario2->id,
            'option_text' => 'Bangun neural network sederhana dari nol',
            'score_impact' => 40,
            'is_best_choice' => false,
            'explanation' => 'Ini memerlukan data dalam jumlah sangat besar dan waktu training yang lama, tidak praktis untuk aplikasi medis.',
        ]);

        ScenarioOption::create([
            'scenario_id' => $scenario2->id,
            'option_text' => 'Gunakan teknik computer vision tradisional seperti edge detection',
            'score_impact' => 20,
            'is_best_choice' => false,
            'explanation' => 'Metode tradisional tidak seefektif deep learning untuk analisis gambar medis yang kompleks.',
        ]);

        // Cybersecurity Specialist
        $cyberSecurity = Profession::create([
            'name' => 'Cybersecurity Specialist',
            'description' => 'Melindungi sistem komputer dan jaringan dari serangan digital serta akses tidak sah untuk menjaga keamanan data perusahaan.',
            'is_active' => true,
        ]);

        $scenario3 = Scenario::create([
            'profession_id' => $cyberSecurity->id,
            'title' => 'Merespons Kebocoran Data',
            'description' => 'Perusahaan Anda baru saja mendeteksi akses tidak sah ke data pelanggan. Apa prioritas utama Anda?',
            'context' => 'Insiden keamanan kritis yang memerlukan tindakan segera untuk melindungi data pelanggan dan reputasi perusahaan.',
            'order' => 1,
            'is_active' => true,
        ]);

        ScenarioOption::create([
            'scenario_id' => $scenario3->id,
            'option_text' => 'Isolasi sistem yang terdampak dan nilai cakupan kebocoran',
            'score_impact' => 100,
            'is_best_choice' => true,
            'explanation' => 'Membatasi kebocoran dan memahami dampaknya adalah langkah pertama yang kritis.',
        ]);

        ScenarioOption::create([
            'scenario_id' => $scenario3->id,
            'option_text' => 'Segera beri tahu semua pelanggan tentang kebocoran',
            'score_impact' => 60,
            'is_best_choice' => false,
            'explanation' => 'Meskipun penting, Anda perlu menilai situasi terlebih dahulu untuk memberikan informasi yang akurat.',
        ]);

        ScenarioOption::create([
            'scenario_id' => $scenario3->id,
            'option_text' => 'Hapus semua log untuk mencegah bukti lebih lanjut tentang kebocoran',
            'score_impact' => 0,
            'is_best_choice' => false,
            'explanation' => 'Ini akan menghancurkan bukti forensik kritis yang diperlukan untuk memahami dan mencegah kebocoran di masa depan.',
        ]);

        // UX/UI Designer
        $uxDesigner = Profession::create([
            'name' => 'UX/UI Designer',
            'description' => 'Merancang antarmuka dan pengalaman pengguna yang intuitif untuk produk digital dengan fokus pada kebutuhan user.',
            'is_active' => true,
        ]);

        $scenario4 = Scenario::create([
            'profession_id' => $uxDesigner->id,
            'title' => 'Prioritas Fitur Baru',
            'description' => 'Stakeholder menginginkan banyak fitur baru dalam waktu singkat. Bagaimana Anda memprioritaskan?',
            'context' => 'Proyek dengan deadline ketat dan resource terbatas, perlu keputusan strategis.',
            'order' => 1,
            'is_active' => true,
        ]);

        ScenarioOption::create([
            'scenario_id' => $scenario4->id,
            'option_text' => 'Lakukan user research dan prioritaskan berdasarkan impact vs effort matrix',
            'score_impact' => 100,
            'is_best_choice' => true,
            'explanation' => 'Data-driven prioritization memastikan fitur yang paling berharga untuk user dikerjakan terlebih dahulu.',
        ]);

        ScenarioOption::create([
            'scenario_id' => $scenario4->id,
            'option_text' => 'Implementasikan semua fitur secara bersamaan',
            'score_impact' => 30,
            'is_best_choice' => false,
            'explanation' => 'Ini akan menghasilkan kualitas yang buruk dan burnout tim.',
        ]);

        ScenarioOption::create([
            'scenario_id' => $scenario4->id,
            'option_text' => 'Pilih fitur yang paling mudah diimplementasikan',
            'score_impact' => 50,
            'is_best_choice' => false,
            'explanation' => 'Kemudahan implementasi bukan jaminan nilai untuk user.',
        ]);

        // Product Manager
        $productManager = Profession::create([
            'name' => 'Product Manager',
            'description' => 'Memimpin strategi produk, menentukan roadmap, dan memastikan produk memenuhi kebutuhan pasar dan pengguna.',
            'is_active' => true,
        ]);

        $scenario5 = Scenario::create([
            'profession_id' => $productManager->id,
            'title' => 'Keputusan Pivot atau Persevere',
            'description' => 'Metrik produk Anda menurun selama 3 bulan berturut-turut. Apa keputusan Anda?',
            'context' => 'Startup fase awal dengan runway 6 bulan, perlu keputusan cepat dan tepat.',
            'order' => 1,
            'is_active' => true,
        ]);

        ScenarioOption::create([
            'scenario_id' => $scenario5->id,
            'option_text' => 'Lakukan deep dive analysis untuk memahami akar masalah, lalu buat keputusan berdasarkan data',
            'score_impact' => 100,
            'is_best_choice' => true,
            'explanation' => 'Keputusan pivot/persevere harus didasarkan pada pemahaman mendalam tentang masalah, bukan asumsi.',
        ]);

        ScenarioOption::create([
            'scenario_id' => $scenario5->id,
            'option_text' => 'Langsung pivot ke ide produk yang baru',
            'score_impact' => 40,
            'is_best_choice' => false,
            'explanation' => 'Pivot tanpa memahami masalah bisa mengulangi kesalahan yang sama.',
        ]);

        ScenarioOption::create([
            'scenario_id' => $scenario5->id,
            'option_text' => 'Tetap dengan strategi saat ini dan tunggu hasil membaik',
            'score_impact' => 20,
            'is_best_choice' => false,
            'explanation' => 'Dengan runway terbatas, menunggu tanpa action bisa fatal.',
        ]);

        // DevOps Engineer
        $devOps = Profession::create([
            'name' => 'DevOps Engineer',
            'description' => 'Mengotomasi proses deployment, mengelola infrastruktur cloud, dan memastikan reliability sistem produksi.',
            'is_active' => true,
        ]);

        $scenario6 = Scenario::create([
            'profession_id' => $devOps->id,
            'title' => 'Incident Production Down',
            'description' => 'Aplikasi produksi down dengan error rate 100%. Apa langkah pertama Anda?',
            'context' => 'E-commerce platform dengan traffic tinggi, setiap menit downtime = kerugian revenue signifikan.',
            'order' => 1,
            'is_active' => true,
        ]);

        ScenarioOption::create([
            'scenario_id' => $scenario6->id,
            'option_text' => 'Rollback ke versi stabil terakhir sambil investigate root cause',
            'score_impact' => 100,
            'is_best_choice' => true,
            'explanation' => 'Prioritas utama adalah mengembalikan service, investigasi bisa dilakukan setelah sistem stabil.',
        ]);

        ScenarioOption::create([
            'scenario_id' => $scenario6->id,
            'option_text' => 'Debug issue di production sambil traffic masih masuk',
            'score_impact' => 30,
            'is_best_choice' => false,
            'explanation' => 'Ini memperpanjang downtime dan memperburuk user experience.',
        ]);

        ScenarioOption::create([
            'scenario_id' => $scenario6->id,
            'option_text' => 'Restart semua server dan lihat apakah masalah hilang',
            'score_impact' => 50,
            'is_best_choice' => false,
            'explanation' => 'Bisa sementara membantu tapi tidak mengatasi root cause.',
        ]);

        // Business Analyst
        $businessAnalyst = Profession::create([
            'name' => 'Business Analyst',
            'description' => 'Menganalisis proses bisnis, mengidentifikasi peluang improvement, dan menjembatani kebutuhan bisnis dengan solusi teknis.',
            'is_active' => true,
        ]);

        $scenario7 = Scenario::create([
            'profession_id' => $businessAnalyst->id,
            'title' => 'Requirement Gathering',
            'description' => 'Stakeholder memberikan requirement yang saling bertentangan. Bagaimana Anda menangani ini?',
            'context' => 'Proyek transformasi digital besar dengan banyak stakeholder dari berbagai divisi.',
            'order' => 1,
            'is_active' => true,
        ]);

        ScenarioOption::create([
            'scenario_id' => $scenario7->id,
            'option_text' => 'Fasilitasi workshop dengan semua stakeholder untuk align prioritas dan trade-offs',
            'score_impact' => 100,
            'is_best_choice' => true,
            'explanation' => 'Kolaborasi dan transparensi adalah kunci untuk menyelesaikan konflik requirement.',
        ]);

        ScenarioOption::create([
            'scenario_id' => $scenario7->id,
            'option_text' => 'Ikuti requirement dari stakeholder dengan posisi tertinggi',
            'score_impact' => 40,
            'is_best_choice' => false,
            'explanation' => 'Ini bisa mengabaikan kebutuhan penting dari user atau divisi lain.',
        ]);

        ScenarioOption::create([
            'scenario_id' => $scenario7->id,
            'option_text' => 'Implementasikan semua requirement meskipun bertentangan',
            'score_impact' => 10,
            'is_best_choice' => false,
            'explanation' => 'Ini akan menghasilkan produk yang tidak koheren dan sulit digunakan.',
        ]);

        // Cloud Architect
        $cloudArchitect = Profession::create([
            'name' => 'Cloud Architect',
            'description' => 'Merancang dan mengimplementasikan solusi cloud yang scalable, secure, dan cost-effective untuk kebutuhan enterprise.',
            'is_active' => true,
        ]);

        $scenario8 = Scenario::create([
            'profession_id' => $cloudArchitect->id,
            'title' => 'Cost Optimization',
            'description' => 'Biaya cloud meningkat 300% dalam 2 bulan. Apa strategi Anda?',
            'context' => 'Startup dengan budget terbatas, perlu segera mengurangi cost tanpa mengorbankan performance.',
            'order' => 1,
            'is_active' => true,
        ]);

        ScenarioOption::create([
            'scenario_id' => $scenario8->id,
            'option_text' => 'Audit penggunaan resource, implementasi auto-scaling, dan right-sizing instances',
            'score_impact' => 100,
            'is_best_choice' => true,
            'explanation' => 'Pendekatan sistematis untuk optimasi cost sambil maintain performance.',
        ]);

        ScenarioOption::create([
            'scenario_id' => $scenario8->id,
            'option_text' => 'Langsung downgrade semua instance ke tier terendah',
            'score_impact' => 30,
            'is_best_choice' => false,
            'explanation' => 'Bisa menyebabkan performance issue dan bad user experience.',
        ]);

        ScenarioOption::create([
            'scenario_id' => $scenario8->id,
            'option_text' => 'Pindah semua service ke on-premise',
            'score_impact' => 20,
            'is_best_choice' => false,
            'explanation' => 'Migration besar memerlukan waktu dan cost upfront yang tinggi, tidak feasible untuk quick fix.',
        ]);

        // Mobile Developer
        $mobileDev = Profession::create([
            'name' => 'Mobile Developer',
            'description' => 'Mengembangkan aplikasi mobile native atau cross-platform yang performant dan user-friendly untuk iOS dan Android.',
            'is_active' => true,
        ]);

        $scenario9 = Scenario::create([
            'profession_id' => $mobileDev->id,
            'title' => 'Native vs Cross-Platform',
            'description' => 'Startup baru ingin launch app di iOS dan Android dalam 3 bulan. Tech stack apa yang Anda rekomendasikan?',
            'context' => 'Tim kecil (2-3 developer), budget terbatas, perlu time-to-market cepat.',
            'order' => 1,
            'is_active' => true,
        ]);

        ScenarioOption::create([
            'scenario_id' => $scenario9->id,
            'option_text' => 'Flutter atau React Native untuk development cepat dengan single codebase',
            'score_impact' => 100,
            'is_best_choice' => true,
            'explanation' => 'Cross-platform optimal untuk MVP dengan resource dan waktu terbatas.',
        ]);

        ScenarioOption::create([
            'scenario_id' => $scenario9->id,
            'option_text' => 'Native development (Swift + Kotlin) untuk performa maksimal',
            'score_impact' => 60,
            'is_best_choice' => false,
            'explanation' => 'Native development bagus untuk performance tapi memerlukan waktu 2x lebih lama dengan tim kecil.',
        ]);

        ScenarioOption::create([
            'scenario_id' => $scenario9->id,
            'option_text' => 'Progressive Web App (PWA) saja',
            'score_impact' => 40,
            'is_best_choice' => false,
            'explanation' => 'PWA cepat tapi limited access ke native features dan tidak optimal untuk semua use case.',
        ]);

        // Full Stack Developer
        $fullStack = Profession::create([
            'name' => 'Full Stack Developer',
            'description' => 'Menguasai frontend dan backend development untuk membangun aplikasi web end-to-end yang complete dan scalable.',
            'is_active' => true,
        ]);

        $scenario10 = Scenario::create([
            'profession_id' => $fullStack->id,
            'title' => 'Database Schema Design',
            'description' => 'Anda membangun platform e-learning. Bagaimana Anda model relasi antara users, courses, dan progress?',
            'context' => 'Platform akan memiliki ribuan users dan courses, perlu schema yang scalable dan efisien.',
            'order' => 1,
            'is_active' => true,
        ]);

        ScenarioOption::create([
            'scenario_id' => $scenario10->id,
            'option_text' => 'Gunakan relational database dengan proper normalization dan indexing',
            'score_impact' => 100,
            'is_best_choice' => true,
            'explanation' => 'Relational DB ideal untuk data terstruktur dengan relasi kompleks seperti e-learning platform.',
        ]);

        ScenarioOption::create([
            'scenario_id' => $scenario10->id,
            'option_text' => 'Simpan semua data dalam satu dokumen NoSQL',
            'score_impact' => 40,
            'is_best_choice' => false,
            'explanation' => 'NoSQL bisa jadi option tapi single document approach tidak scalable untuk relasi kompleks.',
        ]);

        ScenarioOption::create([
            'scenario_id' => $scenario10->id,
            'option_text' => 'Gunakan flat table tanpa relasi untuk simplicity',
            'score_impact' => 20,
            'is_best_choice' => false,
            'explanation' => 'Ini akan menyebabkan data redundancy dan inconsistency yang serius.',
        ]);

        // Digital Marketing Specialist
        $digitalMarketing = Profession::create([
            'name' => 'Digital Marketing Specialist',
            'description' => 'Merancang dan menjalankan strategi marketing digital untuk meningkatkan brand awareness dan konversi melalui berbagai channel online.',
            'is_active' => true,
        ]);

        $scenario11 = Scenario::create([
            'profession_id' => $digitalMarketing->id,
            'title' => 'Campaign ROI Rendah',
            'description' => 'Campaign Google Ads Anda sudah berjalan 2 minggu dengan budget Rp 50 juta tapi ROI hanya 0.5x. Apa yang Anda lakukan?',
            'context' => 'E-commerce fashion dengan target ROI minimal 3x, manajemen mulai mempertanyakan efektivitas digital ads.',
            'order' => 1,
            'is_active' => true,
        ]);

        ScenarioOption::create([
            'scenario_id' => $scenario11->id,
            'option_text' => 'Pause campaign, analisis data mendalam, optimize targeting dan ad creative, lalu test dengan budget kecil',
            'score_impact' => 100,
            'is_best_choice' => true,
            'explanation' => 'Data-driven optimization adalah kunci. Pause mencegah budget terbuang, analisis membantu identify masalah spesifik.',
        ]);

        ScenarioOption::create([
            'scenario_id' => $scenario11->id,
            'option_text' => 'Tambah budget untuk reach lebih banyak audience',
            'score_impact' => 20,
            'is_best_choice' => false,
            'explanation' => 'Menambah budget pada campaign yang tidak perform hanya akan memperbesar kerugian.',
        ]);

        ScenarioOption::create([
            'scenario_id' => $scenario11->id,
            'option_text' => 'Ganti ke influencer marketing karena ads tidak efektif',
            'score_impact' => 40,
            'is_best_choice' => false,
            'explanation' => 'Pivot channel tanpa memahami akar masalah bisa mengulangi kesalahan yang sama.',
        ]);

        // HR Manager
        $hrManager = Profession::create([
            'name' => 'HR Manager',
            'description' => 'Mengelola talent acquisition, employee development, dan workplace culture untuk membangun tim yang produktif dan engaged.',
            'is_active' => true,
        ]);

        $scenario12 = Scenario::create([
            'profession_id' => $hrManager->id,
            'title' => 'High Employee Turnover',
            'description' => 'Turnover rate tim engineering mencapai 40% dalam 6 bulan. Exit interview menunjukkan ketidakpuasan terhadap work-life balance. Apa langkah Anda?',
            'context' => 'Startup teknologi fase growth, sulit rekrut talent baru, turnover tinggi mengganggu project delivery.',
            'order' => 1,
            'is_active' => true,
        ]);

        ScenarioOption::create([
            'scenario_id' => $scenario12->id,
            'option_text' => 'Inisiasi program work-life balance (flexible hours, remote work), conduct engagement survey, dan action plan berdasarkan feedback',
            'score_impact' => 100,
            'is_best_choice' => true,
            'explanation' => 'Addressing root cause dengan solusi konkret dan melibatkan karyawan dalam improvement process.',
        ]);

        ScenarioOption::create([
            'scenario_id' => $scenario12->id,
            'option_text' => 'Tingkatkan gaji semua engineer untuk retain mereka',
            'score_impact' => 50,
            'is_best_choice' => false,
            'explanation' => 'Gaji bukan satu-satunya faktor retention, terutama jika masalahnya work-life balance.',
        ]);

        ScenarioOption::create([
            'scenario_id' => $scenario12->id,
            'option_text' => 'Rekrut lebih banyak engineer untuk replace yang keluar',
            'score_impact' => 20,
            'is_best_choice' => false,
            'explanation' => 'Ini hanya temporary fix, tidak mengatasi akar masalah yang menyebabkan turnover.',
        ]);

        // Financial Analyst
        $financialAnalyst = Profession::create([
            'name' => 'Financial Analyst',
            'description' => 'Menganalisis data keuangan, membuat proyeksi, dan memberikan rekomendasi investasi untuk mendukung keputusan bisnis strategis.',
            'is_active' => true,
        ]);

        $scenario13 = Scenario::create([
            'profession_id' => $financialAnalyst->id,
            'title' => 'Investment Decision',
            'description' => 'Perusahaan punya Rp 10 miliar untuk investasi. Ada 3 opsi: ekspansi pabrik (ROI 15% dalam 5 tahun), akuisisi kompetitor kecil, atau diversifikasi produk baru. Apa rekomendasi Anda?',
            'context' => 'Perusahaan manufaktur established, cash flow stabil, target pertumbuhan 20% YoY.',
            'order' => 1,
            'is_active' => true,
        ]);

        ScenarioOption::create([
            'scenario_id' => $scenario13->id,
            'option_text' => 'Lakukan comprehensive analysis (NPV, IRR, risk assessment) untuk semua opsi, kemudian rekomendasi berdasarkan alignment dengan strategic goals',
            'score_impact' => 100,
            'is_best_choice' => true,
            'explanation' => 'Investment decision harus data-driven dan aligned dengan strategi jangka panjang perusahaan.',
        ]);

        ScenarioOption::create([
            'scenario_id' => $scenario13->id,
            'option_text' => 'Pilih ekspansi pabrik karena ROI jelas 15%',
            'score_impact' => 60,
            'is_best_choice' => false,
            'explanation' => 'ROI saja tidak cukup, perlu pertimbangan risk, timing, dan strategic fit.',
        ]);

        ScenarioOption::create([
            'scenario_id' => $scenario13->id,
            'option_text' => 'Bagi rata investasi ke 3 opsi untuk diversifikasi risk',
            'score_impact' => 30,
            'is_best_choice' => false,
            'explanation' => 'Spreading thin tanpa analisis bisa menghasilkan hasil suboptimal di semua area.',
        ]);

        // Content Creator
        $contentCreator = Profession::create([
            'name' => 'Content Creator',
            'description' => 'Membuat konten kreatif dan engaging untuk berbagai platform digital, mulai dari video, artikel, hingga social media posts.',
            'is_active' => true,
        ]);

        $scenario14 = Scenario::create([
            'profession_id' => $contentCreator->id,
            'title' => 'Viral Content Strategy',
            'description' => 'Video Anda stuck di 1000 views padahal kompetitor dengan konten serupa bisa 100K+ views. Apa yang perlu diperbaiki?',
            'context' => 'YouTube channel edutech dengan 50K subscribers, engagement rate menurun 3 bulan terakhir.',
            'order' => 1,
            'is_active' => true,
        ]);

        ScenarioOption::create([
            'scenario_id' => $scenario14->id,
            'option_text' => 'Analisis competitor, optimize thumbnail & title, improve hook di 10 detik pertama, dan test posting time',
            'score_impact' => 100,
            'is_best_choice' => true,
            'explanation' => 'Kombinasi optimization elemen teknis (thumbnail, title, hook) dan strategic timing crucial untuk algorithmic performance.',
        ]);

        ScenarioOption::create([
            'scenario_id' => $scenario14->id,
            'option_text' => 'Buat konten yang lebih kontroversial untuk trigger engagement',
            'score_impact' => 40,
            'is_best_choice' => false,
            'explanation' => 'Controversy bisa backfire dan merusak brand image jangka panjang.',
        ]);

        ScenarioOption::create([
            'scenario_id' => $scenario14->id,
            'option_text' => 'Pindah platform ke TikTok karena YouTube sudah saturated',
            'score_impact' => 30,
            'is_best_choice' => false,
            'explanation' => 'Platform switch tanpa fix fundamental content issues tidak akan solve masalah.',
        ]);

        // Graphic Designer
        $graphicDesigner = Profession::create([
            'name' => 'Graphic Designer',
            'description' => 'Menciptakan visual design yang menarik dan efektif untuk branding, marketing materials, dan komunikasi visual perusahaan.',
            'is_active' => true,
        ]);

        $scenario15 = Scenario::create([
            'profession_id' => $graphicDesigner->id,
            'title' => 'Client Revision Tak Terbatas',
            'description' => 'Client sudah minta revision ke-15 untuk logo design dengan feedback yang saling kontradiktif. Project sudah over timeline 2 minggu. Apa yang Anda lakukan?',
            'context' => 'Freelance project dengan fee fixed, tidak ada batasan revision di kontrak, client adalah brand besar yang potensial untuk project lanjutan.',
            'order' => 1,
            'is_active' => true,
        ]);

        ScenarioOption::create([
            'scenario_id' => $scenario15->id,
            'option_text' => 'Schedule meeting untuk align expectation, present 2-3 final direction berdasarkan semua feedback, dan set batas revision di kontrak revisi',
            'score_impact' => 100,
            'is_best_choice' => true,
            'explanation' => 'Communication dan clear expectation adalah kunci. Meeting membantu resolve confusion dan revisi kontrak protect kedua pihak.',
        ]);

        ScenarioOption::create([
            'scenario_id' => $scenario15->id,
            'option_text' => 'Terus kerjakan revision sesuai permintaan untuk jaga hubungan baik',
            'score_impact' => 30,
            'is_best_choice' => false,
            'explanation' => 'Ini tidak sustainable dan bisa lead to burnout. Client yang baik menghargai boundaries profesional.',
        ]);

        ScenarioOption::create([
            'scenario_id' => $scenario15->id,
            'option_text' => 'Tolak revision selanjutnya dan deliver design terakhir',
            'score_impact' => 20,
            'is_best_choice' => false,
            'explanation' => 'Terlalu confrontational dan bisa merusak relationship tanpa solve akar masalah komunikasi.',
        ]);

        // Supply Chain Manager
        $supplyChain = Profession::create([
            'name' => 'Supply Chain Manager',
            'description' => 'Mengelola rantai pasokan end-to-end dari procurement hingga distribution untuk efisiensi operasional dan kepuasan customer.',
            'is_active' => true,
        ]);

        $scenario16 = Scenario::create([
            'profession_id' => $supplyChain->id,
            'title' => 'Supplier Disruption',
            'description' => 'Supplier utama Anda (60% dari raw material) tiba-tiba bangkrut. Production akan terhenti dalam 2 minggu jika tidak ada solusi. Apa langkah Anda?',
            'context' => 'Perusahaan FMCG dengan komitmen delivery ke retail besar, delay bisa kena penalty dan lost shelf space.',
            'order' => 1,
            'is_active' => true,
        ]);

        ScenarioOption::create([
            'scenario_id' => $scenario16->id,
            'option_text' => 'Immediately activate backup suppliers, negotiate expedited delivery, dan parallel develop long-term multi-supplier strategy',
            'score_impact' => 100,
            'is_best_choice' => true,
            'explanation' => 'Dual approach: solve immediate crisis dengan backup suppliers, dan prevent future risk dengan diversifikasi.',
        ]);

        ScenarioOption::create([
            'scenario_id' => $scenario16->id,
            'option_text' => 'Inform customer tentang potential delay dan negotiate timeline',
            'score_impact' => 40,
            'is_best_choice' => false,
            'explanation' => 'Transparansi penting tapi tidak solve masalah. Prioritas adalah secure supply continuity.',
        ]);

        ScenarioOption::create([
            'scenario_id' => $scenario16->id,
            'option_text' => 'Temporarily halt production sambil cari supplier baru',
            'score_impact' => 10,
            'is_best_choice' => false,
            'explanation' => 'Production halt adalah last resort karena impact ke revenue dan customer relationship sangat besar.',
        ]);

        // Teacher/Educator
        $teacher = Profession::create([
            'name' => 'Guru/Pendidik',
            'description' => 'Membimbing dan menginspirasi siswa untuk berkembang secara akademis dan karakter melalui metode pembelajaran yang efektif dan inovatif.',
            'is_active' => true,
        ]);

        $scenario17 = Scenario::create([
            'profession_id' => $teacher->id,
            'title' => 'Diverse Learning Pace',
            'description' => 'Di kelas Anda ada siswa yang sangat cepat memahami materi dan ada yang sangat lambat. Bagaimana Anda handle agar semua siswa dapat belajar optimal?',
            'context' => 'Kelas 30 siswa SMP, kurikulum ketat dengan target materi yang harus diselesaikan tepat waktu.',
            'order' => 1,
            'is_active' => true,
        ]);

        ScenarioOption::create([
            'scenario_id' => $scenario17->id,
            'option_text' => 'Implementasi differentiated instruction: buat tier activities, peer teaching, dan additional resources untuk berbagai level',
            'score_impact' => 100,
            'is_best_choice' => true,
            'explanation' => 'Differentiation memungkinkan semua siswa belajar sesuai pace mereka tanpa hold back yang cepat atau tinggalkan yang lambat.',
        ]);

        ScenarioOption::create([
            'scenario_id' => $scenario17->id,
            'option_text' => 'Fokus ke middle group, siswa fast learner belajar sendiri, slow learner remedial di luar jam',
            'score_impact' => 50,
            'is_best_choice' => false,
            'explanation' => 'Ini lebih praktis tapi tidak optimal untuk development siswa di kedua ujung spektrum.',
        ]);

        ScenarioOption::create([
            'scenario_id' => $scenario17->id,
            'option_text' => 'Slow down pace untuk memastikan semua siswa paham',
            'score_impact' => 30,
            'is_best_choice' => false,
            'explanation' => 'Ini akan bore fast learners dan tidak feasible dengan kurikulum yang ketat.',
        ]);

        // Event Organizer
        $eventOrganizer = Profession::create([
            'name' => 'Event Organizer',
            'description' => 'Merencanakan dan mengelola berbagai acara dari konsep hingga eksekusi untuk menciptakan experience yang memorable bagi peserta.',
            'is_active' => true,
        ]);

        $scenario18 = Scenario::create([
            'profession_id' => $eventOrganizer->id,
            'title' => 'Last-Minute Venue Cancellation',
            'description' => 'H-3 sebelum conference 500 orang, venue membatalkan booking karena double booking. Bagaimana Anda handle crisis ini?',
            'context' => 'Corporate event dengan C-level executives, budget sudah habis 80%, sponsors dan speakers sudah confirmed.',
            'order' => 1,
            'is_active' => true,
        ]);

        ScenarioOption::create([
            'scenario_id' => $scenario18->id,
            'option_text' => 'Immediately contact alternative venues, negotiate emergency rate, communicate transparently dengan stakeholders, prepare backup hybrid/virtual option',
            'score_impact' => 100,
            'is_best_choice' => true,
            'explanation' => 'Multi-pronged crisis management: solve venue issue, manage expectations, dan prepare plan B.',
        ]);

        ScenarioOption::create([
            'scenario_id' => $scenario18->id,
            'option_text' => 'Postpone event 2 minggu untuk cari venue yang tepat',
            'score_impact' => 40,
            'is_best_choice' => false,
            'explanation' => 'Postpone last minute akan disrupt schedule banyak pihak dan damage credibility.',
        ]);

        ScenarioOption::create([
            'scenario_id' => $scenario18->id,
            'option_text' => 'Switch to fully virtual event',
            'score_impact' => 60,
            'is_best_choice' => false,
            'explanation' => 'Bisa jadi option tapi drastically change event experience yang sudah dipromosikan sebagai in-person.',
        ]);
    }
}

