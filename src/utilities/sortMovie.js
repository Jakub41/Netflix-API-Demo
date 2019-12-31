const fastSort = require('fast-sort');
const _ = require('lodash');

/**
 *
 * @param {*} source Array to sort
 * @param {*} criteria Pass array as key value pair { asc: u => u.Key} or { desc: u => u.Key}
 * @returns Sorted Array
 */
const sortMovie = (source, criteria) => fastSort(source).by(criteria);

module.exports = {
    sortMovie : sortMovie
};
