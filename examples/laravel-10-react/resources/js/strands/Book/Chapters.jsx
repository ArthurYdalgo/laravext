import { useState, useEffect } from 'react';
import axios from 'axios';

export default ({ laravext }) => {
    const { book } = laravext;
    const [bookChapters, setBookChapters] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchBookChapters = async () => {
        const response = await axios.get(route('api.books.book.chapters.index', { book: book.id }));
        const body = response.data;

        setBookChapters(body.data);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchBookChapters();
    }, []);

    return (
        <>

            {!isLoading &&
                <div>
                    <h2>Chapters</h2>
                    <ul>
                        {bookChapters.map(chapter => (
                            <li key={chapter.id}>- <a href={route('books.slug.chapters.chapter', {slug: book.slug, chapter : chapter.id})}>{chapter.title}</a></li>
                        ))}
                    </ul>
                </div>}

        </>
    )
}