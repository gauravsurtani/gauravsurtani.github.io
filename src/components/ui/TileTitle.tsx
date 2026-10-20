// Title of a tile that links inside the site: the last word and the arrow (.arr, globals.css) never wrap apart.
// The arrow nudges 2px toward the page on tile hover (not while scrolling) and focus-within.
export default function TileTitle({ t }: { t: string }) {
  const i = t.lastIndexOf(' ') + 1
  return (
    <>
      {t.slice(0, i)}
      <span className="whitespace-nowrap">
        {t.slice(i)}
        <svg className="arr" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </>
  )
}
