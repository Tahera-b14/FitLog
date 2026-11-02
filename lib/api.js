const BASES = [
  "https://api.abcz.workers.dev/api/fitlog",
  "https://api.api-store.workers.dev/api/fitlog",
];

// Try the main API first and fall back to the alternative one.
async function fetchWithFallback(path = "") {
  let lastError;
  for (const base of BASES) {
    try {
      const res = await fetch(`${base}${path}`);
      if (res.ok) return await res.json();
      lastError = new Error(`Request failed with ${res.status}`);
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError;
}

export function getWorkouts() {
  return fetchWithFallback();
}

export function getWorkout(id) {
  return fetchWithFallback(`/${id}`);
}
