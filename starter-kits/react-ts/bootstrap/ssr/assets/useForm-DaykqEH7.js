import { useState } from "react";
const useForm = (initialValues) => {
  const [formInitialValues, setFormInitialValues] = useState(initialValues);
  const [formData, setFormData] = useState(initialValues);
  const [processing, setProcessing] = useState(false);
  const [recentlySuccessful, setRecentlySuccessful] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const setData = (data, value = null) => {
    if (typeof data === "object") {
      setFormData(data);
    } else {
      setFormData({ ...formData, [data]: value });
    }
  };
  const setErrors = (data, value = null) => {
    if (typeof data === "object") {
      setFormErrors(data);
    } else {
      setFormErrors({ ...formErrors, [data]: value });
    }
  };
  const clearErrors = () => {
    setFormErrors({});
  };
  const reset = (field = null) => {
    if (field) {
      setFormData({ ...formData, [field]: formInitialValues[field] });
    } else {
      setFormData(formInitialValues);
    }
  };
  return {
    data: formData,
    setData,
    errors: formErrors,
    setErrors,
    clearErrors,
    processing,
    setProcessing,
    recentlySuccessful,
    setRecentlySuccessful,
    reset
  };
};
export {
  useForm as u
};
