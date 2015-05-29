import expect from 'expect.js';

import {throws, arrayify} from '../utils';



describe('utils', () => {

  describe('throws', () => {
    it('should throw with no arguments', () => {
      expect(throws()).withArgs().to.throwError(/There was an error/);
    });

    it('should throw with a message argument', () => {
      expect(throws('THIS MESSAGE')).withArgs().to.throwError(/THIS MESSAGE/);
    });
  });

  describe('arrayify', () => {
    it('should return argument if already an array', () => {
      expect(arrayify([1, 2, 3, 4])).to.eql([1, 2, 3, 4]);
    });

    it('should return a single element array if not an array', () => {
      expect(arrayify(1)).to.eql([1]);
    });
  });

});
