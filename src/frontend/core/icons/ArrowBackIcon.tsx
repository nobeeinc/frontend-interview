import type { SvgIconProps } from '@frontend/types/svg-icon'

export const ArrowBackIcon = ({ className }: SvgIconProps) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      stroke="currentColor"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.375 5.25L8.625 12L15.375 18.75"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
