// Centralized API configuration
// Note: Do not commit real secrets for production apps. Prefer environment vars.

const DEFAULTS = {
  TICKETMASTER_API_BASE: "https://app.ticketmaster.com/discovery/v2",
  // Fallback to the provided demo key if no env is set. Replace for production.
  TICKETMASTER_API_KEY:
    process.env.EXPO_PUBLIC_TICKETMASTER_API_KEY ||
    process.env.TICKETMASTER_API_KEY ||
    "wkYdkQM7vfPL9ygYyq5BgxaaRkIi2nuA",
};

export const CONFIG = {
  TM_BASE: DEFAULTS.TICKETMASTER_API_BASE,
  TM_KEY: DEFAULTS.TICKETMASTER_API_KEY,
};
