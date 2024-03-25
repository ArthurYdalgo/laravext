import { useState, useEffect } from 'react';
import axios from 'axios';

export default ({ laravext }) => {
    const { author } = laravext;
    const [authorBooks, setAuthorBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchAuthorBooks = async () => {
        const response = await axios.get(route('api.authors.author.books.book.index', { author: author.id }));
        const body = response.data;

        setAuthorBooks(body.data);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchAuthorBooks();
    }, []);


    return (
        <>

            {!isLoading &&
                <div>
                    <h2>Books by {author.name}</h2>
                    <ul>
                        {authorBooks.map(book => (
                            <li key={book.id}>- <a href={route('books.display', {slug: book.slug})}>{book.title}</a></li>
                        ))}
                    </ul>
                </div>}

        </>
    )
}