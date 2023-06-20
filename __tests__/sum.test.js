const sum = require('../sum.js');

test('sum work...', () => {
    expect(sum(0, 0)).toBe(0);
    expect(sum(-1, 1)).toBe(0);
});
