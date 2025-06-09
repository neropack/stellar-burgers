import { setCookie, deleteCookie } from '../../src/utils/cookie';

const URL = Cypress.env('BURGER_API_URL');

describe('Тест конструктора бургера', () => {
    beforeEach(() => {
        setCookie('accessToken', 'kekusToken');
        localStorage.setItem('refreshToken', 'kekusRefreshToken');
        cy.intercept('GET', `${URL}/auth/user`, { fixture: 'user.json' }).as('getUser');
        cy.intercept('GET', `${URL}/ingredients`, {fixture: 'ingredients.json'}).as('getIngredients');
        cy.visit('http://localhost:4000/');
        cy.wait('@getUser');
        cy.wait('@getIngredients');
    });

    afterEach(() => {
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
    });

    it('Получение списка ингредиентов в конструкторе', () => {
        cy.get('[data-cy="constructor"]').as('constructor');
        cy.get('[data-cy="ingredient"]').eq(10).find('button').click();
        cy.get('[data-cy="ingredient"]').eq(1).find('button').click();


        cy.get('@constructor').should('contain', 'Что тут делает булка?');
        cy.get('@constructor').should('contain', 'Флюоресцентная булка R2-D3');
    });

    it('Проверка модельного окна ингридиента', () => {
        cy.get('[data-cy="ingredient"]').eq(10).click();
        cy.get('[data-cy="modal"]').as('modal');

        cy.get('@modal').should('exist');
        cy.get('@modal').should('contain', 'Что тут делает булка?');

        cy.get('[data-cy="close-modal"]').click();
        cy.get('@modal').should('not.exist');
    })

    it('Создание заказа', () => {
        cy.intercept('POST', `${URL}/orders`, {fixture: 'order.json'}).as('createOrder');
        cy.get('[data-cy="constructor"]').as('constructor');

        cy.get('[data-cy="ingredient"]').eq(10).find('button').click();
        cy.get('[data-cy="ingredient"]').eq(1).find('button').click();

        cy.get('@constructor').find('button').contains('Оформить заказ').click();
        cy.get('[data-cy="modal"]').as('modal');

        cy.get('@modal').should('exist');
        cy.get('@modal').should('contain', '133712');

        cy.get('[data-cy="close-modal"]').click();
        cy.get('@modal').should('not.exist');

        cy.get('@constructor').should('not.contain', 'Что тут делает булка?');
        cy.get('@constructor').should('not.contain', 'Флюоресцентная булка R2-D3');

        cy.wait('@createOrder');
    })
})