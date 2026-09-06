/**
 * IT PM Weekly Task & Capacity Planner
 * Core Application Logic
 */

// Initial Default Tasks
const DEFAULT_TASKS = [
  { id: 1, day: "Senin", slot: "Pagi: 09-12", project: "App Mobile v2.1", type: "PM", task: "Fasilitasi Sprint Planning & estimasi story point", category: "Ceremony", pic: "Tech Lead, PO", priority: "P1 (High)", blocker: "Menunggu PRD final dari PO", deliverable: "Sprint Backlog terkunci di Jira", status: "Done" },
  { id: 2, day: "Senin", slot: "Siang: 13-17", project: "Web Portal", type: "Teknis", task: "Slicing UI Dashboard & integrasi state API", category: "Frontend", pic: "UI/UX Designer", priority: "P2 (Med)", blocker: "Figma icon belum fix", deliverable: "Commit code & buat draft PR", status: "In Progress" },
  { id: 3, day: "Selasa", slot: "Pagi: 09-12", project: "App Mobile v2.1", type: "PM", task: "Eskalasi issue kredensial API payment gateway", category: "Blocker", pic: "Vendor, DevOps", priority: "P1 (High)", blocker: "Tiket vendor #402 belum dibalas", deliverable: "API Key aktif di staging", status: "Done" },
  { id: 4, day: "Selasa", slot: "Siang: 13-17", project: "Backend Core", type: "Teknis", task: "Unit test & fix bug token auth expired", category: "Backend", pic: "Tech Lead", priority: "P1 (High)", blocker: "-", deliverable: "PR lulus CI/CD & merge ke dev", status: "Done" },
  { id: 5, day: "Rabu", slot: "Pagi: 09-12", project: "CRM Klien X", type: "PM", task: "Backlog Grooming & estimasi timeline change request", category: "Scoping", pic: "Business Analyst", priority: "P2 (Med)", blocker: "-", deliverable: "Impact Analysis & Timeline Doc", status: "In Progress" },
  { id: 6, day: "Rabu", slot: "Siang: 13-17", project: "Web Portal", type: "Teknis", task: "Setup cron job & optimasi query database report", category: "Database", pic: "Backend Team", priority: "P2 (Med)", blocker: "Akses read-replica belum ada", deliverable: "Script SQL & cron berjalan normal", status: "To Do" },
  { id: 7, day: "Kamis", slot: "Pagi: 09-12", project: "App Mobile v2.1", type: "PM", task: "Bug triage & koordinasi scope rilis UAT", category: "Delivery", pic: "QA Lead, PO", priority: "P1 (High)", blocker: "2 major bug di checkout", deliverable: "Release Candidate siap UAT", status: "To Do" },
  { id: 8, day: "Kamis", slot: "Siang: 13-17", project: "App Mobile v2.1", type: "Teknis", task: "Investigasi crash log Sentry modul Checkout", category: "Debugging", pic: "Mobile Dev", priority: "P1 (High)", blocker: "Perlu repro di Android 14", deliverable: "Root cause & bugfix patch", status: "To Do" },
  { id: 9, day: "Jumat", slot: "Pagi: 09-12", project: "All Projects", type: "PM", task: "Susun & kirim Weekly Status Report ke Lead PM", category: "Reporting", pic: "Lead PM, Klien", priority: "P1 (High)", blocker: "Butuh rekap burn-down", deliverable: "Email / PDF Status Report", status: "To Do" },
  { id: 10, day: "Jumat", slot: "Siang: 13-17", project: "Shared Lib", type: "Teknis", task: "Code review PR tim dan update technical docs", category: "Code Review", pic: "Peer Devs", priority: "P3 (Low)", blocker: "-", deliverable: "Approval PR & README update", status: "To Do" }
];

// App State
let tasks = JSON.parse(localStorage.getItem('it_pm_native_tasks')) || DEFAULT_TASKS;
let activeFilter = 'all';
let searchQuery = '';

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

// Local Storage Save
function saveTasks() {
  localStorage.setItem('it_pm_native_tasks', JSON.stringify(tasks));
}

// Analytics & KPI Metrics Calculation
function updateDashboardMetrics() {
  const total = tasks.length;
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
    document.getElementById('capacityAdvice').innerHTML = `<span class="text-slate-400">Belum ada tugas yang diinputkan. Silakan klik <b>+ Tambah Task Baru</b>.</span>`;
    return;
  }

  const pmTasks = tasks.filter(t => t.type === 'PM');
  const techTasks = tasks.filter(t => t.type === 'Teknis');
  const doneTasks = tasks.filter(t => t.status && t.status.toLowerCase().includes('done'));
  const blockerTasks = tasks.filter(t => t.blocker && t.blocker !== '-' && !t.status.toLowerCase().includes('done'));

  const pmPct = Math.round((pmTasks.length / total) * 100);
  const techPct = 100 - pmPct;
  const donePct = Math.round((doneTasks.length / total) * 100);

  // Cards
  document.getElementById('pmRatio').textContent = `${pmPct}%`;
  document.getElementById('pmCount').textContent = `(${pmTasks.length} task)`;
  document.getElementById('techRatio').textContent = `${techPct}%`;
  document.getElementById('techCount').textContent = `(${techTasks.length} task)`;
  
  document.getElementById('doneProgress').textContent = `${donePct}%`;
  document.getElementById('doneCount').textContent = `(${doneTasks.length}/${total} task)`;
  document.getElementById('doneProgressBar').style.width = `${donePct}%`;

  document.getElementById('blockerCount').textContent = blockerTasks.length;

  // Visual Bar
  document.getElementById('barPmLabel').textContent = `${pmPct}%`;
  document.getElementById('barTechLabel').textContent = `${techPct}%`;
  document.getElementById('barPmVisual').style.width = `${pmPct}%`;
  document.getElementById('barTechVisual').style.width = `${techPct}%`;

  // Capacity Evaluation Insight
  const adviceEl = document.getElementById('capacityAdvice');
  if (pmPct >= 70) {
    adviceEl.innerHTML = `<span class="text-amber-400 font-semibold flex items-center gap-1.5">⚠️ Beban PM Dominan (${pmPct}%): Waktu teknis Anda sangat sempit. Hindari rapat non-esensial agar deep work tetap tercapai.</span>`;
  } else if (techPct >= 70) {
    adviceEl.innerHTML = `<span class="text-emerald-400 font-semibold flex items-center gap-1.5">⚡ Beban Teknis Dominan (${techPct}%): Pastikan timeline, blocker, dan komunikasi dengan klien/PO tidak terlewatkan.</span>`;
  } else {
    adviceEl.innerHTML = `<span class="text-blue-400 font-semibold flex items-center gap-1.5">✅ Proporsi Seimbang (${pmPct}% PM : ${techPct}% Teknis): Alokasi ideal untuk peran hybrid. Pertahankan ritme time-blocking harian.</span>`;
  }
}

// Render Table
function renderTaskTable() {
  const tbody = document.getElementById('taskTableBody');
  tbody.innerHTML = '';

  const filtered = tasks.filter(task => {
    // Tab Filters
    if (activeFilter === 'PM' && task.type !== 'PM') return false;
    if (activeFilter === 'Teknis' && task.type !== 'Teknis') return false;
    if (activeFilter === 'P1' && !task.priority.includes('P1')) return false;
    if (activeFilter === 'Blocker' && (!task.blocker || task.blocker === '-')) return false;

    // Search Query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (task.task && task.task.toLowerCase().includes(q)) ||
             (task.project && task.project.toLowerCase().includes(q)) ||
             (task.category && task.category.toLowerCase().includes(q)) ||
             (task.pic && task.pic.toLowerCase().includes(q)) ||
             (task.deliverable && task.deliverable.toLowerCase().includes(q));
    }
    return true;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="11" class="p-10 text-center text-slate-400">
          <div class="max-w-sm mx-auto space-y-2">
            <span class="text-3xl">📭</span>
            <p class="font-medium text-slate-300">Tidak ada task yang cocok dengan filter atau pencarian.</p>
            <p class="text-xs text-slate-400">Ganti kata kunci pencarian atau klik tombol <b>+ Tambah Task Baru</b>.</p>
          </div>
        </td>
      </tr>
    `;
    return;
  }

  filtered.forEach(item => {
    const isDone = item.status && item.status.toLowerCase().includes('done');
    const isPm = item.type === 'PM';
    const hasBlocker = item.blocker && item.blocker !== '-';

    const tr = document.createElement('tr');
    tr.className = `hover:bg-slate-800/40 transition-colors animate-fade-in ${isDone ? 'opacity-50 bg-slate-900/30' : ''}`;
    
    tr.innerHTML = `
      <td class="p-4 text-center">
        <input type="checkbox" ${isDone ? 'checked' : ''} class="task-checkbox rounded-md border-slate-700 bg-slate-800 text-blue-600 focus:ring-0 cursor-pointer h-4 w-4" data-id="${item.id}" title="Tandai Selesai">
      </td>
      <td class="p-4 whitespace-nowrap">
        <div class="font-bold text-white">${item.day}</div>
        <div class="text-[10px] text-slate-400 font-medium mt-0.5">${item.slot || 'Pagi'}</div>
      </td>
      <td class="p-4 whitespace-nowrap font-semibold text-slate-200">
        ${item.project}
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

  // Attach Inline Events
  document.querySelectorAll('.task-checkbox').forEach(cb => {
    cb.addEventListener('change', (e) => {
      const id = parseInt(e.target.dataset.id);
      const item = tasks.find(t => t.id === id);
      if (item) {
        item.status = e.target.checked ? 'Done' : 'In Progress';
        saveTasks();
        updateDashboardMetrics();
        renderTaskTable();
        showToast(e.target.checked ? 'Task ditandai selesai! 🎉' : 'Task diubah ke In Progress.', 'success');
      }
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
        showToast(`Status diubah ke: ${item.status}`, 'info');
      }
    });
  });

  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(btn.dataset.id);
      openTaskModal(id);
    });
  });

  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(btn.dataset.id);
      deleteTask(id);
    });
  });
}

// Modal Form Handling (Add / Edit)
const taskModal = document.getElementById('taskModal');
const taskForm = document.getElementById('taskForm');
const openAddTaskModalBtn = document.getElementById('openAddTaskModalBtn');
const closeTaskModalBtn = document.getElementById('closeTaskModalBtn');
const cancelTaskModalBtn = document.getElementById('cancelTaskModalBtn');
const modalTitle = document.getElementById('modalTitle');

function openTaskModal(editId = null) {
  taskForm.reset();
  if (editId) {
    const item = tasks.find(t => t.id === editId);
    if (!item) return;

    modalTitle.textContent = 'Edit Task';
    document.getElementById('editTaskId').value = item.id;
    document.getElementById('taskDay').value = item.day || 'Senin';
    document.getElementById('taskSlot').value = item.slot || 'Pagi: 09-12';
    document.getElementById('taskProject').value = item.project || '';
    document.getElementById('taskType').value = item.type || 'PM';
    document.getElementById('taskDescription').value = item.task || '';
    document.getElementById('taskCategory').value = item.category || '';
    document.getElementById('taskPic').value = item.pic || '';
    document.getElementById('taskPriority').value = item.priority || 'P2 (Med)';
    document.getElementById('taskBlocker').value = item.blocker || '';
    document.getElementById('taskDeliverable').value = item.deliverable || '';
    document.getElementById('taskStatus').value = item.status || 'To Do';
  } else {
    modalTitle.textContent = 'Tambah Task Baru';
    document.getElementById('editTaskId').value = '';
    document.getElementById('taskPriority').value = 'P2 (Med)';
    document.getElementById('taskStatus').value = 'To Do';
  }
  taskModal.classList.remove('hidden');
}

function closeTaskModal() {
  taskModal.classList.add('hidden');
}

openAddTaskModalBtn.addEventListener('click', () => openTaskModal());
closeTaskModalBtn.addEventListener('click', closeTaskModal);
cancelTaskModalBtn.addEventListener('click', closeTaskModal);

taskForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const editId = document.getElementById('editTaskId').value;
  const day = document.getElementById('taskDay').value;
  const slot = document.getElementById('taskSlot').value;
  const project = document.getElementById('taskProject').value.trim();
  const type = document.getElementById('taskType').value;
  const taskText = document.getElementById('taskDescription').value.trim();
  const category = document.getElementById('taskCategory').value.trim() || 'General';
  const pic = document.getElementById('taskPic').value.trim() || '-';
  const priority = document.getElementById('taskPriority').value;
  const blocker = document.getElementById('taskBlocker').value.trim() || '-';
  const deliverable = document.getElementById('taskDeliverable').value.trim() || '-';
  const status = document.getElementById('taskStatus').value;

  if (editId) {
    // Edit existing task
    const idNum = parseInt(editId);
    const index = tasks.findIndex(t => t.id === idNum);
    if (index !== -1) {
      tasks[index] = {
        ...tasks[index],
        day, slot, project, type, task: taskText, category, pic, priority, blocker, deliverable, status
      };
      showToast('Task berhasil diperbarui!', 'success');
    }
  } else {
    // Add new task
    const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
    tasks.unshift({
      id: newId,
      day, slot, project, type, task: taskText, category, pic, priority, blocker, deliverable, status
    });
    showToast('Task baru berhasil ditambahkan!', 'success');
  }

  saveTasks();
  updateDashboardMetrics();
  renderTaskTable();
  closeTaskModal();
});

// Delete Task
function deleteTask(id) {
  const item = tasks.find(t => t.id === id);
  if (!item) return;

  if (confirm(`Yakin ingin menghapus task:\n"${item.task}"?`)) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    updateDashboardMetrics();
    renderTaskTable();
    showToast('Task berhasil dihapus.', 'info');
  }
}

// Filter Tabs
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => {
      b.className = 'filter-btn px-3.5 py-2 rounded-xl font-semibold transition text-slate-400 hover:text-slate-200';
    });
    btn.className = 'filter-btn px-3.5 py-2 rounded-xl font-bold transition bg-blue-600 text-white shadow-sm';
    activeFilter = btn.dataset.filter;
    renderTaskTable();
  });
});

// Search Filter
document.getElementById('searchInput').addEventListener('input', (e) => {
  searchQuery = e.target.value.trim();
  renderTaskTable();
});

// Backup / Export Modal
const backupModal = document.getElementById('backupModal');
const openBackupModalBtn = document.getElementById('openBackupModalBtn');
const closeBackupModalBtn = document.getElementById('closeBackupModalBtn');

openBackupModalBtn.addEventListener('click', () => backupModal.classList.remove('hidden'));
closeBackupModalBtn.addEventListener('click', () => backupModal.classList.add('hidden'));

// 1. Download JSON
document.getElementById('downloadJsonBtn').addEventListener('click', () => {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(tasks, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `weekly-plan-it-pm-${new Date().toISOString().slice(0,10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showToast('File backup JSON berhasil diunduh!', 'success');
});

// 2. Download CSV
document.getElementById('downloadCsvBtn').addEventListener('click', () => {
  let csv = 'Hari & Slot,Proyek / Sprint,Kategori,Jenis Pekerjaan,Aktivitas,PIC,Prioritas,Blocker,Target Deliverable,Status\r\n';
  tasks.forEach(t => {
    const clean = (text) => `"${(text || '').toString().replace(/"/g, '""')}"`;
    csv += [
      clean(`${t.day} (${t.slot})`),
      clean(t.project),
      clean(t.category),
      clean(t.type),
      clean(t.task),
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
  a.setAttribute('download', `weekly-tasks-${new Date().toISOString().slice(0,10)}.csv`);
  document.body.appendChild(a);
  a.click();
  a.remove();
  showToast('File CSV berhasil diunduh!', 'success');
});

// 3. Restore JSON
document.getElementById('importJsonInput').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const imported = JSON.parse(event.target.result);
      if (Array.isArray(imported) && imported.length > 0) {
        tasks = imported;
        saveTasks();
        updateDashboardMetrics();
        renderTaskTable();
        backupModal.classList.add('hidden');
        showToast(`Berhasil memulihkan ${tasks.length} task dari file cadangan!`, 'success');
      } else {
        throw new Error('Format file tidak valid.');
      }
    } catch (err) {
      alert('Gagal membaca file JSON: ' + err.message);
    }
  };
  reader.readAsText(file);
});

// 4. Reset to Default
document.getElementById('resetDefaultBtn').addEventListener('click', () => {
  if (confirm('Apakah Anda yakin ingin mereset seluruh data kembali ke contoh template awal?')) {
    tasks = JSON.parse(JSON.stringify(DEFAULT_TASKS));
    saveTasks();
    updateDashboardMetrics();
    renderTaskTable();
    backupModal.classList.add('hidden');
    showToast('Data berhasil direset ke template default.', 'info');
  }
});

// 5. Export Markdown for Reports
document.getElementById('exportMdBtn').addEventListener('click', () => {
  let md = `### 📅 Weekly Task Plan & Capacity Report\n\n`;
  md += `| Hari & Slot | Proyek | Jenis | Aktivitas / Task | Prioritas | Blocker & Ketergantungan | Target Deliverable | Status |\n`;
  md += `| :--- | :--- | :---: | :--- | :---: | :--- | :--- | :---: |\n`;
  
  tasks.forEach(t => {
    md += `| ${t.day} (${t.slot}) | ${t.project} | **${t.type}** | ${t.task} | ${t.priority} | ${t.blocker} | ${t.deliverable} | ${t.status} |\n`;
  });

  navigator.clipboard.writeText(md).then(() => {
    showToast('Tabel berhasil disalin dalam format Markdown!', 'success');
  }).catch(() => {
    showToast('Gagal menyalin ke clipboard.', 'error');
  });
});

// Initialize on Load
updateDashboardMetrics();
renderTaskTable();
