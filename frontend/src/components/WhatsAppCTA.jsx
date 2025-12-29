export default function WhatsAppCTA() {
  const phone = "917249339058"; // your WhatsApp number
  const text = encodeURIComponent(
    "Hi DocMorph team, I need help with file conversion."
  );

  return (
    <a
      href={`https://wa.me/${phone}?text=${text}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 rounded-full bg-green-500 p-4 shadow-lg hover:bg-green-600 transition"
    >
      💬
    </a>
  );
}
