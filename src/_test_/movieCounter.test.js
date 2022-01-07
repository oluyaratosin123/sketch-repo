import { counter } from "../Display/counter";

jest.mock('/src/API/responseAPI.js');

describe('Our movie counter', () => {
    test('This count Element should return the size of an array', () => {
        // Count Array
        const array = [1, 2, 3, 4, 5, 6, 7];

        // Show res
        const result = counter.countElements(array);
        expect(result).toBe(7);
    });
    test('Movie counter should return the number of movies recieved from the mocked API', async () => {
        // Show res
        const result = await counter.moviesCounter();

        // Finalize
        expect(result).toBe(7);
    });
});