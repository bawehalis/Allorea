import { cn } from '@/lib/utils'

interface Props { size?: 'sm'|'md'|'lg'; className?: string }

export default function LoadingSpinner({ size = 'md', className }: Props) {
  const sz = { sm:'w-4 h-4', md:'w-6 h-6', lg:'w-10 h-10' }[size]
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <div className={cn(sz, 'border-2 border-mist border-t-allorea-500 rounded-full animate-spin')} />
    </div>
  )
}
