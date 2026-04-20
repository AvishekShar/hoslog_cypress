import schedules from '../fixtures/schedules.json';

describe('Owner Panel - Schedule Automation', () => {

  beforeEach(() => {
    cy.loginAsOwner()

    // Go to schedule page
    cy.get('a[href="/cp/schedule"]').should('be.visible').click()

    // Confirm page loaded
    cy.contains('スケジュール').should('be.visible')
  })

  it('Bulk set schedules from JSON', () => {

    schedules.forEach((item, index) => {

      cy.log(`📌 ${index + 1}/${schedules.length} → ${item.date} (${item.type})`)

      cy.setSchedule(item)

    })

    cy.log('🎉 All schedules registered successfully!')

    //Save button "Keep"
    //cy.get('[class="chakra-button css-1cdaf6g"]').click()

    //Save button "Pubic"
    cy.get('[class="chakra-button css-1uljld8"]').click()
  });

});