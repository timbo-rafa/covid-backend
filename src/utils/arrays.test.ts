import { commaSeparatedStringToNumberArray } from "./arrays"

describe('commaSeparatedStringToNumberArray', () => {
  test('1,2,3,4', () => {
    const numberArray = commaSeparatedStringToNumberArray('1,2,3,4')
    expect(numberArray).toEqual([1,2,3,4])
  })
})