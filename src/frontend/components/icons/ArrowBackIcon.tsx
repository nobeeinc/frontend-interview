import type { SvgIconProps } from '@frontend/types/svg-icon'
export const ArrowBackIcon = ({ className }: SvgIconProps) => {
  return (
    <svg
      width="20"
      height="16"
      viewBox="0 0 20 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="currentColor"
      className={className}
    >
      <path
        d="M7.66602 1L0.80002 8L7.66602 15"
        stroke="#161616"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="0.6"
        y1="-0.6"
        x2="17.5262"
        y2="-0.6"
        transform="matrix(1 0 0 -1 1.07373 7.40039)"
        stroke="#161616"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  )
}
