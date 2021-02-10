/* eslint-disable quote-props */
const {expect} = require('chai');
const obf = require('../obfuscator');

describe('obfuscator entry point', () => {
    describe('object obfuscation', () => {
        it('should obfuscate object of simple data types', () => {
            const result = obf.obfuscate({name: 'John', someInt: 1, someBool: true});

            expect(result).to.deep.equal({
                '\\u006e\\u0061\\u006d\\u0065': '\\u004a\\u006f\\u0068\\u006e',
                '\\u0073\\u006f\\u006d\\u0065\\u0049\\u006e\\u0074': 1,
                '\\u0073\\u006f\\u006d\\u0065\\u0042\\u006f\\u006f\\u006c': true
            });
        });

        it('should obfuscate object of nested objects', () => {
            const result = obf.obfuscate({
                obj1: {
                    name: 'John',
                    someInt: 1,
                    someBool: true
                }
            });

            expect(result).to.deep.equal({
                '\\u006f\\u0062\\u006a\\u0031': {
                    '\\u006e\\u0061\\u006d\\u0065': '\\u004a\\u006f\\u0068\\u006e',
                    '\\u0073\\u006f\\u006d\\u0065\\u0049\\u006e\\u0074': 1,
                    '\\u0073\\u006f\\u006d\\u0065\\u0042\\u006f\\u006f\\u006c': true
                }
            });
        });
    });

    describe('array obfuscation', () => {
        it('should obfuscate array of simple data types', () => {
            const result = obf.obfuscate(['Ford', 'BMW', 'Fiat']);

            expect(result).to.deep.equal([
                '\\u0046\\u006f\\u0072\\u0064',
                '\\u0042\\u004d\\u0057',
                '\\u0046\\u0069\\u0061\\u0074'
            ]);
        });

        it('should obfuscate object with array of simple data types', () => {
            const result = obf.obfuscate({
                cars: ['Ford', 'BMW', 'Fiat']
            });

            expect(result).to.deep.equal({
                '\\u0063\\u0061\\u0072\\u0073': [
                    '\\u0046\\u006f\\u0072\\u0064',
                    '\\u0042\\u004d\\u0057',
                    '\\u0046\\u0069\\u0061\\u0074'
                ]
            });
        });
    });

    describe('mixed obfuscation', () => {
        it('should obfuscate array with nested objects and arrays', () => {
            const result = obf.obfuscate({
                cars: [
                    {
                        name: 'Ford',
                        models: ['Fiesta', 'Focus', 'Mustang']
                    },
                    {
                        name: 'BMW',
                        models: ['320', 'X3', 'X5']
                    },
                    {
                        name: 'Fiat',
                        models: ['500', 'Panda']
                    }
                ]
            });

            expect(result).to.deep.equal({
                '\\u0063\\u0061\\u0072\\u0073': [
                    {
                        '\\u006e\\u0061\\u006d\\u0065': '\\u0046\\u006f\\u0072\\u0064',
                        '\\u006d\\u006f\\u0064\\u0065\\u006c\\u0073': [
                            '\\u0046\\u0069\\u0065\\u0073\\u0074\\u0061',
                            '\\u0046\\u006f\\u0063\\u0075\\u0073',
                            '\\u004d\\u0075\\u0073\\u0074\\u0061\\u006e\\u0067'
                        ]
                    },
                    {
                        '\\u006e\\u0061\\u006d\\u0065': '\\u0042\\u004d\\u0057',
                        '\\u006d\\u006f\\u0064\\u0065\\u006c\\u0073': [
                            '\\u0033\\u0032\\u0030',
                            '\\u0058\\u0033',
                            '\\u0058\\u0035'
                        ]
                    },
                    {
                        '\\u006e\\u0061\\u006d\\u0065': '\\u0046\\u0069\\u0061\\u0074',
                        '\\u006d\\u006f\\u0064\\u0065\\u006c\\u0073': [
                            '\\u0035\\u0030\\u0030',
                            '\\u0050\\u0061\\u006e\\u0064\\u0061'
                        ]
                    }
                ]
            });
        });
    });
});
