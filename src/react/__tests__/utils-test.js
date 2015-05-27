import expect from 'expect.js';
import {projectAll} from '../utils';

describe('react utils', () => {
  const streams = {
    a: {
      b: {
        c: 1,
        notTaken: 1,
        taken: 1
      },
      notTaken: 2,
      taken: 2
    },
    notTaken: 3,
    taken: 3
  };
  describe('projectAll', () => {
    it('should handle projecting an object with string paths', () => {
      let descriptors = ['a.b.c', 'taken', 'a.taken', 'a.b.taken'];

      let result = projectAll(streams, descriptors);

      expect(result.a.b.c).to.be(1);
      expect(result.a.b.notTaken).to.be(undefined);
      expect(result.a.b.taken).to.be(1);
      expect(result.a.notTaken).to.be(undefined);
      expect(result.a.taken).to.be(2);
      expect(result.notTaken).to.be(undefined);
      expect(result.taken).to.be(3);
    });

    it('should handle projecting an object with array paths', () => {
      let descriptors = [['a', 'b', 'c'], ['taken'], ['a', 'taken'], ['a', 'b', 'taken']];

      let result = projectAll(streams, descriptors);

      expect(result.a.b.c).to.be(1);
      expect(result.a.b.notTaken).to.be(undefined);
      expect(result.a.b.taken).to.be(1);
      expect(result.a.notTaken).to.be(undefined);
      expect(result.a.taken).to.be(2);
      expect(result.notTaken).to.be(undefined);
      expect(result.taken).to.be(3);
    });

    it('should handle projecting an object with mixed paths', () => {
      let descriptors = ['a.b.c', ['taken'], 'a.taken', ['a', 'b', 'taken']];

      let result = projectAll(streams, descriptors);

      expect(result.a.b.c).to.be(1);
      expect(result.a.b.notTaken).to.be(undefined);
      expect(result.a.b.taken).to.be(1);
      expect(result.a.notTaken).to.be(undefined);
      expect(result.a.taken).to.be(2);
      expect(result.notTaken).to.be(undefined);
      expect(result.taken).to.be(3);
    });

    it('should throw an error for non string/arrays', () => {
      let descriptors = ['a.b.c', ['taken'], 'a.taken', ['a', 'b', 'taken'], new Date()];

      expect(projectAll).withArgs(streams, descriptors).to.throwError();
    });

    it('should accept a function used to map paths', () => {
      let descriptors = (from) => ({test: from.a.b.c});

      let result = projectAll(streams, descriptors);

      expect(result.test).to.be(1);

    });
  });

});
