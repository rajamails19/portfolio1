import { Link } from "@tanstack/react-router";

export function Logo() {
  return (
    <Link to="/" className="nav-logo" aria-label="Raja Kitchen - Home">
      <svg
        width="180"
        height="80"
        viewBox="0 0 180 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Leaf / herb icon above RAJA — like Moringa's leaf */}
        <g transform="translate(90, 2)">
          {/* Center stem */}
          <line x1="0" y1="18" x2="0" y2="6" stroke="#5C6B3A" strokeWidth="1.2" strokeLinecap="round"/>
          {/* Left big leaf */}
          <path d="M0 14 Q-7 8 -5 2 Q-1 7 0 14" fill="#5C6B3A"/>
          {/* Right big leaf */}
          <path d="M0 14 Q7 8 5 2 Q1 7 0 14" fill="#5C6B3A"/>
          {/* Left small leaf */}
          <path d="M0 10 Q-5 6 -4 1 Q-0.5 5 0 10" fill="#7A8F4E" opacity="0.7"/>
          {/* Right small leaf */}
          <path d="M0 10 Q5 6 4 1 Q0.5 5 0 10" fill="#7A8F4E" opacity="0.7"/>
          {/* Top leaf */}
          <path d="M0 6 Q-3 1 0 0 Q3 1 0 6" fill="#5C6B3A"/>
        </g>

        {/* RAJA — bold, gold, wide lettering like MORINGA */}
        <text
          x="90"
          y="42"
          textAnchor="middle"
          fontFamily="'Playfair Display', Georgia, serif"
          fontWeight="700"
          fontSize="30"
          letterSpacing="5"
          fill="#8B7A3A"
        >
          RAJA
        </text>

        {/* — Kitchen — with spatula icon, cursive style */}
        <text
          x="75"
          y="57"
          textAnchor="middle"
          fontFamily="'Playfair Display', Georgia, serif"
          fontStyle="italic"
          fontSize="15"
          letterSpacing="1"
          fill="#2C2C2A"
        >
          —Kitchen—
        </text>
        {/* Spatula icon after Kitchen */}
        <g transform="translate(128, 48)">
          <rect x="0" y="0" width="7" height="2" rx="1" fill="#2C2C2A"/>
          <rect x="2.5" y="2" width="2" height="7" rx="0.5" fill="#2C2C2A"/>
        </g>

        {/* Indian bar and restaurant — italic, small */}
        <text
          x="90"
          y="70"
          textAnchor="middle"
          fontFamily="'Playfair Display', Georgia, serif"
          fontStyle="italic"
          fontSize="10"
          letterSpacing="0.5"
          fill="#4A4A48"
        >
          Indian bar and restaurant
        </text>
      </svg>
    </Link>
  );
}
