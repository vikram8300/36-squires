// 36 Squires Path — UI Interactions, Toggle Logic, PDF Export

document.addEventListener('DOMContentLoaded', () => {
  // ─── Initialize Site Plan SVG ──────────────────────────────────
  const svg = document.getElementById('site-plan-svg');
  if (svg) {
    const groups = renderPropertyBase(svg);
    window._svgGroups = groups;
    // Show option A by default
    showOption('A');
  }

  // ─── Initialize Gantt Chart ────────────────────────────────────
  const ganttContainer = document.getElementById('gantt-chart');
  if (ganttContainer) {
    renderGanttChart(ganttContainer);
  }

  // ─── Option Toggle Buttons ─────────────────────────────────────
  document.querySelectorAll('[data-option]').forEach(btn => {
    btn.addEventListener('click', () => {
      const opt = btn.dataset.option;
      showOption(opt);

      // Update button states
      document.querySelectorAll('[data-option]').forEach(b => {
        b.classList.remove('bg-stone-800', 'text-white');
        b.classList.add('bg-white', 'text-stone-700');
      });
      btn.classList.remove('bg-white', 'text-stone-700');
      btn.classList.add('bg-stone-800', 'text-white');

      // Update info card
      updateInfoCard(opt);
    });
  });

  // ─── Layer Toggle Checkboxes ───────────────────────────────────
  document.querySelectorAll('[data-toggle-layer]').forEach(cb => {
    cb.addEventListener('change', () => {
      const layer = cb.dataset.toggleLayer;
      const g = document.getElementById(`g-${layer}`);
      if (g) g.style.display = cb.checked ? '' : 'none';
    });
  });

  // ─── Material Selector ────────────────────────────────────────
  document.querySelectorAll('[data-material]').forEach(btn => {
    btn.addEventListener('click', () => {
      const matId = btn.dataset.material;
      document.querySelectorAll('[data-material]').forEach(b => {
        b.classList.remove('ring-2', 'ring-stone-800');
      });
      btn.classList.add('ring-2', 'ring-stone-800');
      updateCostTable(matId);
    });
  });

  // ─── Smooth Scroll Nav ─────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // ─── PDF Export ────────────────────────────────────────────────
  const pdfBtn = document.getElementById('btn-pdf');
  if (pdfBtn) {
    pdfBtn.addEventListener('click', generatePDF);
  }

  // Initialize cost table with Belgian Block
  updateCostTable('belgianBlock');
  // Initialize info card
  updateInfoCard('A');
});

// ─── Show/Hide Option Overlays ───────────────────────────────────

function showOption(optId) {
  ['A', 'B', 'C', 'D'].forEach(id => {
    const g = document.getElementById(`g-option-${id}`);
    if (g) g.style.display = id === optId ? '' : 'none';
  });

  // Hide current driveway when showing proposed
  const currentDrive = document.getElementById('g-current-drive');
  if (currentDrive) currentDrive.style.display = 'none';
}

// ─── Update Info Card ────────────────────────────────────────────

function updateInfoCard(optId) {
  const opt = OPTIONS[optId];
  if (!opt) return;

  const card = document.getElementById('option-info-card');
  if (!card) return;

  const cov = opt.coverage;
  const buildBar = (cov.buildingPct / 20 * 100).toFixed(0);
  const lotBar = (cov.lotCoveragePct / 50 * 100).toFixed(0);

  card.innerHTML = `
    <div class="mb-3">
      <span class="inline-block px-2 py-0.5 text-xs font-mono rounded ${opt.recommended ? 'bg-green-100 text-green-800' : 'bg-stone-100 text-stone-600'}">
        ${opt.recommended ? '★ RECOMMENDED' : `OPTION ${opt.id}`}
      </span>
    </div>
    <h3 class="text-lg font-semibold text-stone-900 mb-1">${opt.name}</h3>
    <p class="text-sm text-stone-600 mb-4">${opt.description}</p>

    <div class="space-y-3 text-sm">
      <div class="flex justify-between">
        <span class="text-stone-500">Court</span>
        <span class="font-mono text-stone-800">${opt.court.width}' × ${opt.court.depth}' (${opt.court.area_sf.toLocaleString()} sf)</span>
      </div>
      <div class="flex justify-between">
        <span class="text-stone-500">Capacity</span>
        <span class="font-mono text-stone-800">${opt.court.capacity}</span>
      </div>
      <div class="flex justify-between">
        <span class="text-stone-500">Garage</span>
        <span class="font-mono text-stone-800">${opt.garage.width}' × ${opt.garage.depth}' ${opt.garage.type} (${opt.garage.area_sf} sf)</span>
      </div>
      <div class="flex justify-between">
        <span class="text-stone-500">Variance Risk</span>
        <span class="font-mono ${opt.varianceRisk === 'None' || opt.varianceRisk === 'Lowest' ? 'text-green-700' : 'text-amber-700'}">${opt.varianceRisk}</span>
      </div>
      <div class="flex justify-between">
        <span class="text-stone-500">Phases</span>
        <span class="font-mono text-stone-800">${opt.phases}</span>
      </div>
      <div class="flex justify-between">
        <span class="text-stone-500">Timeline</span>
        <span class="font-mono text-stone-800">${opt.timelineWeeks} weeks</span>
      </div>

      <div class="pt-3 border-t border-stone-200">
        <div class="mb-2">
          <div class="flex justify-between text-xs mb-1">
            <span>Building Coverage</span>
            <span class="font-mono">${cov.buildingPct}% / 20% max</span>
          </div>
          <div class="h-2 bg-stone-200 rounded-full overflow-hidden">
            <div class="h-full bg-stone-600 rounded-full" style="width: ${buildBar}%"></div>
          </div>
        </div>
        <div>
          <div class="flex justify-between text-xs mb-1">
            <span>Lot Coverage</span>
            <span class="font-mono">${cov.lotCoveragePct}% / 50% max</span>
          </div>
          <div class="h-2 bg-stone-200 rounded-full overflow-hidden">
            <div class="h-full bg-stone-600 rounded-full" style="width: ${lotBar}%"></div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ─── Update Cost Table ───────────────────────────────────────────

function updateCostTable(materialId) {
  const mat = MATERIALS[materialId];
  if (!mat) return;

  const tbody = document.getElementById('cost-table-body');
  if (!tbody) return;

  const optIds = ['A', 'B', 'C', 'D'];
  tbody.innerHTML = '';

  optIds.forEach(id => {
    const opt = OPTIONS[id];
    const items = opt.costs.phase1.items;
    let totalLow = 0, totalHigh = 0;

    items.forEach(item => {
      let low, high;
      if (item.lowPerSf !== undefined) {
        const sfMatch = item.name.match(/\(([\d,]+)\s*sf\)/);
        const area = sfMatch ? parseInt(sfMatch[1].replace(',', '')) : 350;
        low = area * mat.costPerSqFt.low;
        high = area * mat.costPerSqFt.high;
      } else {
        low = item.low;
        high = item.high;
      }
      totalLow += low;
      totalHigh += high;
    });

    const row = document.createElement('tr');
    row.className = 'border-b border-stone-100';
    row.innerHTML = `
      <td class="py-2 px-3 font-medium text-stone-800">${opt.recommended ? '★ ' : ''}Option ${id}</td>
      <td class="py-2 px-3 text-stone-600">${opt.name}</td>
      <td class="py-2 px-3 font-mono text-right text-stone-800">$${totalLow.toLocaleString()}</td>
      <td class="py-2 px-3 font-mono text-right text-stone-800">$${totalHigh.toLocaleString()}</td>
    `;
    tbody.appendChild(row);

    // Phase 2 row if applicable
    if (opt.costs.phase2) {
      let p2Low = 0, p2High = 0;
      opt.costs.phase2.items.forEach(item => { p2Low += item.low; p2High += item.high; });
      const p2row = document.createElement('tr');
      p2row.className = 'border-b border-stone-100 bg-stone-50';
      p2row.innerHTML = `
        <td class="py-2 px-3 text-stone-500 pl-8">↳ Phase 2</td>
        <td class="py-2 px-3 text-stone-500 text-sm">Carport → Garage enclosure</td>
        <td class="py-2 px-3 font-mono text-right text-stone-500">+$${p2Low.toLocaleString()}</td>
        <td class="py-2 px-3 font-mono text-right text-stone-500">+$${p2High.toLocaleString()}</td>
      `;
      tbody.appendChild(p2row);
    }
  });

  // Update material name display
  const matLabel = document.getElementById('selected-material-label');
  if (matLabel) matLabel.textContent = mat.name;
}

// ─── PDF Export ──────────────────────────────────────────────────

async function generatePDF() {
  const btn = document.getElementById('btn-pdf');
  if (btn) {
    btn.textContent = 'Generating PDF...';
    btn.disabled = true;
  }

  try {
    const content = document.getElementById('main-content');
    const canvas = await html2canvas(content, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#fafaf8'
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.92);
    const pdf = new jspdf.jsPDF('p', 'mm', 'a4');
    const pageW = pdf.internal.pageSize.getWidth();
    const pageH = pdf.internal.pageSize.getHeight();
    const imgW = pageW - 20;
    const imgH = (canvas.height * imgW) / canvas.width;

    let yPos = 10;
    let remainingH = imgH;
    let srcY = 0;

    while (remainingH > 0) {
      const sliceH = Math.min(pageH - 20, remainingH);
      const sliceCanvas = document.createElement('canvas');
      sliceCanvas.width = canvas.width;
      sliceCanvas.height = (sliceH / imgH) * canvas.height;
      const ctx = sliceCanvas.getContext('2d');
      ctx.drawImage(canvas, 0, srcY, canvas.width, sliceCanvas.height, 0, 0, canvas.width, sliceCanvas.height);

      const sliceImg = sliceCanvas.toDataURL('image/jpeg', 0.92);
      if (srcY > 0) pdf.addPage();
      pdf.addImage(sliceImg, 'JPEG', 10, 10, imgW, sliceH);

      srcY += sliceCanvas.height;
      remainingH -= sliceH;
    }

    pdf.save('36-Squires-Path-Driveway-Study.pdf');
  } catch (err) {
    console.error('PDF generation failed:', err);
    alert('PDF generation failed. Please try printing the page instead (Ctrl/Cmd+P).');
  }

  if (btn) {
    btn.textContent = 'Download PDF';
    btn.disabled = false;
  }
}
