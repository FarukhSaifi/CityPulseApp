import { CONFIG } from "../bridge/config";

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
  };
};

const buildQuery = (params) => {
  const sp = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && String(v).trim() !== "") {
      sp.append(k, String(v));
    }
  });
  return sp.toString();
};

export const searchEvents = async (keyword = "", city = "") => {
  const qs = buildQuery({
    apikey: CONFIG.TM_KEY,
    keyword: keyword || undefined,
    city: city || undefined,
    size: 50,
    sort: "date,asc",
    countryCode: undefined, // optionally limit like 'US'
  });
  const url = `${CONFIG.TM_BASE}/events.json?${qs}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Ticketmaster error: ${res.status}`);
  }
  const data = await res.json();
  const events = data?._embedded?.events || [];
  return events.map(mapTmEventToApp);
};

export const getEventById = async (id) => {
  const url = `${CONFIG.TM_BASE}/events/${encodeURIComponent(id)}.json?apikey=${
    CONFIG.TM_KEY
  }`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Ticketmaster error: ${res.status}`);
  }
  const data = await res.json();
  return mapTmEventToApp(data);
};

export const getEventsByCity = async (city) => {
  return searchEvents("", city);
};
