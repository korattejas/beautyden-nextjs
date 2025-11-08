// Convert a duration (like "90 min" or 90) into a readable label like "1 hr 30 min"
export function formatDuration(durationInput: string | number): string {
  if (durationInput === null || durationInput === undefined) return "";
  const raw = typeof durationInput === "number" ? String(durationInput) : String(durationInput);
  const minutesParsed = parseInt(raw, 10);
  if (Number.isNaN(minutesParsed)) {
    return typeof durationInput === "string" ? durationInput : "";
  }

  const totalMinutes = Math.max(0, minutesParsed);
  if (totalMinutes < 60) {
    return `${totalMinutes} min`;
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (minutes === 0) {
    return `${hours} hr`;
  }
  return `${hours} hr ${minutes} min`;
}

// Parse flexible duration strings into minutes. Supports formats like:
// "90", "90 min", "1 hr", "1 hr 30 min", "2 hours", "2h 15m"
export function parseDurationToMinutes(input: string | number | undefined | null): number {
  if (input === null || input === undefined) return 0;
  if (typeof input === "number") return Math.max(0, Math.floor(input));
  const s = String(input).trim().toLowerCase();
  if (s === "") return 0;

  // Try hour/minute patterns
  const hoursMatch = s.match(/(\d+)\s*(h|hr|hrs|hour|hours)/i);
  const minutesMatch = s.match(/(\d+)\s*(m|min|mins|minute|minutes)/i);

  let total = 0;
  if (hoursMatch) {
    total += parseInt(hoursMatch[1], 10) * 60;
  }
  if (minutesMatch) {
    total += parseInt(minutesMatch[1], 10);
  }

  if (total > 0) return total;

  // Fallback: first number is minutes
  const firstNumber = s.match(/(\d+)/);
  if (firstNumber) return parseInt(firstNumber[1], 10);
  return 0;
}


