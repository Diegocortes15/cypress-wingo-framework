import {SupportFactory} from './support-factory.utils';

export class ActionsFactory {
  _supportFactory;
  constructor() {
    this._supportFactory = new SupportFactory();
  }

  waitVisible(elementSelector) {
    cy.get(elementSelector).should('be.visible');
  }

  click(elementName) {
    //cy.get(elementName).scrollIntoView();
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

  visit(URL) {
    cy.visit(URL);
  }

  getElement(elementName) {
    return cy.get(elementName);
  }

  verifyIseElementLessThan(stringLowElement, stringHighElement) {
    this.getElement(stringLowElement).invoke('text').as('value1');
    this.getElement(stringHighElement).invoke('text').as('value2');

    cy.get('@value1').then((value1) => {
      cy.get('@value2').then((value2) => {
        expect(this._supportFactory.formatAmount(value1)).to.be.lessThan(
          this._supportFactory.formatAmount(value2)
        );
      });
    });
  }

  fillInputText(elementName, strValue) {
    cy.get(elementName).type(strValue, {
      force: true,
    });
  }

  selectByOption(elementName, strValue) {
    cy.get(elementName).select(strValue, {
      force: true,
    });
  }
}
