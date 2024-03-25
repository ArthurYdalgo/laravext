import { useState, useEffect } from 'react';
import axios from 'axios';
import usePrivacy from '@/hooks/usePrivacy';

export default ({ laravext }) => {

    /**
     * Although strands and nexus are rendered in different roots, you can still use any state
     * management tool. In this case, we are using zustand to manage the state of the 
     * privacy toggle to hide the email of the user.
     * 
     * @see https://github.com/pmndrs/zustand 
     */
    const { active: privacyToggle } = usePrivacy();

    const { book } = laravext;
    const [bookComments, setBookComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchBookComments = async () => {
        const response = await axios.get(route('api.books.book.comments.index', { book: book.id }));
        const body = response.data;
        
        setBookComments(body.data);
        setIsLoading(false);
    }

    useEffect(() => {
        fetchBookComments();
    }, []);


    return (
        <>

            {!isLoading &&
                <div>
                    <h2>Comments</h2>
                    <ul>
                        {bookComments.map(comment => (
                            <li key={comment.id} >- {comment.user.name} ({privacyToggle ? '***@***.com' : comment.user.email}) {comment.content}</li>
                        ))}
                    </ul>
                </div>}

        </>
    )
}