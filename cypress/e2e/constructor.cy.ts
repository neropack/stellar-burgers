import { setCookie, deleteCookie } from '../../src/utils/cookie';

const URL = 'https://norma.nomoreparties.space/api';

describe('Тест конструктора бургера', () => {
    beforeEach(() => {
        setCookie('accessToken', 'Bearer%20eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MmExZTkyYzJmMzBjMDAxY2IyNTA3MiIsImlhdCI6MTc0OTM4ODM1MiwiZXhwIjoxNzQ5Mzg5NTUyfQ.nope');
        localStorage.setItem('refreshToken', '1c10c4f4bd3036ef2800d7c870043d9d9cf74564de5150a71c0694a604f9cnope');
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

    it('hell yeah', () => {
        cy.visit('http://localhost:4000/');
    })

    // it('Получение списка ингредиентов', () => {
    //     cy.get('[data-cy="constructor"]').as('constructor');


    //     cy.get('@constructor').should('contain', 'Что тут делает булка?');
    // })
})