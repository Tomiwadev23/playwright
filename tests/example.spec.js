
import { test, expect } from '@playwright/test';


// test ('search Wikipedia for Nigeria',async ({page})=>{
//   await page.goto('https://en.wikipedia.org');
//   await page.getByRole('searchbox').fill('Nigeria');
//   await page.getByRole('searchbox').press('Enter')

//   await expect(page.getByRole('heading',{name:'Nigeria',exact:false})).toBeVisible()
// })


// test.describe ('wiki checkout',()=>{
//   test.beforeEach(async({page})=>{
//     await page.goto('https://www.wikipedia.org');
//   });

//   test('can add item to cart',async ({page})=>{
//     await page.getByRole('button',{name:'Add to cart'}).first().click();
//     await expect(page.getByText('! item in cart')).toBeVisible()
//   })

//     test('checkout button appears after adding item', async ({ page }) => {
//     await page.getByRole('button', { name: 'Add to Cart' }).first().click();
//     await expect(page.getByRole('link', { name: 'Checkout' })).toBeVisible();
//   });
// })


// test.describe('using sauce-demo', () => {
//   test.beforeEach(async ({ page }) => {
//     await page.goto('https://www.jovellecollection.com.ng/')
//     await page.getByRole('button', { name: 'Slate Blue Corduroy Utility' }).click();
//     await page.getByRole('button', { name: '2XL' }).click();
//     await expect(page.getByRole('button', { name: 'Add to Cart' })).toBeVisible();
//     await page.getByRole('button', { name: 'Add to Cart' }).click();

//   })



//   test('increasig the cart', async ({ page }) => {
//     await page.getByRole('link', { name: 'Shopping Cart' }).click();
//     await page.getByRole('button', { name: '+' }).click();
//     await page.getByRole('textbox', { name: 'Full name' }).click();
//     await page.getByRole('textbox', { name: 'Full name' }).fill('tomiwa');
//     await expect(page.getByRole('textbox', { name: 'Full Name' })).toHaveValue('tomiwa')
//     await page.getByRole('textbox', { name: 'Phone number (e.g.' }).click();
//     await page.getByRole('textbox', { name: 'Phone number (e.g.' }).fill('09153258164');
//     await expect(page.getByRole('textbox', { name: 'Phone Number' })).toHaveValue('09153258164')


//   })
// })
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';

test.describe('Jovelle shoping flow', () => {
  let productPage;
  test.beforeEach(async ({ page }) => {
    productPage = new ProductPage(page);
    await productPage.goto();
    await productPage.selectProduct('Slate Blue Corduroy Utility');
    await productPage.selectSize('2XL');
    await expect(productPage.addToCartButton).toBeVisible();
    await productPage.addToCart();
  })


  test('product can be added to cart', async ({ page }) => {
    await expect(productPage.cartLink).toBeVisible()
  })

  test('can increase quantity', async ({ page }) => {
    await productPage.cartLink.click()
    const cartPage = new CartPage(page);
    await cartPage.increaseQuantity();
    await cartPage.fillCheckoutDetails('tomiwa', '09153258164')


    await expect(cartPage.fullNameInput).toHaveValue('tomiwa');
    await expect(cartPage.phoneInput).toHaveValue('09153258164');
  })
})


// test('show error messages', async (page) => {
//   await page.route('**/api/checkout', route => {
//     route.fulfill({
//       status: 500,
//       contentType: 'application/json',
//       body: JSON.stringify({ error: 'Server error' }),
//     });
//   })

//   await page.goto('https://www.jovellecollection.com.ng/cart');
//   await page.getByRole('button', { name: 'Confirm Order' }).click();


//   await expect(page.getByText('Something went wrong, please try again')).toBeVisible();

// })

// test('can create an order via API', async ({ request }) => {
//   const response = await request.post('https://www.jovellecollection.com.ng/api/orders', {
//     data: {
//       customerName: 'Tomiwa',
//       phone: '09153258164',
//       items: [{ productId: 1, quantity: 2 }],
//     },
//   });

//   expect(response.status()).toBe(201); // 201 = "Created"
//   const order = await response.json();
//   expect(order).toHaveProperty('orderId');
// });




