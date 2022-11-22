const title = "¡UPS!"
const status = "alert"
const icon = "IconExclamation"
const firstContent = "Ha ocurrido un error al"
const secondContent = ", por favor intentalo nuevamente o comunicate con el administrador."

const errorResponses ={
    "createPartner": {
        "title": title,
        "content": `${firstContent} crear el socio${secondContent}`,
        "status": status,
        "icon": icon
    },
    "updatePartnerPayment": {
        "title": title,
        "content": `${firstContent} registrar el pago${secondContent}`,
        "status": status,
        "icon": icon
    },
    "createAnnotation": {
        "title": title,
        "content": `${firstContent} crear la anotacion${secondContent}`,
        "status": status,
        "icon": icon
    },
    "deleteAnnotation": {
        "title": title,
        "content": `${firstContent} eliminar la anotacion${secondContent}`,
        "status": status,
        "icon": icon
    },
    "editAnnotation": {
        "title": title,
        "content": `${firstContent} editar la anotacion${secondContent}`,
        "status": status,
        "icon": icon
    },
    "editCombo": {
        "title": title,
        "content": `${firstContent} editar el combo${secondContent}`,
        "status": status,
        "icon": icon
    },
    "createBoulderPurcase": {
        "title": title,
        "content": `${firstContent} crear el pago${secondContent}`,
        "status": status,
        "icon": icon
    },
    "createDigitalPayment": {
        "title": title,
        "content": `${firstContent} crear el pago${secondContent}`,
        "status": status,
        "icon": icon
    },
    "editPartner": {
        "title": title,
        "content": `${firstContent} editar el cliente${secondContent}`,
        "status": status,
        "icon": icon
    },
    "deletePartner": {
        "title": title,
        "content": `${firstContent} borrar el cliente${secondContent}`,
        "status": status,
        "icon": icon
    },
    "updatePrices": {
        "title": title,
        "content": `${firstContent} actualizar el precio${secondContent}`,
        "status": status,
        "icon": icon
    },
    "search": {
        "title": title,
        "content": `${firstContent} ejecutar la busqueda${secondContent}`,
        "status": status,
        "icon": icon
    },
}

export default errorResponses