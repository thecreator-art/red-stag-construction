// Native <details> accordion: works with no JavaScript. Questions in one
// category share a `name`, so opening one closes the others. The optional
// search box is filtered by src/scripts/site.ts ([data-faq]).

interface FAQQuestion {
  question: string;
  answer: string;
}

interface FAQCategory {
  categoryTitle: string;
  questions: FAQQuestion[];
}

interface FAQAccordionProps {
  categories: FAQCategory[];
  showSearch?: boolean;
  darkMode?: boolean;
}

const slugify = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'general';

export const FAQAccordion = ({ categories, showSearch = true, darkMode = false }: FAQAccordionProps) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: categories.flatMap((category) =>
      category.questions.map((question) => ({
        '@type': 'Question',
        name: question.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: question.answer,
        },
      }))
    ),
  };

  const frame = darkMode ? 'border border-white/10 bg-white' : 'border border-gray-200 bg-white';

  return (
    <div data-faq>
      {showSearch ? (
        <div className="relative z-10 mb-10">
          <label htmlFor="faq-search" className={`mb-3 block font-sans text-xs font-bold uppercase tracking-[0.2em] ${darkMode ? 'text-white' : 'text-navy-deep'}`}>
            Search Questions
          </label>
          <input
            id="faq-search"
            type="search"
            data-faq-search
            placeholder="Search permits, timelines, ADUs, costs, HOA requirements..."
            autoComplete="off"
            className={`w-full px-5 py-4 font-sans text-base outline-none transition-colors focus:border-accent-red focus:ring-2 focus:ring-accent-red/20 ${
              darkMode ? 'border border-white/15 bg-white text-text-body' : 'border border-gray-300 bg-white text-text-body'
            }`}
          />
        </div>
      ) : null}

      <div>
        {categories.map((category) => (
          <section key={category.categoryTitle} data-faq-category className="mb-12 last:mb-0">
            {category.categoryTitle ? (
              <>
                <h3 className={`font-sans text-2xl font-bold ${darkMode ? 'text-white' : 'text-navy-deep'}`}>{category.categoryTitle}</h3>
                <div className="mb-6 mt-2 h-0.5 w-16 bg-accent-red" />
              </>
            ) : null}

            <div className="space-y-4">
              {category.questions.map((question) => (
                <details
                  key={`${category.categoryTitle}-${question.question}`}
                  name={`faq-${slugify(category.categoryTitle)}`}
                  data-faq-item
                  className={`group/faq transition-shadow duration-300 open:shadow-md ${frame}`}
                >
                  <summary className="flex min-h-11 w-full cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-left [&::-webkit-details-marker]:hidden">
                    <span className="font-sans text-lg font-semibold text-navy-deep">{question.question}</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="h-5 w-5 shrink-0 text-accent-red transition-transform duration-300 group-open/faq:rotate-180"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m6 9 6 6 6-6" />
                    </svg>
                  </summary>
                  <div className="border-l-[3px] border-accent-red px-6 py-4 font-sans text-base leading-7 text-text-body">
                    {question.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>
        ))}

        <div
          data-faq-empty
          hidden
          className={`px-6 py-12 text-center font-sans text-base ${
            darkMode ? 'border border-dashed border-white/20 bg-white text-text-body' : 'border border-dashed border-gray-300 bg-white text-text-body'
          }`}
        >
          No FAQ entries match your search. Try a city name, permit question, or service type.
        </div>
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </div>
  );
};
