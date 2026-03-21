import Link from 'next/link';
import blogsData from '@/data/blogs.json';

interface BlogCard {
  slug: string;
  title: string;
  keyword?: string;
  locationSlug?: string;
}

export const metadata = {
  title: 'Construction Insights & Updates | Red Stag Construction',
  description: 'Expert advice, timelines, and guides on custom homes, ADUs, and high-end remodeling across Los Angeles.',
};

export default function BlogIndex() {
  const blogs = blogsData as BlogCard[];

  return (
    <div className="bg-warm-white py-24 min-h-screen">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-text-dark mb-6 leading-tight">Construction Insights & Updates</h1>
          <div className="w-24 h-1.5 bg-accent-red mx-auto shadow-md"></div>
          <p className="text-xl text-text-body mt-8 max-w-2xl mx-auto font-serif">Deep-dive technical guides, permit breakdowns, and high-end design strategies straight from our prime contractors.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs.map((blog) => (
            <Link key={blog.slug} href={`/${blog.slug}`} className="bg-white p-8 rounded-sm shadow-xl border border-gray-100 hover:-translate-y-2 hover:shadow-2xl hover:border-accent-red transition-all duration-300 flex flex-col h-full group">
              <h2 className="text-2xl font-serif font-bold text-[#111] group-hover:text-accent-red transition-colors line-clamp-3 mb-6 leading-snug">{blog.title}</h2>
              <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                <span className="text-[10px] font-bold uppercase tracking-widest text-accent-red border border-accent-red/20 bg-accent-red/5 px-3 py-1.5 rounded-sm whitespace-nowrap">{(blog.keyword || 'Insight')}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#111] border border-gray-200 bg-gray-50 px-3 py-1.5 rounded-sm whitespace-nowrap">{(blog.locationSlug || '').replace('general-contractor-', '').replace(/-/g, ' ')}</span>
              </div>
              <span className="text-text-dark font-bold text-sm uppercase tracking-widest group-hover:translate-x-2 transition-transform duration-300 flex items-center">
                Read Article
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4 ml-2 text-accent-red">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
