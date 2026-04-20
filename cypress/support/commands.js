// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Click on a specific date cell in the calendar
Cypress.Commands.add('selectDate', (dateStr) => {

  cy.log(`📅 Selecting ${dateStr}`);

  // Wait for calendar to load
  cy.get('td[data-date]', { timeout: 10000 })
    .should('be.visible');

  // Click exact date using data-date (BEST PRACTICE)
  cy.get(`td[data-date="${dateStr}"]`)
    .should('be.visible')
    .and('not.have.class', 'fc-day-disabled')
    .click();
});

// Main powerful command
Cypress.Commands.add('setSchedule', (item) => {
  cy.selectDate(item.date);

  // === STRONG WAIT until modal is fully visible ===
  cy.get('._innerContainer_4chtm_18', { timeout: 15000 })
    .should('be.visible')
    .should('contain', '店休日')        // This confirms modal is ready
    .then(() => {
      cy.log('✅ Modal is fully loaded');
    });


  // Now safely click the type
  if (item.type === 'holiday') {
    cy.get('._innerContainer_4chtm_18 button')
      .filter((i, el) => el.innerText.trim().includes('店休日'))
      .first()
      .click({ force: true });
  } 
  else if (item.type === 'lastBusinessDay') {
    cy.get('._innerContainer_4chtm_18 button')
      .filter((i, el) => el.innerText.trim().includes('月末営業日'))
      .first()
      .click({ force: true });
  } 
  else if (item.type === 'other') {
    cy.get('._innerContainer_4chtm_18 button')
      .filter((i, el) => el.innerText.trim().includes('その他'))
      .first()
      .click({ force: true });

    cy.get('#title', { timeout: 10000 }).should('be.visible').should('not.be.disabled').clear().type(item.title);
  }

  cy.wait(3000);
    // cy.wait('@revalidate');

  cy.contains('button', '登録する', { timeout: 15000 })
  .should('be.visible')
  .and('not.be.disabled')
  .click();

  cy.wait(3000)

//   cy.contains(/登録完了|保存しました|完了/i, { timeout: 15000 })
    // .should('be.visible');
});


Cypress.Commands.add('loginAsOwner',()=>{
    cy.visit('https://qa-owner.hoslog.jp/login')
    cy.get('[name="LoginId"]').type('KBAL1218')
    cy.get('[name="password"]').type('Test@123')
    cy.contains('ログイン').click()
})