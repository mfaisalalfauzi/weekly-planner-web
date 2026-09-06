# 🚀 IT PM Enterprise Workspace: Projects, Deadlines & Team Workload

Aplikasi web mandiri (*standalone web application*) untuk memanajemen portofolio proyek, master task backlog, peramalan kesehatan deadline (*Project Deadline Health Forecasting*), beban kerja anggota tim (*Team Workload*), alokasi tugas mingguan peran ganda (*PM vs Teknis*), serta siap di-*deploy* langsung ke **Vercel**.

---

## 🌟 3 Pilar Fitur Utama

### 1. 📋 Rencana Tugas Mingguan (*Weekly Sprint Planner*)
- **Dual-Role Capacity Visualizer:** Mengukur rasio alokasi waktu **PM (Koordinasi & Ceremony)** vs **Teknis (Deep Work & Dev)** secara real-time.
- **Smart Auto-Schedule Minggu Ini:** Otomatis menarik master task dari backlog proyek aktif yang belum terjadwal ke dalam slot kerja mingguan sesuai bobot tugas dan prioritas tanpa perlu input dua kali.
- **Unified PIC Dropdown & Filtering:** Terhubung langsung dengan daftar anggota tim terdaftar. Anda dapat memfilter tabel tugas berdasarkan PIC tertentu.
- **Bulk Operations:** Fitur **Hapus Massal (*Bulk Delete*)** dan **Tandai Selesai Massal (*Bulk Mark Done*)** dengan sekali klik.
- **Time-Blocking:** Alokasi pagi (09:00 - 12:00) untuk PM/Sync dan siang (13:30 - 17:00) untuk Teknis.

### 2. 📁 Portofolio Proyek & Master Tasks (*Deadline Health Indicator*)
- **Daftar Master Tasks per Proyek:** Setiap proyek memiliki daftar tugas induk lengkap dengan jenis (PM/Teknis), bobot tugas (*Ringan* = 0.5 hari kerja, *Sedang* = 1.5 hari kerja, *Berat* = 3 hari kerja), target deadline task, dan PIC.
- **Formula Transparan Prediksi Kesehatan Deadline (*Deadline Health Forecasting*):**
  $$\text{Sisa Hari Kerja (Mandays)} = \sum \text{Bobot Master Task Belum Selesai}$$
  $$\text{Sisa Hari Kalender} = \text{Target Deadline} - \text{Hari Ini}$$
  $$\text{Buffer Margin} = \text{Sisa Hari Kalender} - \text{Sisa Hari Kerja}$$
  - `🟢 ON-TRACK` (Buffer $> 5$ hari): Waktu kalender aman dan mencukupi untuk menyelesaikan sisa beban kerja.
  - `🟡 AT-RISK` (Buffer $0 \dots 5$ hari): Margin waktu sangat tipis, perlu mitigasi blocker segera.
  - `🔴 OVERDUE / DEFISIT` (Buffer $< 0$ atau tanggal lewat): Sisa hari kalender tidak cukup untuk menyelesaikan sisa hari kerja; eskalasi atau penambahan tim diperlukan.
- **Penyelesaian Master Task:** Progress bar visual menampilkan persentase task yang telah *Done* terhadap total master task.

### 3. 👥 Beban Kerja Tim (*Team Workload & Monthly Sprint Matrix*)
- **Dual-Mode Dashboard:** Beralih mulus antara **[📊 Rekap Bulanan]** dan **[🗓️ Detail Mingguan]** langsung di dalam tab Beban Kerja Tim:
  - **📊 Rekap Bulanan (*Monthly Sprint Matrix & Capacity*):**
    - **Matriks Distribusi Sprint Bulanan (M1 s/d M5):** Pemetaan interaktif alokasi tugas mingguan per anggota tim untuk mendeteksi ketimpangan beban kerja antar-sprint dalam satu bulan.
    - **Interaktif Jump-to-Week:** Klik salah satu chip minggu (misal M2) pada tabel matriks atau kartu anggota untuk langsung membuka jadwal minggu tersebut di tab tugas.
    - **Kapasitas Bulanan Ideal:** Dihitung transparan berbasis 4 minggu sprint: $\text{Kapasitas Bulanan} = \text{maxTasks/minggu} \times 4$.
    - **Sebaran Portofolio Proyek Bulanan:** Menampilkan rincian tag proyek yang didukung anggota tim dalam bulan berjalan (misal `[MOB]: 5`, `[WEB]: 3`).
    - **Rangkuman Progres Bulanan:** Pelacakan total task *Done*, *In Progress*, *To Do*, serta peringatan *Active Blocker*.
  - **🗓️ Detail Mingguan (*Weekly Workload Detail*):**
    - **Pengukur Beban Visual (*Capacity Meter*):**
      - 🟢 **Optimal:** 1 s/d (Maks - 1) task mingguan.
      - 🟡 **Penuh:** Tepat mencapai batas kapasitas mingguan (4-5 task).
      - 🔴 **Overload:** Melebihi kapasitas maksimal mingguan (peringatan otomatis).
    - **Daftar Tugas Alokasi:** Melihat judul pekerjaan, slot hari (Pagi/Siang), serta status penyelesaian task minggu berjalan.
- **Dedicated Period Selector:** Pilih dan ganti bulan (`teamMonthFilterSelect`) dan minggu (`teamWeekFilterSelect`) secara mandiri di tab Tim tanpa perlu bolak-balik ke tab tugas.
- **Quick Filter:** Klik "🔍 Filter Jadwal" pada anggota tim untuk langsung membuka seluruh tugas bulanan atau mingguan milik PIC tersebut.

---

## 💻 Cara Menjalankan di Komputer Lokal

Aplikasi ini dibuat dengan teknologi web modern murni (*Pure HTML5, Tailwind CSS, ES6 JavaScript*), **tanpa perlu menginstal Node.js, npm, atau web server**:
1. Buka folder proyek ini di File Explorer:
   `C:\Users\Administrator\.gemini\antigravity\scratch\weekly-planner-web`
2. **Klik ganda file `index.html`** untuk langsung membukanya di Google Chrome, Edge, atau browser lainnya.

---

## ☁️ Cara Deploy ke Vercel

### Cara A: Unggah ke GitHub (Paling Praktis)
1. Buat repositori baru di [GitHub](https://github.com/new) (misal: `it-pm-workspace`).
2. Unggah seluruh file di folder ini (`index.html`, `app.js`, `styles.css`, `sample-tasks.json`, `vercel.json`) ke repositori tersebut.
3. Buka [Vercel Dashboard](https://vercel.com/) dan login dengan GitHub.
4. Klik **Add New...** &rarr; **Project**, lalu pilih repositori `it-pm-workspace`.
5. Biarkan *Framework Preset* sebagai **Other**, lalu klik **Deploy**!
6. Aplikasi Anda langsung online dengan URL publik gratis (misal: `https://it-pm-workspace.vercel.app`).

---

## 📁 Struktur Berkas

```
weekly-planner-web/
├── index.html          # Tata letak 3 tab (Tasks, Projects, Team Workload) & 5 modal interaktif
├── app.js              # State management, perhitungan kesehatan deadline, kapasitas tim, & auto-scheduler
├── styles.css          # Styling custom gauge, badge warna tim & proyek, print report
├── sample-tasks.json   # Template data awal V4 (anggota tim, master tasks proyek, & jadwal mingguan)
├── vercel.json         # Konfigurasi hosting statis & security header Vercel
└── README.md           # Dokumentasi lengkap & panduan penggunaan
```

