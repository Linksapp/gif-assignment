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
    <div className="flex flex-col h-screen items-center bg-white">
    <div className="flex-1 overflow-y-auto w-full flex justify-center items-center">
      {showGifSelector && (
        <div
          id="gif-container"
          className="max-h-[525px] overflow-y-scroll border border-gray-300 p-2 bg-white w-4/5 absolute bottom-16 flex flex-wrap gap-2 justify-center"
        ></div>
      )}
      {selectedGif && (
        <div className="mb-2 text-center">
          <img src={selectedGif} alt="Выбранный GIF" className="max-w-[300px] mb-2" />
        </div>
      )}
    </div>
    <div className="p-2 relative w-4/5 border-t border-light-gray bg-gray-200">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyPress}
        placeholder="Введите команду..."
        className="w-full p-2 box-border text-gray-800 bg-white border border-gray-300"
      />
      <span className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${inputValue.includes('/gif') ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white' : 'text-gray-800'}`}>
        {inputValue.includes('/gif') ? '/gif' : ''}
      </span>
    </div>
  </div>
  );
}