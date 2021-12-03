/// <reference types="cypress"/>

it('Equality', () => {
  const a = 1;

  expect(a).equal(1);
  expect(a, 'It was expected 1').equal(1);
  expect(a).to.be.equal(1);
  expect('a').not.to.be.equal('b')
})


it('True or False', () => {
  const a = true;
  const b = false;
  let c;

  expect(a).to.be.true;
  expect(true).to.be.true
  expect(b).not.to.be.null;
  expect(a).not.to.be.null;
  expect(c).to.be.undefined;
})

it('Equality of Objects', () => {

  const obj = {
    a: 1,
    b: 2
  }

  expect(obj).to.be.deep.equal({ a: 1, b: 2 })
  expect(obj).eql({ a: 1, b: 2 })
  expect(obj).to.have.property('b')
  expect(obj).to.have.property('b', 2)
  expect(obj).to.not.be.empty
})

it('Arrays', () => {
  const arr = [1, 2, 3]
  expect(arr).to.have.members([1, 2, 3])
  expect(arr).to.include.members([1, 3])
  expect(arr).to.not.be.empty

})

it('Types', () => {
  const num = 1
  const str = 'String'

  expect(num).to.be.a('number')
  expect(str).to.be.a('string')
  expect({}).to.be.a('object')
  expect([]).to.be.a('array')

})

it('Strings', () => {

  const str = 'Test String'

  expect(str).to.be.equal('Test String')
  expect(str).to.have.length('11')
  expect(str).to.contains('Test')
  expect(str).to.match(/^Test/) //  this string should starts with "Test"
  expect(str).to.match(/String$/) //  this string should ends with "String"
  expect(str).to.match(/.{11}/) //  this string length is equal 11
  expect(str).to.match(/\w+/) // this string has only letters
  expect(str).to.match(/\D+/) // this string has not numbers

})

it('Numbers', () => {
  const number = 4
  const floatNumber = 5.2123

  expect(number).to.be.equal(4)
  expect(number).to.be.above(3)
  expect(number).to.be.below(5)
  expect(floatNumber).to.be.equal(5.2123)
  expect(floatNumber).to.be.closeTo(5.2, 0.1)
  expect(floatNumber).to.be.above(5)

})