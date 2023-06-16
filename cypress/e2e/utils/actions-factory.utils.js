export class ActionsFactory {
  waitVisible(elementSelector) {
    cy.get(elementSelector).should('be.visible');
  }

  click(elementName) {
    cy.get(elementName).scrollIntoView();
    cy.get(elementName).click({
      force: true,
    });
  }

  clickByArgument(elementName, argument) {
    cy.get(elementName.replace('${value}', argument)).scrollIntoView();
    cy.get(elementName.replace('${value}', argument)).click({
      force: true,
    });
  }

  getElement(elementName) {
    return cy.get(elementName);
  }
}
