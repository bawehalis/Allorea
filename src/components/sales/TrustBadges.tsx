import { Truck, Shield, RotateCcw, CreditCard, Phone } from 'lucide-react'

const BADGES = [
  { Icon: Truck,      label: 'Hızlı Teslimat',    desc: '1-3 iş günü' },
  { Icon: Phone,      label: 'Kapıda Ödeme',       desc: 'Teslimatta öde' },
  { Icon: Shield,     label: 'Güvenli Alışveriş',  desc: 'SSL şifreli' },
  { Icon: RotateCcw,  label: '30 Gün İade',        desc: 'Şartsız garanti' },
  { Icon: CreditCard, label: 'Taksit',             desc: 'Tüm kartlar' },
]

interface Props { compact?: boolean }

export default function TrustBadges({ compact = false }: Props) {
  if (compact) {
    return (
      <div className="flex flex-wrap gap-4">
        {BADGES.slice(0, 3).map(({ Icon, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <Icon size={13} className="text-allorea-500" />
            <span className="font-body text-2xs text-obsidian/55">{label}</span>
          </div>
        ))}
      </div>
    )
  }
  return (
    <div className="grid grid-cols-3 sm:grid-cols-5 gap-0 border border-mist/40">
      {BADGES.map(({ Icon, label, desc }) => (
        <div key={label} className="flex flex-col items-center text-center p-5 border-r border-mist/40 last:border-r-0">
          <Icon size={20} className="text-allorea-500 mb-3" />
          <p className="font-body text-xs font-medium text-obsidian">{label}</p>
          <p className="font-body text-2xs text-obsidian/40 mt-0.5">{desc}</p>
        </div>
      ))}
    </div>
  )
}
