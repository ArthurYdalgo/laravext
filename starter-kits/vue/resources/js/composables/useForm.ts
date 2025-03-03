import { ref } from 'vue';

export function useForm(initialValues: Record<string, any> = {}) {
    const data = ref({ ...initialValues });
    const errors = ref<Record<string, any>>({});
    const processing = ref(false);
    const recentlySuccessful = ref(false);

    function setData(fieldOrObject: string | Record<string, any>, value?: any) {
        if (typeof fieldOrObject === 'object') {
            data.value = { ...data.value, ...fieldOrObject };
        } else {
            data.value[fieldOrObject] = value;
        }
    }

    function setErrors(fieldOrObject: string | Record<string, any>, value?: any) {
        if (typeof fieldOrObject === 'object') {
            const processedErrors: Record<string, string> = {};
            for (const key in fieldOrObject) {
                const errorValue = fieldOrObject[key];
                if (Array.isArray(errorValue)) {
                    processedErrors[key] = errorValue[0] || '';
                } else if (typeof errorValue === 'string') {
                    processedErrors[key] = errorValue;
                } else {
                    processedErrors[key] = '';
                }
            }
            errors.value = { ...errors.value, ...processedErrors };
        } else {
            if (Array.isArray(value)) {
                errors.value[fieldOrObject] = value[0] || '';
            } else if (typeof value === 'string') {
                errors.value[fieldOrObject] = value;
            } else {
                errors.value[fieldOrObject] = '';
            }
        }
    }

    function setProcessing(state: boolean) {
        processing.value = state;
    }

    function setRecentlySuccessful(state: boolean) {
        recentlySuccessful.value = state;
    }

    function reset(field?: string) {
        if (!field) {
            data.value = { ...initialValues };
        } else {
            data.value[field] = initialValues[field];
        }
    }

    function clearErrors() {
        errors.value = {};
    }

    return {
        data,
        errors,
        processing,
        recentlySuccessful,
        setData,
        setErrors,
        setProcessing,
        setRecentlySuccessful,
        reset,
        clearErrors,
    };
}
