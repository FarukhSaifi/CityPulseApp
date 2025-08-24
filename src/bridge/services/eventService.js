// Event service for handling event-related operations
import { API_CONFIG } from "../config/apiConfig";
import { storage } from "../storage";

// Map Ticketmaster event to app format
const mapTmEventToApp = (tmEvent) => {
  const name = tmEvent?.name || "";
  const image = tmEvent?.images?.[0]?.url || "";
  const id = tmEvent?.id || String(Math.random());
  const date =
    tmEvent?.dates?.start?.localDate || tmEvent?.dates?.start?.dateTime || "";
  const time = tmEvent?.dates?.start?.localTime || "";
  const venue = tmEvent?._embedded?.venues?.[0]?.name || "";
  const city = tmEvent?._embedded?.venues?.[0]?.city?.name || "";
  const latitudeStr = tmEvent?._embedded?.venues?.[0]?.location?.latitude;
  const longitudeStr = tmEvent?._embedded?.venues?.[0]?.location?.longitude;
  const latitude = latitudeStr != null ? Number(latitudeStr) : undefined;
  const longitude = longitudeStr != null ? Number(longitudeStr) : undefined;
  const priceRange = tmEvent?.priceRanges?.[0];
  const price = priceRange
    ? `${priceRange.min ?? ""}-${priceRange.max ?? ""} ${
        priceRange.currency ?? ""
      }`
    : "";
  const description = tmEvent?.info || tmEvent?.pleaseNote || name;
  const segment = tmEvent?.classifications?.[0]?.segment?.name || "";
  const genre = tmEvent?.classifications?.[0]?.genre?.name || "";
  const category = genre || segment || "";
  const url = tmEvent?.url || "";
  const ticketLimit = tmEvent?.ticketLimit || null;
  const seatMap = tmEvent?.seatmap?.staticUrl || "";
  const address = tmEvent?._embedded?.venues?.[0]?.address?.line1 || "";
  const postalCode = tmEvent?._embedded?.venues?.[0]?.postalCode || "";
  const country = tmEvent?._embedded?.venues?.[0]?.country?.name || "";

  return {
    id,
    name,
    date,
    time,
    venue,
    city,
    latitude,
    longitude,
    price,
    description,
    image,
    category,
    url,
    ticketLimit,
    seatMap,
    address,
    postalCode,
    country,
  };
};

// Build query string from parameters
const buildQuery = (params) => {
  const sp = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && String(v).trim() !== "") {
      sp.append(k, String(v));
    }
  });
  return sp.toString();
};

class EventService {
  constructor() {
    this.cache = new Map();
    this.cacheDuration = 5 * 60 * 1000; // 5 minutes cache
  }

  // Search events with caching and error handling
  async searchEvents(keyword = "", city = "", page = 0) {
    try {
      // Check cache first (only for first page)
      const cacheKey = `search_${keyword}_${city}_${page}`;
      if (page === 0) {
        const cached = this.getFromCache(cacheKey);
        if (cached) {
          return { success: true, data: cached, fromCache: true };
        }
      }

      // Validate API key
      if (
        !API_CONFIG.TM_KEY ||
        API_CONFIG.TM_KEY === "YOUR_TICKETMASTER_API_KEY_HERE"
      ) {
        throw new Error(
          "Ticketmaster API key not configured. Please add your API key to src/bridge/config/apiConfig.js"
        );
      }

      // Build search parameters
      const qs = buildQuery({
        apikey: API_CONFIG.TM_KEY,
        keyword: keyword || undefined,
        city: city || undefined,
        size: 20, // Reduced from 50 to 20 for better pagination
        page: page,
        sort: "date,asc",
        countryCode: undefined, // optionally limit like 'US'
      });

      const url = `${API_CONFIG.TM_BASE}/events.json?${qs}`;

      // Fetch with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      let response;
      try {
        response = await fetch(url, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          signal: controller.signal,
        });
      } finally {
        clearTimeout(timeoutId);
      }

      if (!response.ok) {
        const errorMsg = await this.parseErrorResponse(response);
        throw new Error(errorMsg);
      }

      const data = await response.json();
      const events = data?._embedded?.events || [];
      const processedEvents = events.map(mapTmEventToApp);

      // Cache results (only for first page)
      if (page === 0) {
        this.setCache(cacheKey, processedEvents);
        await this.saveSearchHistory(keyword, city);
      }

      return {
        success: true,
        data: processedEvents,
        hasMore: processedEvents.length === 20, // Assuming 20 is the page size
        totalResults: data?.page?.totalElements || 0,
      };
    } catch (error) {
      console.error("Event search error:", error);
      return {
        success: false,
        error: error.message || "Network error occurred",
        type: this.getErrorType(error),
      };
    }
  }

  // Get event by ID
  async getEventById(id) {
    try {
      // Check cache first
      const cacheKey = `event_${id}`;
      const cached = this.getFromCache(cacheKey);
      if (cached) {
        return { success: true, data: cached, fromCache: true };
      }

      // Validate API key
      if (
        !API_CONFIG.TM_KEY ||
        API_CONFIG.TM_KEY === "YOUR_TICKETMASTER_API_KEY_HERE"
      ) {
        throw new Error(
          "Ticketmaster API key not configured. Please add your API key to src/bridge/config/apiConfig.js"
        );
      }

      const url = `${API_CONFIG.TM_BASE}/events/${encodeURIComponent(
        id
      )}.json?apikey=${API_CONFIG.TM_KEY}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorMsg = await this.parseErrorResponse(response);
        throw new Error(errorMsg);
      }

      const data = await response.json();
      const event = mapTmEventToApp(data);

      if (event) {
        this.setCache(cacheKey, event);
      }

      return { success: true, data: event };
    } catch (error) {
      console.error("Event details error:", error);
      return {
        success: false,
        error: error.message || "Network error occurred",
        type: "network",
      };
    }
  }

  // Get events by city
  async getEventsByCity(city, page = 0) {
    return this.searchEvents("", city, page);
  }

  // Get event details with additional information
  async getEventDetails(eventId) {
    try {
      // Check cache first
      const cacheKey = `event_details_${eventId}`;
      const cached = this.getFromCache(cacheKey);
      if (cached) {
        return { success: true, data: cached, fromCache: true };
      }

      // Validate API key
      if (
        !API_CONFIG.TM_KEY ||
        API_CONFIG.TM_KEY === "YOUR_TICKETMASTER_API_KEY_HERE"
      ) {
        throw new Error(
          "Ticketmaster API key not configured. Please add your API key to src/bridge/config/apiConfig.js"
        );
      }

      const url = `${API_CONFIG.TM_BASE}/events/${eventId}.json?apikey=${API_CONFIG.TM_KEY}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorMsg = await this.parseErrorResponse(response);
        throw new Error(errorMsg);
      }

      const data = await response.json();
      const event = this.processEventDetails(data);

      if (event) {
        this.setCache(cacheKey, event);
      }

      return { success: true, data: event };
    } catch (error) {
      console.error("Event details error:", error);
      return {
        success: false,
        error: error.message || "Network error occurred",
        type: "network",
      };
    }
  }

  // Process event details with additional information
  processEventDetails(apiResponse) {
    try {
      const event = apiResponse;
      return {
        id: event.id,
        name: event.name,
        date: event.dates?.start?.localDate || "TBD",
        time: event.dates?.start?.localTime || "TBD",
        venue: event._embedded?.venues?.[0]?.name || "Venue TBD",
        city: event._embedded?.venues?.[0]?.city?.name || "City TBD",
        category: event.classifications?.[0]?.segment?.name || "Other",
        price: event.priceRanges?.[0]?.min || "Free",
        image: event.images?.[0]?.url || "https://via.placeholder.com/300x200",
        description: event.info || "No description available",
        url: event.url || null,
        // Additional details for event details screen
        address: event._embedded?.venues?.[0]?.address || null,
        postalCode: event._embedded?.venues?.[0]?.postalCode || null,
        country: event._embedded?.venues?.[0]?.country?.name || null,
        priceRange: event.priceRanges || null,
        seatMap: event.seatmap?.staticUrl || null,
        ticketLimit: event.ticketLimit || null,
        latitude: event._embedded?.venues?.[0]?.location?.latitude,
        longitude: event._embedded?.venues?.[0]?.location?.longitude,
      };
    } catch (error) {
      console.error("Event processing error:", error);
      return null;
    }
  }

  // Parse error response from API
  async parseErrorResponse(response) {
    try {
      const errorData = await response.json();
      if (errorData && errorData.errors && errorData.errors.length > 0) {
        return errorData.errors.map((e) => e.detail || e.title).join("; ");
      }
    } catch (_) {}
    return `HTTP ${response.status}: ${response.statusText}`;
  }

  // Get error type for better error handling
  getErrorType(error) {
    if (error.name === "AbortError") return "timeout";
    if (error.message.includes("API key")) return "configuration";
    if (error.message.includes("Rate limit")) return "rate_limit";
    return "network";
  }

  // Cache management
  getFromCache(key) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheDuration) {
      return cached.data;
    }
    this.cache.delete(key);
    return null;
  }

  setCache(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
    });
  }

  clearCache() {
    this.cache.clear();
  }

  // Search history management
  async saveSearchHistory(keyword, city) {
    try {
      const history = await this.getSearchHistory();
      const newSearch = { keyword, city, timestamp: Date.now() };

      // Remove duplicates and keep only recent searches
      const filtered = history.filter(
        (search) => !(search.keyword === keyword && search.city === city)
      );

      const updated = [newSearch, ...filtered].slice(0, 10);
      await storage.set("search_history", updated);
    } catch (error) {
      console.error("Failed to save search history:", error);
    }
  }

  async getSearchHistory() {
    try {
      return await storage.get("search_history", []);
    } catch (error) {
      console.error("Failed to get search history:", error);
      return [];
    }
  }

  async clearSearchHistory() {
    try {
      await storage.remove("search_history");
    } catch (error) {
      console.error("Failed to clear search history:", error);
    }
  }
}

// Export singleton instance
export const eventService = new EventService();
export default eventService;
