'use client';

import { useState, useCallback, useEffect, useRef } from 'react';

interface UseSpeechRecognitionReturn {
  startListening: () => void;
  stopListening: () => void;
  transcript: string;
  isListening: boolean;
  isSupported: boolean;
  resetTranscript: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SpeechRecognitionInstance = any;

export function useSpeechRecognition(): UseSpeechRecognitionReturn {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionInstance>(null);

  useEffect(() => {
    const supported = typeof window !== 'undefined' &&
      ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);
    setIsSupported(supported);
  }, []);

  const startListening = useCallback(() => {
    if (!isSupported) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onresult = (event: { results: { transcript: string }[][] }) => {
      const result = event.results[event.results.length - 1];
      setTranscript(result[0].transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  }, [isSupported]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  }, []);

  const resetTranscript = useCallback(() => {
    setTranscript('');
  }, []);

  return { startListening, stopListening, transcript, isListening, isSupported, resetTranscript };
}

// テキスト一致率を計算
export function calculateAccuracy(original: string, spoken: string): number {
  const originalWords = original.toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/).filter(Boolean);
  const spokenWords = spoken.toLowerCase().replace(/[^a-z\s]/g, '').split(/\s+/).filter(Boolean);

  if (originalWords.length === 0) return 0;

  let matches = 0;
  for (const word of originalWords) {
    if (spokenWords.includes(word)) {
      matches++;
    }
  }

  return Math.round((matches / originalWords.length) * 100);
}
