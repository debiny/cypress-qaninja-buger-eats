import signup from "../pages/SignupPage"
import signupFactory from "../factories/SignupFactory"
import signupPage from "../pages/SignupPage"

describe("Cadastro", ()=>{

    // beforeEach(function(){
    //     cy.fixture('delivery').then((d)=>{
    //         this.deliver = d
    //     })
    // })

    it("Usuário deve se tornar um entregador", function(){
        var deliver = signupFactory.deliver()

        signupPage.go()
        signupPage.fillForm(deliver)
        signupPage.submit()

        const expectedMessage = "Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato."

        signupPage.modalContentShouldBe(expectedMessage)
   
    })

    it("Cpf inválido", function(){
        var deliver = signupFactory.deliver()
        deliver.cpf = 'A2300000000'
        signupPage.go()
        signupPage.fillForm(deliver)
        signupPage.submit()

        cy.get(".alert-error").should("have.text","Oops! CPF inválido")
    })
   //it.skip pula o teste na execução
    it("Email incorreto", function(){
        var deliver = signupFactory.deliver()
        deliver.email = '12300000000'
        signupPage.go()
        signupPage.fillForm(deliver)
        signupPage.submit()

        cy.get(".alert-error").should("have.text","Oops! Email com formato inválido.")
    })

    context('Campos obrigatorios', function(){
        const message = [
            { field: 'name', output: 'É necessário informar o nome'},
            { field: 'cpf', output: 'É necessário informar o CPF'},
            { field: 'email', output: 'É necessário informar o email'},
            { field: 'postalcode', output: 'É necessário informar o CEP'},
            { field: 'number', output: 'É necessário informar o número do endereço'},
            { field: 'delivery_method', output: 'Selecione o método de entrega'},
            { field: 'cnh', output: 'Adicione uma foto da sua CNH'},       
        
        ]

        before(function(){
            signup.go()
            signup.submit()
        })

        message.forEach(function(msg){
            it(`${msg.field} is required`, function(){
                signupPage.alertMessageShouldBe(msg.output)
            })
        })
    })
})