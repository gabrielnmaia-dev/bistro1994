import config from "../config";

/* Fonte única da verdade: os horários vêm de src/config.js */
const HOURS_CONFIG = config.hours;

const DAY_LABELS = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

const DAY_SHORT = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];

function toMinutes(time) {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + (m || 0);
}

export function formatHour(time) {
  const [h, m] = time.split(":").map(Number);
  return m ? `${h}h${String(m).padStart(2, "0")}` : `${String(h).padStart(2, "0")}h`;
}

/**
 * Próxima abertura a partir de agora (texto curto para o usuário):
 * "Abre hoje às 18h", "Abre amanhã às 18h", "Abre terça às 18h".
 */
function getNextOpeningLabel(day, minutes, openMinutes) {
  const openAt = formatHour(HOURS_CONFIG.openTime);

  if (HOURS_CONFIG.openDays.includes(day) && minutes < openMinutes) {
    return `Abre hoje às ${openAt}`;
  }

  for (let offset = 1; offset <= 7; offset++) {
    const next = (day + offset) % 7;
    if (HOURS_CONFIG.openDays.includes(next)) {
      return offset === 1
        ? `Abre amanhã às ${openAt}`
        : `Abre ${DAY_SHORT[next]} às ${openAt}`;
    }
  }
  return "";
}

/**
 * Retorna o estado de funcionamento no fuso do restaurante:
 * { isOpen, day, dayLabel, statusLabel, detailLabel, openTime, closeTime, ... }
 */
export function getBusinessHours() {
  const now = new Date(
    new Date().toLocaleString("en-US", { timeZone: HOURS_CONFIG.timezone })
  );
  const day = now.getDay();
  const minutes = now.getHours() * 60 + now.getMinutes();
  const openMinutes = toMinutes(HOURS_CONFIG.openTime);
  const closeMinutes = toMinutes(HOURS_CONFIG.closeTime);
  const isOpen =
    HOURS_CONFIG.openDays.includes(day) &&
    minutes >= openMinutes &&
    minutes < closeMinutes;

  return {
    isOpen,
    day,
    dayLabel: DAY_LABELS[day],
    statusLabel: isOpen ? "Aberto agora" : "Fechado agora",
    detailLabel: isOpen
      ? `até ${formatHour(HOURS_CONFIG.closeTime)}`
      : getNextOpeningLabel(day, minutes, openMinutes),
    openTime: HOURS_CONFIG.openTime,
    closeTime: HOURS_CONFIG.closeTime,
    nowMinutes: minutes,
    openMinutes,
    closeMinutes,
    openDays: HOURS_CONFIG.openDays,
  };
}

export function getTodayLabel() {
  return getBusinessHours().dayLabel;
}

export { DAY_LABELS, HOURS_CONFIG };
