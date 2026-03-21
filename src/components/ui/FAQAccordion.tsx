'use client';

import { useMemo, useState } from 'react';

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
}

export const FAQAccordion = ({ categories }: FAQAccordionProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openIndexes, setOpenIndexes] = useState<Record<string, number | null>>({});

  const filteredCategories = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) {
      return categories;
    }

    return categories
      .map((category) => ({
        ...category,
        questions: category.questions.filter(
          (question) =>
            question.question.toLowerCase().includes(query) ||
            question.answer.toLowerCase().includes(query)
        ),
      }))
      .filter((category) => category.questions.length > 0);
  }, [categories, searchTerm]);

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

  const toggleQuestion = (categoryTitle: string, index: number) => {
    setOpenIndexes((current) => ({
      ...current,
      [categoryTitle]: current[categoryTitle] === index ? null : index,
    }));
  };

  return (
    <>
      <div className="mb-10">
        <label htmlFor="faq-search" className="mb-3 block font-sans text-xs font-bold uppercase tracking-[0.2em] text-navy-deep">
          Search Questions
        </label>
        <input
          id="faq-search"
          type="search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search permits, timelines, ADUs, costs, HOA requirements..."
          className="w-full border border-gray-300 bg-white px-5 py-4 font-sans text-sm text-text-body outline-none transition-colors focus:border-accent-red"
        />
      </div>

      <div>
        {filteredCategories.map((category) => (
          <section key={category.categoryTitle} className="mb-12 last:mb-0">
            <h3 className="font-sans text-2xl font-bold text-navy-deep">{category.categoryTitle}</h3>
            <div className="mb-6 mt-2 h-0.5 w-16 bg-accent-red" />

            <div className="space-y-4">
              {category.questions.map((question, index) => {
                const isOpen = openIndexes[category.categoryTitle] === index;

                return (
                  <div
                    key={`${category.categoryTitle}-${question.question}`}
                    className={`border border-gray-200 bg-white transition-shadow duration-300 ${
                      isOpen ? 'shadow-md' : ''
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleQuestion(category.categoryTitle, index)}
                      className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                      aria-expanded={isOpen}
                    >
                      <span className="font-sans text-lg font-semibold text-navy-deep cursor-pointer">
                        {question.question}
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        className={`h-5 w-5 shrink-0 text-accent-red transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m6 9 6 6 6-6" />
                      </svg>
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isOpen ? 'max-h-[1200px]' : 'max-h-0'
                      }`}
                    >
                      <div className="border-l-[3px] border-accent-red px-6 py-4 font-sans text-base leading-7 text-text-body">
                        {question.answer}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        {filteredCategories.length === 0 && (
          <div className="border border-dashed border-gray-300 bg-white px-6 py-12 text-center font-sans text-base text-text-body">
            No FAQ entries match your search. Try a city name, permit question, or service type.
          </div>
        )}
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
};
