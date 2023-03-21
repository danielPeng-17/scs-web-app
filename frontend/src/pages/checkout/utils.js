export const updateFormData = (setFormData, name = null, value) => {
    setFormData((prevState) => ({
        ...prevState,
        ...(name ? { [name]: { ...prevState[name], ...value } } : { ...value }),
    }));
};
