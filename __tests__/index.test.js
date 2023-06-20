const _gameFieldConsole = require('../index.js');

test('_gameFieldConsole work...', () => {
    expect(_gameFieldConsole([[1]])).toBe(' 1  ');
    expect(_gameFieldConsole([[1, 2], [1, 2]])).toBe(' 1   2   1   2  ');
});
