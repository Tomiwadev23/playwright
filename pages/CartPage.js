class CartPage{
    constructor(page){

        this.page = page;
        this.increaseQuantityButton = page.getByRole('button',{name:'+'});
        this.fullNameInput = page.getByRole('textbox',{name:'Full Name'});
        this.phoneInput = page.getByRole('textbox',{name:'Phone number (e.g.'})

    }


    async increaseQuantity(){
        await this.increaseQuantityButton.click()
    }
    async fillCheckoutDetails(fullName,phone){
        await this.fullNameInput.fill(fullName)
        await this.phoneInput.fill(phone)
    }
}

module.exports= {CartPage}