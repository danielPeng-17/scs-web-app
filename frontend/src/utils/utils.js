export const formatPhoneNumber = (number) => {
    var cleaned = `${number}`.replace(/\D/g, "");
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

    return match ? "(" + match[1] + ") " + match[2] + "-" + match[3] : null;
};
