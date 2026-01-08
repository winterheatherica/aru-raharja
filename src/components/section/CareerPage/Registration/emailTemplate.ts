export function buildJobApplicationGmail(jobTitle: string) {
  const subject = `Lamaran Pekerjaan – ${jobTitle}`;

  const body = `
Yth. Tim Rekrutmen PT Aru Raharja,

Perkenalkan, saya [Nama Lengkap]. Dengan ini saya ingin mengajukan lamaran untuk posisi ${jobTitle} yang saya lihat melalui website PT Aru Raharja.

Sebagai bahan pertimbangan, bersama email ini saya lampirkan:
- CV
- Portofolio (jika ada)
- Dokumen pendukung lainnya

Saya berharap dapat diberikan kesempatan untuk mengikuti tahapan seleksi selanjutnya.

Atas perhatian Bapak/Ibu, saya ucapkan terima kasih.

Hormat saya,
[Nama Lengkap]
[No. HP / WhatsApp]
[LinkedIn / Website / GitHub – opsional]
  `.trim();

  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: "info@aruraharja.co.id",
    su: subject,
    body,
  });

  return `https://mail.google.com/mail/?${params.toString()}`;
}
