"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
} from "react";

type MusicContextType = {
  isPlaying: boolean;
  playMusic: () => Promise<void>;
  pauseMusic: () => void;
  toggleMusic: () => void;
};

const MusicContext =
  createContext<MusicContextType | null>(null);

export function MusicProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const audioRef =
    useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] =
    useState(false);

  if (!audioRef.current && typeof window !== "undefined") {
    const audio = new Audio(
      "/audio/ganesh-song.mp3"
    );

    audio.loop = true;

    audio.volume = 0.5;

    audioRef.current = audio;
  }

  const playMusic = async () => {
    if (!audioRef.current) return;

    try {
      await audioRef.current.play();

      setIsPlaying(true);
    } catch (error) {
      console.error(error);
    }
  };

  const pauseMusic = () => {
    if (!audioRef.current) return;

    audioRef.current.pause();

    setIsPlaying(false);
  };

  const toggleMusic = () => {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  };

  return (
    <MusicContext.Provider
      value={{
        isPlaying,
        playMusic,
        pauseMusic,
        toggleMusic,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);

  if (!context) {
    throw new Error(
      "useMusic must be used inside MusicProvider"
    );
  }

  return context;
}