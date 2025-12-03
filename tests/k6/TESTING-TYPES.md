# K6 Testing Types for Skyll Application

## 📊 **Performance Testing dengan K6 - 4 Jenis Testing Utama**

### 1. 🎯 **Load Testing** - Test Beban Normal
**Tujuan**: Menguji sistem dengan beban user normal untuk melihat apakah performanya stabil

**Skenario**: 
- 10-20 user bersamaan
- Duration: 2-5 menit  
- Traffic pattern: Gradual ramp up → steady → ramp down

**File**: `demo-test.js`, `basic-load-test.js`

**Command**: `k6 run demo-test.js`

---

### 2. 💪 **Stress Testing** - Cari Breaking Point  
**Tujuan**: Memberi beban di luar batas normal untuk mencari titik hancur (breaking point) aplikasi

**Skenario**:
- 50-100+ user bersamaan
- Duration: 5-10 menit
- Traffic pattern: Gradual increase until system breaks

**File**: `stress-test.js`

**Command**: `k6 run stress-test.js`

---

### 3. ⚡ **Spike Testing** - Flash Sale Scenario
**Tujuan**: Memberi lonjakan trafik tiba-tiba (misal: saat flash sale) lalu turun lagi

**Skenario**:
- 0 → 50 user dalam 10 detik
- Hold 50 user selama 30 detik  
- 50 → 0 user dalam 10 detik

**File**: `advanced-test.js` (memiliki spike phase)

**Command**: `k6 run advanced-test.js`

---

### 4. ⏰ **Soak Testing** - Long Duration Test
**Tujuan**: Menjalankan beban normal dalam waktu yang lama untuk mencari kebocoran memori (memory leak)

**Skenario**:
- 15-20 user consistent
- Duration: **Fleksibel** (30 menit untuk demo, 6+ jam untuk production)
- Traffic pattern: Steady load for extended period

**Durasi Options**:
- 🎓 **Demo/Kuliah**: 30 menit - 2 jam
- 🏢 **Production**: 6-24 jam  
- 🔬 **Research**: 2-4 jam

**File**: `soak-test.js` ✅

**Command**: `k6 run soak-test.js`

---

## 🎯 **Rekomendasi untuk Tugas Kuliah:**

### **Untuk Presentasi Demo:**
```bash
k6 run demo-test.js
```
- ✅ Guaranteed success
- 📊 Clean, readable output
- 🎯 Perfect untuk demo di kelas

### **Untuk Showcase Advanced:**
```bash  
k6 run advanced-test.js
```
- 🚀 Multi-scenario testing
- 📈 Real-time progress bars
- 🎨 Professional visual output
- 💻 Impressive untuk dosen

### **Untuk Analisis Performa:**
```bash
k6 run basic-load-test.js
```
- 📊 Realistic load simulation  
- 🔍 Detailed performance metrics
- 📈 Good for performance analysis

### **Untuk Stress Analysis:**
```bash
k6 run stress-test.js  
```
- 💪 Find breaking point
- 🔥 High load simulation
- ⚠️ Be careful - might crash server!

---

## 📋 **Summary Hasil Testing:**

| Test Type | Users | Duration | Purpose | Risk Level |
|-----------|-------|----------|---------|------------|
| **Load** | 10-20 | 2-5 min | Normal performance | 🟢 Safe |
| **Stress** | 50-100+ | 5-10 min | Breaking point | 🔴 High |  
| **Spike** | 0→50→0 | 1-2 min | Sudden traffic | 🟡 Medium |
| **Soak** | 15-20 | 30min-24h* | Memory leaks | 🟢 Safe |

---

## ✅ **Perfect Combination untuk Kuliah:**
1. **Demo** → `demo-test.js` (guaranteed success)
2. **Load** → `basic-load-test.js` (realistic scenario) 
3. **Spike** → `advanced-test.js` (impressive visuals)
4. **Explanation** → Jelaskan concept 4 jenis testing

**Total waktu demo**: ~10 menit
**Impression level**: 🚀 Very High!