import React, { createContext, useContext, useEffect, useState } from 'react';

type FontSize = 'normal' | 'large' | 'xlarge';

interface AccessibilityContextType {
  highContrast: boolean;
  fontSize: FontSize;
  voiceAssistant: boolean;
  toggleHighContrast: () => void;
  setFontSize: (size: FontSize) => void;
  toggleVoiceAssistant: () => void;
  speakText: (text: string) => void;
  stopSpeaking: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [highContrast, setHighContrast] = useState<boolean>(() => {
    return localStorage.getItem('dementia_high_contrast') === 'true';
  });

  const [fontSize, setFontSizeState] = useState<FontSize>(() => {
    return (localStorage.getItem('dementia_font_size') as FontSize) || 'normal';
  });

  const [voiceAssistant, setVoiceAssistant] = useState<boolean>(() => {
    return localStorage.getItem('dementia_voice_assistant') === 'true';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    localStorage.setItem('dementia_high_contrast', String(highContrast));
  }, [highContrast]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('font-scale-normal', 'font-scale-large', 'font-scale-xl');
    if (fontSize === 'normal') root.classList.add('font-scale-normal');
    if (fontSize === 'large') root.classList.add('font-scale-large');
    if (fontSize === 'xlarge') root.classList.add('font-scale-xl');
    localStorage.setItem('dementia_font_size', fontSize);
  }, [fontSize]);

  useEffect(() => {
    localStorage.setItem('dementia_voice_assistant', String(voiceAssistant));
  }, [voiceAssistant]);

  const toggleHighContrast = () => setHighContrast(prev => !prev);
  const setFontSize = (size: FontSize) => setFontSizeState(size);
  const toggleVoiceAssistant = () => {
    setVoiceAssistant(prev => {
      const next = !prev;
      if (next) {
        speakText("Voice assistance enabled. DEMENTIA will read out important content and button actions.");
      } else {
        stopSpeaking();
      }
      return next;
    });
  };

  const speakText = (text: string) => {
    if (!voiceAssistant) return;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9; // Slightly slower, clearer pacing for elderly comprehension
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  };

  return (
    <AccessibilityContext.Provider
      value={{
        highContrast,
        fontSize,
        voiceAssistant,
        toggleHighContrast,
        setFontSize,
        toggleVoiceAssistant,
        speakText,
        stopSpeaking,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
};

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
};
