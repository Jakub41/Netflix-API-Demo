const newDateTime = () => {
    // converting Date to be a string
    return new Date().toString();
};

const newDate = () => {
    return new Date().toDateString();
}

module.exports = { newDateTime, newDate };
