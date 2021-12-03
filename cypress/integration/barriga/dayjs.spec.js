import dayjs from 'dayjs'

const duration = require('dayjs/plugin/duration')
dayjs.extend(duration)

it('times loading a site and selecting an element', () => {

  const start = dayjs();
  let end;

  cy.visit('http://example.com')
  cy.get('h1').then(() => {
    // ensure end is set only after get command finishes
    // by using a .then()

    end = dayjs();
    cy.log(`start: ${start.format("HH:mm.ss.SSS")}`)
    cy.log(`end: ${end.format("HH:mm.ss.SSS")}`)
    cy.log(`diff: ${dayjs.duration(end.diff(start)).$ms} ms`)
  })
})