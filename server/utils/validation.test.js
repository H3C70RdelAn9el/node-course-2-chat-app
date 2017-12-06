/* jshint esversion :6 */
const expect = require('expect');

//import isRealString
const {isRealString} = require('./validation');
//isRealString
    //should reject non-string values
    //should reject strings w/only spaces
    //should allow strings w/non-space characters

    describe('isRealString', () => {
        it('should reject non-string values', () => {
            var res = isRealString(98);
            expect(res).toBe(false);
        });
        it('should reject string with only spaces', () => {
            var res = isRealString('   ');
            expect(res).toBe(false);
        });
        it('should allow strings with non-space characters', () => {
            var res = isRealString('  Andrew   ');
            expect(res).toBe(true);
        });
    });
