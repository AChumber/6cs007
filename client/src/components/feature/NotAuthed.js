//Modal pop-up to show the user they are not logged in and must be logged in to view content
import React from 'react'

function NotAuthed() {
    return (
        <div className="not-authed-modal">
            <p>You need to log in to continue</p>
        </div>
    )
}

export default NotAuthed;    
