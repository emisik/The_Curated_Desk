(function () {
  const cardsEl = document.getElementById('invoiceCards');
  const trackFill = document.getElementById('trackFill');
  const trackPacket = document.getElementById('trackPacket');
  const trackNodeEls = Array.from(document.querySelectorAll('.track-node'));
  const statusDot = document.getElementById('statusDot');
  const statusText = document.getElementById('statusText');
  const stageBody = document.getElementById('stageBody');
  const logStrip = document.getElementById('logStrip');
  const runCounter = document.getElementById('runCounter');

  const STAGE_POSITIONS = [8, 36.5, 65, 92]; // percent left, matches 4 track nodes
  let runsToday = 482;
  let pendingTimers = [];
  let activeId = null;

  const money = (n) =>
    Number(n).toLocaleString('en-US', { style: 'currency', currency: 'USD' });

  function clearTimers() {
    pendingTimers.forEach((t) => clearTimeout(t));
    pendingTimers = [];
  }

  function schedule(fn, delay) {
    const t = setTimeout(fn, delay);
    pendingTimers.push(t);
    return t;
  }

  function invoiceIconSvg() {
    return `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2h9l5 5v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z"/><path d="M14 2v6h6"/><path d="M9 13h6M9 17h6M9 9h1"/></svg>`;
  }

  function renderCards() {
    cardsEl.innerHTML = '';
    SAMPLE_INVOICES.forEach((inv) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'invoice-card';
      btn.dataset.id = inv.id;
      btn.innerHTML = `
        <div class="invoice-card-top">
          <span class="invoice-card-icon">${invoiceIconSvg()}</span>
          <span class="invoice-card-total">${money(inv.total)}</span>
        </div>
        <p class="invoice-card-vendor">${inv.vendorName}</p>
        <span class="invoice-card-meta">#${inv.invoiceNumber} · ${inv.lineItems.length} line items</span>
      `;
      btn.addEventListener('click', () => runPipeline(inv.id));
      cardsEl.appendChild(btn);
    });
  }

  function setActiveCard(id) {
    Array.from(cardsEl.children).forEach((c) => {
      c.classList.toggle('active', c.dataset.id === id);
    });
  }

  function resetTrack() {
    trackFill.style.width = '0%';
    trackPacket.classList.remove('visible');
    trackNodeEls.forEach((n) => n.classList.remove('active', 'done', 'flagged'));
  }

  function moveTrackTo(stageIdx, state) {
    // state: 'active' | 'done' | 'flagged'
    const pct = STAGE_POSITIONS[stageIdx];
    trackFill.style.width = pct + '%';
    trackPacket.style.left = pct + '%';
    trackPacket.classList.add('visible');
    trackNodeEls.forEach((n, i) => {
      n.classList.remove('active');
      if (i < stageIdx) n.classList.add('done');
      if (i === stageIdx) {
        n.classList.remove('done', 'flagged');
        n.classList.add(state || 'active');
      }
    });
  }

  function setStatus(text, mode) {
    statusText.textContent = text;
    statusDot.className = 'status-dot' + (mode ? ' ' + mode : '');
  }

  function addLog(msg, mode) {
    const time = new Date().toLocaleTimeString('en-US', { hour12: false });
    const line = document.createElement('div');
    line.className = 'log-line' + (mode ? ' ' + mode : '');
    line.innerHTML = `<span class="log-time">${time}</span><span class="log-msg">${msg}</span>`;
    logStrip.prepend(line);
    while (logStrip.children.length > 12) {
      logStrip.removeChild(logStrip.lastChild);
    }
  }

  function computeValidation(inv) {
    const missing = [];
    if (!inv.vendorName) missing.push('vendorName');
    if (!inv.invoiceNumber) missing.push('invoiceNumber');
    if (!inv.invoiceDate) missing.push('invoiceDate');
    if (!inv.lineItems || inv.lineItems.length === 0) missing.push('lineItems');

    const lineSum = inv.lineItems.reduce((s, li) => s + li.amount, 0);
    const expectedTotal = lineSum + (inv.tax || 0);
    const totalsReconcile = Math.abs(expectedTotal - inv.total) < 0.01;

    const reasons = missing.map((f) => `Missing field: ${f}`);
    if (missing.length === 0 && !totalsReconcile) {
      reasons.push(
        `Line items + tax (${money(expectedTotal)}) don’t match stated total (${money(inv.total)})`
      );
    }
    return { isValid: missing.length === 0 && totalsReconcile, reasons, lineSum, expectedTotal };
  }

  function renderExtracted(inv) {
    const rows = inv.lineItems
      .map(
        (li) => `<tr><td>${li.description}</td><td class="num">${money(li.amount)}</td></tr>`
      )
      .join('');
    stageBody.innerHTML = `
      <div class="extract-grid">
        <div class="extract-field"><span class="field-label">Vendor</span><span class="field-value">${inv.vendorName}</span></div>
        <div class="extract-field"><span class="field-label">Invoice #</span><span class="field-value">${inv.invoiceNumber}</span></div>
        <div class="extract-field"><span class="field-label">Invoice date</span><span class="field-value">${inv.invoiceDate}</span></div>
        <div class="extract-field"><span class="field-label">Due date</span><span class="field-value">${inv.dueDate}</span></div>
      </div>
      <table class="line-items-table">
        <thead><tr><th>Line item</th><th class="num">Amount</th></tr></thead>
        <tbody>
          ${rows}
          <tr class="totals-row"><td>Subtotal</td><td class="num">${money(inv.tax === undefined ? inv.subtotal : inv.lineItems.reduce((s, li) => s + li.amount, 0))}</td></tr>
          <tr class="totals-row"><td>Tax</td><td class="num">${money(inv.tax || 0)}</td></tr>
          <tr class="totals-row grand"><td>Total</td><td class="num">${money(inv.total)}</td></tr>
        </tbody>
      </table>
      <div class="validation-checklist" id="checklist"></div>
    `;
  }

  function runChecklist(inv, validation, onDone) {
    const checklist = document.getElementById('checklist');
    if (!checklist) return onDone();
    const items = [
      { label: 'Required fields present', ok: inv.vendorName && inv.invoiceNumber && inv.invoiceDate && inv.lineItems.length },
      { label: 'Line items + tax reconcile with total', ok: Math.abs(validation.expectedTotal - inv.total) < 0.01 },
      { label: 'Vendor recognized in ledger history', ok: true },
    ];
    items.forEach((item, i) => {
      schedule(() => {
        const row = document.createElement('div');
        row.className = 'check-item ' + (item.ok ? 'ok' : 'fail');
        row.innerHTML = `<span class="check-icon">${
          item.ok
            ? '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>'
            : '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
        }</span><span>${item.label}</span>`;
        checklist.appendChild(row);
        requestAnimationFrame(() => row.classList.add('show'));
        if (i === items.length - 1) schedule(onDone, 500);
      }, i * 350);
    });
  }

  function renderResult(validation) {
    if (validation.isValid) {
      stageBody.insertAdjacentHTML(
        'beforeend',
        `<div class="result-banner ok">
          <span class="result-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </span>
          <div>
            <p class="result-title">Synced to accounting</p>
            <p class="result-sub">Row appended to the AP ledger. Finance was notified in #accounts-payable.</p>
          </div>
        </div>`
      );
    } else {
      stageBody.insertAdjacentHTML(
        'beforeend',
        `<div class="result-banner warn">
          <span class="result-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/></svg>
          </span>
          <div>
            <p class="result-title">Flagged for manual review</p>
            <p class="result-sub">Sent to #accounts-payable — nothing was written to the ledger.</p>
            <ul class="reasons-list">${validation.reasons.map((r) => `<li>${r}</li>`).join('')}</ul>
          </div>
        </div>`
      );
    }
  }

  function runPipeline(id) {
    clearTimers();
    activeId = id;
    const inv = SAMPLE_INVOICES.find((i) => i.id === id);
    setActiveCard(id);
    resetTrack();
    logStrip.innerHTML = '';
    stageBody.innerHTML = '';

    // Stage 0 — Trigger
    setStatus('Trigger detected — new email with attachment', 'active');
    moveTrackTo(0, 'active');
    addLog(`New email received: "${inv.subject}"`, null);
    stageBody.innerHTML = `<div class="loading-row"><span class="spinner"></span> Reading attachment…</div>`;

    // Stage 1 — Extract
    schedule(() => {
      if (activeId !== id) return;
      setStatus('Extracting invoice data…', 'active');
      moveTrackTo(1, 'active');
      addLog('Attachment sent to DocExtract AI for OCR + field extraction', null);
      stageBody.innerHTML = `<div class="loading-row"><span class="spinner"></span> Extracting vendor, line items, and totals…</div>`;
    }, 900);

    schedule(() => {
      if (activeId !== id) return;
      renderExtracted(inv);
      addLog(`Extracted ${inv.lineItems.length} line items · total ${money(inv.total)}`, 'ok');
    }, 2200);

    // Stage 2 — Validate
    schedule(() => {
      if (activeId !== id) return;
      setStatus('Validating extracted data…', 'active');
      moveTrackTo(2, 'active');
    }, 2800);

    schedule(() => {
      if (activeId !== id) return;
      const validation = computeValidation(inv);
      runChecklist(inv, validation, () => {
        if (activeId !== id) return;

        if (validation.isValid) {
          // Stage 3 — Sync
          setStatus('Syncing to AP ledger…', 'active');
          moveTrackTo(3, 'active');
          addLog('Validation passed — all fields reconcile', 'ok');

          schedule(() => {
            if (activeId !== id) return;
            trackNodeEls.forEach((n) => n.classList.add('done'));
            setStatus('Workflow complete', 'done');
            addLog('Row appended to Google Sheets — AP Ledger', 'ok');
            addLog('Slack notified: #accounts-payable', 'ok');
            renderResult(validation);
            runsToday += 1;
            runCounter.textContent = `Runs today · ${runsToday}`;
          }, 1100);
        } else {
          moveTrackTo(2, 'flagged');
          setStatus('Needs manual review', 'flagged');
          addLog('Validation failed — routed to manual review', 'warn');
          addLog('Slack alert sent: #accounts-payable', 'warn');
          renderResult(validation);
        }
      });
    }, 3400);
  }

  renderCards();
})();
