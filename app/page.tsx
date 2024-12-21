'use client'

import React, { useEffect, useState } from 'react';
import GifGetter from '@/src/components/GifGetter';

export function displayGifs(gifLinks: string[] | null, onSelectGif: (gif: string) => void) {
  const container = document.getElementById('gif-container');
  if (!container) {
    console.error('Контейнер для GIF не найден');
    return;
  }
  container.innerHTML = '';

  if (gifLinks === null || gifLinks.length === 0) {
    container.innerHTML += '<p>Нет доступных GIF.</p>';
    return;
  }

  gifLinks.forEach((gif, index) => {
    const img = document.createElement('img');
    img.src = gif;
    img.alt = `GIF ${index}`;
    img.style.width = '235px';
    img.style.height = '235px';
    img.style.objectFit = 'cover';
    img.style.cursor = 'pointer';
    img.onclick = () => onSelectGif(gif);
    container.appendChild(img);
  });
}

export default function Home() {
  const [gifList, setGifList] = useState<string[] | null>(null);
  const [selectedGif, setSelectedGif] = useState<string | null>(null);
  const [showGifSelector, setShowGifSelector] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (inputValue.startsWith("/gif ")) {

        const response = await fetch(GifGetter(inputValue.slice(5)));
        const result = await response.json();
        const gifs = result.data;

        if (gifs.length > 0) {
          const GIFs = gifs.map((gif: any) => `https://i.giphy.com/${gif.id}.webp`);
          setGifList(GIFs);
          setShowGifSelector(true);
        } else {
          setGifList(null);
        }

      } else {
        setGifList(null);
      }
    };

    fetchData();
  }, [inputValue]);

  useEffect(() => {
    if (showGifSelector) {
      displayGifs(gifList, handleGifSelect);
    }
  }, [gifList, showGifSelector]);

  const handleGifSelect = (gif: string) => {
    setSelectedGif(gif);
    setShowGifSelector(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setInputValue(event.currentTarget.value);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', alignItems: 'center' }}>
      <div style={{ flex: 1, overflowY: 'auto', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {showGifSelector && (
          <div id="gif-container" style={{ maxHeight: '500px', overflowY: 'scroll', border: '1px solid #ccc', padding: '10px', backgroundColor: '#f9f9f9', width: '80%', position: 'absolute', bottom: '60px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}></div>
        )}
        {selectedGif && (
          <div style={{ marginBottom: '10px', textAlign: 'center' }}>
            <img src={selectedGif} alt="Выбранный GIF" style={{ maxWidth: '300px', marginBottom: '10px' }} />
          </div>
        )}
      </div>
      <div style={{ padding: '10px', position: 'relative', width: '80%' }}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyPress}
          placeholder="Введите команду..."
          style={{ width: '100%', padding: '10px', boxSizing: 'border-box', color: '#333', backgroundColor: '#fff', borderColor: '#ccc', borderWidth: '1px', borderStyle: 'solid' }} // Увеличен контраст шрифта
        />
      </div>
    </div>
  );
}