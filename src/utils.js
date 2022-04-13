const formatDate = (dateString) => {
    if (dateString) {
        const date = new Date(dateString);
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    }
    return "Unknown";
};

export { formatDate };
