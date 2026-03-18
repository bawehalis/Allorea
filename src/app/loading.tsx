export default function Loading() {
  return (
    <div className="min-h-[60vh] bg-ivory flex flex-col items-center justify-center gap-6">
      <div className="w-8 h-8 border-2 border-mist border-t-allorea-500 rounded-full animate-spin" />
      <p className="font-body text-xs tracking-[0.3em] uppercase text-obsidian/40">Yükleniyor</p>
    </div>
  )
}
