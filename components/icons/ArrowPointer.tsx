export function ArrowPointer({ className }: { className: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 800 800"
    >
      <g
        strokeWidth="9"
        stroke="hsl(50, 98%, 50%)"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M203.4265308380127 194.5Q122.4265308380127 294.5 408.9265308380127 400Q343.4265308380127 478.5 614.4265308380127 605.5 "
          stroke="black"
          strokeWidth="20"
          marker-end="black"
        ></path>
        <path
          d="M203.4265308380127 194.5Q122.4265308380127 294.5 408.9265308380127 400Q343.4265308380127 478.5 614.4265308380127 605.5 "
          marker-end="url(#SvgjsMarker1192)"
        ></path>
      </g>
      <defs>
        <marker
          markerWidth="10"
          markerHeight="10"
          refX="5"
          refY="5"
          viewBox="0 0 10 10"
          orient="auto"
          id="SvgjsMarker1192"
        >
          <polyline
            points="0,5 5,2.5 0,0"
            fill="none"
            stroke-width="3"
            stroke="#000"
            stroke-linecap="round"
            transform="matrix(1,0,0,1,1.6666666666666667,2.5)"
            stroke-linejoin="round"
          ></polyline>
          <polyline
            points="0,5 5,2.5 0,0"
            fill="none"
            stroke-width="1.6666666666666667"
            stroke="hsl(50, 98%, 50%)"
            stroke-linecap="round"
            transform="matrix(1,0,0,1,1.6666666666666667,2.5)"
            stroke-linejoin="round"
          ></polyline>
        </marker>
      </defs>
    </svg>
  );
}
