import { setCookie, deleteCookie } from '../../src/utils/cookie';

const URL = 'https://norma.nomoreparties.space/api';

describe('Тест конструктора бургера', () => {
    beforeEach(() => {
        setCookie('accessToken', 'kekusToken');
        localStorage.setItem('refreshToken', 'kekusRefreshToken');
        cy.log(URL);
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
        cy.get('[data-cy="ingredient"]').eq(3).find('button').click();
        cy.get('[data-cy="ingredient"]').eq(1).find('button').click();


        cy.get('@constructor').should('contain', 'Мясо бессмертных моллюсков Protostomia');
        cy.get('@constructor').should('contain', 'Флюоресцентная булка R2-D3');
    });

    it('Проверка модельного окна ингридиента', () => {
        cy.get('[data-cy="ingredient"]').eq(3).click();
        cy.get('[data-cy="modal"]').as('modal');

        cy.get('@modal').should('exist');
        cy.get('@modal').should('contain', 'Мясо бессмертных моллюсков Protostomia');

        cy.get('[data-cy="close-modal"]').click();
        cy.get('@modal').should('not.exist');

    })
})