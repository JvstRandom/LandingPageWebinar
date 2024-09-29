import React from 'react';

function DisplayDescription({ description }) {
    // Check if description is defined
    if (!description) {
        return <p>No description available.</p>; // Or render null
    }

    return (
        <div>
            {/* Using dangerouslySetInnerHTML to render HTML content */}
            <p dangerouslySetInnerHTML={{ __html: description.replace(/\n/g, '<br>') }} />
        </div>
    );
}

export default DisplayDescription;
