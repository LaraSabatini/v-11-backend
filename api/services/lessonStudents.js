const db = require('./db');
const helper = require('../../helper');

async function getStudentPurchases(clientId) {
  const rows = await db.query(
    `SELECT * FROM lesson_purchases WHERE clientId='${clientId}'`,
  );

  if (rows.length) {
    const purchaseIds = rows.map((row) => row.id);

    const groups = {};

    // eslint-disable-next-line no-restricted-syntax
    for (const item of rows) {
      const { id, paidDay } = item;

      // Si el grupo para la fecha no existe, crearlo
      if (!groups[paidDay]) {
        groups[paidDay] = {
          ids: [],
          date: paidDay,
        };
      }

      // Agregar el id al grupo correspondiente
      groups[paidDay].ids.push(id);
    }

    // Obtener los grupos como un array
    const result = Object.values(groups);

    const likeConditions = purchaseIds.map((id) => `purchaseIds LIKE '%${id}%'`).join(' OR ');

    const purchases = await db.query(
      `SELECT * FROM lessons_schedule WHERE ${likeConditions}`,
    );

    const data = helper.emptyOrRows({ separated: result, purchases });

    return {
      data,
    };
  } return {
    data: [],
  };
}

module.exports = {
  getStudentPurchases,
};
