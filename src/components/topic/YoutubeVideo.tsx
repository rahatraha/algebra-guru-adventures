
import React from 'react';

interface YoutubeVideoProps {
  videoId: string;
}

export const YoutubeVideo: React.FC<YoutubeVideoProps> = ({ videoId }) => {
  return (
    <div className="relative w-full pb-[56.25%] mb-4 overflow-hidden rounded-lg shadow-md">
      <iframe 
        src={`https://www.youtube.com/embed/${videoId}?hl=ru&cc_lang_pref=ru&cc_load_policy=1`}
        title="Видео"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full"
      ></iframe>
    </div>
  );
};
