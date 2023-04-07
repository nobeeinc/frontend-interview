import type { SvgIconProps } from '@frontend/types/svg-icon'

export const LogoutIcon = ({ className }: SvgIconProps) => {
  return (
    <svg 
      className={className}
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg">
      <path d="M14.8306 8.46864V6.69941C14.8306 6.23018 14.6442 5.78017 14.3124 5.44837C13.9806 5.11658 13.5306 4.93018 13.0613 4.93018H4.56904C4.09981 4.93018 3.6498 5.11658 3.318 5.44837C2.98621 5.78017 2.7998 6.23018 2.7998 6.69941V17.3148C2.7998 17.784 2.98621 18.234 3.318 18.5658C3.6498 18.8976 4.09981 19.084 4.56904 19.084H13.0613C13.5306 19.084 13.9806 18.8976 14.3124 18.5658C14.6442 18.234 14.8306 17.784 14.8306 17.3148V15.5456M17.6613 8.46864L21.1998 12.0071M21.1998 12.0071L17.6613 15.5456M21.1998 12.0071H9.1248" stroke="#161616" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
