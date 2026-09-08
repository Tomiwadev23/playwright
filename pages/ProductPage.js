class ProductPage {
    constructor(page) {
        this.page = page
        this.addToCartButton = page.getByRole('button', { name: 'Add to Cart' });
        this.cartLink = page.getByRole('link', { name: 'Shopping Cart' });
    }
    async goto() {
        await this.page.goto('/')
    }

    async selectProduct(name) {
        await this.page.getByRole('button', { name }).click()

    }
    async selectSize(size) {
        await this.page.getByRole('button', { name: size }).click()
    }

    async addToCart(){
        await this.addToCartButton.click()
    }
}

module.exports = {ProductPage};

