describe('Upload and Process Flow', () => {
  it('uploads a file and displays results and download link', () => {
    cy.visit('/');
    cy.get('input[type="file"]').selectFile('cypress/fixtures/test.xlsx', { force: true });
    cy.contains('Upload & Process').click();
    cy.contains('Processing...').should('be.visible');
    cy.contains('Download Results').should('exist');
    cy.get('table').should('exist');
  });
});
