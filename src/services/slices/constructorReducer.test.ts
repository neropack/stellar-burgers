import { describe, test, expect } from "@jest/globals";
import constructorReducer, { addItem, constructorInitialState, constructorState, moveItemDown, moveItemUp, removeItem } from "./constructorSlice";
import { v4 as uuidv4 } from 'uuid';
import { TConstructorIngredient } from "@utils-types";

jest.mock('uuid', () => ({
    v4: jest.fn(() => 'kekedId'),
}));

describe('Тест редьюсера конструктора', () => {
    const initialState: constructorState = JSON.parse(JSON.stringify(constructorInitialState));
    initialState.bun = {
        _id: "643d69a5c3f7b9001cfa093d",
        name: "Флюоресцентная булка R2-D3",
        type: "bun",
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: "https://code.s3.yandex.net/react/code/bun-01.png",
        image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
        image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
        id: '0'
    };
    initialState.constructorItems = [
        {
            _id: "643d69a5c3f7b9001cfa0940",
            name: "Говяжий метеорит (отбивная)",
            type: "main",
            proteins: 800,
            fat: 800,
            carbohydrates: 300,
            calories: 2674,
            price: 3000,
            image: "https://code.s3.yandex.net/react/code/meat-04.png",
            image_mobile: "https://code.s3.yandex.net/react/code/meat-04-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/meat-04-large.png",
            id: '1'
        },
        {
            _id: "643d69a5c3f7b9001cfa0944",
            name: "Соус традиционный галактический",
            type: "sauce",
            proteins: 42,
            fat: 24,
            carbohydrates: 42,
            calories: 99,
            price: 15,
            image: "https://code.s3.yandex.net/react/code/sauce-03.png",
            image_mobile: "https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/sauce-03-large.png",
            id: '2'
        }
    ];

    test('Тест добавления игредиента', () => {
        const ingredient = {
            _id: "643d69a5c3f7b9001cfa094b",
            name: "Что тут делает булка?",
            type: "main",
            proteins: 84,
            fat: 48,
            carbohydrates: 420,
            calories: 3377,
            price: 4142,
            image: "https://code.s3.yandex.net/react/code/bun-01.png",
            image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
        };

        const expectedState: constructorState = JSON.parse(JSON.stringify(initialState));
        expectedState.constructorItems.push({...ingredient, id: 'kekedId'});

        const newState = constructorReducer(
            initialState,
            addItem(ingredient)
        );

        expect(newState).toEqual(expectedState);
        expect(uuidv4).toHaveBeenCalled();
    });

    test('Тест удаления ингредиента', () => {
        const expectedState: constructorState = JSON.parse(JSON.stringify(initialState));
        expectedState.constructorItems = expectedState.constructorItems.filter((ingredient: TConstructorIngredient) => ingredient.id !== 'kekedId');

        const newState = constructorReducer(
            initialState,
            removeItem('kekedId')
        )

        expect(newState).toEqual(expectedState);
    });

    test('Изменение порядка ингридиентов в начинке вниз', () => {
        const expectedState: constructorState = JSON.parse(JSON.stringify(initialState));
        const id = 0;
        [expectedState.constructorItems[id], expectedState.constructorItems[id + 1]] = [expectedState.constructorItems[id + 1], expectedState.constructorItems[id]];

        const newStateDown = constructorReducer(initialState, moveItemDown(initialState.constructorItems[id]));

        expect(newStateDown).toEqual(expectedState);
    });
    test('Изменение порядка ингридиентов в начинке вверх', () => {
        const expectedState: constructorState = JSON.parse(JSON.stringify(initialState));
        const id = 1;
        [expectedState.constructorItems[id], expectedState.constructorItems[id - 1]] = [expectedState.constructorItems[id - 1], expectedState.constructorItems[id]];
        
        const newStateUp = constructorReducer(initialState, moveItemUp(initialState.constructorItems[id]));

        expect(newStateUp).toEqual(expectedState);
    })
});