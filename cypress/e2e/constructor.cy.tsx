import { setCookie, deleteCookie } from '../../src/utils/cookie';

describe('Тест конструктора бургера', () => {
    beforeEach(() => {
        setCookie('accessToken', 'Bearer%20eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MmExZTkyYzJmMzBjMDAxY2IyNTA3MiIsImlhdCI6MTc0OTM4ODM1MiwiZXhwIjoxNzQ5Mzg5NTUyfQ.nope');
        localStorage.setItem('refreshToken', '1c10c4f4bd3036ef2800d7c870043d9d9cf74564de5150a71c0694a604f9cnope');
    });
    afterEach(() => {
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
    })
})