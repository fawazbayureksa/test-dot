import React from 'react';

const Template = ({ children }) => {
    return (
        <>
            <header>
                <nav>
                    <span>Raja Ongkir</span>
                </nav>
            </header>
            <main id='main'>
                {children}
            </main>
        </>
    );
}

export default Template;
