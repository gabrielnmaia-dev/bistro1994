const HOURS_CONFIG = {
  openDays: [0, 2, 3, 4, 5, 6], // JS getDay: 0=Dom, 1=Seg( fechado ), 2=Ter ... 6=Sab
  closedDayLabel: "Segunda-feira",
  openLabel: "Aberto",
  closedLabel: "Fechado",
  openTime: "18:00",
  closeTime: "22:00",
  timezone: "America/Sao_Paulo",
};

const DAY_LABELS = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

function toMinutes(time) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + (m || 0);
}

/**
 * Retorna { isOpen, dayLabel, openTime, closeTime, nowMinutes }
 * baseado no fuso informado no config.
 */
export function getBusinessHours() {
  const now = new Date(
    new Date().toLocaleString("en-US", { timeZone: HOURS_CONFIG.timezone })
  );
  const day = now.getDay();
  const minutes = now.getHours() * 60 + now.getHours() * 0 + now.getMinutes();
  const openMinutes = toMinutes(HOURS_CONFIG.openTime);
  const closeMinutes = toMinutes(HOURS_CONFIG.closeTime);
  const isOpen = HOURS_CONFIG.openDays.includes(day) && minutes >= openMinutes && minutes < closeMinutes;

  return {
    isOpen,
    dayLabel: DAY_LABELS[day],
    openTime: HOURS_CONFIG.openTime,
    closeTime: HOURS_CONFIG.closeTime,
    nowMinutes: minutes,
    openMinutes,
    closeMinutes,
    openDays: HOURS_CONFIG.openDays,
  };
}

export function formatHour(time) {
  const [h] = time.split(":").map(Number);
  return `${String(h).padStart(2, "0")}h`;
}

export function getTodayLabel() {
  const now = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Sao_Paulo" }));
  return DAY_LABELS[now.getDay()];
}

export { DAY_LABELS, HOURS_CONFIG };
