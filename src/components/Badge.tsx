import './component.css'

interface BadgeProps {
  text: string
}

export default function Badge({ text }: BadgeProps) {
  return (
    <div className='badge'>{text}</div>
  )
}
