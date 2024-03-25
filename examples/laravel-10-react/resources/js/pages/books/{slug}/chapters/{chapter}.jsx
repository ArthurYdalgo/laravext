import { useState, useEffect } from 'react';
import axios from 'axios' 

export default ({ laravext }) => {
    const { chapter: chapter_id, slug } = laravext.route_params;


    const [chapter , setChapter] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const fetchChapter = async () => {
        const response = await axios.get(route('api.chapters.chapter.show', {chapter : chapter_id}));
        const data = response.data;

        setChapter(data);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchChapter();
    }, []);


    return (
        <>
        {isLoading && <div>Loading...</div>}
        {!isLoading && <div>
            <a href={route('books.slug', {slug})}>Return to book</a>
            <br/>
            <br/>
            <h2>Chapter "{chapter.title}"</h2>
            <br />
            <p>{chapter.content}</p>
        </div>}
        </>
    )
    
}