module.exports = {
    getresponseTemplate(message, status, ctx){
        return {response: message, status: status}
    }
}