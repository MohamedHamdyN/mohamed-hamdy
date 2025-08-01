export function PuzzlePiece({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M19.439 7.85c-.049.322.059.648.289.878l1.568 1.568c.47.47.706 1.087.706 1.704s-.235 1.233-.706 1.704l-1.611 1.611a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925-.198-.526-.267-1.178-.492-1.492-.224-.314-.912-.369-1.37-.369-.459 0-1.147.055-1.371.369-.224.314-.294.966-.492 1.492-.166.445-.498.855-.968.925a.98.98 0 0 1-.837-.276L9.704 13.68c-.47-.47-.706-1.087-.706-1.704s.235-1.233.706-1.704l1.568-1.568a1.07 1.07 0 0 0 .29-.878c-.07-.47-.48-.802-.925-.968-.526-.198-1.178-.267-1.492-.492-.314-.224-.369-.912-.369-1.37 0-.459.055-1.147.369-1.371.224-.224.966-.294 1.492-.492.445-.166.855-.498.925-.968a.98.98 0 0 0-.276-.837L9.704 1.706C9.234 1.235 8.617 1 8 1s-1.233.235-1.704.706L4.685 3.317a.98.98 0 0 1-.837.276c-.47-.07-.802-.48-.968-.925-.198-.526-.267-1.178-.492-1.492-.224-.314-.912-.369-1.37-.369-.459 0-1.147.055-1.371.369" />
    </svg>
  )
}

export default {
  PuzzlePiece,
}
