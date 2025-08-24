// Validation Service
// Common validation functions used throughout the app

class ValidationService {
  // Validate email format
  validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Validate password strength
  validatePassword(password) {
    if (!password || password.length < 6) {
      return {
        isValid: false,
        error: "Password must be at least 6 characters long",
      };
    }
    return { isValid: true };
  }

  // Validate search inputs
  validateSearch(keyword, city) {
    if (!keyword && !city) {
      return {
        isValid: false,
        error: "Please enter a keyword or city to search",
      };
    }
    return { isValid: true };
  }

  // Validate required fields
  validateRequired(value, fieldName) {
    if (!value || value.trim().length === 0) {
      return { isValid: false, error: `${fieldName} is required` };
    }
    return { isValid: true };
  }

  // Validate minimum length
  validateMinLength(value, minLength, fieldName) {
    if (!value || value.trim().length < minLength) {
      return {
        isValid: false,
        error: `${fieldName} must be at least ${minLength} characters long`,
      };
    }
    return { isValid: true };
  }

  // Validate maximum length
  validateMaxLength(value, maxLength, fieldName) {
    if (value && value.trim().length > maxLength) {
      return {
        isValid: false,
        error: `${fieldName} must be no more than ${maxLength} characters long`,
      };
    }
    return { isValid: true };
  }

  // Validate name format
  validateName(name) {
    if (!name || name.trim().length < 2) {
      return {
        isValid: false,
        error: "Name must be at least 2 characters long",
      };
    }

    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(name.trim())) {
      return {
        isValid: false,
        error: "Name can only contain letters and spaces",
      };
    }

    return { isValid: true };
  }

  // Validate phone number
  validatePhone(phone) {
    if (!phone) return { isValid: false, error: "Phone number is required" };

    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, ""))) {
      return { isValid: false, error: "Please enter a valid phone number" };
    }

    return { isValid: true };
  }

  // Sanitize input text
  sanitizeInput(text) {
    if (!text) return "";
    return text.trim().replace(/[<>]/g, "");
  }

  // Validate URL format
  validateUrl(url) {
    if (!url) return { isValid: false, error: "URL is required" };

    try {
      new URL(url);
      return { isValid: true };
    } catch (error) {
      return { isValid: false, error: "Please enter a valid URL" };
    }
  }

  // Validate date format
  validateDate(dateString) {
    if (!dateString) return { isValid: false, error: "Date is required" };

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return { isValid: false, error: "Please enter a valid date" };
    }

    return { isValid: true };
  }

  // Validate numeric range
  validateNumericRange(value, min, max, fieldName) {
    const num = parseFloat(value);
    if (isNaN(num)) {
      return { isValid: false, error: `${fieldName} must be a number` };
    }

    if (num < min || num > max) {
      return {
        isValid: false,
        error: `${fieldName} must be between ${min} and ${max}`,
      };
    }

    return { isValid: true };
  }

  // Validate array length
  validateArrayLength(array, minLength, maxLength, fieldName) {
    if (!Array.isArray(array)) {
      return { isValid: false, error: `${fieldName} must be an array` };
    }

    if (array.length < minLength) {
      return {
        isValid: false,
        error: `${fieldName} must have at least ${minLength} items`,
      };
    }

    if (maxLength && array.length > maxLength) {
      return {
        isValid: false,
        error: `${fieldName} must have no more than ${maxLength} items`,
      };
    }

    return { isValid: true };
  }
}

// Export singleton instance
export const validationService = new ValidationService();
export default validationService;
