type IconName =
  "bag" | "plus" | "minus" | "close" | "search" | "trash" | "whatsapp";

const paths: Record<IconName, React.ReactNode> = {
  bag: (
    <>
      <path d="M5 7h14l1 14H4L5 7Z" />
      <path d="M8 8V6a4 4 0 0 1 8 0v2" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m16 16 5 5" />
    </>
  ),
  trash: (
    <>
      <path d="M3 6h18M9 6V3h6v3M6 6l1 15h10l1-15M10 10v7M14 10v7" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.5L3 21l1.7-5.1A8.5 8.5 0 1 1 20.5 11.7Z" />
      <path d="m8 7 1.6 3-1 1c.8 1.7 1.8 2.7 3.5 3.5l1-1L16 15c-.5 2-2 2-3.5 1.5-3.5-1.3-6-4-6-7 0-1 .5-2 1.5-2.5Z" />
    </>
  ),
};

export function CatalogIcon({ name }: { name: IconName }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
