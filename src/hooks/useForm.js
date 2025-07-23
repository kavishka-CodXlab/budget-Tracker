import { useState, useCallback } from 'react';

/**
 * Custom hook for form handling with validation
 * This demonstrates:
 * - useState for form state management
 * - useCallback for performance optimization
 * - Custom validation logic
 * - Form submission handling
 */
const useForm = (initialValues = {}, validationRules = {}) => {
  // Form state management
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation function
  const validateField = useCallback((name, value) => {
    const rules = validationRules[name];
    if (!rules) return '';

    // Required field validation
    if (rules.required && (!value || value.toString().trim() === '')) {
      return rules.required.message || `${name} is required`;
    }

    // Minimum length validation
    if (rules.minLength && value.toString().length < rules.minLength.value) {
      return rules.minLength.message || `${name} must be at least ${rules.minLength.value} characters`;
    }

    // Maximum length validation
    if (rules.maxLength && value.toString().length > rules.maxLength.value) {
      return rules.maxLength.message || `${name} cannot exceed ${rules.maxLength.value} characters`;
    }

    // Email validation
    if (rules.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return rules.email.message || 'Please enter a valid email address';
      }
    }

    // Number validation
    if (rules.number) {
      if (isNaN(value) || value === '') {
        return rules.number.message || 'Please enter a valid number';
      }
    }

    // Positive number validation
    if (rules.positive && parseFloat(value) <= 0) {
      return rules.positive.message || 'Please enter a positive number';
    }

    // Custom validation function
    if (rules.custom && typeof rules.custom === 'function') {
      const customError = rules.custom(value, values);
      if (customError) return customError;
    }

    return '';
  }, [validationRules, values]);

  // Validate all fields
  const validateAll = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach(fieldName => {
      const error = validateField(fieldName, values[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [values, validateField, validationRules]);

  // Handle input change
  const handleChange = useCallback((name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  }, [errors]);

  // Handle input blur (when user leaves the field)
  const handleBlur = useCallback((name) => {
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // Validate field on blur
    const error = validateField(name, values[name]);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  }, [values, validateField]);

  // Handle form submission
  const handleSubmit = useCallback(async (onSubmit) => {
    setIsSubmitting(true);
    
    // Mark all fields as touched
    const allTouched = {};
    Object.keys(validationRules).forEach(key => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    // Validate all fields
    const isValid = validateAll();

    if (isValid && onSubmit) {
      try {
        await onSubmit(values);
      } catch (error) {
        console.error('Form submission error:', error);
      }
    }

    setIsSubmitting(false);
  }, [values, validateAll, validationRules]);

  // Reset form to initial values
  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  // Set specific field value
  const setValue = useCallback((name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  // Set multiple values at once
  const setMultipleValues = useCallback((newValues) => {
    setValues(prev => ({
      ...prev,
      ...newValues
    }));
  }, []);

  // Check if form is valid
  const isValid = Object.keys(errors).every(key => !errors[key]);

  // Check if form has been modified
  const isDirty = JSON.stringify(values) !== JSON.stringify(initialValues);

  return {
    // Values and state
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    isDirty,

    // Methods
    handleChange,
    handleBlur,
    handleSubmit,
    reset,
    setValue,
    setMultipleValues,
    validateAll
  };
};

export default useForm; 