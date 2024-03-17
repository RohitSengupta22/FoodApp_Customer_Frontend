import React, { useEffect, useState } from 'react';

const Footer = () => {
    const [showFooter, setShowFooter] = useState(false);

    useEffect(() => {
        function handleScroll() {
            // Check if the user has scrolled to the bottom of the page
            const isBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;

            // Update the state to show/hide the footer accordingly
            setShowFooter(isBottom);
        }

        // Attach the scroll event listener
        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener on unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <footer style={{ position: 'fixed',color: 'white', bottom: showFooter ? 0 : '-100px', left: 0, right: 0, backgroundColor: '#001a1a', padding: '20px', textAlign: 'center', transition: 'bottom 0.3s ease-in-out',marginTop: '20px' }}>
            @Food Shop All Rights Reserved.
        </footer>
    );
};

export default Footer;
