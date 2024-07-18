const BASE_URL = 'http://localhost:4000';
const BUN = `[data-cy = '643d69a5c3f7b9001cfa093d']`;
const INGREDIENT = `[data-cy = '643d69a5c3f7b9001cfa093e']`;

describe('[1] Проверяем работу конструктора', () => {
  beforeEach(() => {
    cy.visit(BASE_URL);
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
  });
  it('Проверям добавление булки и начинки', () => {
    cy.get(BUN).children('button').click();
    cy.get(INGREDIENT).children('button').click();
    cy.get('[data-cy="constructor"]').contains('Флюоресцентная булка R2-D3');
    cy.get('[data-cy="constructor"]').contains(
      'Филе Люминесцентного тетраодонтимформа'
    );
  });
});

describe('[2] Проверяем работу модального окна с ифнормацией по ингредиенту', () => {
  beforeEach(() => {
    cy.visit(BASE_URL);
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
  });
  it('Проверяем открытие модального окна', () => {
    cy.get(BUN).click();
    cy.get('[data-cy= "modal"]').should('be.visible');
  });
  it('Проверяем закрытие модального окна по нажатию на кнопку', () => {
    cy.get(BUN).click();
    cy.get('[data-cy="modal-close"]').click();
    cy.get('[data-cy= "modal"]').should('not.exist');
  });
  it('Проверяем закрытие модального окна по нажатию на оверлей', () => {
    cy.get(BUN).click();
    cy.get('[data-cy= "overlay"]').click({ force: true });
    cy.get('[data-cy= "modal"]').should('not.exist');
  });
  it('Проверяем корректность данных выбранного ингредиента в модальном окне', () => {
    cy.get(BUN).click();
    cy.get('[data-cy= "modal"]').contains('Флюоресцентная булка R2-D3');
  });
});

describe('[3] Проверяем оформление заказа', () => {
  beforeEach(() => {
    cy.setCookie('accessToken', 'test-accessToken');
    localStorage.setItem('refreshToken', 'test-refreshToken');
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' });
    cy.visit(BASE_URL);
  });
  afterEach(() => {
    cy.clearCookies();
    localStorage.clear();
  });
  it('Проверям оформление заказа и закрытие по кнопке', () => {
    cy.get(BUN).children('button').click();
    cy.get(INGREDIENT).children('button').click();
    cy.get(INGREDIENT).children('button').click();
    cy.get('button').contains('Оформить заказ').click();
    cy.get('[data-cy="orderNumber"]').should('contain.text', '45777');
    cy.get('[data-cy="modal-close"]').click();
    cy.get('[data-cy="bun1"]').contains('Выберите булки').should('exist');
    cy.get('[data-cy="ingredient"]')
      .contains('Выберите начинку')
      .should('exist');
    cy.get('[data-cy="bun2"]').contains('Выберите булки').should('exist');
  });
});
