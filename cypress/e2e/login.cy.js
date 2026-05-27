/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when email is empty
 *   - should display alert when email is not valid
 *   - should display alert when password is empty
 *   - should display alert when email and password are wrong
 *   - should display alert and homepage when email and password are correct
 */

describe('Login spec', () => {
  it('should display login page correctly', () => {
    cy.visit('http://localhost:5173/');

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

  it('should display alert when email is empty', () => {
    cy.visit('http://localhost:5173/');

    cy.get('button').contains(/^Login$/).click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });

  it('should display alert when email is not valid', () => {
    cy.visit('http://localhost:5173/');

    cy.get('input[data-testid="email-input"]').type('tes');
    cy.get('button').contains(/^Login$/).click();
    
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"email" must be a valid email');
    });
  });

  it('should display alert when password is empty', () => {
    cy.visit('http://localhost:5173/');

    cy.get('input[data-testid="email-input"]').type('tes@gmail.com');
    cy.get('button').contains(/^Login$/).click();
    
    cy.on('window:alert', (str) => {
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('should display alert when email and password are wrong', () => {
    cy.visit('http://localhost:5173/');

    cy.get('input[data-testid="email-input"]').type('tes12321@gmail.com');
    cy.get('input[data-testid="password-input"]').type('123');
    cy.get('button').contains(/^Login$/).click();
    
    cy.on('window:alert', (str) => {
      expect(str).to.equal('email or password is wrong');
    });
  });

  it('should display alert and homepage when email and password are correct', () => {
    cy.visit('http://localhost:5173/');

    cy.get('input[data-testid="email-input"]').type('yogadev@gmail.com');
    cy.get('input[data-testid="password-input"]').type('123456');
    cy.get('button').contains(/^Login$/).click();
    
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Welcome, Yoga');
    });
    cy.get('h1').contains('Deep Talk').should('be.visible');
    cy.get('p').contains('Share your thoughts with everyone').should('be.visible');
    cy.get('a').contains('+ Create Thread').should('be.visible');
    cy.get('a').contains('Leaderboards').should('be.visible');
    cy.get('a').contains('Logout').should('be.visible');
  });
})
