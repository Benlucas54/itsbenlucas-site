export default function Footer() {
  return (
    <footer className="relative z-10 bg-brand-black-tertiary px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6">
        <p className="text-lg font-bold text-brand-white">Promptpreneur<span className="text-brand-accent">.</span></p>
        <div className="flex gap-8">
          <a
            href="https://youtube.com/@itsbenlucas"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-brand-white/70 transition-colors hover:text-brand-white"
          >
            YouTube
          </a>
          <a
            href="https://tiktok.com/@itsbenlucas.tt"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-brand-white/70 transition-colors hover:text-brand-white"
          >
            TikTok
          </a>
          <a
            href="https://www.instagram.com/itsbenlucas/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-brand-white/70 transition-colors hover:text-brand-white"
          >
            Instagram
          </a>
        </div>
        <p className="text-xs text-brand-white/50">
          &copy; 2025 Ben Lucas. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
