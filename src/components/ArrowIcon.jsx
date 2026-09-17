export default function ArrowIcon({ className = "", strokeWidth = "2" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 10"
      className={className}
    >
      <line
        x1="5"
        y1="5"
        x2="20"
        y2="5"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="square"
      />
      <path
        d="M -2,-4 9,0 -2,4 c 2,-2.33 2,-5.66 0,-8 z"
        transform="translate(20, 5)"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
}
