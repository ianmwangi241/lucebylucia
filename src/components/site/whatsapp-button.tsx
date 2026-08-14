export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/254700000000"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Luce by Lucia on WhatsApp"
      className="bg-ink text-ivory hover:border-gold fixed right-5 bottom-5 z-30 grid size-12 place-items-center rounded-full border border-transparent shadow-lg transition-colors duration-300"
    >
      <svg
        viewBox="0 0 24 24"
        className="size-5"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M20.5 3.5A11 11 0 0 0 3.2 17.1L2 22l5-1.3a11 11 0 0 0 13.5-17.2Zm-8.4 16.2a9.2 9.2 0 0 1-4.7-1.3l-.3-.2-2.9.8.8-2.8-.2-.3a9.2 9.2 0 1 1 7.3 3.8Zm5.1-6.9c-.3-.1-1.7-.8-2-.9s-.5-.2-.7.1-.7.9-.9 1.1-.3.2-.6.1a7.5 7.5 0 0 1-2.2-1.4 8.3 8.3 0 0 1-1.5-1.9c-.2-.3 0-.5.1-.6l.6-.7c.1-.2.2-.3.3-.5s0-.4 0-.5-.7-1.6-.9-2.2-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.8.4 3.4 3.4 0 0 0-1.1 2.6 6 6 0 0 0 1.3 3.2 12.3 12.3 0 0 0 4.8 4.2c2.4 1 2.9.8 3.5.7a3 3 0 0 0 2-1.4 2.5 2.5 0 0 0 .2-1.4c-.1-.1-.3-.2-.6-.3Z" />
      </svg>
    </a>
  );
}
