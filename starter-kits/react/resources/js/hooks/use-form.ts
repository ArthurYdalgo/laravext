import { useState } from "react";

type FormErrors = {
    [key: string]: string;
};

export const useForm = (initialValues: { [key: string]: any }) => {
    const [formInitialValues, setFormInitialValues] = useState(initialValues);
    const [formData, setFormData] = useState(initialValues);
    const [processing, setProcessing] = useState(false);
    const [recentlySuccessful, setRecentlySuccessful] = useState(false);
    const [formErrors, setFormErrors] = useState<FormErrors>({});

    const setData = (data: string|Object, value:any|Object = null) => {
        if(typeof data === 'object'){
            setFormData(data);
        }else{
            setFormData({...formData, [data]: value});
        }
    }

    const setErrors = (data: string|FormErrors, value: any|Object = null) => {
        if(typeof data === 'object'){
            setFormErrors(data);
        }else{
            setFormErrors({...formErrors, [data]: value});
        }
    }

    const clearErrors = () => {
        setFormErrors({});
    }

    const reset = (field: string | null = null) => {
        if(field){
            setFormData({...formData, [field]: formInitialValues[field]});
        }else{
            setFormData(formInitialValues);
        }
    }

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
        reset,
    }
}