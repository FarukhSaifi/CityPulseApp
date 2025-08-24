// Utility Service
// Common utility functions used throughout the app

class UtilityService {
  // Debounce function for search inputs
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Get text alignment based on RTL setting
  getTextAlignment(isRTL) {
    return isRTL ? "right" : "left";
  }

  // Format date to readable string
  formatDate(dateString) {
    if (!dateString || dateString === "TBD") return "TBD";

    try {
      const date = new Date(dateString);
      return date.toLocaleDateString();
    } catch (error) {
      return dateString;
    }
  }

  // Format time to readable string
  formatTime(timeString) {
    if (!timeString || timeString === "TBD") return "TBD";

    try {
      return timeString;
    } catch (error) {
      return timeString;
    }
  }

  // Capitalize first letter
  capitalizeFirst(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }

  // Truncate text to specified length
  truncateText(text, maxLength = 100) {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  }

  // Generate random ID
  generateId() {
    return Math.random().toString(36).substr(2, 9);
  }

  // Check if value is empty
  isEmpty(value) {
    if (value === null || value === undefined) return true;
    if (typeof value === "string") return value.trim().length === 0;
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === "object") return Object.keys(value).length === 0;
    return false;
  }

  // Deep clone object
  deepClone(obj) {
    if (obj === null || typeof obj !== "object") return obj;
    if (obj instanceof Date) return new Date(obj.getTime());
    if (obj instanceof Array) return obj.map((item) => this.deepClone(item));
    if (typeof obj === "object") {
      const clonedObj = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          clonedObj[key] = this.deepClone(obj[key]);
        }
      }
      return clonedObj;
    }
  }
}

// Export singleton instance
export const utilityService = new UtilityService();
export default utilityService;
