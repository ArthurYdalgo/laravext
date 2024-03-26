import { useState, useEffect } from 'react';
import axios from 'axios';
import usePrivacy from '@/hooks/usePrivacy';
import Comments from '@/strands/Book/Comments';
import Chapters from '@/strands/Book/Chapters';
import Books from '@/strands/Author/Books';


export default ({ laravext }) => {

    const [book, setBook] = useState(laravext.nexus.props.book);
    const { active: privacyToggle } = usePrivacy();

    const fetchBook = async () => {
        const response = await axios.get(route('api.books.book.show', { slug: laravext.route_params.slug }));
        setBook(response.data);
    }


    useEffect(() => {
        if (!book) {
            fetchBook();
        }
    }, [])

    return (
        <>
            {!book && <h1>Loading</h1>}
            {
                book && <>
                    <a href={route('books')}>Return to books</a>
                    <br />
                    <br />
                    <h1>Title: {book.title}</h1>
                    <p>Autor: {book.author?.name ?? '--'} ({privacyToggle ? '***@***' : book.author?.email ?? '--'})</p>
                    <br />
                    <p>Description: {book.description}</p>
                    <br />
                    <Chapters laravext={{ book }} />
                    <br />
                    <Comments laravext={{ book }} />
                    <br />
                    <Books laravext={{ author: book.author }} />
                </>
            }

        </>
    )
}