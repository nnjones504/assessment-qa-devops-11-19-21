const {shuffleArray} = require('./utils')

describe('shuffleArray should', () => {
    // CODE HERE
    const testArray =['i', 'hope', 'this', 'thing', 'works'];
    const shuffledArray = shuffleArray(testArray);
    
    test("shuffleArray should return an array of the same length as the argument sent in", () => {
        expect(shuffledArray.length).toEqual(testArray.length)
    })

    test("check that the items have been shuffled around", () => {
        expect(shuffledArray).not.toEqual(testArray)
    })

    test("shuffleArray should return an array", () => {
        expect(Array.isArray(shuffledArray)).toBe(true)
    })

})