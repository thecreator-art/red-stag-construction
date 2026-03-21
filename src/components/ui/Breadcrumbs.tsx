import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  crumbs: BreadcrumbItem[];
}

export const Breadcrumbs = ({ crumbs }: BreadcrumbsProps) => {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.label,
      item: `https://redstagcc.com${crumb.href}`,
    })),
  };

  return (
    <>
      <nav aria-label="Breadcrumb" className="font-sans text-xs">
        <ol className="flex flex-wrap items-center gap-y-2">
          {crumbs.map((crumb, index) => {
            const isCurrentPage = index === crumbs.length - 1;

            return (
              <li key={`${crumb.href}-${crumb.label}`} className="flex items-center">
                {isCurrentPage ? (
                  <span className="text-text-dark">{crumb.label}</span>
                ) : (
                  <Link href={crumb.href} className="text-gray-500 transition-colors hover:text-accent-red">
                    {crumb.label}
                  </Link>
                )}
                {!isCurrentPage && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="mx-2 h-3 w-3 text-accent-red"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.22 4.22a.75.75 0 0 1 1.06 0l5.25 5.25a.75.75 0 0 1 0 1.06l-5.25 5.25a.75.75 0 0 1-1.06-1.06L11.94 10 7.22 5.28a.75.75 0 0 1 0-1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
};
