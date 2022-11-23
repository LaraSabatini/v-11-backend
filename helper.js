function getOffset(listPerPage, currentPage = 1) {
  return (currentPage - 1) * [listPerPage];
}

function emptyOrRows(rows) {
  if (!rows) {
    return [];
  }
  return rows;
}

function calcTotalPages(amountOfPages) {
  return Math.ceil(Object.values(amountOfPages[0])[0] / 25);
}

module.exports = {
  getOffset,
  emptyOrRows,
  calcTotalPages,
};
