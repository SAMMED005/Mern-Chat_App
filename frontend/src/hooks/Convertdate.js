
function formatMongoDate(mongoDate) {
    if (!mongoDate) return "Invalid Date";

    const date = new Date(mongoDate);

    // Options for formatting
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true, // Change to false for 24-hour format
    };

    return date.toLocaleString("en-US", options);
}

export default formatMongoDate;

