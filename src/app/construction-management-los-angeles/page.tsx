import type { Metadata } from 'next';
import { ProServicePage } from '@/components/sections/ProServicePage';
import { constructionManagement as service } from '@/data/proServices';

export const metadata: Metadata = {
  title: service.metaTitle,
  description: service.metaDescription,
  alternates: { canonical: `https://redstagcc.com/${service.slug}` },
  openGraph: {
    title: service.metaTitle,
    description: service.metaDescription,
    url: `https://redstagcc.com/${service.slug}`,
  },
};

export default function Page() {
  return <ProServicePage service={service} />;
}
