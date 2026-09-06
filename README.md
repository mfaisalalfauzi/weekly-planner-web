# 🚀 Weekly Task & Capacity Planner - Junior IT PM

Aplikasi web mandiri (*standalone web application*) untuk memanajemen rencana kerja mingguan, menghitung rasio kapasitas peran ganda (*PM vs Teknis*), menerapkan *time-blocking*, serta siap di-*deploy* langsung ke **Vercel**.

---

## 🌟 Fitur Utama

1. **Input & Edit Tugas Langsung di Web (Full Native CRUD):**
   - Modal formulir interaktif: tambah tugas baru, edit detail tugas, atau hapus tugas dengan mudah.
   - Field lengkap: Hari, Slot Waktu (*Time-Block*), Proyek/Sprint, Jenis Pekerjaan (`PM` / `Teknis`), Kategori, Prioritas (`P1-P3`), Blocker & Dependency, Target Deliverable, dan Status.
2. **Dashboard Kapasitas & Metrik Real-Time:**
   - **Rasio Beban Kerja (PM vs Teknis):** Otomatis terkalkulasi dengan visual progress bar.
   - **Penyelesaian Tugas:** Menghitung persentase task yang telah *Done*.
   - **Active Blockers Counter:** Menyorot tugas yang terhambat kendala teknis atau pihak ketiga.
   - **Evaluasi Kapasitas:** Notifikasi rekomendasi jika beban koordinasi PM terlalu mendominasi (>70%).
3. **Penyimpanan Lokal & Fitur Backup/Restore:**
   - Data otomatis tersimpan di browser Anda (*LocalStorage*).
   - Fitur **Download Backup JSON** & **Restore JSON** untuk memindahkan data antar perangkat.
   - Fitur **Download CSV (Excel)** dan **Salin Tabel Markdown** untuk laporan ke Slack, Jira, atau email mingguan.

---

## 💻 Cara Menjalankan di Komputer Lokal

Anda tidak perlu menginstal Node.js atau server apa pun:
1. Buka folder proyek ini di File Explorer:
   `C:\Users\Administrator\.gemini\antigravity\scratch\weekly-planner-web`
2. **Klik ganda (double click) file `index.html`** untuk langsung membukanya di browser (Google Chrome / Edge).

---

## ☁️ Cara Deploy ke Vercel

Ada dua cara mudah untuk mengunggah aplikasi ini ke Vercel:

### Cara A: Upload via GitHub (Direkomendasikan)
1. Buat repositori baru di [GitHub](https://github.com/new) (misal: `weekly-planner-it-pm`).
2. Unggah seluruh file di folder ini (`index.html`, `app.js`, `styles.css`, `vercel.json`) ke repositori GitHub tersebut.
3. Buka dashboard [Vercel](https://vercel.com/) dan login menggunakan akun GitHub Anda.
4. Klik **Add New...** &rarr; **Project**.
5. Pilih repositori GitHub `weekly-planner-it-pm` yang baru saja Anda buat.
6. Pada bagian *Framework Preset*, biarkan default (**Other**).
7. Klik tombol **Deploy**!
8. Dalam hitungan detik, aplikasi Anda sudah live dengan URL publik, contoh: `https://weekly-planner-it-pm.vercel.app`.

### Cara B: Menggunakan Vercel CLI (Jika Node.js terpasang di komputer)
1. Buka terminal di folder ini:
   ```bash
   npx vercel
   ```
2. Ikuti instruksi login di layar dan pilih opsi default.
3. Aplikasi akan langsung ter-deploy ke Vercel.

---

## 📁 Struktur Berkas

```
weekly-planner-web/
├── index.html          # Halaman utama, antarmuka dashboard, & modal formulir
├── app.js              # State management, kalkulasi metrik, & logika CRUD
├── styles.css          # Styling kustom, scrollbar halus, & print layout
├── sample-tasks.json   # Cadangan data tugas awal
├── vercel.json         # Konfigurasi deployment & clean URL Vercel
└── README.md           # Panduan penggunaan & deployment
```
