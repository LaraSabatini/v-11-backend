const title = '¡UPS!';
const status = 'alert';
const icon = 'IconExclamation';
const firstContent = 'Ha ocurrido un error al';
const secondContent = ', por favor intentalo nuevamente o comunicate con el administrador.';

const errorResponses = {
  createPartner: {
    title,
    content: `${firstContent} crear el socio${secondContent}`,
    status,
    icon,
  },
  updatePartnerPayment: {
    title,
    content: `${firstContent} registrar el pago${secondContent}`,
    status,
    icon,
  },
  createAnnotation: {
    title,
    content: `${firstContent} crear la anotacion${secondContent}`,
    status,
    icon,
  },
  deleteAnnotation: {
    title,
    content: `${firstContent} eliminar la anotacion${secondContent}`,
    status,
    icon,
  },
  editAnnotation: {
    title,
    content: `${firstContent} editar la anotacion${secondContent}`,
    status,
    icon,
  },
  editCombo: {
    title,
    content: `${firstContent} editar el combo${secondContent}`,
    status,
    icon,
  },
  createBoulderPurcase: {
    title,
    content: `${firstContent} crear el pago${secondContent}`,
    status,
    icon,
  },
  createDigitalPayment: {
    title,
    content: `${firstContent} crear el pago${secondContent}`,
    status,
    icon,
  },
  editPartner: {
    title,
    content: `${firstContent} editar el cliente${secondContent}`,
    status,
    icon,
  },
  deletePartner: {
    title,
    content: `${firstContent} borrar el cliente${secondContent}`,
    status,
    icon,
  },
  updatePrices: {
    title,
    content: `${firstContent} actualizar el precio${secondContent}`,
    status,
    icon,
  },
  search: {
    title,
    content: `${firstContent} ejecutar la busqueda${secondContent}`,
    status,
    icon,
  },
  createProduct: {
    title,
    content: `${firstContent} crear el producto${secondContent}`,
    status,
    icon,
  },
  updateProduct: {
    title,
    content: `${firstContent} editar el producto${secondContent}`,
    status,
    icon,
  },
  storePurchase: {
    title,
    content: `${firstContent} procesar el pago${secondContent}`,
    status,
    icon,
  },
  closeTill: {
    title,
    content: `${firstContent} cerrar la caja${secondContent}`,
    status,
    icon,
  },
  createLessonPurchase: {
    title,
    content: `${firstContent} hacer la reserva${secondContent}`,
    status,
    icon,
  },
  deleteLesson: {
    title,
    content: `${firstContent} borrar la reserva${secondContent}`,
    status,
    icon,
  },
};

module.exports = errorResponses;
