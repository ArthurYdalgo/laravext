import { useState, useEffect } from 'react';
import axios from 'axios';
import usePrivacy from '@/hooks/usePrivacy';
import Comments from '@/strands/Book/Comments';
import Chapters from '@/strands/Book/Chapters';
import Books from '@/strands/Author/Books';


export default ({ laravext }) => {

    const { book } = laravext.nexus.props;
    const { active: privacyToggle } = usePrivacy();

    return (
        <>
            <a href={route('books')}>Return to books</a>
            <br/>
            <br/>
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
    )
}