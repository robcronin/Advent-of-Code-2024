import { range } from '../looping';

describe('range', () => {
    it('should produce a range array for one input', () => {
        expect(range(3)).toEqual([0, 1, 2]);
    });
    it('should produce a range array for two inputs', () => {
        expect(range(3, 5)).toEqual([3, 4]);
    });
});
