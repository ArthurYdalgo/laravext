import { useState, useEffect } from 'react';
import axios from 'axios';
import usePrivacy from '@/hooks/usePrivacy';

export default ({ laravext }) => {
    
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { active: privacyToggle } = usePrivacy();

    const fetchBooks = async () => {
        const response = await axios.get(route('api.books.index'));
        const body = response.data;

        setBooks(body.data);    
        setIsLoading(false);
    }

    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <>

            {!isLoading &&
                <div>
                    <h2>Books</h2>
                    <ul>
                        {books.map(book => (
                            <li key={book.id}>-#{book.id} <a href={route('books.slug', {slug: book.slug})}>"{book.title}"</a> from {book.author.name} ({
                                privacyToggle ? '***@***' : book.author.email
                            })</li>
                        ))}
                    </ul>
                </div>}

        </>
    )
}