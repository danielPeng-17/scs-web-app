export const updateFormData = (formData, setFormData, value) => {
    setFormData({...formData, ...value});
}