export function StarIcon({ className }: { className: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 2000 2000"
    >
      <g>
        <g
          fill="hsl(50, 98%, 50%)"
          strokeWidth="30"
          stroke="hsl(0, 0%, 0%)"
          id="star"
        >
          <path
            d="M 500 500 C 1000 1000 1000 1000 1751.7482517482517 297.2027972027972 C 1000 1000 1000 1000 1500 1500 C 1000 1000 1000 1000 241.25873869782527 1709.7902294238963 C 1000 1000 1000 1000 500 500"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </g>
      </g>
    </svg>
  );
}
