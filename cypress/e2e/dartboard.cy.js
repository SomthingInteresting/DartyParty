/* global cy */

describe('Dartboard Component', () => {
  beforeEach(() => {
      // Assuming your app is served at localhost:3000. Adjust if necessary.
      cy.visit('http://localhost:3000');
  });

  it('should display the dartboard', () => {
      cy.get('ul#board').should('be.visible');
  });

  it('should have the correct number of segments', () => {
      cy.get('ul#board li').should('have.length', 5);
  });

  it('should display darts after some delay', () => {
      // This waits for 2500ms, by which time the darts should have been displayed.
      cy.wait(2500);
      cy.get('ul#board li img').should('be.visible');
  });
});
