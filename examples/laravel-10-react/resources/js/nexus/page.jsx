import React, { useEffect, useState } from 'react';

export default ({ laravext }) => {

    const [shouldCauseError, setShouldCauseError] = useState(false);

    if (shouldCauseError) {
        throw new Error('This is an error from button click');
    }

    return (<div>
        <button onClick={() => setShouldCauseError(true)}>
            Click me to cause an error
        </button>
    </div>)
}