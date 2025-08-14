import * as Localization from "expo-localization";
import { I18n } from "i18n-js";

const i18n = new I18n({
  en: {
    // Navigation
    home: "Home",
    profile: "Profile",
    events: "Events",
    favorites: "Favorites",

    // Home Screen
    searchEvents: "Search Events",
    searchPlaceholder: "Search for events...",
    cityPlaceholder: "Enter city name...",
    searchButton: "Search",
    noEventsFound: "No events found",
    loading: "Loading...",

    // Event Details
    eventDetails: "Event Details",
    date: "Date",
    time: "Time",
    venue: "Venue",
    price: "Price",
    description: "Description",
    addToFavorites: "Add to Favorites",
    removeFromFavorites: "Remove from Favorites",

    // Profile
    userProfile: "User Profile",
    language: "Language",
    english: "English",
    arabic: "Arabic",
    theme: "Theme",
    light: "Light",
    dark: "Dark",

    // Common
    save: "Save",
    cancel: "Cancel",
    error: "Error",
    retry: "Retry",
    noData: "No data available",
  },
  ar: {
    // Navigation
    home: "الرئيسية",
    profile: "الملف الشخصي",
    events: "الفعاليات",
    favorites: "المفضلة",

    // Home Screen
    searchEvents: "البحث عن الفعاليات",
    searchPlaceholder: "البحث عن الفعاليات...",
    cityPlaceholder: "أدخل اسم المدينة...",
    searchButton: "بحث",
    noEventsFound: "لم يتم العثور على فعاليات",
    loading: "جاري التحميل...",

    // Event Details
    eventDetails: "تفاصيل الفعالية",
    date: "التاريخ",
    time: "الوقت",
    venue: "المكان",
    price: "السعر",
    description: "الوصف",
    addToFavorites: "إضافة إلى المفضلة",
    removeFromFavorites: "إزالة من المفضلة",

    // Profile
    userProfile: "الملف الشخصي للمستخدم",
    language: "اللغة",
    english: "الإنجليزية",
    arabic: "العربية",
    theme: "المظهر",
    light: "فاتح",
    dark: "داكن",

    // Common
    save: "حفظ",
    cancel: "إلغاء",
    error: "خطأ",
    retry: "إعادة المحاولة",
    noData: "لا توجد بيانات متاحة",
  },
});

i18n.defaultLocale = "en";
i18n.locale = Localization.locale || "en";
i18n.enableFallback = true;

export default i18n;
