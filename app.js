/**
 * IT PM Workspace: Projects, Master Tasks with Deadlines & Team Workload
 * Core Application Logic
 */

// Initial Default Team Members
const DEFAULT_TEAM = [
  { id: "tm-1", name: "Anda (IT PM)", role: "PM & Tech Lead", maxTasks: 5, color: "blue" },
  { id: "tm-2", name: "Budi Pratama", role: "Frontend Developer", maxTasks: 4, color: "cyan" },
  { id: "tm-3", name: "Andi Saputra", role: "Backend Developer", maxTasks: 4, color: "purple" },
  { id: "tm-4", name: "Sari Wulandari", role: "QA / Tester", maxTasks: 5, color: "emerald" },
  { id: "tm-5", name: "Dimas Aditya", role: "UI/UX Designer", maxTasks: 4, color: "amber" }
];

// Initial Default Projects with Master Tasks and Deadlines
const DEFAULT_PROJECTS = [
  {
    id: "proj-1",
    name: "App Mobile v2.1",
    code: "MOB",
    client: "Internal / Retail",
    status: "Active",
    targetDate: "2026-10-31",
    color: "blue",
    description: "Pengembangan fitur checkout dan integrasi payment gateway",
    masterTasks: [
      { id: "mt-1", title: "Fasilitasi Sprint Planning & estimasi story point", type: "PM", weight: "Ringan", deadline: "2026-09-10", category: "Ceremony", pic: "Anda (IT PM)" },
      { id: "mt-2", title: "Eskalasi issue kredensial API payment gateway", type: "PM", weight: "Sedang", deadline: "2026-09-15", category: "Blocker", pic: "Anda (IT PM)" },
      { id: "mt-3", title: "Slicing UI Checkout & integrasi state API", type: "Teknis", weight: "Sedang", deadline: "2026-09-20", category: "Frontend", pic: "Budi Pratama" },
      { id: "mt-4", title: "Setup unit test & backend endpoint auth token", type: "Teknis", weight: "Berat", deadline: "2026-09-22", category: "Backend", pic: "Andi Saputra" },
      { id: "mt-5", title: "Bug triage & koordinasi scope rilis UAT", type: "PM", weight: "Sedang", deadline: "2026-09-25", category: "Delivery", pic: "Sari Wulandari" },
      { id: "mt-6", title: "Investigasi crash log Sentry modul Checkout", type: "Teknis", weight: "Berat", deadline: "2026-09-28", category: "Debugging", pic: "Budi Pratama" }
    ]
  },
  {
    id: "proj-2",
    name: "Web Portal Internal",
    code: "WEB",
    client: "Operations",
    status: "Active",
    targetDate: "2026-09-30",
    color: "emerald",
    description: "Dashboard analitik & sistem report performa divisi",
    masterTasks: [
      { id: "mt-21", title: "Slicing UI Dashboard & integrasi state API", type: "Teknis", weight: "Sedang", deadline: "2026-09-12", category: "Frontend", pic: "Dimas Aditya" },
      { id: "mt-22", title: "Setup cron job & optimasi query database report", type: "Teknis", weight: "Sedang", deadline: "2026-09-16", category: "Database", pic: "Andi Saputra" },
      { id: "mt-23", title: "Review performa load time dashboard dengan tim infra", type: "PM", weight: "Ringan", deadline: "2026-09-25", category: "Review", pic: "Anda (IT PM)" }
    ]
  },
  {
    id: "proj-3",
    name: "Backend Core",
    code: "API",
    client: "Architecture Team",
    status: "Active",
    targetDate: "2026-11-15",
    color: "purple",
    description: "Refactoring microservices & optimasi security auth token",
    masterTasks: [
      { id: "mt-31", title: "Unit test & fix bug token auth expired", type: "Teknis", weight: "Berat", deadline: "2026-09-15", category: "Backend", pic: "Andi Saputra" },
      { id: "mt-32", title: "Audit security vulnerability dependencies", type: "Teknis", weight: "Sedang", deadline: "2026-10-05", category: "Security", pic: "Andi Saputra" }
    ]
  },
  {
    id: "proj-4",
    name: "CRM Klien X",
    code: "CRM",
    client: "PT Mitra Sejahtera",
    status: "Active",
    targetDate: "2026-12-20",
    color: "amber",
    description: "Implementasi modul customer pipeline & ticketing",
    masterTasks: [
      { id: "mt-41", title: "Backlog Grooming & estimasi timeline change request", type: "PM", weight: "Sedang", deadline: "2026-09-16", category: "Scoping", pic: "Anda (IT PM)" },
      { id: "mt-42", title: "Koneksi database sinkronisasi data pelanggan", type: "Teknis", weight: "Berat", deadline: "2026-10-10", category: "Backend", pic: "Andi Saputra" }
    ]
  },
  {
    id: "proj-5",
    name: "Shared Library",
    code: "LIB",
    client: "Dev Team",
    status: "Active",
    targetDate: "2026-09-25",
    color: "cyan",
    description: "Standardisasi reusable components dan automasi CI/CD",
    masterTasks: [
      { id: "mt-51", title: "Code review PR tim dan update technical docs", type: "Teknis", weight: "Ringan", deadline: "2026-09-18", category: "Code Review", pic: "Budi Pratama" }
    ]
  }
];

// Initial Default Weekly Tasks (Distributed across Minggu 1 - Minggu 4)
const DEFAULT_TASKS = [
  // ===== MINGGU 1 (Sprint Kickoff & Architecture Setup) =====
  { id: 101, projectId: "proj-1", masterTaskId: "mt-1", month: "2026-09", week: "Minggu 1", day: "Senin", slot: "Pagi: 09-12", type: "PM", task: "Fasilitasi Sprint Planning & estimasi story point", category: "Ceremony", pic: "Anda (IT PM)", priority: "P1 (High)", blocker: "-", deliverable: "Sprint Backlog September terkunci di Jira", status: "Done" },
  { id: 102, projectId: "proj-1", masterTaskId: "mt-3", month: "2026-09", week: "Minggu 1", day: "Senin", slot: "Siang: 13-17", type: "Teknis", task: "Setup Tailwind design tokens & component layout", category: "Frontend", pic: "Budi Pratama", priority: "P2 (Med)", blocker: "-", deliverable: "Setup branch & skeleton UI", status: "Done" },
  { id: 103, projectId: "proj-1", masterTaskId: "mt-4", month: "2026-09", week: "Minggu 1", day: "Selasa", slot: "Pagi: 09-12", type: "Teknis", task: "Design schema database transaksi payment gateway", category: "Database", pic: "Andi Saputra", priority: "P1 (High)", blocker: "-", deliverable: "ERD & migration script v1", status: "Done" },
  { id: 104, projectId: "proj-1", masterTaskId: "mt-5", month: "2026-09", week: "Minggu 1", day: "Selasa", slot: "Siang: 13-17", type: "Teknis", task: "Penyusunan Test Plan & Test Scenarios Sprint", category: "QA", pic: "Sari Wulandari", priority: "P2 (Med)", blocker: "-", deliverable: "Test cases dokumen di Jira", status: "Done" },
  { id: 105, projectId: "proj-2", masterTaskId: "mt-21", month: "2026-09", week: "Minggu 1", day: "Rabu", slot: "Pagi: 09-12", type: "Teknis", task: "Finalisasi Figma Prototype modul Checkout v2.1", category: "Design", pic: "Dimas Aditya", priority: "P2 (Med)", blocker: "-", deliverable: "Figma link approval klien", status: "Done" },
  { id: 106, projectId: "proj-2", masterTaskId: "mt-22", month: "2026-09", week: "Minggu 1", day: "Rabu", slot: "Siang: 13-17", type: "Teknis", task: "Benchmark latency query report bulanan", category: "Database", pic: "Andi Saputra", priority: "P2 (Med)", blocker: "-", deliverable: "Laporan benchmark infra", status: "Done" },
  { id: 107, projectId: "proj-5", masterTaskId: "mt-51", month: "2026-09", week: "Minggu 1", day: "Kamis", slot: "Pagi: 09-12", type: "Teknis", task: "Refactor reusable form modal components", category: "Frontend", pic: "Budi Pratama", priority: "P3 (Low)", blocker: "-", deliverable: "PR merged ke shared library", status: "Done" },
  { id: 108, projectId: "proj-2", masterTaskId: "mt-23", month: "2026-09", week: "Minggu 1", day: "Kamis", slot: "Siang: 13-17", type: "PM", task: "Review timeline & resource allocation Q3", category: "Scoping", pic: "Anda (IT PM)", priority: "P2 (Med)", blocker: "-", deliverable: "Resource plan sheet", status: "Done" },
  { id: 109, projectId: "proj-3", masterTaskId: "mt-32", month: "2026-09", week: "Minggu 1", day: "Jumat", slot: "Pagi: 09-12", type: "Teknis", task: "Automated regression smoke test API", category: "QA", pic: "Sari Wulandari", priority: "P2 (Med)", blocker: "-", deliverable: "Test pipeline green di GitHub Actions", status: "Done" },
  { id: 110, projectId: "proj-2", masterTaskId: "mt-21", month: "2026-09", week: "Minggu 1", day: "Jumat", slot: "Siang: 13-17", type: "Teknis", task: "Design Review & handoff icon pack", category: "Design", pic: "Dimas Aditya", priority: "P3 (Low)", blocker: "-", deliverable: "SVG asset export selesai", status: "Done" },

  // ===== MINGGU 2 (Core Sprint Execution) =====
  { id: 1, projectId: "proj-1", masterTaskId: "mt-1", month: "2026-09", week: "Minggu 2", day: "Senin", slot: "Pagi: 09-12", type: "PM", task: "Fasilitasi Sprint Planning & estimasi story point", category: "Ceremony", pic: "Anda (IT PM)", priority: "P1 (High)", blocker: "Menunggu PRD final dari PO", deliverable: "Sprint Backlog terkunci di Jira", status: "Done" },
  { id: 2, projectId: "proj-2", masterTaskId: "mt-21", month: "2026-09", week: "Minggu 2", day: "Senin", slot: "Siang: 13-17", type: "Teknis", task: "Slicing UI Dashboard & integrasi state API", category: "Frontend", pic: "Dimas Aditya", priority: "P2 (Med)", blocker: "Figma icon belum fix", deliverable: "Commit code & buat draft PR", status: "In Progress" },
  { id: 3, projectId: "proj-1", masterTaskId: "mt-2", month: "2026-09", week: "Minggu 2", day: "Selasa", slot: "Pagi: 09-12", type: "PM", task: "Eskalasi issue kredensial API payment gateway", category: "Blocker", pic: "Anda (IT PM)", priority: "P1 (High)", blocker: "Tiket vendor #402 belum dibalas", deliverable: "API Key aktif di staging", status: "Done" },
  { id: 4, projectId: "proj-3", masterTaskId: "mt-31", month: "2026-09", week: "Minggu 2", day: "Selasa", slot: "Siang: 13-17", type: "Teknis", task: "Unit test & fix bug token auth expired", category: "Backend", pic: "Andi Saputra", priority: "P1 (High)", blocker: "-", deliverable: "PR lulus CI/CD & merge ke dev", status: "Done" },
  { id: 5, projectId: "proj-4", masterTaskId: "mt-41", month: "2026-09", week: "Minggu 2", day: "Rabu", slot: "Pagi: 09-12", type: "PM", task: "Backlog Grooming & estimasi timeline change request", category: "Scoping", pic: "Anda (IT PM)", priority: "P2 (Med)", blocker: "-", deliverable: "Impact Analysis & Timeline Doc", status: "In Progress" },
  { id: 6, projectId: "proj-2", masterTaskId: "mt-22", month: "2026-09", week: "Minggu 2", day: "Rabu", slot: "Siang: 13-17", type: "Teknis", task: "Setup cron job & optimasi query database report", category: "Database", pic: "Andi Saputra", priority: "P2 (Med)", blocker: "Akses read-replica belum ada", deliverable: "Script SQL & cron berjalan normal", status: "To Do" },
  { id: 7, projectId: "proj-1", masterTaskId: "mt-5", month: "2026-09", week: "Minggu 2", day: "Kamis", slot: "Pagi: 09-12", type: "PM", task: "Bug triage & koordinasi scope rilis UAT", category: "Delivery", pic: "Sari Wulandari", priority: "P1 (High)", blocker: "2 major bug di checkout", deliverable: "Release Candidate siap UAT", status: "To Do" },
  { id: 8, projectId: "proj-1", masterTaskId: "mt-6", month: "2026-09", week: "Minggu 2", day: "Kamis", slot: "Siang: 13-17", type: "Teknis", task: "Investigasi crash log Sentry modul Checkout", category: "Debugging", pic: "Budi Pratama", priority: "P1 (High)", blocker: "Perlu repro di Android 14", deliverable: "Root cause & bugfix patch", status: "To Do" },
  { id: 9, projectId: "proj-1", masterTaskId: "mt-1", month: "2026-09", week: "Minggu 2", day: "Jumat", slot: "Pagi: 09-12", type: "PM", task: "Susun & kirim Weekly Status Report ke Lead PM", category: "Reporting", pic: "Anda (IT PM)", priority: "P1 (High)", blocker: "Butuh rekap burn-down", deliverable: "Email / PDF Status Report", status: "To Do" },
  { id: 10, projectId: "proj-5", masterTaskId: "mt-51", month: "2026-09", week: "Minggu 2", day: "Jumat", slot: "Siang: 13-17", type: "Teknis", task: "Code review PR tim dan update technical docs", category: "Code Review", pic: "Budi Pratama", priority: "P3 (Low)", blocker: "-", deliverable: "Approval PR & README update", status: "To Do" },

  // ===== MINGGU 3 (Integration & Testing Sprint) =====
  { id: 201, projectId: "proj-1", masterTaskId: "mt-3", month: "2026-09", week: "Minggu 3", day: "Senin", slot: "Pagi: 09-12", type: "Teknis", task: "Slicing UI Checkout & integrasi state API", category: "Frontend", pic: "Budi Pratama", priority: "P1 (High)", blocker: "-", deliverable: "Komponen payment method aktif", status: "To Do" },
  { id: 202, projectId: "proj-1", masterTaskId: "mt-4", month: "2026-09", week: "Minggu 3", day: "Senin", slot: "Siang: 13-17", type: "Teknis", task: "Setup unit test & backend endpoint auth token", category: "Backend", pic: "Andi Saputra", priority: "P1 (High)", blocker: "-", deliverable: "Endpoint auth v2 live", status: "To Do" },
  { id: 203, projectId: "proj-2", masterTaskId: "mt-23", month: "2026-09", week: "Minggu 3", day: "Selasa", slot: "Pagi: 09-12", type: "PM", task: "Review performa load time dashboard dengan tim infra", category: "Review", pic: "Anda (IT PM)", priority: "P2 (Med)", blocker: "-", deliverable: "Action item optimasi query", status: "To Do" },
  { id: 204, projectId: "proj-1", masterTaskId: "mt-5", month: "2026-09", week: "Minggu 3", day: "Selasa", slot: "Siang: 13-17", type: "Teknis", task: "E2E testing flow pembayaran multi-currency", category: "QA", pic: "Sari Wulandari", priority: "P1 (High)", blocker: "-", deliverable: "Hasil pengujian e2e valid", status: "To Do" },
  { id: 205, projectId: "proj-4", masterTaskId: "mt-42", month: "2026-09", week: "Minggu 3", day: "Rabu", slot: "Pagi: 09-12", type: "Teknis", task: "Koneksi database sinkronisasi data pelanggan", category: "Backend", pic: "Andi Saputra", priority: "P1 (High)", blocker: "-", deliverable: "Worker sinkronisasi data", status: "To Do" },
  { id: 206, projectId: "proj-4", masterTaskId: "mt-41", month: "2026-09", week: "Minggu 3", day: "Rabu", slot: "Siang: 13-17", type: "PM", task: "Stakeholder demo & alignment sprint goal", category: "Ceremony", pic: "Anda (IT PM)", priority: "P2 (Med)", blocker: "-", deliverable: "MoM demo & sign-off PO", status: "To Do" },
  { id: 207, projectId: "proj-1", masterTaskId: "mt-3", month: "2026-09", week: "Minggu 3", day: "Kamis", slot: "Pagi: 09-12", type: "Teknis", task: "Integrasi push notification service worker", category: "Frontend", pic: "Budi Pratama", priority: "P2 (Med)", blocker: "-", deliverable: "Event handling push notif", status: "To Do" },
  { id: 208, projectId: "proj-3", masterTaskId: "mt-31", month: "2026-09", week: "Minggu 3", day: "Kamis", slot: "Siang: 13-17", type: "Teknis", task: "Verifikasi fix bug token auth expired staging", category: "QA", pic: "Sari Wulandari", priority: "P1 (High)", blocker: "-", deliverable: "QA pass certificate", status: "To Do" },
  { id: 209, projectId: "proj-4", masterTaskId: "mt-41", month: "2026-09", week: "Minggu 3", day: "Jumat", slot: "Pagi: 09-12", type: "Teknis", task: "Desain modul customer pipeline & ticketing", category: "Design", pic: "Dimas Aditya", priority: "P2 (Med)", blocker: "-", deliverable: "Hi-fi UI mockups CRM", status: "To Do" },

  // ===== MINGGU 4 (Hardening & Delivery Sprint) =====
  { id: 301, projectId: "proj-1", masterTaskId: "mt-5", month: "2026-09", week: "Minggu 4", day: "Senin", slot: "Pagi: 09-12", type: "PM", task: "Sign-off UAT rilis staging release candidate", category: "Delivery", pic: "Sari Wulandari", priority: "P1 (High)", blocker: "-", deliverable: "UAT Sign-off document", status: "To Do" },
  { id: 302, projectId: "proj-1", masterTaskId: "mt-6", month: "2026-09", week: "Minggu 4", day: "Senin", slot: "Siang: 13-17", type: "Teknis", task: "Cross-browser testing Safari & Chrome iOS", category: "Frontend", pic: "Budi Pratama", priority: "P2 (Med)", blocker: "-", deliverable: "Laporan kompatibilitas browser", status: "To Do" },
  { id: 303, projectId: "proj-3", masterTaskId: "mt-32", month: "2026-09", week: "Minggu 4", day: "Selasa", slot: "Pagi: 09-12", type: "Teknis", task: "Audit security vulnerability dependencies", category: "Security", pic: "Andi Saputra", priority: "P2 (Med)", blocker: "-", deliverable: "Snyk audit report zero high", status: "To Do" },
  { id: 304, projectId: "proj-2", masterTaskId: "mt-23", month: "2026-09", week: "Minggu 4", day: "Selasa", slot: "Siang: 13-17", type: "PM", task: "Usability testing survey interaktif klien internal", category: "Review", pic: "Dimas Aditya", priority: "P3 (Low)", blocker: "-", deliverable: "SUS score report internal", status: "To Do" },
  { id: 305, projectId: "proj-1", masterTaskId: "mt-1", month: "2026-09", week: "Minggu 4", day: "Rabu", slot: "Pagi: 09-12", type: "PM", task: "Sprint Retrospective & continuous improvement log", category: "Ceremony", pic: "Anda (IT PM)", priority: "P2 (Med)", blocker: "-", deliverable: "Retro action items di Confluence", status: "To Do" },
  { id: 306, projectId: "proj-2", masterTaskId: "mt-23", month: "2026-09", week: "Minggu 4", day: "Kamis", slot: "Pagi: 09-12", type: "PM", task: "Penyusunan Monthly Project Portfolio Report", category: "Reporting", pic: "Anda (IT PM)", priority: "P1 (High)", blocker: "-", deliverable: "Executive deck slide Q3", status: "To Do" }
];

// App State
let teamMembers = JSON.parse(localStorage.getItem('it_pm_team_members')) || DEFAULT_TEAM;
let projects = JSON.parse(localStorage.getItem('it_pm_projects')) || DEFAULT_PROJECTS;
let tasks = JSON.parse(localStorage.getItem('it_pm_native_tasks')) || DEFAULT_TASKS;

// Auto-migration for schema upgrades (ensure masterTasks & teamMembers exist)
function migrateDataSchema() {
  let teamModified = false;
  if (!teamMembers || !Array.isArray(teamMembers) || teamMembers.length === 0) {
    teamMembers = JSON.parse(JSON.stringify(DEFAULT_TEAM));
    teamModified = true;
  } else {
    // Ensure all required fields exist
    teamMembers.forEach((tm, idx) => {
      if (!tm.id) { tm.id = `tm-${idx + 1}`; teamModified = true; }
      if (!tm.maxTasks) { tm.maxTasks = 4; teamModified = true; }
      if (!tm.color) { tm.color = 'blue'; teamModified = true; }
    });
  }
  if (teamModified) saveTeamMembers();

  let projectModified = false;
  projects.forEach((p) => {
    if (!p.masterTasks || !Array.isArray(p.masterTasks)) {
      p.masterTasks = [];
      projectModified = true;
    }
  });

  // If projects was completely empty, populate default
  if (projects.length === 0) {
    projects = JSON.parse(JSON.stringify(DEFAULT_PROJECTS));
    projectModified = true;
  }

  if (projectModified) saveProjects();

  // Ensure tasks have month, week, projectId, valid pic
  let taskModified = false;
  tasks.forEach(t => {
    if (!t.month) { t.month = "2026-09"; taskModified = true; }
    if (!t.week) { t.week = "Minggu 2"; taskModified = true; }
    if (!t.projectId) { t.projectId = projects[0].id; taskModified = true; }
    if (!t.pic || t.pic === '-') {
      t.pic = teamMembers[0] ? teamMembers[0].name : "Anda (IT PM)";
      taskModified = true;
    }
  });

  // If user only had the 10 initial sample tasks in Minggu 2, upgrade them to the full monthly sample set
  if (tasks.length === 10 && tasks.every(t => t.week === 'Minggu 2')) {
    tasks = JSON.parse(JSON.stringify(DEFAULT_TASKS));
    taskModified = true;
  }

  if (taskModified) saveTasks();
}
migrateDataSchema();

// UI Navigation & Filter States
let currentTab = 'tasks';
let activeFilter = 'all';
let activeMonth = '2026-09';
let activeWeek = 'Minggu 2';
let activeProjectFilter = 'all';
let activePicFilter = 'all';
let searchQuery = '';
let selectedTaskIds = new Set();
let teamViewMode = 'monthly'; // 'monthly' | 'weekly'
let teamActiveWeek = 'Minggu 2';

// Toast Notification
function showToast(message, type = 'info') {
  const toast = document.getElementById('toastNotification');
  toast.textContent = message;
  
  if (type === 'success') {
    toast.className = 'fixed top-5 right-5 z-50 transform transition-all duration-300 translate-y-0 opacity-100 flex items-center gap-3 px-4 py-3 rounded-2xl shadow-2xl text-xs font-semibold bg-emerald-950/90 backdrop-blur-md border border-emerald-500/40 text-emerald-200';
  } else if (type === 'error') {
    toast.className = 'fixed top-5 right-5 z-50 transform transition-all duration-300 translate-y-0 opacity-100 flex items-center gap-3 px-4 py-3 rounded-2xl shadow-2xl text-xs font-semibold bg-rose-950/90 backdrop-blur-md border border-rose-500/40 text-rose-200';
  } else {
    toast.className = 'fixed top-5 right-5 z-50 transform transition-all duration-300 translate-y-0 opacity-100 flex items-center gap-3 px-4 py-3 rounded-2xl shadow-2xl text-xs font-semibold bg-slate-900/95 backdrop-blur-md border border-slate-700 text-white';
  }

  setTimeout(() => {
    toast.classList.replace('translate-y-0', 'translate-y-[-150%]');
    toast.classList.replace('opacity-100', 'opacity-0');
  }, 3200);
}

// Storage Helpers & Supabase Cloud Integration
let supabaseClient = null;

function initSupabaseClient() {
  const url = localStorage.getItem('supabase_url') || '';
  const key = localStorage.getItem('supabase_key') || '';
  const badge = document.getElementById('supabaseStatusBadge');
  const text = document.getElementById('supabaseStatusText');
  const disconnectBtn = document.getElementById('disconnectSupabaseBtn');
  const syncUploadBtn = document.getElementById('syncUploadBtn');
  const syncDownloadBtn = document.getElementById('syncDownloadBtn');

  const urlInput = document.getElementById('supabaseUrlInput');
  const keyInput = document.getElementById('supabaseKeyInput');
  if (urlInput) urlInput.value = url;
  if (keyInput) keyInput.value = key;

  if (url && key && window.supabase && typeof window.supabase.createClient === 'function') {
    try {
      supabaseClient = window.supabase.createClient(url, key);
      if (badge) {
        badge.className = 'w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block shadow-sm shadow-emerald-400/50';
        badge.title = 'Status: Terhubung ke Supabase Cloud';
      }
      if (text) {
        text.className = 'px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800';
        text.textContent = 'Terhubung (Cloud Aktif)';
      }
      if (disconnectBtn) disconnectBtn.classList.remove('hidden');
      if (syncUploadBtn) syncUploadBtn.disabled = false;
      if (syncDownloadBtn) syncDownloadBtn.disabled = false;
    } catch (err) {
      console.error('Supabase init error:', err);
      supabaseClient = null;
      if (badge) {
        badge.className = 'w-2.5 h-2.5 rounded-full bg-rose-500 inline-block';
        badge.title = 'Status: Gagal Terhubung';
      }
      if (text) {
        text.className = 'px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-950 text-rose-300 border border-rose-800';
        text.textContent = 'Gagal Terhubung';
      }
    }
  } else {
    supabaseClient = null;
    if (badge) {
      badge.className = 'w-2.5 h-2.5 rounded-full bg-slate-500 inline-block';
      badge.title = 'Status: Mode Lokal (Offline)';
    }
    if (text) {
      text.className = 'px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-400';
      text.textContent = 'Offline (Mode Lokal)';
    }
    if (disconnectBtn) disconnectBtn.classList.add('hidden');
    if (syncUploadBtn) syncUploadBtn.disabled = true;
    if (syncDownloadBtn) syncDownloadBtn.disabled = true;
  }
}

// Data Mappers (CamelCase <-> Snake_case DB Schema)
function taskToSupabase(t) {
  return {
    id: t.id,
    project_id: t.projectId || null,
    master_task_id: t.masterTaskId || null,
    month: t.month || '2026-09',
    week: t.week || 'Minggu 1',
    day: t.day || 'Senin',
    slot: t.slot || 'Pagi: 09-12',
    type: t.type || 'PM',
    task: t.task || '',
    category: t.category || '',
    pic: t.pic || '',
    priority: t.priority || 'P2 (Med)',
    blocker: t.blocker || '-',
    deliverable: t.deliverable || '-',
    status: t.status || 'To Do',
    updated_at: new Date().toISOString()
  };
}

function taskFromSupabase(t) {
  return {
    id: typeof t.id === 'string' ? parseInt(t.id, 10) : t.id,
    projectId: t.project_id,
    masterTaskId: t.master_task_id || '',
    month: t.month,
    week: t.week,
    day: t.day,
    slot: t.slot,
    type: t.type,
    task: t.task,
    category: t.category,
    pic: t.pic,
    priority: t.priority,
    blocker: t.blocker,
    deliverable: t.deliverable,
    status: t.status
  };
}

function projectToSupabase(p) {
  return {
    id: p.id,
    name: p.name,
    code: p.code || 'PRJ',
    client: p.client || '-',
    status: p.status || 'Active',
    target_date: p.targetDate || '',
    color: p.color || 'blue',
    description: p.description || '',
    master_tasks: p.masterTasks || [],
    updated_at: new Date().toISOString()
  };
}

function projectFromSupabase(p) {
  return {
    id: p.id,
    name: p.name,
    code: p.code,
    client: p.client,
    status: p.status,
    targetDate: p.target_date,
    color: p.color,
    description: p.description,
    masterTasks: p.master_tasks || []
  };
}

function teamToSupabase(tm) {
  return {
    id: tm.id,
    name: tm.name,
    role: tm.role || '',
    max_tasks: tm.maxTasks || 4,
    color: tm.color || 'blue',
    updated_at: new Date().toISOString()
  };
}

function teamFromSupabase(tm) {
  return {
    id: tm.id,
    name: tm.name,
    role: tm.role,
    maxTasks: tm.max_tasks,
    color: tm.color
  };
}

// Storage Helpers with LocalStorage + Supabase Auto-sync
function saveTasks() {
  localStorage.setItem('it_pm_native_tasks', JSON.stringify(tasks));
  if (supabaseClient && tasks.length > 0) {
    const payload = tasks.map(taskToSupabase);
    supabaseClient.from('tasks').upsert(payload)
      .then(({ error }) => {
        if (error) console.error('Supabase tasks sync error:', error);
      });
  }
}

function saveProjects() {
  localStorage.setItem('it_pm_projects', JSON.stringify(projects));
  if (supabaseClient && projects.length > 0) {
    const payload = projects.map(projectToSupabase);
    supabaseClient.from('projects').upsert(payload)
      .then(({ error }) => {
        if (error) console.error('Supabase projects sync error:', error);
      });
  }
}

function saveTeamMembers() {
  localStorage.setItem('it_pm_team_members', JSON.stringify(teamMembers));
  if (supabaseClient && teamMembers.length > 0) {
    const payload = teamMembers.map(teamToSupabase);
    supabaseClient.from('team_members').upsert(payload)
      .then(({ error }) => {
        if (error) console.error('Supabase team_members sync error:', error);
      });
  }
}

// Cloud Manual Sync Helpers
async function syncUploadToSupabase() {
  if (!supabaseClient) {
    showToast('Supabase belum terhubung! Masukkan URL & Key terlebih dahulu.', 'error');
    return;
  }
  showToast('Mengunggah data ke Supabase Cloud...', 'info');
  try {
    const teamPayload = teamMembers.map(teamToSupabase);
    const projectPayload = projects.map(projectToSupabase);
    const taskPayload = tasks.map(taskToSupabase);

    const [r1, r2, r3] = await Promise.all([
      supabaseClient.from('team_members').upsert(teamPayload),
      supabaseClient.from('projects').upsert(projectPayload),
      supabaseClient.from('tasks').upsert(taskPayload)
    ]);

    if (r1.error) throw r1.error;
    if (r2.error) throw r2.error;
    if (r3.error) throw r3.error;

    showToast('Berhasil mengunggah seluruh data ke Supabase Cloud!', 'success');
  } catch (err) {
    console.error('Upload to Supabase failed:', err);
    showToast('Gagal upload data: ' + err.message, 'error');
  }
}

async function syncDownloadFromSupabase(quiet = false) {
  if (!supabaseClient) {
    if (!quiet) showToast('Supabase belum terhubung!', 'error');
    return;
  }
  if (!quiet) showToast('Mengunduh data dari Supabase Cloud...', 'info');
  try {
    const [rTeam, rProjects, rTasks] = await Promise.all([
      supabaseClient.from('team_members').select('*'),
      supabaseClient.from('projects').select('*'),
      supabaseClient.from('tasks').select('*')
    ]);

    if (rTeam.error) throw rTeam.error;
    if (rProjects.error) throw rProjects.error;
    if (rTasks.error) throw rTasks.error;

    if (rTeam.data && rTeam.data.length > 0) {
      teamMembers = rTeam.data.map(teamFromSupabase);
      localStorage.setItem('it_pm_team_members', JSON.stringify(teamMembers));
    }
    if (rProjects.data && rProjects.data.length > 0) {
      projects = rProjects.data.map(projectFromSupabase);
      localStorage.setItem('it_pm_projects', JSON.stringify(projects));
    }
    if (rTasks.data && rTasks.data.length > 0) {
      tasks = rTasks.data.map(taskFromSupabase);
      localStorage.setItem('it_pm_native_tasks', JSON.stringify(tasks));
    }

    migrateDataSchema();
    updatePicDropdowns();
    populateProjectDropdown();
    updateProjectFilterDropdown();
    renderMonthSelector();
    updateDashboardMetrics();
    renderTaskTable();
    renderProjectHub();
    renderTeamHub();

    if (!quiet) showToast(`Berhasil sinkronisasi! (${rProjects.data.length} proyek, ${rTasks.data.length} task)`, 'success');
  } catch (err) {
    console.error('Download from Supabase failed:', err);
    if (!quiet) showToast('Gagal sinkronisasi dari Cloud: ' + err.message, 'error');
  }
}

function getProjectById(id) {
  return projects.find(p => p.id === id) || { name: 'Proyek Tidak Dikenal', code: 'PRJ', color: 'slate', client: '-', masterTasks: [] };
}

function getTeamMemberByName(name) {
  return teamMembers.find(tm => tm.name === name) || null;
}

function formatMonthName(monthStr) {
  if (!monthStr || monthStr === 'all') return 'Semua Bulan';
  const [year, month] = monthStr.split('-');
  const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  const mIndex = parseInt(month, 10) - 1;
  return `${monthNames[mIndex] || month} ${year}`;
}

// Format Date to Display (YYYY-MM-DD -> DD/MM/YYYY)
function formatDateDisplay(dateStr) {
  if (!dateStr) return '-';
  const parts = dateStr.split('-');
  if (parts.length === 3) return `${parts[2]}/${parts[1]}/${parts[0]}`;
  return dateStr;
}

// Render Month Selector Bar
function renderMonthSelector() {
  const container = document.getElementById('monthSelectorContainer');
  container.innerHTML = '';

  const monthSet = new Set(tasks.map(t => t.month).filter(Boolean));
  monthSet.add('2026-09');
  const sortedMonths = Array.from(monthSet).sort();

  const allBtn = document.createElement('button');
  allBtn.className = `px-3 py-1.5 rounded-xl text-xs font-bold transition ${activeMonth === 'all' ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'}`;
  allBtn.textContent = 'Semua Bulan';
  allBtn.addEventListener('click', () => {
    activeMonth = 'all';
    renderMonthSelector();
    updateDashboardMetrics();
    renderTaskTable();
    if (currentTab === 'team') renderTeamHub();
  });
  container.appendChild(allBtn);

  sortedMonths.forEach(m => {
    const btn = document.createElement('button');
    const isCurrent = m === '2026-09';
    btn.className = `px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${activeMonth === m ? 'bg-blue-600 text-white shadow-sm' : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'}`;
    btn.innerHTML = `${formatMonthName(m)} ${isCurrent ? '<span class="text-[10px]">⭐</span>' : ''}`;
    btn.addEventListener('click', () => {
      activeMonth = m;
      renderMonthSelector();
      updateDashboardMetrics();
      renderTaskTable();
      if (currentTab === 'team') renderTeamHub();
    });
    container.appendChild(btn);
  });
  updateTeamPeriodSelectors();
}

function updateProjectFilterDropdown() {
  const select = document.getElementById('projectFilterSelect');
  if (!select) return;
  select.innerHTML = '<option value="all">Semua Proyek</option>';
  projects.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.id;
    opt.textContent = `${p.code ? '[' + p.code + '] ' : ''}${p.name}`;
    if (activeProjectFilter === p.id) opt.selected = true;
    select.appendChild(opt);
  });
}

// Unified PIC Dropdown Population (Filter Bar & Modals)
function updatePicDropdowns() {
  // 1. picFilterSelect in Weekly Filter Bar
  const filterSelect = document.getElementById('picFilterSelect');
  if (filterSelect) {
    const currentVal = activePicFilter;
    filterSelect.innerHTML = '<option value="all">Semua PIC</option>';
    teamMembers.forEach(tm => {
      const opt = document.createElement('option');
      opt.value = tm.name;
      opt.textContent = `${tm.name} (${tm.role})`;
      if (currentVal === tm.name) opt.selected = true;
      filterSelect.appendChild(opt);
    });
  }

  // 2. taskPicSelect in Task Modal
  const taskPicSel = document.getElementById('taskPicSelect');
  if (taskPicSel) {
    const currentVal = taskPicSel.value;
    taskPicSel.innerHTML = '';
    teamMembers.forEach(tm => {
      const opt = document.createElement('option');
      opt.value = tm.name;
      opt.textContent = `${tm.name} - ${tm.role}`;
      if (currentVal === tm.name) opt.selected = true;
      taskPicSel.appendChild(opt);
    });
  }

  // 3. mtPicSelect in Master Task Modal
  const mtPicSel = document.getElementById('mtPicSelect');
  if (mtPicSel) {
    const currentVal = mtPicSel.value;
    mtPicSel.innerHTML = '<option value="">-- Pilih PIC Terkait (Opsional) --</option>';
    teamMembers.forEach(tm => {
      const opt = document.createElement('option');
      opt.value = tm.name;
      opt.textContent = `${tm.name} (${tm.role})`;
      if (currentVal === tm.name) opt.selected = true;
      mtPicSel.appendChild(opt);
    });
  }
}

function getFilteredTasks() {
  return tasks.filter(task => {
    if (activeMonth !== 'all' && task.month !== activeMonth) return false;
    if (activeWeek !== 'all' && task.week !== activeWeek) return false;
    if (activeProjectFilter !== 'all' && task.projectId !== activeProjectFilter) return false;
    if (activePicFilter !== 'all' && task.pic !== activePicFilter && !(task.pic && task.pic.includes(activePicFilter))) return false;

    if (activeFilter === 'PM' && task.type !== 'PM') return false;
    if (activeFilter === 'Teknis' && task.type !== 'Teknis') return false;
    if (activeFilter === 'P1' && !task.priority.includes('P1')) return false;
    if (activeFilter === 'Blocker' && (!task.blocker || task.blocker === '-')) return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const project = getProjectById(task.projectId);
      return (task.task && task.task.toLowerCase().includes(q)) ||
             (project.name && project.name.toLowerCase().includes(q)) ||
             (task.category && task.category.toLowerCase().includes(q)) ||
             (task.pic && task.pic.toLowerCase().includes(q)) ||
             (task.deliverable && task.deliverable.toLowerCase().includes(q));
    }
    return true;
  });
}

// KPI Calculations
function updateDashboardMetrics() {
  const filtered = getFilteredTasks();
  const total = filtered.length;
  document.getElementById('countFilterAll').textContent = total;

  if (total === 0) {
    document.getElementById('pmRatio').textContent = '0%';
    document.getElementById('pmCount').textContent = '(0 task)';
    document.getElementById('techRatio').textContent = '0%';
    document.getElementById('techCount').textContent = '(0 task)';
    document.getElementById('doneProgress').textContent = '0%';
    document.getElementById('doneCount').textContent = '(0/0 task)';
    document.getElementById('doneProgressBar').style.width = '0%';
    document.getElementById('blockerCount').textContent = '0';
    document.getElementById('barPmLabel').textContent = '0%';
    document.getElementById('barTechLabel').textContent = '0%';
    document.getElementById('barPmVisual').style.width = '0%';
    document.getElementById('barTechVisual').style.width = '0%';
    document.getElementById('capacityAdvice').innerHTML = `<span class="text-slate-400">Tidak ada tugas pada filter ini. Klik <b>✨ Auto-Schedule</b> atau <b>+ Tambah Task</b>.</span>`;
    return;
  }

  const pmTasks = filtered.filter(t => t.type === 'PM');
  const techTasks = filtered.filter(t => t.type === 'Teknis');
  const doneTasks = filtered.filter(t => t.status && t.status.toLowerCase().includes('done'));
  const blockerTasks = filtered.filter(t => t.blocker && t.blocker !== '-' && !t.status.toLowerCase().includes('done'));

  const pmPct = Math.round((pmTasks.length / total) * 100);
  const techPct = 100 - pmPct;
  const donePct = Math.round((doneTasks.length / total) * 100);

  document.getElementById('pmRatio').textContent = `${pmPct}%`;
  document.getElementById('pmCount').textContent = `(${pmTasks.length} task)`;
  document.getElementById('techRatio').textContent = `${techPct}%`;
  document.getElementById('techCount').textContent = `(${techTasks.length} task)`;
  
  document.getElementById('doneProgress').textContent = `${donePct}%`;
  document.getElementById('doneCount').textContent = `(${doneTasks.length}/${total} task)`;
  document.getElementById('doneProgressBar').style.width = `${donePct}%`;

  document.getElementById('blockerCount').textContent = blockerTasks.length;

  document.getElementById('barPmLabel').textContent = `${pmPct}%`;
  document.getElementById('barTechLabel').textContent = `${techPct}%`;
  document.getElementById('barPmVisual').style.width = `${pmPct}%`;
  document.getElementById('barTechVisual').style.width = `${techPct}%`;

  const adviceEl = document.getElementById('capacityAdvice');
  if (pmPct >= 70) {
    adviceEl.innerHTML = `<span class="text-amber-400 font-semibold flex items-center gap-1.5">⚠️ Beban PM Dominan (${pmPct}%): Waktu koordinasi sangat padat.</span>`;
  } else if (techPct >= 70) {
    adviceEl.innerHTML = `<span class="text-emerald-400 font-semibold flex items-center gap-1.5">⚡ Beban Teknis Dominan (${techPct}%): Pastikan timeline dan blocker tetap terpantau.</span>`;
  } else {
    adviceEl.innerHTML = `<span class="text-blue-400 font-semibold flex items-center gap-1.5">✅ Proporsi Seimbang (${pmPct}% PM : ${techPct}% Teknis): Alokasi ideal untuk peran hybrid.</span>`;
  }
}

function updateBulkBar(currentFiltered = null) {
  const bulkBar = document.getElementById('bulkActionBar');
  const selectedCountBadge = document.getElementById('selectedCountBadge');
  const bulkDeleteCount = document.getElementById('bulkDeleteCount');
  const selectAllCheckbox = document.getElementById('selectAllCheckbox');

  const count = selectedTaskIds.size;
  if (count > 0) {
    bulkBar.classList.remove('hidden');
    bulkBar.classList.add('flex');
    selectedCountBadge.textContent = `${count} dipilih`;
    bulkDeleteCount.textContent = count;
  } else {
    bulkBar.classList.add('hidden');
    bulkBar.classList.remove('flex');
  }

  if (selectAllCheckbox) {
    const list = currentFiltered || getFilteredTasks();
    if (list.length > 0 && list.every(t => selectedTaskIds.has(t.id))) {
      selectAllCheckbox.checked = true;
      selectAllCheckbox.indeterminate = false;
    } else if (list.some(t => selectedTaskIds.has(t.id))) {
      selectAllCheckbox.checked = false;
      selectAllCheckbox.indeterminate = true;
    } else {
      selectAllCheckbox.checked = false;
      selectAllCheckbox.indeterminate = false;
    }
  }
}

// Render Tasks Table
function renderTaskTable() {
  const tbody = document.getElementById('taskTableBody');
  tbody.innerHTML = '';

  const filtered = getFilteredTasks();

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="12" class="p-10 text-center text-slate-400">
          <div class="max-w-md mx-auto space-y-3">
            <span class="text-4xl">📭</span>
            <p class="font-bold text-slate-200">Tidak ada task pada periode ini.</p>
            <p class="text-xs text-slate-400">Gunakan tombol <b>✨ Auto-Schedule Minggu Ini</b> untuk menjadwalkan dari backlog proyek secara instan, atau klik <b>+ Tambah Task</b>.</p>
          </div>
        </td>
      </tr>
    `;
    updateBulkBar(filtered);
    return;
  }

  filtered.forEach(item => {
    const isSelected = selectedTaskIds.has(item.id);
    const isDone = item.status && item.status.toLowerCase().includes('done');
    const isPm = item.type === 'PM';
    const hasBlocker = item.blocker && item.blocker !== '-';
    const project = getProjectById(item.projectId);

    const tr = document.createElement('tr');
    tr.className = `hover:bg-slate-800/40 transition-colors animate-fade-in ${isDone ? 'opacity-50 bg-slate-900/30 ' : ''}${isSelected ? 'bg-blue-950/40 border-l-4 border-blue-500' : ''}`;
    
    tr.innerHTML = `
      <td class="p-4 text-center">
        <input type="checkbox" ${isSelected ? 'checked' : ''} class="task-select-checkbox rounded-md border-slate-700 bg-slate-800 text-blue-600 focus:ring-0 cursor-pointer h-4 w-4" data-id="${item.id}" title="Pilih Task">
      </td>
      <td class="p-4 whitespace-nowrap">
        <div class="font-bold text-white">${item.day}</div>
        <div class="text-[10px] text-slate-400 font-medium mt-0.5">${item.slot || 'Pagi'}</div>
      </td>
      <td class="p-4 whitespace-nowrap">
        <button class="project-filter-link flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-semibold badge-${project.color || 'blue'} transition hover:opacity-80" data-id="${item.projectId}" title="Filter tugas proyek ini">
          <span>📁</span>
          <span>${project.name}</span>
        </button>
      </td>
      <td class="p-4 whitespace-nowrap">
        <div class="text-xs font-semibold text-slate-300">${item.week || 'Minggu 2'}</div>
        <div class="text-[10px] text-slate-400">${item.month || '2026-09'}</div>
      </td>
      <td class="p-4 whitespace-nowrap">
        <span class="inline-flex items-center px-2.5 py-1 rounded-xl font-bold text-[11px] ${isPm ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30' : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'}">
          ${isPm ? '🟦 PM' : '🟩 Teknis'}
        </span>
      </td>
      <td class="p-4 ${isDone ? 'line-through text-slate-500' : 'text-slate-100'} font-medium">
        <div class="max-w-xs md:max-w-md break-words">${item.task}</div>
        ${item.pic && item.pic !== '-' ? `<div class="text-[10px] text-slate-400 mt-1 flex items-center gap-1"><span>👤</span> PIC: ${item.pic}</div>` : ''}
      </td>
      <td class="p-4 whitespace-nowrap text-slate-400 text-xs">
        ${item.category || '-'}
      </td>
      <td class="p-4 whitespace-nowrap">
        <span class="px-2.5 py-1 rounded-xl text-[10px] font-bold ${item.priority.includes('P1') ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30' : item.priority.includes('P2') ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30' : 'bg-slate-800 text-slate-400 border border-slate-700'}">
          ${item.priority}
        </span>
      </td>
      <td class="p-4 text-xs">
        ${hasBlocker ? `<div class="text-rose-400 font-semibold flex items-center gap-1.5 max-w-xs break-words"><span>⚠️</span> ${item.blocker}</div>` : `<span class="text-slate-500">-</span>`}
      </td>
      <td class="p-4 text-xs text-slate-400">
        <div class="max-w-xs break-words">${item.deliverable || '-'}</div>
      </td>
      <td class="p-4 text-center whitespace-nowrap">
        <select class="status-select text-[11px] font-bold bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-1.5 text-slate-200 cursor-pointer focus:outline-none focus:border-blue-500" data-id="${item.id}">
          <option value="To Do" ${item.status === 'To Do' ? 'selected' : ''}>To Do</option>
          <option value="In Progress" ${item.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
          <option value="Done" ${isDone ? 'selected' : ''}>Done</option>
        </select>
      </td>
      <td class="p-4 text-center whitespace-nowrap">
        <div class="flex items-center justify-center gap-1">
          <button class="edit-btn p-1.5 rounded-lg bg-slate-800 hover:bg-blue-600/30 text-slate-400 hover:text-blue-400 transition" data-id="${item.id}" title="Edit Task">
            ✏️
          </button>
          <button class="delete-btn p-1.5 rounded-lg bg-slate-800 hover:bg-rose-600/30 text-slate-400 hover:text-rose-400 transition" data-id="${item.id}" title="Hapus Task">
            🗑️
          </button>
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });

  document.querySelectorAll('.task-select-checkbox').forEach(cb => {
    cb.addEventListener('change', (e) => {
      const id = parseInt(e.target.dataset.id);
      if (e.target.checked) selectedTaskIds.add(id);
      else selectedTaskIds.delete(id);
      updateBulkBar(filtered);
      renderTaskTable();
    });
  });

  document.querySelectorAll('.status-select').forEach(sel => {
    sel.addEventListener('change', (e) => {
      const id = parseInt(e.target.dataset.id);
      const item = tasks.find(t => t.id === id);
      if (item) {
        item.status = e.target.value;
        saveTasks();
        updateDashboardMetrics();
        renderTaskTable();
        renderProjectHub();
        showToast(`Status diubah ke: ${item.status}`, 'info');
      }
    });
  });

  document.querySelectorAll('.project-filter-link').forEach(btn => {
    btn.addEventListener('click', () => {
      const projId = btn.dataset.id;
      activeProjectFilter = projId;
      document.getElementById('projectFilterSelect').value = projId;
      updateDashboardMetrics();
      renderTaskTable();
      showToast(`Difilter untuk proyek: ${getProjectById(projId).name}`, 'info');
    });
  });

  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      openTaskModal(id);
    });
  });

  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      deleteTask(id);
    });
  });

  updateBulkBar(filtered);
}

// ==================== PROJECT HUB & MASTER TASKS RENDERING ====================

function renderProjectHub() {
  const container = document.getElementById('projectsGrid');
  const navProjCount = document.getElementById('navProjectCount');
  if (navProjCount) navProjCount.textContent = projects.length;
  if (!container) return;
  container.innerHTML = '';

  if (projects.length === 0) {
    container.innerHTML = `
      <div class="col-span-full p-12 text-center text-slate-400 bg-slate-900/60 rounded-3xl border border-slate-800">
        <span class="text-4xl">📁</span>
        <h3 class="text-base font-bold text-white mt-2">Belum ada proyek yang terdaftar</h3>
        <p class="text-xs text-slate-400 mt-1">Daftarkan proyek Anda untuk mulai mengelola task dan auto-schedule.</p>
        <button id="addFirstProjectBtn" class="mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition">
          + Tambah Proyek Pertama
        </button>
      </div>
    `;
    const btn = document.getElementById('addFirstProjectBtn');
    if (btn) btn.addEventListener('click', () => openProjectModal());
    return;
  }

  projects.forEach(p => {
    const pTasks = p.masterTasks || [];
    const totalMaster = pTasks.length;

    // Check scheduling status & calculate workload mandays
    let scheduledCount = 0;
    let completedMasterCount = 0;
    let totalMandays = 0;
    let completedMandays = 0;
    let remainingMandays = 0;

    pTasks.forEach(mt => {
      const linked = tasks.find(t => t.projectId === p.id && (t.masterTaskId === mt.id || t.task === mt.title));
      const isDone = linked && linked.status && linked.status.toLowerCase().includes('done');
      
      const weightVal = mt.weight === 'Berat' ? 3.0 : mt.weight === 'Ringan' ? 0.5 : 1.5;
      totalMandays += weightVal;

      if (linked) {
        scheduledCount++;
        if (isDone) {
          completedMasterCount++;
          completedMandays += weightVal;
        } else {
          remainingMandays += weightVal;
        }
      } else {
        remainingMandays += weightVal;
      }
    });

    const progress = totalMaster > 0 ? Math.round((completedMasterCount / totalMaster) * 100) : 0;

    // Deadline Health Forecasting Calculation
    let healthBadge = '';
    let healthSummary = '';
    let healthBoxClass = '';
    let daysLeft = 0;
    let bufferDays = 0;

    if (!p.targetDate) {
      healthBadge = '<span class="px-2.5 py-1 rounded-xl text-[10px] font-black bg-slate-800 text-slate-400 border border-slate-700">⚪ BELUM DIATUR</span>';
      healthSummary = 'Target deadline belum diset. Klik edit proyek untuk mengisi target.';
      healthBoxClass = 'bg-slate-950/60 border-slate-800 text-slate-400';
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const target = new Date(p.targetDate);
      target.setHours(0, 0, 0, 0);
      const diffTime = target.getTime() - today.getTime();
      daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      bufferDays = daysLeft - remainingMandays;

      if (daysLeft < 0) {
        healthBadge = `<span class="px-2.5 py-1 rounded-xl text-[10px] font-black bg-rose-500/20 text-rose-300 border border-rose-500/40">🔴 OVERDUE (${Math.abs(daysLeft)} HARI)</span>`;
        healthSummary = `Deadline telah lewat (${formatDateDisplay(p.targetDate)}). Sisa ${remainingMandays.toFixed(1)} mandays kerja belum tuntas.`;
        healthBoxClass = 'bg-rose-950/30 border-rose-800/50 text-rose-300';
      } else if (bufferDays < 0) {
        healthBadge = `<span class="px-2.5 py-1 rounded-xl text-[10px] font-black bg-rose-500/20 text-rose-300 border border-rose-500/40">🔴 DEFISIT (${Math.abs(bufferDays).toFixed(1)} HARI)</span>`;
        healthSummary = `Sisa kalender (${daysLeft} hari) tidak cukup untuk sisa beban ${remainingMandays.toFixed(1)} mandays. Resiko keterlambatan tinggi.`;
        healthBoxClass = 'bg-rose-950/30 border-rose-800/50 text-rose-300';
      } else if (bufferDays <= 5) {
        healthBadge = `<span class="px-2.5 py-1 rounded-xl text-[10px] font-black bg-amber-500/20 text-amber-300 border border-amber-500/40">🟡 AT-RISK (BUFFER ${bufferDays.toFixed(1)} HARI)</span>`;
        healthSummary = `Margin keamanan tipis: ${daysLeft} hari kalender vs ${remainingMandays.toFixed(1)} mandays tersisa. Waspadai blocker tim.`;
        healthBoxClass = 'bg-amber-950/30 border-amber-800/50 text-amber-300';
      } else {
        healthBadge = `<span class="px-2.5 py-1 rounded-xl text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">🟢 ON-TRACK (+${bufferDays.toFixed(1)} HARI BUFFER)</span>`;
        healthSummary = `Timeline proyek aman: ${daysLeft} hari kalender tersedia untuk menyelesaikan sisa ${remainingMandays.toFixed(1)} mandays kerja.`;
        healthBoxClass = 'bg-emerald-950/30 border-emerald-800/50 text-emerald-300';
      }
    }

    const card = document.createElement('div');
    card.className = "bg-slate-900/90 p-6 rounded-3xl border border-slate-800/90 shadow-xl space-y-4 hover:border-slate-700 transition relative flex flex-col justify-between";

    // Build Master Task Items HTML
    let masterListHtml = '';
    if (pTasks.length === 0) {
      masterListHtml = `<div class="p-3 text-center text-[11px] text-slate-400 bg-slate-950/60 rounded-xl border border-slate-800/80">Belum ada master task. Klik tombol <b>+ Tambah Task Proyek</b> di bawah.</div>`;
    } else {
      masterListHtml = `<div class="space-y-2 max-h-56 overflow-y-auto pr-1">`;
      pTasks.forEach(mt => {
        const linkedTask = tasks.find(t => t.projectId === p.id && (t.masterTaskId === mt.id || t.task === mt.title));
        const isScheduled = !!linkedTask;
        const isDone = linkedTask && linkedTask.status && linkedTask.status.toLowerCase().includes('done');
        
        // Deadline calculation
        const todayStr = new Date().toISOString().slice(0, 10);
        const isOverdue = mt.deadline && mt.deadline < todayStr && !isDone;

        masterListHtml += `
          <div class="p-2.5 bg-slate-950/70 border border-slate-800/90 rounded-xl flex items-center justify-between gap-2 text-xs hover:border-slate-700 transition">
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-1.5 flex-wrap">
                <span class="px-1.5 py-0.5 rounded text-[9px] font-black ${mt.type === 'PM' ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30' : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'}">
                  ${mt.type}
                </span>
                <span class="px-1.5 py-0.5 rounded text-[9px] font-bold ${mt.weight === 'Berat' ? 'bg-rose-500/15 text-rose-400' : mt.weight === 'Sedang' ? 'bg-amber-500/15 text-amber-400' : 'bg-slate-800 text-slate-400'}">
                  ${mt.weight || 'Sedang'} (${mt.weight === 'Berat' ? '3d' : mt.weight === 'Ringan' ? '0.5d' : '1.5d'})
                </span>
                <span class="font-medium text-slate-200 truncate ${isDone ? 'line-through text-slate-400' : ''}">${mt.title}</span>
              </div>
              <div class="flex items-center gap-2 mt-1 text-[10px] text-slate-400 flex-wrap">
                <span>Target: <b>${formatDateDisplay(mt.deadline)}</b></span>
                ${mt.pic ? `<span>&bull; PIC: <b class="text-slate-300">${mt.pic}</b></span>` : ''}
                ${isOverdue ? '<span class="text-rose-400 font-bold flex items-center gap-0.5">🚨 Overdue</span>' : ''}
                ${isDone ? '<span class="text-emerald-400 font-bold">✅ Selesai</span>' : isScheduled ? `<span class="text-blue-400">🗓️ Terjadwal (${linkedTask.week})</span>` : '<span class="text-amber-400 font-medium">⏳ Belum Terjadwal</span>'}
              </div>
            </div>
            <div class="flex items-center gap-1">
              <button class="edit-mt-btn p-1 text-slate-400 hover:text-blue-400 transition" data-proj="${p.id}" data-id="${mt.id}" title="Edit Master Task">✏️</button>
              <button class="delete-mt-btn p-1 text-slate-400 hover:text-rose-400 transition" data-proj="${p.id}" data-id="${mt.id}" title="Hapus Master Task">🗑️</button>
            </div>
          </div>
        `;
      });
      masterListHtml += `</div>`;
    }

    card.innerHTML = `
      <div class="space-y-4">
        <!-- Header -->
        <div class="flex items-start justify-between gap-3">
          <div class="flex items-center gap-2.5">
            <span class="px-2.5 py-1 text-xs font-black rounded-xl badge-${p.color || 'blue'} font-mono">
              ${p.code || 'PRJ'}
            </span>
            <div>
              <h3 class="font-bold text-white text-base">${p.name}</h3>
              <p class="text-xs text-slate-400 font-medium">Klien: ${p.client || '-'}</p>
            </div>
          </div>
          <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold ${p.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'}">
            ${p.status}
          </span>
        </div>

        <p class="text-xs text-slate-400 line-clamp-2">${p.description || 'Tidak ada catatan deskripsi.'}</p>

        <!-- Deadline Health Indicator Banner -->
        <div class="p-3.5 rounded-2xl border ${healthBoxClass} space-y-1.5 shadow-sm">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div class="flex items-center gap-2">
              ${healthBadge}
              <span class="text-xs font-bold">Kesehatan Deadline</span>
            </div>
            <div class="text-[11px] font-mono opacity-90 flex items-center gap-2">
              <span>Sisa Beban: <b>${remainingMandays.toFixed(1)} mandays</b></span>
              <span>&bull;</span>
              <span>Sisa Waktu: <b>${p.targetDate ? daysLeft + ' hari' : '-'}</b></span>
            </div>
          </div>
          <p class="text-[11px] leading-relaxed opacity-90">${healthSummary}</p>
        </div>

        <div class="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-800/80">
          <span>Target Deadline: <b>${formatDateDisplay(p.targetDate)}</b></span>
          <span class="text-slate-300 font-semibold">${scheduledCount}/${totalMaster} Task Terjadwal</span>
        </div>

        <!-- Progress Bar -->
        <div class="space-y-1.5">
          <div class="flex justify-between text-xs font-semibold">
            <span class="text-slate-300">Penyelesaian Master Task:</span>
            <span class="text-white">${progress}% (${completedMasterCount}/${totalMaster} Done &bull; ${completedMandays.toFixed(1)}/${totalMandays.toFixed(1)}d)</span>
          </div>
          <div class="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div class="bg-blue-500 h-full rounded-full transition-all duration-500" style="width: ${progress}%"></div>
          </div>
        </div>

        <!-- Master Task Section Header -->
        <div class="pt-2 border-t border-slate-800/80">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <span>📋</span> Master Tasks Proyek (${totalMaster})
            </span>
            <button class="add-mt-btn text-[11px] font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition" data-proj="${p.id}">
              <span>+</span> Tambah Task
            </button>
          </div>
          ${masterListHtml}
        </div>
      </div>

      <!-- Card Bottom Actions -->
      <div class="flex items-center justify-between pt-4 border-t border-slate-800/80 mt-4">
        <button class="view-project-tasks-btn text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition" data-id="${p.id}">
          <span>🔍</span> Lihat Jadwal Mingguan
        </button>
        <div class="flex items-center gap-1.5">
          <button class="edit-proj-btn p-1.5 rounded-lg bg-slate-800 hover:bg-blue-600/30 text-slate-400 hover:text-blue-400 transition" data-id="${p.id}" title="Edit Proyek">
            ✏️
          </button>
          <button class="delete-proj-btn p-1.5 rounded-lg bg-slate-800 hover:bg-rose-600/30 text-slate-400 hover:text-rose-400 transition" data-id="${p.id}" title="Hapus Proyek">
            🗑️
          </button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  // Attach Card Events
  document.querySelectorAll('.add-mt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      openMasterTaskModal(btn.dataset.proj);
    });
  });

  document.querySelectorAll('.edit-mt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      openMasterTaskModal(btn.dataset.proj, btn.dataset.id);
    });
  });

  document.querySelectorAll('.delete-mt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      deleteMasterTask(btn.dataset.proj, btn.dataset.id);
    });
  });

  document.querySelectorAll('.view-project-tasks-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const pId = btn.dataset.id;
      activeProjectFilter = pId;
      document.getElementById('projectFilterSelect').value = pId;
      switchTab('tasks');
      updateDashboardMetrics();
      renderTaskTable();
      showToast(`Menampilkan jadwal untuk proyek: ${getProjectById(pId).name}`, 'info');
    });
  });

  document.querySelectorAll('.edit-proj-btn').forEach(btn => {
    btn.addEventListener('click', () => openProjectModal(btn.dataset.id));
  });

  document.querySelectorAll('.delete-proj-btn').forEach(btn => {
    btn.addEventListener('click', () => deleteProject(btn.dataset.id));
  });
}

// ==================== VIEW 3: TEAM WORKLOAD HUB (WEEKLY & MONTHLY) ====================

function updateTeamPeriodSelectors() {
  const monthSelect = document.getElementById('teamMonthFilterSelect');
  if (monthSelect) {
    const monthSet = new Set(tasks.map(t => t.month).filter(Boolean));
    monthSet.add('2026-09');
    const sortedMonths = Array.from(monthSet).sort();

    monthSelect.innerHTML = '<option value="all">Semua Bulan</option>';
    sortedMonths.forEach(m => {
      const opt = document.createElement('option');
      opt.value = m;
      opt.textContent = formatMonthName(m);
      if (activeMonth === m) opt.selected = true;
      monthSelect.appendChild(opt);
    });
    if (activeMonth === 'all') monthSelect.value = 'all';
  }

  const weekSelect = document.getElementById('teamWeekFilterSelect');
  if (weekSelect) {
    weekSelect.value = teamActiveWeek;
  }
}

function getMemberInitials(name) {
  if (!name) return '??';
  const clean = name.replace(/[^a-zA-Z0-9\s]/g, ' ').trim();
  const words = clean.split(/\s+/).filter(Boolean);
  if (words.length === 0) return name.slice(0, 2).toUpperCase();
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}

function renderTeamHub() {
  const container = document.getElementById('teamGrid');
  if (!container) return;

  const navTeamCount = document.getElementById('navTeamCount');
  if (navTeamCount) navTeamCount.textContent = teamMembers.length;

  updateTeamPeriodSelectors();

  // Mode Switcher Controls Visuals
  const monthlyBtn = document.getElementById('teamModeMonthlyBtn');
  const weeklyBtn = document.getElementById('teamModeWeeklyBtn');
  const weekWrapper = document.getElementById('teamWeekFilterWrapper');
  const matrixSection = document.getElementById('teamMonthlyMatrixSection');
  const gridTitle = document.getElementById('teamGridTitle');
  const gridSubtitle = document.getElementById('teamGridSubtitle');

  if (teamViewMode === 'monthly') {
    if (monthlyBtn) monthlyBtn.className = "px-3.5 py-1.5 rounded-lg font-bold transition bg-purple-600 text-white shadow-sm flex items-center gap-1.5";
    if (weeklyBtn) weeklyBtn.className = "px-3.5 py-1.5 rounded-lg font-semibold transition text-slate-400 hover:text-white flex items-center gap-1.5";
    if (weekWrapper) weekWrapper.classList.add('hidden');
    if (matrixSection) matrixSection.classList.remove('hidden');
    if (gridTitle) gridTitle.innerHTML = '<span>👥</span> Kartu Beban Kerja Bulanan Anggota Tim';
    if (gridSubtitle) gridSubtitle.textContent = 'Agregasi kapasitas sprint dan sebaran proyek bulanan';
  } else {
    if (weeklyBtn) weeklyBtn.className = "px-3.5 py-1.5 rounded-lg font-bold transition bg-purple-600 text-white shadow-sm flex items-center gap-1.5";
    if (monthlyBtn) monthlyBtn.className = "px-3.5 py-1.5 rounded-lg font-semibold transition text-slate-400 hover:text-white flex items-center gap-1.5";
    if (weekWrapper) weekWrapper.classList.remove('hidden');
    if (matrixSection) matrixSection.classList.add('hidden');
    if (gridTitle) gridTitle.innerHTML = '<span>👥</span> Kartu Beban Kerja Mingguan Anggota Tim';
    if (gridSubtitle) gridSubtitle.textContent = 'Detail tugas alokasi dan status blocker di minggu ini';
  }

  container.innerHTML = '';

  // Empty State
  if (teamMembers.length === 0) {
    container.innerHTML = `
      <div class="col-span-full p-12 text-center text-slate-400 bg-slate-900/60 rounded-3xl border border-slate-800">
        <span class="text-4xl">👥</span>
        <h3 class="text-base font-bold text-white mt-2">Belum ada anggota tim terdaftar</h3>
        <p class="text-xs text-slate-400 mt-1">Tambahkan anggota tim untuk mulai memantau distribusi beban kerja dan kapasitas.</p>
        <button id="addFirstTeamBtn" class="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow-md transition">
          + Tambah Anggota Tim Pertama
        </button>
      </div>
    `;
    const btn = document.getElementById('addFirstTeamBtn');
    if (btn) btn.addEventListener('click', () => openTeamMemberModal());
    
    document.getElementById('teamKpiTotalMembers').textContent = '0 orang';
    document.getElementById('teamKpiActiveTasks').textContent = '0 task';
    document.getElementById('teamKpiOverloadCount').textContent = '0%';
    document.getElementById('teamKpiBlockerCount').textContent = '0';
    return;
  }

  // ==================== MODE A: MONTHLY VIEW ====================
  if (teamViewMode === 'monthly') {
    const monthName = formatMonthName(activeMonth);
    const matrixMonthLabel = document.getElementById('matrixMonthLabel');
    if (matrixMonthLabel) matrixMonthLabel.textContent = monthName;

    const teamKpiPeriodLabel = document.getElementById('teamKpiPeriodLabel');
    if (teamKpiPeriodLabel) teamKpiPeriodLabel.textContent = `${monthName} (Agregasi 1 Bulan)`;

    // Tasks in active month
    const monthTasks = tasks.filter(t => (activeMonth === 'all' || t.month === activeMonth));
    const totalMonthTasks = monthTasks.length;
    const totalDone = monthTasks.filter(t => t.status && t.status.toLowerCase().includes('done')).length;
    const totalTeamCap = teamMembers.reduce((acc, tm) => acc + ((tm.maxTasks || 4) * 4), 0);
    const teamUtilPct = totalTeamCap > 0 ? Math.round((totalMonthTasks / totalTeamCap) * 100) : 0;
    const pctDone = totalMonthTasks > 0 ? Math.round((totalDone / totalMonthTasks) * 100) : 0;

    // Monthly KPI Counters
    document.getElementById('teamKpiTotalMembers').textContent = `${teamMembers.length} orang`;
    
    const kpiTasksTitle = document.getElementById('teamKpiTasksTitle');
    if (kpiTasksTitle) kpiTasksTitle.textContent = "Task Tim Bulan Ini";
    document.getElementById('teamKpiActiveTasks').textContent = `${totalMonthTasks} task`;
    if (teamKpiPeriodLabel) teamKpiPeriodLabel.textContent = `${monthName} (Rata-rata ${(totalMonthTasks / (teamMembers.length || 1)).toFixed(1)}/orang)`;

    const kpiCapTitle = document.getElementById('teamKpiCapacityTitle');
    if (kpiCapTitle) kpiCapTitle.textContent = "Beban Kapasitas Tim";
    document.getElementById('teamKpiOverloadCount').textContent = `${teamUtilPct}%`;
    const kpiCapSub = document.getElementById('teamKpiCapacitySubtitle');
    if (kpiCapSub) kpiCapSub.textContent = `${totalMonthTasks} / ${totalTeamCap} task kapasitas total`;

    const kpiBlockerTitle = document.getElementById('teamKpiBlockerTitle');
    if (kpiBlockerTitle) kpiBlockerTitle.textContent = "Penyelesaian Task Bulanan";
    document.getElementById('teamKpiBlockerCount').textContent = `${totalDone} Selesai (${pctDone}%)`;
    const kpiBlockerSub = document.getElementById('teamKpiBlockerSubtitle');
    if (kpiBlockerSub) kpiBlockerSub.textContent = `${totalMonthTasks - totalDone} task aktif / in-progress`;

    // 1. Render Monthly Sprint Matrix Table
    const matrixBody = document.getElementById('teamMonthlyMatrixBody');
    if (matrixBody) {
      matrixBody.innerHTML = '';
      teamMembers.forEach(tm => {
        const memberMonthTasks = monthTasks.filter(t => t.pic && (t.pic === tm.name || t.pic.includes(tm.name)));
        const maxW = tm.maxTasks || 4;
        const monthlyCap = maxW * 4;
        const countW1 = memberMonthTasks.filter(t => t.week === 'Minggu 1').length;
        const countW2 = memberMonthTasks.filter(t => t.week === 'Minggu 2').length;
        const countW3 = memberMonthTasks.filter(t => t.week === 'Minggu 3').length;
        const countW4 = memberMonthTasks.filter(t => t.week === 'Minggu 4').length;
        const countW5 = memberMonthTasks.filter(t => t.week === 'Minggu 5').length;
        const memberTotal = memberMonthTasks.length;
        const utilPct = Math.round((memberTotal / monthlyCap) * 100);

        function makeChipHtml(count, weekName) {
          let cls = 'chip-sprint-empty';
          let txt = '-';
          if (count > maxW) {
            cls = 'chip-sprint-overload';
            txt = `${count} task ⚠️`;
          } else if (count === maxW) {
            cls = 'chip-sprint-warning';
            txt = `${count} task`;
          } else if (count > 0) {
            cls = 'chip-sprint-optimal';
            txt = `${count} task`;
          }
          return `<button class="chip-sprint ${cls} matrix-week-btn" data-name="${tm.name}" data-week="${weekName}" title="Buka jadwal ${tm.name} di ${weekName}">${txt}</button>`;
        }

        let statusBadge = '';
        if (memberTotal > monthlyCap) {
          statusBadge = `<span class="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">🔴 Overload</span>`;
        } else if (utilPct >= 85) {
          statusBadge = `<span class="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">🟡 Penuh</span>`;
        } else if (memberTotal >= 4) {
          statusBadge = `<span class="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">🟢 Optimal</span>`;
        } else {
          statusBadge = `<span class="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-slate-800 text-slate-400 border border-slate-700">⚪ Rendah</span>`;
        }

        const initials = getMemberInitials(tm.name);
        const row = document.createElement('tr');
        row.className = "hover:bg-slate-800/40 transition";
        row.innerHTML = `
          <td class="p-3.5 whitespace-nowrap">
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-xl avatar-circle text-white font-extrabold text-xs badge-${tm.color || 'blue'}">
                ${initials}
              </div>
              <div>
                <div class="font-bold text-white text-xs">${tm.name}</div>
                <div class="text-[11px] text-slate-400">${tm.role}</div>
              </div>
            </div>
          </td>
          <td class="p-3.5 text-center">${makeChipHtml(countW1, 'Minggu 1')}</td>
          <td class="p-3.5 text-center">${makeChipHtml(countW2, 'Minggu 2')}</td>
          <td class="p-3.5 text-center">${makeChipHtml(countW3, 'Minggu 3')}</td>
          <td class="p-3.5 text-center">${makeChipHtml(countW4, 'Minggu 4')}</td>
          <td class="p-3.5 text-center">${makeChipHtml(countW5, 'Minggu 5')}</td>
          <td class="p-3.5 text-center font-bold text-white text-xs">${memberTotal} task</td>
          <td class="p-3.5 text-center text-slate-400 text-xs">${monthlyCap} task</td>
          <td class="p-3.5 text-center">
            <div class="flex items-center justify-center gap-1.5">
              <div class="w-16 bg-slate-800 h-2 rounded-full overflow-hidden">
                <div class="h-full rounded-full ${utilPct > 100 ? 'gauge-danger' : utilPct >= 85 ? 'gauge-warning' : 'gauge-optimal'}" style="width: ${Math.min(utilPct, 100)}%"></div>
              </div>
              <span class="text-[11px] font-bold ${utilPct > 100 ? 'text-rose-400' : 'text-slate-300'}">${utilPct}%</span>
            </div>
          </td>
          <td class="p-3.5 text-center">${statusBadge}</td>
          <td class="p-3.5 text-center">
            <button class="view-member-month-btn px-2.5 py-1 text-[11px] font-bold text-purple-400 hover:text-purple-300 bg-purple-950/40 hover:bg-purple-900/40 border border-purple-800/60 rounded-lg transition" data-name="${tm.name}">
              Filter
            </button>
          </td>
        `;
        matrixBody.appendChild(row);
      });
    }

    // 2. Render Monthly Team Member Cards
    teamMembers.forEach(tm => {
      const memberMonthTasks = monthTasks.filter(t => t.pic && (t.pic === tm.name || t.pic.includes(tm.name)));
      const maxW = tm.maxTasks || 4;
      const monthlyCap = maxW * 4;
      const memberTotal = memberMonthTasks.length;
      const utilPct = Math.round((memberTotal / monthlyCap) * 100);

      const doneCount = memberMonthTasks.filter(t => t.status && t.status.toLowerCase().includes('done')).length;
      const inProgressCount = memberMonthTasks.filter(t => t.status === 'In Progress').length;
      const todoCount = memberMonthTasks.filter(t => t.status === 'To Do').length;
      const blockerCount = memberMonthTasks.filter(t => t.blocker && t.blocker !== '-' && !t.status?.toLowerCase().includes('done')).length;

      const countW1 = memberMonthTasks.filter(t => t.week === 'Minggu 1').length;
      const countW2 = memberMonthTasks.filter(t => t.week === 'Minggu 2').length;
      const countW3 = memberMonthTasks.filter(t => t.week === 'Minggu 3').length;
      const countW4 = memberMonthTasks.filter(t => t.week === 'Minggu 4').length;
      const countW5 = memberMonthTasks.filter(t => t.week === 'Minggu 5').length;

      let statusBadge = '';
      let gaugeClass = '';
      let statusSummary = '';

      if (memberTotal > monthlyCap) {
        statusBadge = `<span class="px-2.5 py-1 rounded-xl text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">🔴 Overload Bulanan</span>`;
        gaugeClass = 'gauge-danger';
        statusSummary = `<span class="text-rose-400 font-semibold">Beban berlebih (+${memberTotal - monthlyCap} task dari batas 4 sprint).</span>`;
      } else if (utilPct >= 85) {
        statusBadge = `<span class="px-2.5 py-1 rounded-xl text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">🟡 Kapasitas Penuh</span>`;
        gaugeClass = 'gauge-warning';
        statusSummary = `<span class="text-amber-400 font-semibold">Mendekati kapasitas maksimal (${monthlyCap - memberTotal} slot tersisa).</span>`;
      } else if (memberTotal >= 4) {
        statusBadge = `<span class="px-2.5 py-1 rounded-xl text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">🟢 Optimal</span>`;
        gaugeClass = 'gauge-optimal';
        statusSummary = `<span class="text-emerald-400 font-semibold">Beban kerja bulanan seimbang (${monthlyCap - memberTotal} slot tersisa).</span>`;
      } else {
        statusBadge = `<span class="px-2.5 py-1 rounded-xl text-[10px] font-bold bg-slate-800 text-slate-400 border border-slate-700">⚪ Kapasitas Rendah</span>`;
        gaugeClass = 'bg-slate-700';
        statusSummary = `<span class="text-slate-400">Tersedia banyak slot alokasi tugas baru (${monthlyCap - memberTotal} slot).</span>`;
      }

      // Project breakdown
      const prjMap = {};
      memberMonthTasks.forEach(t => {
        prjMap[t.projectId] = (prjMap[t.projectId] || 0) + 1;
      });
      const prjBadges = Object.keys(prjMap).map(pId => {
        const prj = getProjectById(pId);
        return `<span class="px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold badge-${prj.color || 'blue'}">${prj.code || 'PRJ'}: ${prjMap[pId]}</span>`;
      }).join(' ') || '<span class="text-[11px] text-slate-500 italic">Belum ada alokasi proyek</span>';

      const initials = getMemberInitials(tm.name);

      function makeSprintCardPill(count, weekName) {
        let cls = 'chip-sprint-empty';
        if (count > maxW) cls = 'chip-sprint-overload';
        else if (count === maxW) cls = 'chip-sprint-warning';
        else if (count > 0) cls = 'chip-sprint-optimal';
        return `
          <button class="flex-1 py-1 px-1 rounded-lg text-center text-[10px] font-bold ${cls} card-sprint-btn transition hover:scale-105" data-name="${tm.name}" data-week="${weekName}" title="Buka ${weekName}">
            <div class="text-[9px] font-normal opacity-80">${weekName.replace('Minggu ', 'M')}</div>
            <div>${count}</div>
          </button>
        `;
      }

      const card = document.createElement('div');
      card.className = "bg-slate-900/90 p-6 rounded-3xl border border-slate-800/90 shadow-xl space-y-4 hover:border-slate-700 transition flex flex-col justify-between";
      card.innerHTML = `
        <div class="space-y-4">
          <!-- Header -->
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-center gap-3">
              <div class="w-11 h-11 rounded-2xl avatar-circle text-white font-extrabold text-sm badge-${tm.color || 'blue'} shadow-md">
                ${initials}
              </div>
              <div>
                <h3 class="font-bold text-white text-base leading-tight">${tm.name}</h3>
                <p class="text-xs text-slate-400 font-medium mt-0.5">${tm.role}</p>
              </div>
            </div>
            ${statusBadge}
          </div>

          <!-- Monthly Workload Meter -->
          <div class="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800/80 space-y-2">
            <div class="flex justify-between items-center text-xs">
              <span class="text-slate-400 font-medium">Beban Bulanan (4 Sprint):</span>
              <span class="font-bold text-white">${memberTotal} / ${monthlyCap} Task (${utilPct}%)</span>
            </div>
            <div class="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden shadow-inner">
              <div class="h-full rounded-full transition-all duration-500 ${gaugeClass}" style="width: ${Math.min(utilPct, 100)}%"></div>
            </div>
            <div class="text-[11px] leading-relaxed pt-0.5">
              ${statusSummary}
            </div>
          </div>

          <!-- Weekly Sprint Distribution -->
          <div class="bg-slate-950/60 p-3 rounded-2xl border border-slate-800/60 space-y-1.5">
            <div class="flex items-center justify-between text-xs font-bold text-slate-300">
              <span class="flex items-center gap-1.5">
                <span>⚡</span> Distribusi per Sprint:
              </span>
              <span class="text-[10px] text-slate-400 font-normal">Max ${maxW}/minggu</span>
            </div>
            <div class="flex gap-1.5 pt-1">
              ${makeSprintCardPill(countW1, 'Minggu 1')}
              ${makeSprintCardPill(countW2, 'Minggu 2')}
              ${makeSprintCardPill(countW3, 'Minggu 3')}
              ${makeSprintCardPill(countW4, 'Minggu 4')}
              ${makeSprintCardPill(countW5, 'Minggu 5')}
            </div>
          </div>

          <!-- Project & Status Summary -->
          <div class="space-y-2 pt-0.5">
            <div>
              <span class="text-[11px] font-bold text-slate-400 block mb-1">Proyek Ditangani Bulan Ini:</span>
              <div class="flex flex-wrap gap-1.5">
                ${prjBadges}
              </div>
            </div>
            
            <div class="pt-1 flex flex-wrap items-center gap-2 text-[10px] font-semibold">
              <span class="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20">✅ ${doneCount} Selesai</span>
              <span class="px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded-lg border border-blue-500/20">⚡ ${inProgressCount} Jalan</span>
              <span class="px-2 py-0.5 bg-slate-800 text-slate-300 rounded-lg border border-slate-700">📝 ${todoCount} To Do</span>
              ${blockerCount > 0 ? `<span class="px-2 py-0.5 bg-rose-500/15 text-rose-300 rounded-lg border border-rose-500/30 font-bold">⚠️ ${blockerCount} Blocker</span>` : ''}
            </div>
          </div>
        </div>

        <!-- Card Bottom Actions -->
        <div class="flex items-center justify-between pt-4 border-t border-slate-800/80 mt-4">
          <button class="view-member-month-btn text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1.5 transition" data-name="${tm.name}">
            <span>🔍</span> Filter Jadwal Bulan Ini
          </button>
          <div class="flex items-center gap-1.5">
            <button class="edit-tm-btn p-1.5 rounded-lg bg-slate-800 hover:bg-purple-600/30 text-slate-400 hover:text-purple-400 transition" data-id="${tm.id}" title="Edit Data Anggota Tim">
              ✏️
            </button>
            <button class="delete-tm-btn p-1.5 rounded-lg bg-slate-800 hover:bg-rose-600/30 text-slate-400 hover:text-rose-400 transition" data-id="${tm.id}" title="Hapus Anggota Tim">
              🗑️
            </button>
          </div>
        </div>
      `;
      container.appendChild(card);
    });

  } else {
    // ==================== MODE B: WEEKLY VIEW ====================
    const periodLabel = teamActiveWeek === 'all' 
      ? `${formatMonthName(activeMonth)} (Semua Minggu)` 
      : `${formatMonthName(activeMonth)} - ${teamActiveWeek}`;
    
    const teamKpiPeriodLabel = document.getElementById('teamKpiPeriodLabel');
    if (teamKpiPeriodLabel) teamKpiPeriodLabel.textContent = periodLabel;

    const periodTasks = tasks.filter(t => {
      if (activeMonth !== 'all' && t.month !== activeMonth) return false;
      if (teamActiveWeek !== 'all' && t.week !== teamActiveWeek) return false;
      return true;
    });

    let overloadCount = 0;
    let membersWithBlockers = 0;
    let totalAssignedInPeriod = 0;

    teamMembers.forEach(tm => {
      const memberTasks = periodTasks.filter(t => t.pic && (t.pic === tm.name || t.pic.includes(tm.name)));
      totalAssignedInPeriod += memberTasks.length;

      const doneCount = memberTasks.filter(t => t.status && t.status.toLowerCase().includes('done')).length;
      const blockerTasks = memberTasks.filter(t => t.blocker && t.blocker !== '-' && !t.status.toLowerCase().includes('done'));
      if (blockerTasks.length > 0) membersWithBlockers++;

      const maxTasks = tm.maxTasks || 4;
      const taskCount = memberTasks.length;
      const pct = Math.min(100, Math.round((taskCount / maxTasks) * 100));

      let statusBadge = '';
      let gaugeClass = '';
      let statusSummary = '';

      if (taskCount > maxTasks) {
        overloadCount++;
        statusBadge = `<span class="px-2.5 py-1 rounded-xl text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">🔴 Overload (${taskCount}/${maxTasks})</span>`;
        gaugeClass = 'gauge-danger';
        statusSummary = `<span class="text-rose-400 font-semibold">Beban berlebih (+${taskCount - maxTasks} task dari kapasitas ideal).</span>`;
      } else if (taskCount === maxTasks) {
        statusBadge = `<span class="px-2.5 py-1 rounded-xl text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">🟡 Kapasitas Penuh (${taskCount}/${maxTasks})</span>`;
        gaugeClass = 'gauge-warning';
        statusSummary = `<span class="text-amber-400 font-semibold">Kapasitas maksimal tercapai. Hindari penambahan tugas baru.</span>`;
      } else if (taskCount > 0) {
        statusBadge = `<span class="px-2.5 py-1 rounded-xl text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">🟢 Optimal (${taskCount}/${maxTasks})</span>`;
        gaugeClass = 'gauge-optimal';
        statusSummary = `<span class="text-emerald-400 font-semibold">Beban kerja seimbang (${maxTasks - taskCount} slot tersisa).</span>`;
      } else {
        statusBadge = `<span class="px-2.5 py-1 rounded-xl text-[10px] font-bold bg-slate-800 text-slate-400 border border-slate-700">⚪ Kosong (0/${maxTasks})</span>`;
        gaugeClass = 'bg-slate-700';
        statusSummary = `<span class="text-slate-400">Kapasitas bebas penuh untuk dialokasikan tugas.</span>`;
      }

      const initials = getMemberInitials(tm.name);

      let taskListHtml = '';
      if (memberTasks.length === 0) {
        taskListHtml = `<div class="p-3 text-center text-[11px] text-slate-500 bg-slate-950/60 rounded-xl border border-slate-800/80 italic">Belum ada tugas terjadwal di ${teamActiveWeek === 'all' ? 'semua minggu' : teamActiveWeek}.</div>`;
      } else {
        taskListHtml = `<div class="space-y-2 max-h-48 overflow-y-auto pr-1">`;
        memberTasks.forEach(t => {
          const isDone = t.status && t.status.toLowerCase().includes('done');
          const hasBlocker = t.blocker && t.blocker !== '-' && !isDone;
          const prj = getProjectById(t.projectId);

          taskListHtml += `
            <div class="p-2.5 bg-slate-950/70 border border-slate-800/90 rounded-xl text-xs space-y-1 hover:border-slate-700 transition">
              <div class="flex items-center justify-between gap-1.5">
                <div class="flex items-center gap-1.5 flex-wrap">
                  <span class="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold badge-${prj.color || 'blue'}">
                    ${prj.code || 'PRJ'}
                  </span>
                  <span class="text-[10px] font-semibold text-slate-400">${t.day} (${t.slot ? t.slot.split(':')[0] : 'Pagi'})</span>
                </div>
                <span class="text-[10px] font-bold ${isDone ? 'text-emerald-400' : 'text-blue-400'}">
                  ${isDone ? '✅ Selesai' : t.status || 'To Do'}
                </span>
              </div>
              <div class="font-medium text-slate-200 ${isDone ? 'line-through text-slate-500' : ''} truncate">
                ${t.task}
              </div>
              ${hasBlocker ? `
                <div class="text-[10px] text-rose-400 font-semibold flex items-center gap-1 bg-rose-500/10 px-2 py-0.5 rounded-lg border border-rose-500/20">
                  <span>⚠️</span> Blocker: ${t.blocker}
                </div>
              ` : ''}
            </div>
          `;
        });
        taskListHtml += `</div>`;
      }

      const card = document.createElement('div');
      card.className = "bg-slate-900/90 p-6 rounded-3xl border border-slate-800/90 shadow-xl space-y-4 hover:border-slate-700 transition flex flex-col justify-between";

      card.innerHTML = `
        <div class="space-y-4">
          <!-- Header -->
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-center gap-3">
              <div class="w-11 h-11 rounded-2xl avatar-circle text-white font-extrabold text-sm badge-${tm.color || 'blue'} shadow-md">
                ${initials}
              </div>
              <div>
                <h3 class="font-bold text-white text-base leading-tight">${tm.name}</h3>
                <p class="text-xs text-slate-400 font-medium mt-0.5">${tm.role}</p>
              </div>
            </div>
            ${statusBadge}
          </div>

          <!-- Workload Meter -->
          <div class="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800/80 space-y-2">
            <div class="flex justify-between items-center text-xs">
              <span class="text-slate-400 font-medium">Beban Kerja Mingguan:</span>
              <span class="font-bold text-white">${taskCount} / ${maxTasks} Task (${pct}%)</span>
            </div>
            <div class="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden shadow-inner">
              <div class="h-full rounded-full transition-all duration-500 ${gaugeClass}" style="width: ${Math.min(pct, 100)}%"></div>
            </div>
            <div class="text-[11px] leading-relaxed pt-0.5">
              ${statusSummary}
            </div>
          </div>

          <!-- Task Allocation -->
          <div class="pt-1">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <span>📋</span> Tugas Alokasi (${memberTasks.length})
              </span>
              <span class="text-[10px] text-slate-400 font-semibold">
                ${doneCount}/${memberTasks.length} Selesai
              </span>
            </div>
            ${taskListHtml}
          </div>
        </div>

        <!-- Card Bottom Actions -->
        <div class="flex items-center justify-between pt-4 border-t border-slate-800/80 mt-4">
          <button class="view-member-tasks-btn text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1.5 transition" data-name="${tm.name}">
            <span>🔍</span> Filter di Jadwal
          </button>
          <div class="flex items-center gap-1.5">
            <button class="edit-tm-btn p-1.5 rounded-lg bg-slate-800 hover:bg-purple-600/30 text-slate-400 hover:text-purple-400 transition" data-id="${tm.id}" title="Edit Data Anggota Tim">
              ✏️
            </button>
            <button class="delete-tm-btn p-1.5 rounded-lg bg-slate-800 hover:bg-rose-600/30 text-slate-400 hover:text-rose-400 transition" data-id="${tm.id}" title="Hapus Anggota Tim">
              🗑️
            </button>
          </div>
        </div>
      `;

      container.appendChild(card);
    });

    // Top Weekly KPI Counters
    document.getElementById('teamKpiTotalMembers').textContent = `${teamMembers.length} orang`;
    const kpiTasksTitle = document.getElementById('teamKpiTasksTitle');
    if (kpiTasksTitle) kpiTasksTitle.textContent = "Task Tim Minggu Ini";
    document.getElementById('teamKpiActiveTasks').textContent = `${totalAssignedInPeriod} task`;
    
    const kpiCapTitle = document.getElementById('teamKpiCapacityTitle');
    if (kpiCapTitle) kpiCapTitle.textContent = "Kelebihan Beban (Overload)";
    document.getElementById('teamKpiOverloadCount').textContent = `${overloadCount} orang`;
    const kpiCapSub = document.getElementById('teamKpiCapacitySubtitle');
    if (kpiCapSub) kpiCapSub.textContent = `> batas task di minggu ini`;

    const kpiBlockerTitle = document.getElementById('teamKpiBlockerTitle');
    if (kpiBlockerTitle) kpiBlockerTitle.textContent = "Anggota dengan Blocker";
    document.getElementById('teamKpiBlockerCount').textContent = `${membersWithBlockers} orang`;
    const kpiBlockerSub = document.getElementById('teamKpiBlockerSubtitle');
    if (kpiBlockerSub) kpiBlockerSub.textContent = `Pekerjaan tertahan`;
  }

  // ==================== COMMON EVENT LISTENERS ====================
  // Matrix week chips & Card sprint buttons (Jump to specific week)
  document.querySelectorAll('.matrix-week-btn, .card-sprint-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const picName = btn.dataset.name;
      const weekName = btn.dataset.week;
      activePicFilter = picName;
      activeWeek = weekName;
      teamActiveWeek = weekName;

      const picFilterSelect = document.getElementById('picFilterSelect');
      if (picFilterSelect) picFilterSelect.value = picName;

      const weekFilterSelect = document.getElementById('weekFilterSelect');
      if (weekFilterSelect) weekFilterSelect.value = weekName;

      const teamWeekFilterSelect = document.getElementById('teamWeekFilterSelect');
      if (teamWeekFilterSelect) teamWeekFilterSelect.value = weekName;

      switchTab('tasks');
      updateDashboardMetrics();
      renderTaskTable();
      showToast(`Menampilkan jadwal ${picName} di ${weekName}`, 'info');
    });
  });

  // Filter entire month for member
  document.querySelectorAll('.view-member-month-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const picName = btn.dataset.name;
      activePicFilter = picName;
      activeWeek = 'all';

      const picFilterSelect = document.getElementById('picFilterSelect');
      if (picFilterSelect) picFilterSelect.value = picName;

      const weekFilterSelect = document.getElementById('weekFilterSelect');
      if (weekFilterSelect) weekFilterSelect.value = 'all';

      switchTab('tasks');
      updateDashboardMetrics();
      renderTaskTable();
      showToast(`Menampilkan seluruh task bulan ini untuk PIC: ${picName}`, 'info');
    });
  });

  // Weekly filter in tasks
  document.querySelectorAll('.view-member-tasks-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const picName = btn.dataset.name;
      activePicFilter = picName;
      const picFilterSelect = document.getElementById('picFilterSelect');
      if (picFilterSelect) picFilterSelect.value = picName;
      switchTab('tasks');
      updateDashboardMetrics();
      renderTaskTable();
      showToast(`Menampilkan jadwal mingguan untuk PIC: ${picName}`, 'info');
    });
  });

  document.querySelectorAll('.edit-tm-btn').forEach(btn => {
    btn.addEventListener('click', () => openTeamMemberModal(btn.dataset.id));
  });

  document.querySelectorAll('.delete-tm-btn').forEach(btn => {
    btn.addEventListener('click', () => deleteTeamMember(btn.dataset.id));
  });
}

// Team Workload View Controls Event Listeners
const teamModeMonthlyBtn = document.getElementById('teamModeMonthlyBtn');
const teamModeWeeklyBtn = document.getElementById('teamModeWeeklyBtn');
const teamMonthFilterSelect = document.getElementById('teamMonthFilterSelect');
const teamWeekFilterSelect = document.getElementById('teamWeekFilterSelect');

if (teamModeMonthlyBtn) {
  teamModeMonthlyBtn.addEventListener('click', () => {
    teamViewMode = 'monthly';
    renderTeamHub();
  });
}

if (teamModeWeeklyBtn) {
  teamModeWeeklyBtn.addEventListener('click', () => {
    teamViewMode = 'weekly';
    renderTeamHub();
  });
}

if (teamMonthFilterSelect) {
  teamMonthFilterSelect.addEventListener('change', (e) => {
    activeMonth = e.target.value;
    renderMonthSelector();
    updateDashboardMetrics();
    renderTaskTable();
    renderTeamHub();
    showToast(`Bulan aktif diubah ke: ${formatMonthName(activeMonth)}`, 'info');
  });
}

if (teamWeekFilterSelect) {
  teamWeekFilterSelect.addEventListener('change', (e) => {
    teamActiveWeek = e.target.value;
    activeWeek = e.target.value;
    const weekFilterInTasks = document.getElementById('weekFilterSelect');
    if (weekFilterInTasks) weekFilterInTasks.value = e.target.value;
    updateDashboardMetrics();
    renderTaskTable();
    renderTeamHub();
    showToast(`Minggu aktif diubah ke: ${teamActiveWeek === 'all' ? 'Semua Minggu' : teamActiveWeek}`, 'info');
  });
}

// 3-Tab View Navigation
function switchTab(tabName) {
  currentTab = tabName;
  const navTasks = document.getElementById('navTabTasks');
  const navProjects = document.getElementById('navTabProjects');
  const navTeam = document.getElementById('navTabTeam');

  const viewTasks = document.getElementById('viewTasks');
  const viewProjects = document.getElementById('viewProjects');
  const viewTeam = document.getElementById('viewTeam');

  // Inactive base styles
  const inactiveCls = 'nav-tab px-4 py-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition flex items-center gap-2 font-semibold';
  if (navTasks) navTasks.className = inactiveCls;
  if (navProjects) navProjects.className = inactiveCls;
  if (navTeam) navTeam.className = inactiveCls;

  if (viewTasks) viewTasks.classList.add('hidden');
  if (viewProjects) viewProjects.classList.add('hidden');
  if (viewTeam) viewTeam.classList.add('hidden');

  if (tabName === 'tasks') {
    if (navTasks) navTasks.className = 'nav-tab px-4 py-2 rounded-xl bg-blue-600 text-white shadow-sm flex items-center gap-2 transition font-bold';
    if (viewTasks) viewTasks.classList.remove('hidden');
    updateDashboardMetrics();
    renderTaskTable();
  } else if (tabName === 'projects') {
    if (navProjects) navProjects.className = 'nav-tab px-4 py-2 rounded-xl bg-emerald-600 text-white shadow-sm flex items-center gap-2 transition font-bold';
    if (viewProjects) viewProjects.classList.remove('hidden');
    renderProjectHub();
  } else if (tabName === 'team') {
    if (navTeam) navTeam.className = 'nav-tab px-4 py-2 rounded-xl bg-purple-600 text-white shadow-sm flex items-center gap-2 transition font-bold';
    if (viewTeam) viewTeam.classList.remove('hidden');
    renderTeamHub();
  }
}

document.getElementById('navTabTasks').addEventListener('click', () => switchTab('tasks'));
document.getElementById('navTabProjects').addEventListener('click', () => switchTab('projects'));
document.getElementById('navTabTeam').addEventListener('click', () => switchTab('team'));

// ==================== MASTER TASK MODAL & CRUD ====================
const masterTaskModal = document.getElementById('masterTaskModal');
const masterTaskForm = document.getElementById('masterTaskForm');
const closeMasterTaskModalBtn = document.getElementById('closeMasterTaskModalBtn');
const cancelMasterTaskModalBtn = document.getElementById('cancelMasterTaskModalBtn');
const masterTaskModalTitle = document.getElementById('masterTaskModalTitle');

function openMasterTaskModal(projectId, editMasterTaskId = null) {
  masterTaskForm.reset();
  updatePicDropdowns();
  const proj = getProjectById(projectId);
  document.getElementById('mtTargetProjectId').value = projectId;
  document.getElementById('mtProjectDisplay').textContent = `[${proj.code || 'PRJ'}] ${proj.name}`;

  if (editMasterTaskId) {
    const mt = (proj.masterTasks || []).find(item => item.id === editMasterTaskId);
    if (!mt) return;
    masterTaskModalTitle.textContent = 'Edit Master Task Proyek';
    document.getElementById('editMasterTaskId').value = mt.id;
    document.getElementById('mtTitle').value = mt.title;
    document.getElementById('mtType').value = mt.type || 'Teknis';
    document.getElementById('mtWeight').value = mt.weight || 'Sedang';
    document.getElementById('mtDeadline').value = mt.deadline || '';
    document.getElementById('mtCategory').value = mt.category || '';
    const mtPicSel = document.getElementById('mtPicSelect');
    if (mtPicSel) mtPicSel.value = mt.pic || '';
  } else {
    masterTaskModalTitle.textContent = 'Tambah Master Task Proyek';
    document.getElementById('editMasterTaskId').value = '';
    document.getElementById('mtType').value = 'Teknis';
    document.getElementById('mtWeight').value = 'Sedang';
    document.getElementById('mtDeadline').value = proj.targetDate || new Date(Date.now() + 14 * 86400000).toISOString().slice(0, 10);
    const mtPicSel = document.getElementById('mtPicSelect');
    if (mtPicSel) mtPicSel.value = '';
  }
  masterTaskModal.classList.remove('hidden');
}

closeMasterTaskModalBtn.addEventListener('click', () => masterTaskModal.classList.add('hidden'));
cancelMasterTaskModalBtn.addEventListener('click', () => masterTaskModal.classList.add('hidden'));

masterTaskForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const projectId = document.getElementById('mtTargetProjectId').value;
  const editId = document.getElementById('editMasterTaskId').value;
  const title = document.getElementById('mtTitle').value.trim();
  const type = document.getElementById('mtType').value;
  const weight = document.getElementById('mtWeight').value;
  const deadline = document.getElementById('mtDeadline').value;
  const pic = (document.getElementById('mtPicSelect')?.value || '').trim() || (teamMembers[0] ? teamMembers[0].name : '-');
  const category = document.getElementById('mtCategory').value.trim() || 'General';

  const proj = projects.find(p => p.id === projectId);
  if (!proj) return;

  if (!proj.masterTasks) proj.masterTasks = [];

  if (editId) {
    const idx = proj.masterTasks.findIndex(m => m.id === editId);
    if (idx !== -1) {
      proj.masterTasks[idx] = { ...proj.masterTasks[idx], title, type, weight, deadline, pic, category };
      showToast('Master task proyek berhasil diperbarui!', 'success');
    }
  } else {
    const newMtId = "mt-" + Date.now();
    proj.masterTasks.push({ id: newMtId, title, type, weight, deadline, pic, category });
    showToast('Master task baru berhasil ditambahkan ke proyek!', 'success');
  }

  saveProjects();
  renderProjectHub();
  renderTeamHub();
  masterTaskModal.classList.add('hidden');
});

function deleteMasterTask(projectId, masterTaskId) {
  const proj = projects.find(p => p.id === projectId);
  if (!proj || !proj.masterTasks) return;

  if (confirm('Yakin ingin menghapus master task ini dari proyek?')) {
    proj.masterTasks = proj.masterTasks.filter(m => m.id !== masterTaskId);
    saveProjects();
    renderProjectHub();
    renderTeamHub();
    showToast('Master task dihapus dari proyek.', 'info');
  }
}

// ==================== SMART AUTO-SCHEDULER ====================
// Automatically schedules unscheduled master tasks into the active month/week
document.getElementById('autoScheduleBtn').addEventListener('click', () => {
  const targetMonth = activeMonth !== 'all' ? activeMonth : '2026-09';
  const targetWeek = activeWeek !== 'all' ? activeWeek : 'Minggu 2';

  // 1. Gather all unscheduled master tasks across active projects
  const unscheduled = [];
  projects.filter(p => p.status !== 'Completed').forEach(p => {
    (p.masterTasks || []).forEach(mt => {
      // Check if already in tasks table
      const isAlreadyScheduled = tasks.some(t => t.projectId === p.id && (t.masterTaskId === mt.id || t.task === mt.title));
      if (!isAlreadyScheduled) {
        unscheduled.push({ project: p, masterTask: mt });
      }
    });
  });

  if (unscheduled.length === 0) {
    showToast('Semua master task dari proyek aktif sudah terjadwal! 🎉', 'info');
    return;
  }

  // 2. Sort by deadline (closest deadline first), then by weight (Berat first)
  unscheduled.sort((a, b) => {
    const dateA = a.masterTask.deadline || '9999-12-31';
    const dateB = b.masterTask.deadline || '9999-12-31';
    if (dateA !== dateB) return dateA.localeCompare(dateB);
    const weightOrder = { 'Berat': 1, 'Sedang': 2, 'Ringan': 3 };
    return (weightOrder[a.masterTask.weight] || 2) - (weightOrder[b.masterTask.weight] || 2);
  });

  // 3. Days and Slots
  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat"];
  let pmDayIdx = 0;
  let techDayIdx = 0;
  let scheduledCount = 0;

  unscheduled.forEach(item => {
    const isPm = item.masterTask.type === 'PM';
    const assignedDay = isPm ? days[pmDayIdx % days.length] : days[techDayIdx % days.length];
    const assignedSlot = isPm ? 'Pagi: 09-12' : 'Siang: 13-17';

    if (isPm) pmDayIdx++;
    else techDayIdx++;

    const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
    const taskPic = item.masterTask.pic && item.masterTask.pic !== '-' 
      ? item.masterTask.pic 
      : (isPm ? (teamMembers[0]?.name || "Anda (IT PM)") : (teamMembers[1]?.name || "Budi Pratama"));

    tasks.push({
      id: newId,
      projectId: item.project.id,
      masterTaskId: item.masterTask.id,
      month: targetMonth,
      week: targetWeek,
      day: assignedDay,
      slot: assignedSlot,
      type: item.masterTask.type,
      task: item.masterTask.title,
      category: item.masterTask.category || (isPm ? 'Ceremony' : 'Development'),
      pic: taskPic,
      priority: item.masterTask.weight === 'Berat' ? 'P1 (High)' : item.masterTask.weight === 'Sedang' ? 'P2 (Med)' : 'P3 (Low)',
      blocker: '-',
      deliverable: `Selesai sesuai target deadline (${formatDateDisplay(item.masterTask.deadline)})`,
      status: 'To Do'
    });

    scheduledCount++;
  });

  saveTasks();
  renderMonthSelector();
  updateDashboardMetrics();
  renderTaskTable();
  renderProjectHub();
  renderTeamHub();
  showToast(`✨ Sukses! ${scheduledCount} task dari backlog proyek otomatis dijadwalkan ke ${targetWeek}!`, 'success');
});

// ==================== TASK MODAL (DYNAMIC DROPDOWNS) ====================
const taskModal = document.getElementById('taskModal');
const taskForm = document.getElementById('taskForm');
const openAddTaskModalBtn = document.getElementById('openAddTaskModalBtn');
const closeTaskModalBtn = document.getElementById('closeTaskModalBtn');
const cancelTaskModalBtn = document.getElementById('cancelTaskModalBtn');
const modalTitle = document.getElementById('modalTitle');
const taskProjectIdSelect = document.getElementById('taskProjectId');
const taskMasterSelect = document.getElementById('taskMasterSelect');

function populateProjectDropdown() {
  taskProjectIdSelect.innerHTML = '';
  if (projects.length === 0) {
    taskProjectIdSelect.innerHTML = '<option value="">(Buat proyek terlebih dahulu)</option>';
    return;
  }
  projects.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.id;
    opt.textContent = `${p.code ? '[' + p.code + '] ' : ''}${p.name} (${p.client})`;
    taskProjectIdSelect.appendChild(opt);
  });
}

function updateMasterTaskSelectOptions(selectedProjectId, currentMasterId = null) {
  taskMasterSelect.innerHTML = '';
  const proj = getProjectById(selectedProjectId);
  const mTasks = proj.masterTasks || [];

  const defaultOpt = document.createElement('option');
  defaultOpt.value = "";
  defaultOpt.textContent = mTasks.length > 0 ? "-- Pilih dari Master Task Proyek --" : "(Belum ada master task di proyek ini)";
  taskMasterSelect.appendChild(defaultOpt);

  mTasks.forEach(mt => {
    const opt = document.createElement('option');
    opt.value = mt.id;
    opt.textContent = `[${mt.type}] ${mt.title} (Deadline: ${formatDateDisplay(mt.deadline)})`;
    if (currentMasterId === mt.id) opt.selected = true;
    taskMasterSelect.appendChild(opt);
  });

  const customOpt = document.createElement('option');
  customOpt.value = "CUSTOM";
  customOpt.textContent = "+ Ketik Task Manual / Ad-hoc";
  taskMasterSelect.appendChild(customOpt);
}

// When user changes Project in Task Modal, update Master Task dropdown
taskProjectIdSelect.addEventListener('change', (e) => {
  updateMasterTaskSelectOptions(e.target.value);
});

// When user picks a Master Task, auto-fill title, type, category, and PIC
taskMasterSelect.addEventListener('change', (e) => {
  const chosenMtId = e.target.value;
  if (!chosenMtId || chosenMtId === "CUSTOM") return;

  const proj = getProjectById(taskProjectIdSelect.value);
  const mt = (proj.masterTasks || []).find(m => m.id === chosenMtId);
  if (mt) {
    document.getElementById('taskDescription').value = mt.title;
    document.getElementById('taskType').value = mt.type || 'PM';
    if (mt.category) document.getElementById('taskCategory').value = mt.category;
    if (mt.pic) {
      const taskPicSel = document.getElementById('taskPicSelect');
      if (taskPicSel) taskPicSel.value = mt.pic;
    }
    showToast(`Detail tugas terisi otomatis dari master task!`, 'info');
  }
});

function openTaskModal(editId = null) {
  taskForm.reset();
  populateProjectDropdown();
  updatePicDropdowns();

  if (editId) {
    const item = tasks.find(t => t.id === editId);
    if (!item) return;

    modalTitle.textContent = 'Edit Task Mingguan';
    document.getElementById('editTaskId').value = item.id;
    taskProjectIdSelect.value = item.projectId || (projects[0] ? projects[0].id : '');
    updateMasterTaskSelectOptions(taskProjectIdSelect.value, item.masterTaskId);
    document.getElementById('taskMonth').value = item.month || '2026-09';
    document.getElementById('taskWeek').value = item.week || 'Minggu 2';
    document.getElementById('taskDay').value = item.day || 'Senin';
    document.getElementById('taskSlot').value = item.slot || 'Pagi: 09-12';
    document.getElementById('taskType').value = item.type || 'PM';
    document.getElementById('taskDescription').value = item.task || '';
    document.getElementById('taskCategory').value = item.category || '';
    
    const taskPicSel = document.getElementById('taskPicSelect');
    if (taskPicSel) taskPicSel.value = item.pic || (teamMembers[0]?.name || '');

    document.getElementById('taskPriority').value = item.priority || 'P2 (Med)';
    document.getElementById('taskBlocker').value = item.blocker || '';
    document.getElementById('taskDeliverable').value = item.deliverable || '';
    document.getElementById('taskStatus').value = item.status || 'To Do';
  } else {
    modalTitle.textContent = 'Tambah Task Mingguan';
    document.getElementById('editTaskId').value = '';
    const initialProjId = activeProjectFilter !== 'all' ? activeProjectFilter : (projects[0] ? projects[0].id : '');
    taskProjectIdSelect.value = initialProjId;
    updateMasterTaskSelectOptions(initialProjId);
    document.getElementById('taskMonth').value = activeMonth !== 'all' ? activeMonth : '2026-09';
    document.getElementById('taskWeek').value = activeWeek !== 'all' ? activeWeek : 'Minggu 2';
    
    const taskPicSel = document.getElementById('taskPicSelect');
    if (taskPicSel) taskPicSel.value = teamMembers[0]?.name || '';

    document.getElementById('taskPriority').value = 'P2 (Med)';
    document.getElementById('taskStatus').value = 'To Do';
  }
  taskModal.classList.remove('hidden');
}

openAddTaskModalBtn.addEventListener('click', () => openTaskModal());
closeTaskModalBtn.addEventListener('click', () => taskModal.classList.add('hidden'));
cancelTaskModalBtn.addEventListener('click', () => taskModal.classList.add('hidden'));

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const editId = document.getElementById('editTaskId').value;
  const projectId = taskProjectIdSelect.value;
  const masterTaskId = taskMasterSelect.value !== "CUSTOM" ? taskMasterSelect.value : null;
  const month = document.getElementById('taskMonth').value;
  const week = document.getElementById('taskWeek').value;
  const day = document.getElementById('taskDay').value;
  const slot = document.getElementById('taskSlot').value;
  const type = document.getElementById('taskType').value;
  const taskText = document.getElementById('taskDescription').value.trim();
  const category = document.getElementById('taskCategory').value.trim() || 'General';
  const pic = (document.getElementById('taskPicSelect')?.value || '').trim() || (teamMembers[0]?.name || '-');
  const priority = document.getElementById('taskPriority').value;
  const blocker = document.getElementById('taskBlocker').value.trim() || '-';
  const deliverable = document.getElementById('taskDeliverable').value.trim() || '-';
  const status = document.getElementById('taskStatus').value;

  if (editId) {
    const idNum = parseInt(editId, 10);
    const index = tasks.findIndex(t => t.id === idNum);
    if (index !== -1) {
      tasks[index] = {
        ...tasks[index],
        projectId, masterTaskId, month, week, day, slot, type, task: taskText, category, pic, priority, blocker, deliverable, status
      };
      showToast('Task mingguan berhasil diperbarui!', 'success');
    }
  } else {
    const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
    tasks.unshift({
      id: newId,
      projectId, masterTaskId, month, week, day, slot, type, task: taskText, category, pic, priority, blocker, deliverable, status
    });
    showToast('Task mingguan berhasil ditambahkan!', 'success');
  }

  saveTasks();
  renderMonthSelector();
  updateDashboardMetrics();
  renderTaskTable();
  renderProjectHub();
  renderTeamHub();
  taskModal.classList.add('hidden');
});

// Single Delete Task
function deleteTask(id) {
  const item = tasks.find(t => t.id === id);
  if (!item) return;

  if (confirm(`Yakin ingin menghapus task:\n"${item.task}"?`)) {
    tasks = tasks.filter(t => t.id !== id);
    selectedTaskIds.delete(id);
    if (supabaseClient) {
      supabaseClient.from('tasks').delete().eq('id', id).then(({ error }) => {
        if (error) console.error('Gagal hapus task di Supabase:', error);
      });
    }
    saveTasks();
    updateDashboardMetrics();
    renderTaskTable();
    updateBulkBar();
    renderProjectHub();
    renderTeamHub();
    showToast('Task berhasil dihapus.', 'info');
  }
}

// Bulk Actions Listeners
document.getElementById('selectAllCheckbox').addEventListener('change', (e) => {
  const filtered = getFilteredTasks();
  if (e.target.checked) {
    filtered.forEach(t => selectedTaskIds.add(t.id));
  } else {
    filtered.forEach(t => selectedTaskIds.delete(t.id));
  }
  updateBulkBar(filtered);
  renderTaskTable();
});

document.getElementById('bulkDeleteBtn').addEventListener('click', () => {
  if (selectedTaskIds.size === 0) return;
  const count = selectedTaskIds.size;
  const idsToDelete = Array.from(selectedTaskIds);
  if (confirm(`Apakah Anda yakin ingin menghapus ${count} task terpilih secara permanen? Tindakan ini tidak dapat dibatalkan.`)) {
    tasks = tasks.filter(t => !selectedTaskIds.has(t.id));
    selectedTaskIds.clear();
    if (supabaseClient && idsToDelete.length > 0) {
      supabaseClient.from('tasks').delete().in('id', idsToDelete).then(({ error }) => {
        if (error) console.error('Gagal hapus bulk task di Supabase:', error);
      });
    }
    saveTasks();
    updateDashboardMetrics();
    renderTaskTable();
    updateBulkBar();
    renderProjectHub();
    renderTeamHub();
    showToast(`Berhasil menghapus ${count} task secara massal! 🗑️`, 'info');
  }
});

document.getElementById('bulkMarkDoneBtn').addEventListener('click', () => {
  if (selectedTaskIds.size === 0) return;
  const count = selectedTaskIds.size;
  tasks.forEach(t => {
    if (selectedTaskIds.has(t.id)) t.status = 'Done';
  });
  selectedTaskIds.clear();
  saveTasks();
  updateDashboardMetrics();
  renderTaskTable();
  updateBulkBar();
  renderProjectHub();
  renderTeamHub();
  showToast(`${count} task berhasil ditandai Selesai! 🎉`, 'success');
});

document.getElementById('cancelSelectionBtn').addEventListener('click', () => {
  selectedTaskIds.clear();
  updateBulkBar();
  renderTaskTable();
});

// Filter Tabs Listeners
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => {
      b.className = 'filter-btn px-3.5 py-2 rounded-xl font-semibold transition text-slate-400 hover:text-slate-200';
    });
    btn.className = 'filter-btn px-3.5 py-2 rounded-xl font-bold transition bg-blue-600 text-white shadow-sm';
    activeFilter = btn.dataset.filter;
    renderTaskTable();
    updateDashboardMetrics();
  });
});

document.getElementById('weekFilterSelect').addEventListener('change', (e) => {
  activeWeek = e.target.value;
  updateDashboardMetrics();
  renderTaskTable();
  if (currentTab === 'team') renderTeamHub();
});

document.getElementById('projectFilterSelect').addEventListener('change', (e) => {
  activeProjectFilter = e.target.value;
  updateDashboardMetrics();
  renderTaskTable();
});

const picFilterSelectEl = document.getElementById('picFilterSelect');
if (picFilterSelectEl) {
  picFilterSelectEl.addEventListener('change', (e) => {
    activePicFilter = e.target.value;
    updateDashboardMetrics();
    renderTaskTable();
  });
}

document.getElementById('searchInput').addEventListener('input', (e) => {
  searchQuery = e.target.value.trim();
  renderTaskTable();
});

// ==================== PROJECT MODAL CRUD ====================
const projectModal = document.getElementById('projectModal');
const projectForm = document.getElementById('projectForm');
const openAddProjectModalBtn = document.getElementById('openAddProjectModalBtn');
const openAddProjectModalBtn2 = document.getElementById('openAddProjectModalBtn2');
const closeProjectModalBtn = document.getElementById('closeProjectModalBtn');
const cancelProjectModalBtn = document.getElementById('cancelProjectModalBtn');
const projectModalTitle = document.getElementById('projectModalTitle');

function openProjectModal(editId = null) {
  projectForm.reset();
  if (editId) {
    const p = projects.find(item => item.id === editId);
    if (!p) return;
    projectModalTitle.textContent = 'Edit Proyek';
    document.getElementById('editProjectId').value = p.id;
    document.getElementById('projectName').value = p.name;
    document.getElementById('projectCode').value = p.code || '';
    document.getElementById('projectClient').value = p.client || '';
    document.getElementById('projectStatus').value = p.status || 'Active';
    document.getElementById('projectTargetDate').value = p.targetDate || '';
    document.getElementById('projectColor').value = p.color || 'blue';
    document.getElementById('projectDescription').value = p.description || '';
  } else {
    projectModalTitle.textContent = 'Tambah Proyek Baru';
    document.getElementById('editProjectId').value = '';
    document.getElementById('projectStatus').value = 'Active';
    document.getElementById('projectColor').value = 'blue';
  }
  projectModal.classList.remove('hidden');
}

if (openAddProjectModalBtn) openAddProjectModalBtn.addEventListener('click', () => openProjectModal());
if (openAddProjectModalBtn2) openAddProjectModalBtn2.addEventListener('click', () => openProjectModal());
closeProjectModalBtn.addEventListener('click', () => projectModal.classList.add('hidden'));
cancelProjectModalBtn.addEventListener('click', () => projectModal.classList.add('hidden'));

projectForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const editId = document.getElementById('editProjectId').value;
  const name = document.getElementById('projectName').value.trim();
  const code = document.getElementById('projectCode').value.trim().toUpperCase() || name.slice(0, 3).toUpperCase();
  const client = document.getElementById('projectClient').value.trim() || '-';
  const status = document.getElementById('projectStatus').value;
  const targetDate = document.getElementById('projectTargetDate').value;
  const color = document.getElementById('projectColor').value;
  const description = document.getElementById('projectDescription').value.trim();

  if (editId) {
    const idx = projects.findIndex(p => p.id === editId);
    if (idx !== -1) {
      projects[idx] = { ...projects[idx], name, code, client, status, targetDate, color, description };
      showToast('Proyek berhasil diperbarui!', 'success');
    }
  } else {
    const newId = "proj-" + Date.now();
    projects.push({ id: newId, name, code, client, status, targetDate, color, description, masterTasks: [] });
    showToast('Proyek baru berhasil didaftarkan!', 'success');
  }

  saveProjects();
  populateProjectDropdown();
  updateProjectFilterDropdown();
  renderProjectHub();
  renderTeamHub();
  renderTaskTable();
  projectModal.classList.add('hidden');
});

function deleteProject(id) {
  const p = projects.find(item => item.id === id);
  if (!p) return;

  const countLinkedTasks = tasks.filter(t => t.projectId === id).length;
  let confirmMsg = `Yakin ingin menghapus proyek "${p.name}"?`;
  if (countLinkedTasks > 0) {
    confirmMsg += `\n\nPerhatian: Ada ${countLinkedTasks} task yang berelasi dengan proyek ini. Menghapus proyek juga akan menghapus task terkait.`;
  }

  if (confirm(confirmMsg)) {
    projects = projects.filter(item => item.id !== id);
    if (supabaseClient) {
      supabaseClient.from('projects').delete().eq('id', id).then(({ error }) => {
        if (error) console.error('Gagal hapus proyek di Supabase:', error);
      });
    }
    if (countLinkedTasks > 0) {
      const deletedTaskIds = tasks.filter(t => t.projectId === id).map(t => t.id);
      tasks = tasks.filter(t => t.projectId !== id);
      selectedTaskIds.clear();
      if (supabaseClient && deletedTaskIds.length > 0) {
        supabaseClient.from('tasks').delete().in('id', deletedTaskIds).then(({ error }) => {
          if (error) console.error('Gagal hapus linked tasks di Supabase:', error);
        });
      }
      saveTasks();
    }
    saveProjects();
    populateProjectDropdown();
    updateProjectFilterDropdown();
    renderProjectHub();
    renderTeamHub();
    updateDashboardMetrics();
    renderTaskTable();
    showToast(`Proyek ${p.name} berhasil dihapus.`, 'info');
  }
}

// ==================== TEAM MEMBER MODAL CRUD ====================
const teamMemberModal = document.getElementById('teamMemberModal');
const teamMemberForm = document.getElementById('teamMemberForm');
const openAddTeamModalBtn = document.getElementById('openAddTeamModalBtn');
const openAddTeamModalBtn2 = document.getElementById('openAddTeamModalBtn2');
const closeTeamMemberModalBtn = document.getElementById('closeTeamMemberModalBtn');
const cancelTeamMemberModalBtn = document.getElementById('cancelTeamMemberModalBtn');
const teamMemberModalTitle = document.getElementById('teamMemberModalTitle');

function openTeamMemberModal(editId = null) {
  teamMemberForm.reset();
  if (editId) {
    const tm = teamMembers.find(item => item.id === editId);
    if (!tm) return;
    teamMemberModalTitle.textContent = 'Edit Anggota Tim';
    document.getElementById('editTeamMemberId').value = tm.id;
    document.getElementById('tmName').value = tm.name;
    document.getElementById('tmRole').value = tm.role;
    document.getElementById('tmMaxTasks').value = tm.maxTasks || 4;
    document.getElementById('tmColor').value = tm.color || 'blue';
  } else {
    teamMemberModalTitle.textContent = 'Tambah Anggota Tim';
    document.getElementById('editTeamMemberId').value = '';
    document.getElementById('tmMaxTasks').value = 4;
    document.getElementById('tmColor').value = 'blue';
  }
  teamMemberModal.classList.remove('hidden');
}

if (openAddTeamModalBtn) openAddTeamModalBtn.addEventListener('click', () => openTeamMemberModal());
if (openAddTeamModalBtn2) openAddTeamModalBtn2.addEventListener('click', () => openTeamMemberModal());
if (closeTeamMemberModalBtn) closeTeamMemberModalBtn.addEventListener('click', () => teamMemberModal.classList.add('hidden'));
if (cancelTeamMemberModalBtn) cancelTeamMemberModalBtn.addEventListener('click', () => teamMemberModal.classList.add('hidden'));

if (teamMemberForm) {
  teamMemberForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const editId = document.getElementById('editTeamMemberId').value;
    const name = document.getElementById('tmName').value.trim();
    const role = document.getElementById('tmRole').value.trim();
    const maxTasks = parseInt(document.getElementById('tmMaxTasks').value, 10) || 4;
    const color = document.getElementById('tmColor').value;

    if (editId) {
      const idx = teamMembers.findIndex(tm => tm.id === editId);
      if (idx !== -1) {
        const oldName = teamMembers[idx].name;
        teamMembers[idx] = { ...teamMembers[idx], name, role, maxTasks, color };
        // Sync PIC in tasks and master tasks if name changed
        if (oldName !== name) {
          tasks.forEach(t => {
            if (t.pic === oldName) t.pic = name;
          });
          saveTasks();
          projects.forEach(p => {
            (p.masterTasks || []).forEach(mt => {
              if (mt.pic === oldName) mt.pic = name;
            });
          });
          saveProjects();
        }
        showToast('Data anggota tim berhasil diperbarui!', 'success');
      }
    } else {
      const newId = "tm-" + Date.now();
      teamMembers.push({ id: newId, name, role, maxTasks, color });
      showToast('Anggota tim baru berhasil didaftarkan!', 'success');
    }

    saveTeamMembers();
    updatePicDropdowns();
    renderTeamHub();
    renderProjectHub();
    renderTaskTable();
    teamMemberModal.classList.add('hidden');
  });
}

function deleteTeamMember(id) {
  const tm = teamMembers.find(item => item.id === id);
  if (!tm) return;

  const countLinked = tasks.filter(t => t.pic && (t.pic === tm.name || t.pic.includes(tm.name))).length;
  let msg = `Yakin ingin menghapus anggota tim "${tm.name}"?`;
  if (countLinked > 0) {
    msg += `\n\nPerhatian: Ada ${countLinked} task yang saat ini dialokasikan ke ${tm.name}.`;
  }

  if (confirm(msg)) {
    teamMembers = teamMembers.filter(item => item.id !== id);
    if (supabaseClient) {
      supabaseClient.from('team_members').delete().eq('id', id).then(({ error }) => {
        if (error) console.error('Gagal hapus anggota tim di Supabase:', error);
      });
    }
    saveTeamMembers();
    updatePicDropdowns();
    renderTeamHub();
    renderProjectHub();
    renderTaskTable();
    showToast(`Anggota tim ${tm.name} berhasil dihapus.`, 'info');
  }
}

// ==================== BACKUP & RESTORE MODAL ====================
const backupModal = document.getElementById('backupModal');
const openBackupModalBtn = document.getElementById('openBackupModalBtn');
const closeBackupModalBtn = document.getElementById('closeBackupModalBtn');

openBackupModalBtn.addEventListener('click', () => backupModal.classList.remove('hidden'));
closeBackupModalBtn.addEventListener('click', () => backupModal.classList.add('hidden'));

document.getElementById('downloadJsonBtn').addEventListener('click', () => {
  const payload = {
    version: 4,
    exportedAt: new Date().toISOString(),
    teamMembers: teamMembers,
    projects: projects,
    tasks: tasks
  };
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(payload, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `it-pm-workspace-full-v4-${new Date().toISOString().slice(0,10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showToast('Cadangan JSON V4 (Tim, Proyek, & Jadwal) berhasil diunduh!', 'success');
});

document.getElementById('downloadCsvBtn').addEventListener('click', () => {
  let csv = 'Periode Bulan,Minggu,Hari & Slot,Proyek,Kode,Klien,Jenis Pekerjaan,Aktivitas,Kategori,PIC,Prioritas,Blocker,Target Deliverable,Status\r\n';
  tasks.forEach(t => {
    const p = getProjectById(t.projectId);
    const clean = (text) => `"${(text || '').toString().replace(/"/g, '""')}"`;
    csv += [
      clean(t.month),
      clean(t.week),
      clean(`${t.day} (${t.slot})`),
      clean(p.name),
      clean(p.code),
      clean(p.client),
      clean(t.type),
      clean(t.task),
      clean(t.category),
      clean(t.pic),
      clean(t.priority),
      clean(t.blocker),
      clean(t.deliverable),
      clean(t.status)
    ].join(',') + '\r\n';
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('href', url);
  a.setAttribute('download', `it-pm-tasks-${new Date().toISOString().slice(0,10)}.csv`);
  document.body.appendChild(a);
  a.click();
  a.remove();
  showToast('File CSV berhasil diunduh!', 'success');
});

document.getElementById('importJsonInput').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const imported = JSON.parse(event.target.result);
      if (imported.projects && imported.tasks) {
        projects = imported.projects;
        tasks = imported.tasks;
        if (imported.teamMembers && Array.isArray(imported.teamMembers)) {
          teamMembers = imported.teamMembers;
        }
      } else if (Array.isArray(imported)) {
        tasks = imported;
      } else {
        throw new Error('Format file JSON tidak dikenali.');
      }

      migrateDataSchema();
      selectedTaskIds.clear();
      saveTeamMembers();
      saveProjects();
      saveTasks();
      updatePicDropdowns();
      populateProjectDropdown();
      updateProjectFilterDropdown();
      renderMonthSelector();
      updateDashboardMetrics();
      renderTaskTable();
      renderProjectHub();
      renderTeamHub();
      backupModal.classList.add('hidden');
      showToast(`Berhasil memulihkan ${teamMembers.length} anggota tim, ${projects.length} proyek, dan ${tasks.length} task!`, 'success');
    } catch (err) {
      alert('Gagal membaca file JSON: ' + err.message);
    }
  };
  reader.readAsText(file);
});

document.getElementById('resetDefaultBtn').addEventListener('click', () => {
  if (confirm('Apakah Anda yakin ingin mereset seluruh data kembali ke contoh template awal?')) {
    teamMembers = JSON.parse(JSON.stringify(DEFAULT_TEAM));
    projects = JSON.parse(JSON.stringify(DEFAULT_PROJECTS));
    tasks = JSON.parse(JSON.stringify(DEFAULT_TASKS));
    selectedTaskIds.clear();
    saveTeamMembers();
    saveProjects();
    saveTasks();
    updatePicDropdowns();
    populateProjectDropdown();
    updateProjectFilterDropdown();
    renderMonthSelector();
    updateDashboardMetrics();
    renderTaskTable();
    renderProjectHub();
    renderTeamHub();
    backupModal.classList.add('hidden');
    showToast('Data berhasil direset ke template default.', 'info');
  }
});

document.getElementById('exportMdBtn').addEventListener('click', () => {
  const monthName = formatMonthName(activeMonth);
  let md = `### 📅 IT PM Weekly Report & Project Allocation (${monthName})\n\n`;
  md += `| Periode | Proyek | Jenis | Aktivitas / Task | PIC | Prioritas | Blocker & Ketergantungan | Target Deliverable | Status |\n`;
  md += `| :--- | :--- | :---: | :--- | :--- | :---: | :--- | :--- | :---: |\n`;
  
  const list = getFilteredTasks();
  list.forEach(t => {
    const p = getProjectById(t.projectId);
    md += `| ${t.month} (${t.week} - ${t.day}) | [${p.code || 'PRJ'}] ${p.name} | **${t.type}** | ${t.task} | ${t.pic} | ${t.priority} | ${t.blocker} | ${t.deliverable} | ${t.status} |\n`;
  });

  navigator.clipboard.writeText(md).then(() => {
    showToast('Tabel berhasil disalin dalam format Markdown!', 'success');
  }).catch(() => {
    showToast('Gagal menyalin ke clipboard.', 'error');
  });
});

// ==================== SUPABASE MODAL EVENT LISTENERS ====================
const supabaseModal = document.getElementById('supabaseModal');
const openSupabaseModalBtn = document.getElementById('openSupabaseModalBtn');
const closeSupabaseModalBtn = document.getElementById('closeSupabaseModalBtn');
const saveSupabaseConfigBtn = document.getElementById('saveSupabaseConfigBtn');
const disconnectSupabaseBtn = document.getElementById('disconnectSupabaseBtn');
const syncUploadBtn = document.getElementById('syncUploadBtn');
const syncDownloadBtn = document.getElementById('syncDownloadBtn');
const copySqlBtn = document.getElementById('copySqlBtn');
const sqlSchemaTextarea = document.getElementById('sqlSchemaTextarea');

const SQL_SCHEMA_SCRIPT = `-- ============================================================
-- SQL SCHEMA FOR IT PM WORKSPACE SUPABASE INTEGRATION
-- Run this script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/_/sql
-- ============================================================

-- 1. Table: team_members
CREATE TABLE IF NOT EXISTS public.team_members (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT,
    max_tasks INT DEFAULT 4,
    color TEXT DEFAULT 'blue',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Table: projects
CREATE TABLE IF NOT EXISTS public.projects (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    code TEXT,
    client TEXT,
    status TEXT DEFAULT 'Active',
    target_date TEXT,
    color TEXT DEFAULT 'blue',
    description TEXT,
    master_tasks JSONB DEFAULT '[]'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Table: tasks
CREATE TABLE IF NOT EXISTS public.tasks (
    id BIGINT PRIMARY KEY,
    project_id TEXT,
    master_task_id TEXT,
    month TEXT,
    week TEXT,
    day TEXT,
    slot TEXT,
    type TEXT,
    task TEXT,
    category TEXT,
    pic TEXT,
    priority TEXT,
    blocker TEXT,
    deliverable TEXT,
    status TEXT,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public access team_members" ON public.team_members;
CREATE POLICY "Public access team_members" ON public.team_members FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access projects" ON public.projects;
CREATE POLICY "Public access projects" ON public.projects FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Public access tasks" ON public.tasks;
CREATE POLICY "Public access tasks" ON public.tasks FOR ALL USING (true) WITH CHECK (true);`;

if (sqlSchemaTextarea) {
  sqlSchemaTextarea.value = SQL_SCHEMA_SCRIPT;
}

if (openSupabaseModalBtn) {
  openSupabaseModalBtn.addEventListener('click', () => {
    initSupabaseClient();
    supabaseModal.classList.remove('hidden');
  });
}

if (closeSupabaseModalBtn) {
  closeSupabaseModalBtn.addEventListener('click', () => {
    supabaseModal.classList.add('hidden');
  });
}

if (saveSupabaseConfigBtn) {
  saveSupabaseConfigBtn.addEventListener('click', async () => {
    const url = document.getElementById('supabaseUrlInput').value.trim();
    const key = document.getElementById('supabaseKeyInput').value.trim();

    if (!url || !key) {
      showToast('Harap isi URL dan Anon Key Supabase!', 'error');
      return;
    }

    localStorage.setItem('supabase_url', url);
    localStorage.setItem('supabase_key', key);
    initSupabaseClient();

    if (supabaseClient) {
      showToast('Kredensial Supabase tersimpan! Mencoba sinkronisasi data cloud...', 'success');
      await syncDownloadFromSupabase(false);
      supabaseModal.classList.add('hidden');
    } else {
      showToast('Gagal terhubung dengan kredensial Supabase tersebut.', 'error');
    }
  });
}

if (disconnectSupabaseBtn) {
  disconnectSupabaseBtn.addEventListener('click', () => {
    if (confirm('Putuskan koneksi Supabase Cloud? Data lokal Anda tetap tersimpan.')) {
      localStorage.removeItem('supabase_url');
      localStorage.removeItem('supabase_key');
      supabaseClient = null;
      initSupabaseClient();
      showToast('Koneksi Supabase diputuskan. Kembali ke Mode Lokal.', 'info');
    }
  });
}

if (syncUploadBtn) {
  syncUploadBtn.addEventListener('click', () => {
    syncUploadToSupabase();
  });
}

if (syncDownloadBtn) {
  syncDownloadBtn.addEventListener('click', () => {
    syncDownloadFromSupabase(false);
  });
}

if (copySqlBtn && sqlSchemaTextarea) {
  copySqlBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(SQL_SCHEMA_SCRIPT).then(() => {
      showToast('Kode SQL Schema berhasil disalin ke clipboard!', 'success');
    }).catch(() => {
      showToast('Gagal menyalin kode SQL.', 'error');
    });
  });
}

// ==================== INITIALIZATION ON PAGE LOAD ====================
updatePicDropdowns();
populateProjectDropdown();
updateProjectFilterDropdown();
renderMonthSelector();
updateDashboardMetrics();
renderTaskTable();
renderProjectHub();
renderTeamHub();

// Init Supabase Client & fetch cloud data quietly if connected
initSupabaseClient();
if (supabaseClient) {
  syncDownloadFromSupabase(true);
}
