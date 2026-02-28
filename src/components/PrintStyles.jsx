const PrintStyles = () => (
  <style>{`
    @media print {
      /* Hide the screen UI entirely */
      .screen-only { display: none !important; }

      /* Show the dedicated print layout */
      .print-only { display: block !important; }

      /* Hide the print button */
      .no-print { display: none !important; }

      /* Clean page */
      @page {
        size: A4 portrait;
        margin: 14mm 16mm;
      }

      body {
        background: #ffffff !important;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }

      /* No orphan headings */
      h1, h2, h3 { page-break-after: avoid; }
    }
  `}</style>
);

export default PrintStyles;