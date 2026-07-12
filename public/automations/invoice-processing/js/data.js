/* Synthetic sample invoices for the demo. Not real vendor data. */
const SAMPLE_INVOICES = [
  {
    id: 'northwind',
    vendorName: 'Northwind Timber Co.',
    invoiceNumber: 'NW-20487',
    invoiceDate: '2026-07-02',
    dueDate: '2026-07-30',
    subject: 'Invoice NW-20487 — July materials order',
    lineItems: [
      { description: 'Kiln-dried oak boards (200 ct)', amount: 1840.0 },
      { description: 'Delivery & handling', amount: 165.0 },
    ],
    tax: 140.4,
    total: 2145.4,
    outcome: 'valid',
  },
  {
    id: 'bluepeak',
    vendorName: 'Bluepeak Cloud Hosting',
    invoiceNumber: 'BP-INV-88213',
    invoiceDate: '2026-07-05',
    dueDate: '2026-07-19',
    subject: 'Your Bluepeak invoice for July is ready',
    lineItems: [
      { description: 'Production cluster — monthly', amount: 640.0 },
      { description: 'Object storage overage (1.2TB)', amount: 36.0 },
      { description: 'Support plan — Priority', amount: 99.0 },
    ],
    tax: 0,
    total: 775.0,
    outcome: 'valid',
  },
  {
    id: 'ferro',
    vendorName: 'Ferro Machine Parts',
    invoiceNumber: 'FMP-5521',
    invoiceDate: '2026-07-08',
    dueDate: '2026-08-07',
    subject: 'Invoice attached — order #5521',
    lineItems: [
      { description: 'Replacement bearing set', amount: 312.0 },
      { description: 'Hydraulic seal kit', amount: 188.5 },
    ],
    tax: 40.04,
    // Stated total doesn't reconcile with line items + tax — routes to manual review.
    total: 612.0,
    outcome: 'invalid',
  },
];
