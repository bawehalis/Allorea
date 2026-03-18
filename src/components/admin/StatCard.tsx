import { ArrowUpRight, ArrowDownRight } from 'lucide-react'

interface Props {
  title:     string
  value:     string | number
  change?:   number
  icon:      React.ComponentType<{ size?: number; className?: string }>
  iconColor: string
  iconBg:    string
}

export default function StatCard({ title, value, change, icon: Icon, iconColor, iconBg }: Props) {
  const up = (change ?? 0) >= 0
  return (
    <div className="bg-white border border-slate-100 rounded-xl p-5 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <p className="text-xs font-medium text-slate-500 tracking-wider uppercase">{title}</p>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg}`}>
          <Icon size={17} className={iconColor} />
        </div>
      </div>
      <p className="text-2xl font-semibold text-slate-900">{value}</p>
      {change !== undefined && (
        <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${up ? 'text-green-600' : 'text-red-500'}`}>
          {up ? <ArrowUpRight size={13}/> : <ArrowDownRight size={13}/>}
          {Math.abs(change)}%
        </div>
      )}
    </div>
  )
}
