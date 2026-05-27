/**
 * - Add Thread spec
 *   - should display add thread page correctly
 *   - should display alert when title is empty
 *   - should display alert when body is empty
 *   - should display alert when add thread success
 */

describe('Add Thread spec', () => {
  it('should display add thread page correctly', () => {
    cy.visit('http://localhost:5173/');

    cy.get('input[data-testid="email-input"]').type('yogadev@gmail.com');
    cy.get('input[data-testid="password-input"]').type('123456');
    cy.get('button').contains('Login').click();
    cy.get('a').contains('+ Create Thread').click()

    cy.get('h1').contains('Create Thread').should('be.visible');
    cy.get('p').contains('Share your thoughts with everyone').should('be.visible');
    cy.get('label').contains('Title').should('be.visible');
    cy.get('label').contains('Category').should('be.visible');
    cy.get('label').contains('Description').should('be.visible');
    cy.get('input[data-testid="title"]').should('be.visible');
    cy.get('input[data-testid="category"]').should('be.visible');
    cy.get('div[data-testid="body"]').should('be.visible');
    cy.get('button').contains('Post Thread').should('be.visible');
  });

  it('should display alert when title is empty', () => {
    cy.on('window:alert', cy.stub().as('alert'));
    cy.visit('http://localhost:5173/');

    cy.get('input[data-testid="email-input"]').type('yogadev@gmail.com');
    cy.get('input[data-testid="password-input"]').type('123456');
    cy.get('button').contains('Login').click();

    cy.get('a').contains('+ Create Thread').click()
    cy.get('button').contains('Post Thread').click()

    cy.get('@alert').should('have.been.calledTwice');
    cy.get('@alert').then((stub) => {
        expect(stub.getCall(0)).to.be.calledWith('Welcome, Yoga');
        expect(stub.getCall(1)).to.be.calledWith('"title" is not allowed to be empty');
    });
  });

  it('should display alert when body is empty', () => {
    cy.on('window:alert', cy.stub().as('alert'));
    cy.visit('http://localhost:5173/');

    cy.get('input[data-testid="email-input"]').type('yogadev@gmail.com');
    cy.get('input[data-testid="password-input"]').type('123456');
    cy.get('button').contains('Login').click();

    cy.get('a').contains('+ Create Thread').click()
    cy.get('input[data-testid="title"]').type('Title');
    cy.get('button').contains('Post Thread').click()

    cy.get('@alert').should('have.been.calledTwice');
    cy.get('@alert').then((stub) => {
        expect(stub.getCall(0)).to.be.calledWith('Welcome, Yoga');
        expect(stub.getCall(1)).to.be.calledWith('"body" is not allowed to be empty');
    });
  });

  it('should display alert when add thread success', () => {
    cy.on('window:alert', cy.stub().as('alert'));
    cy.visit('http://localhost:5173/');

    cy.get('input[data-testid="email-input"]').type('yogadev@gmail.com');
    cy.get('input[data-testid="password-input"]').type('123456');
    cy.get('button').contains('Login').click();

    cy.get('a').contains('+ Create Thread').click()
    cy.get('input[data-testid="title"]').type('Title');
    cy.get('input[data-testid="category"]').type('general');
    cy.get('div[data-testid="body"]').type('Description');
    cy.get('button').contains('Post Thread').click()

    cy.get('@alert').should('have.been.calledTwice');
    cy.get('@alert').then((stub) => {
        expect(stub.getCall(0)).to.be.calledWith('Welcome, Yoga');
        expect(stub.getCall(1)).to.be.calledWith('Thread added successfully');
    });
  });
})