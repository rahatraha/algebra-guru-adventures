
import React from 'react';

interface YoutubeVideoProps {
  videoId: string;
}

export const YoutubeVideo: React.FC<YoutubeVideoProps> = ({ videoId }) => {
  return (
    <div className="aspect-w-16 aspect-h-9">
      <iframe 
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-[225px]"
      ></iframe>
    </div>
  );
};
