"use client"

import { scrapeAndStoreProduct } from '@/lib/actions';
import { FormEvent, useState } from 'react'
import { Input } from './ui/input';
import { Button } from './ui/button';

const Searchbar = () => {
    const [searchPrompt, setSearchPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
        setIsLoading(true);

        // Scrape the product page
        const product = await scrapeAndStoreProduct(searchPrompt);
        } catch (error) {
        console.log(error);
        } finally {
        setIsLoading(false);
        }
    }

    return (
        <form 
            onSubmit={handleSubmit}
            className="flex gap-2 text-cyan-400"
        >
            <Input
                type="text"
                value={searchPrompt}
                onChange={(e) => setSearchPrompt(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 rounded-full px-4 py-2 text-slate-100 bg-primary/70 focus:outline-none focus:ring-2 focus:ring-primary-foreground focus:bg-primary/80"
            />
            <Button
                type="submit"
                className="rounded-full bg-primary-foreground px-6 py-2 text-primary font-medium transition-colors hover:bg-primary-foreground/90 focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={searchPrompt === ''}
            >
                {isLoading ? 'Searching...' : 'Search'}
            </Button>
        </form>
    )
}

export default Searchbar