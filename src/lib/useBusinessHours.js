import { useEffect, useState } from "react";
import { getBusinessHours } from "./hours";

/**
 * Estado de funcionamento compartilhado entre as seções.
 * Atualiza a cada minuto para o selo "Aberto/Fechado" não ficar desatualizado.
 */
export function useBusinessHours() {
  const [hours, setHours] = useState(() => getBusinessHours());

  useEffect(() => {
    const update = () => setHours(getBusinessHours());
    const interval = window.setInterval(update, 60_000);
    document.addEventListener("visibilitychange", update);
    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  return hours;
}

export default useBusinessHours;
