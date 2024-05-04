import React, { useEffect, useState } from 'react';
import { Head } from '@laravext/react';

export default ({ laravext }) => {

    const [shouldCauseError, setShouldCauseError] = useState(false);

    if (shouldCauseError) {
        throw new Error('This is an error from button click');
    }

    return (<div>
        <Head title="React Page" />
        <button onClick={() => setShouldCauseError(true)}>
            Click me to cause an error
        </button>
    </div>)
}