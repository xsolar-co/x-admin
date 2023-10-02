import {
  entityTableSelector,
  entityDetailsButtonSelector,
  entityDetailsBackButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityCreateCancelButtonSelector,
  entityEditButtonSelector,
  entityDeleteButtonSelector,
  entityConfirmDeleteButtonSelector,
} from '../../support/entity';

describe('Home e2e test', () => {
  const homePageUrl = '/home';
  const homePageUrlPattern = new RegExp('/home(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const homeSample = {};

  let home;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/homes+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/homes').as('postEntityRequest');
    cy.intercept('DELETE', '/api/homes/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (home) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/homes/${home.id}`,
      }).then(() => {
        home = undefined;
      });
    }
  });

  it('Homes menu should load Homes page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('home');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Home').should('exist');
    cy.url().should('match', homePageUrlPattern);
  });

  describe('Home page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(homePageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Home page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/home/new$'));
        cy.getEntityCreateUpdateHeading('Home');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', homePageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/homes',
          body: homeSample,
        }).then(({ body }) => {
          home = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/homes+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [home],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(homePageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Home page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('home');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', homePageUrlPattern);
      });

      it('edit button click should load edit Home page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Home');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', homePageUrlPattern);
      });

      it('edit button click should load edit Home page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Home');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', homePageUrlPattern);
      });

      it('last delete button click should delete instance of Home', () => {
        cy.intercept('GET', '/api/homes/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('home').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', homePageUrlPattern);

        home = undefined;
      });
    });
  });

  describe('new Home page', () => {
    beforeEach(() => {
      cy.visit(`${homePageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Home');
    });

    it('should create an instance of Home', () => {
      cy.get(`[data-cy="homeId"]`).type('Fresh hardware').should('have.value', 'Fresh hardware');

      cy.get(`[data-cy="homeDesc"]`).type('Credit').should('have.value', 'Credit');

      cy.get(`[data-cy="homeAddress"]`).type('Sleek').should('have.value', 'Sleek');

      cy.get(`[data-cy="lastUpdate"]`).type('clicks-and-mortar Chicken').should('have.value', 'clicks-and-mortar Chicken');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        home = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', homePageUrlPattern);
    });
  });
});
