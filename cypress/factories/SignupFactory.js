var faker = require('faker')
var cpf = require('gerador-validador-cpf')


export default {
    deliver: function(){

        var firstName = faker.name.firstName()
        var lastName = faker.name.lastName()

        var data = {
            name: `${firstName} ${lastName}`,
            cpf: cpf.generate(),
            email: faker.internet.email(firstName),
            whatsapp: "11999999999",
            address:{
                postalcode: "01001001",
                street: "Praça da Sé",
                number: "123",
                details: "casa",
                disttrict: "Sé",
                city_state: "São Paulo/SP"
            },
            delivery_method: "Moto",
            cnh: "cnh-digital.jpg"
        }

        return data
    }
}