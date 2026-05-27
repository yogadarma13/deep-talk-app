/**
 * - Register spec
 *   - should display register page correctly
 *   - should display alert when name is empty
 *   - should display alert when email is empty
 *   - should display alert when email is not valid
 *   - should display alert when password is empty
 *   - should display alert when email is already taken
 *   - should display alert and loginpage when name, email and password are correct
 */

describe('Register spec', () => {
  it('should display register page correctly', () => {
    cy.visit('http://localhost:5173/');

    cy.get('span').contains('Register').click();
    cy.get('label').contains('Name').should('be.visible');
    cy.get('label').contains('Email').should('be.visible');
    cy.get('label').contains('Password').should('be.visible');
    cy.get('input[data-testid="name-input"]').should('be.visible');
    cy.get('input[data-testid="email-input"]').should('be.visible');
    cy.get('input[data-testid="password-input"]').should('be.visible');
    cy.get('button').contains(/^Register$/).should('be.visible');
    cy.get('span').contains(/^Login$/).should('be.visible');
  });

  it('should display alert when name is empty', () => {
    cy.visit('http://localhost:5173/');

    cy.get('span').contains('Register').click();
    cy.get('button').contains(/^Register$/).click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"name" is not allowed to be empty');
    });
  });

  it('should display alert when email is empty', () => {
    cy.visit('http://localhost:5173/');

    cy.get('span').contains('Register').click();
    cy.get('input[data-testid="name-input"]').type('Name');
    cy.get('button').contains(/^Register$/).click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });

  it('should display alert when email is not valid', () => {
    cy.visit('http://localhost:5173/');

    cy.get('span').contains('Register').click();
    cy.get('input[data-testid="name-input"]').type('Name');
    cy.get('input[data-testid="email-input"]').type('Email');
    cy.get('button').contains(/^Register$/).click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" must be a valid email');
    });
  });

  it('should display alert when password is empty', () => {
    cy.visit('http://localhost:5173/');

    cy.get('span').contains('Register').click();
    cy.get('input[data-testid="name-input"]').type('Name');
    cy.get('input[data-testid="email-input"]').type('email@gmail.com');
    cy.get('button').contains(/^Register$/).click();
    
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('should display alert when email is already taken', () => {
    cy.visit('http://localhost:5173/');

    cy.get('span').contains('Register').click();
    cy.get('input[data-testid="name-input"]').type('Yoga');
    cy.get('input[data-testid="email-input"]').type('yogadev@gmail.com');
    cy.get('input[data-testid="password-input"]').type('123456');
    cy.get('button').contains(/^Register$/).click();
    
    cy.on('window:alert', (str) => {
      expect(str).to.equal('email is already taken');
    });
  });

  it('should display alert and loginpage when name, email and password are correct', () => {
    const randomNumber = Math.floor(Math.random() * 90000) + 10000;
    cy.visit('http://localhost:5173/');

    cy.get('span').contains('Register').click();
    cy.get('input[data-testid="name-input"]').type(`Name${randomNumber}`);
    cy.get('input[data-testid="email-input"]').type(`email${randomNumber}@gmail.com`);
    cy.get('input[data-testid="password-input"]').type('123456');
    cy.get('button').contains(/^Register$/).click();
    
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Successfully created an account');
    });
    cy.get('h2').contains('Deep Talk').should('be.visible');
    cy.get('h1').contains('Welcome Back').should('be.visible');
    cy.get('p').contains('Please login to continue').should('be.visible');
    cy.get('label').contains('Email').should('be.visible');
    cy.get('label').contains('Password').should('be.visible');
    cy.get('input[data-testid="email-input"]').should('be.visible');
    cy.get('input[data-testid="password-input"]').should('be.visible');
    cy.get('button').contains(/^Login$/).should('be.visible');
    cy.get('span').contains(/^Register$/).should('be.visible');
  });
})
