import React, { useState } from 'react';
import './automeme.css';

const Automeme = () => {
    const [memeText, setMemeText] = useState('');
    const [generatedMeme, setGeneratedMeme] = useState(null);
    const [isLoading, setLoading] = useState(false);

    const generateMeme = async () => {
        if (!memeText.trim()) {
            alert('Please enter some text for the meme.');
            return;
        }

        const url = 'https://api.imgflip.com/automeme';
        const username = 'tejashwa';  // Replace with your actual username
        const password = 'WhatAMeme@123';  // Replace with your actual password

        const requestBody = new FormData();
        requestBody.append('username', username);
        requestBody.append('password', password);
        requestBody.append('text', memeText);

        setLoading(true);
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: requestBody,
            });

            const responseData = await response.json();
            if (responseData.success) {
                setGeneratedMeme(responseData.data.url);
            } else {
                throw new Error('Failed to generate meme: ' + responseData.error_message);
            }
        } catch (error) {
            console.error('Error generating meme:', error);
            alert('Error generating meme: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="automeme-container">
            <h1>Automeme Generator</h1>
            <p className="description">
                Type the full content of your meme below, and GagGenius will magically pick the right meme template and position your text automatically. Utilize popular meme patterns or create your own phrasing!
            </p>
            <input
                type="text"
                value={memeText}
                onChange={(e) => setMemeText(e.target.value)}
                placeholder="Enter your meme text"
            />
            {generatedMeme && (
                <>
                    <img src={generatedMeme} alt="Generated Meme" />
                    <button onClick={generateMeme} disabled={isLoading}>
                        {isLoading ? 'Generating...' : 'Generate Another Meme'}
                    </button>
                </>
            )}
            {!generatedMeme && (
                <button onClick={generateMeme} disabled={isLoading}>
                    {isLoading ? 'Generating...' : 'Generate Meme'}
                </button>
            )}
            <div className="meme-examples">
                <h2>Popular Meme Patterns</h2>
                <table className="meme-patterns">
                    <thead>
                        <tr>
                            <th>Pattern</th>
                            <th>Example</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>one does not simply X</td><td>One does not simply walk into Mordor</td></tr>
                        <tr><td>i don't always X, but when I do Y</td><td>I don't always study, but when I do I panic</td></tr>
                        <tr><td>X, X everywhere</td><td>Pencils, pencils everywhere</td></tr>
                        <tr><td>not sure if X or Y</td><td>Not sure if genius or just lucky</td></tr>
                        <tr><td>X y u no Y</td><td>Brain y u no work during exam</td></tr>
                        <tr><td>y u no X</td><td>Y u no text back</td></tr>
                        <tr><td>brace yourself(ves) X</td><td>Brace yourselves winter is coming</td></tr>
                        <tr><td>X all the Y</td><td>Buy all the things</td></tr>
                        <tr><td>X that would be great</td><td>If you could just get me that report that would be great</td></tr>
                        <tr><td>X too damn Y</td><td>The rent is too damn high</td></tr>
                    
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Automeme;
