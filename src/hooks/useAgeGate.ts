import { useState, useEffect, useCallback } from "react";

const AGE_KEY = "dickfon_age_verified";

const readVerified = (): boolean => {
  try {
    return localStorage.getItem(AGE_KEY) === "1";
  } catch {
    return false;
  }
};

export const useAgeGate = () => {
  const [ageVerified, setAgeVerified] = useState<boolean>(readVerified);

  const handleVerified = useCallback(() => {
    try {
      localStorage.setItem(AGE_KEY, "1");
    } catch {
      /* storage unavailable */
    }
    setAgeVerified(true);
  }, []);

  useEffect(() => {
    if (ageVerified) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [ageVerified]);

  return { ageVerified, handleVerified };
};
