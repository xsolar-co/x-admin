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

describe('Device e2e test', () => {
  const devicePageUrl = '/device';
  const devicePageUrlPattern = new RegExp('/device(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const deviceSample = {};

  let device;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/devices+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/devices').as('postEntityRequest');
    cy.intercept('DELETE', '/api/devices/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (device) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/devices/${device.id}`,
      }).then(() => {
        device = undefined;
      });
    }
  });

  it('Devices menu should load Devices page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('device');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('Device').should('exist');
    cy.url().should('match', devicePageUrlPattern);
  });

  describe('Device page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(devicePageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create Device page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/device/new$'));
        cy.getEntityCreateUpdateHeading('Device');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', devicePageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/devices',
          body: deviceSample,
        }).then(({ body }) => {
          device = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/devices+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              body: [device],
            }
          ).as('entitiesRequestInternal');
        });

        cy.visit(devicePageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details Device page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('device');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', devicePageUrlPattern);
      });

      it('edit button click should load edit Device page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Device');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', devicePageUrlPattern);
      });

      it('edit button click should load edit Device page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('Device');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', devicePageUrlPattern);
      });

      it('last delete button click should delete instance of Device', () => {
        cy.intercept('GET', '/api/devices/*').as('dialogDeleteRequest');
        cy.get(entityDeleteButtonSelector).last().click();
        cy.wait('@dialogDeleteRequest');
        cy.getEntityDeleteDialogHeading('device').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', devicePageUrlPattern);

        device = undefined;
      });
    });
  });

  describe('new Device page', () => {
    beforeEach(() => {
      cy.visit(`${devicePageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('Device');
    });

    it('should create an instance of Device', () => {
      cy.get(`[data-cy="deviceID"]`).type('back-end').should('have.value', 'back-end');

      cy.get(`[data-cy="deviceName"]`).type('Mariana known').should('have.value', 'Mariana known');

      cy.get(`[data-cy="deviceType"]`).type('Principal').should('have.value', 'Principal');

      cy.get(`[data-cy="deviceDesc"]`).type('parsing partnerships').should('have.value', 'parsing partnerships');

      cy.get(`[data-cy="deviceStatus"]`).type('input').should('have.value', 'input');

      cy.get(`[data-cy="mqttServerName"]`).type('Music RAM calculating').should('have.value', 'Music RAM calculating');

      cy.get(`[data-cy="mqttServerTopic"]`).type('Credit').should('have.value', 'Credit');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        device = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', devicePageUrlPattern);
    });
  });
});
