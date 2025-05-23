export const handleInputChange = (event, setValue) => {
    const { name, value, files } = event.target;

    if (files && files.length > 0) {
        setValue(name, files[0]);
    } else {
        setValue(name, value);
    }
};
