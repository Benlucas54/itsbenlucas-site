export default function Footer() {
  return (
    <footer className="bg-brand-black-tertiary px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6">
        <p className="text-lg font-bold text-brand-white">Promptpreneur</p>
        <div className="flex gap-8">
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-brand-white/70 transition-colors hover:text-brand-white"
          >
            YouTube
          </a>
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-brand-white/70 transition-colors hover:text-brand-white"
          >
            TikTok
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-brand-white/70 transition-colors hover:text-brand-white"
          >
            Twitter/X
          </a>
        </div>
        <p className="text-xs text-brand-white/50">
          &copy; 2025 Ben Lucas. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
