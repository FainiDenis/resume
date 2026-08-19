async function downloadResume() {
  const btn = document.getElementById('downloadBtn');
  const sheet = document.querySelector('.sheet');
  const nameText = document.querySelector('.head-name').innerText.trim().replace(/\s+/g, '-') || 'Resume';

  const originalLabel = btn.textContent;
  btn.textContent = 'generating…';
  btn.disabled = true;

  try {
    const canvas = await html2canvas(sheet, {
      scale: 3,
      useCORS: true,
      backgroundColor: '#ffffff',
      windowWidth: sheet.scrollWidth,
      windowHeight: sheet.scrollHeight,
      scrollX: 0,
      scrollY: -window.scrollY,
      x: 0,
      y: 0
    });

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ unit: 'in', format: 'letter', orientation: 'portrait' });
    const pageW = pdf.internal.pageSize.getWidth();
    const pageH = pdf.internal.pageSize.getHeight();

    // Scale the rendered image to fit within one page — never split across pages.
    let imgW = pageW;
    let imgH = (canvas.height * imgW) / canvas.width;
    if (imgH > pageH) {
      imgH = pageH;
      imgW = (canvas.width * imgH) / canvas.height;
    }
    const xOffset = (pageW - imgW) / 2;
    const yOffset = (pageH - imgH) / 2;

    pdf.addImage(canvas.toDataURL('image/jpeg', 0.98), 'JPEG', xOffset, yOffset, imgW, imgH);
    pdf.save(nameText + '-Resume.pdf');
  } catch (err) {
    alert('PDF generation failed — please try again.');
  } finally {
    btn.textContent = originalLabel;
    btn.disabled = false;
  }
}
