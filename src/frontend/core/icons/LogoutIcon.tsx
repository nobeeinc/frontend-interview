import type { SvgIconProps } from '@frontend/types/svg-icon'

export const LogoutIcon = ({ className }: SvgIconProps) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.8306 8.46815V6.69892C14.8306 6.22969 14.6442 5.77968 14.3124 5.44788C13.9806 5.11609 13.5306 4.92969 13.0613 4.92969H4.56904C4.09981 4.92969 3.6498 5.11609 3.318 5.44788C2.98621 5.77968 2.7998 6.22969 2.7998 6.69892V17.3143C2.7998 17.7835 2.98621 18.2335 3.318 18.5653C3.6498 18.8971 4.09981 19.0835 4.56904 19.0835H13.0613C13.5306 19.0835 13.9806 18.8971 14.3124 18.5653C14.6442 18.2335 14.8306 17.7835 14.8306 17.3143V15.5451M17.6613 8.46815L21.1998 12.0066M21.1998 12.0066L17.6613 15.5451M21.1998 12.0066H9.1248"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
