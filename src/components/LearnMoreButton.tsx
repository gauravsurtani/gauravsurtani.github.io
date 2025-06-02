'use client'

import Link from 'next/link'

interface LearnMoreButtonProps {
  path: string
}

const LearnMoreButton = ({ path }: LearnMoreButtonProps) => {
  return (
    <Link
      href={path}
      className="learn-more-button learn-more-button-default learn-more-button-hover"
    >
      <span className="learn-more-text">Learn More</span>
      <svg
        className="learn-more-icon"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </Link>
  )
}

export default LearnMoreButton 