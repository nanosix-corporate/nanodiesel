'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent } from 'react';

export default function SearchForm({ initialQuery }: { initialQuery: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const q = (data.get('q') as string)?.trim() || '';
    const params = new URLSearchParams(searchParams.toString());
    if (q) {
      params.set('q', q);
    } else {
      params.delete('q');
    }
    const qs = params.toString();
    router.push(`/news${qs ? `?${qs}` : ''}`);
  }

  return (
    <form onSubmit={handleSubmit} className="relative w-full md:w-72">
      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-olive-400 text-xl pointer-events-none">
        search
      </span>
      <input
        type="text"
        name="q"
        defaultValue={initialQuery}
        placeholder="Search articles, keyword..."
        className="w-full pl-10 pr-4 py-2.5 rounded-full border border-olive-200 bg-olive-50 text-sm text-brand-dark placeholder:text-olive-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/40 focus:border-emerald-400 transition-all"
      />
    </form>
  );
}
