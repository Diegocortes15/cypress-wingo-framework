import {ActionsFactory} from '../utils/actions-factory.utils';
import {SupportFactory} from '../utils/support-factory.utils';

export class BookingPageMethods {
  _pageURL;
  _actionsFactory;
  _supportFactory;
  _faresContent;

  constructor() {
    this._pageURL =
      'https://booking.wingo.com/es/search/${departureCity}/${returnCity}/${formatDepartureDate}/${formatReturnDate}/${passangers}/0/0/0/COP/0/0';
    this._faresContent = '.tarifas .content';
    this._firstDepartureFlight = '#vuelos-ida > div:nth-child(1)';
    this._departureGoBasicCard =
      '#vuelos-ida .card  .card-list-bundle > .bundle-container:nth-child(1)';
    this._firstDepartureFlightFareSelected =
      '#vuelos-ida > div:nth-child(1) > div > div > div:nth-child(4) .mt-2.small .font-weight-bold';

    this._firstReturnFlight = '#vuelos-regreso > div:nth-child(1)';
    this._returnGoBasicCard =
      '#vuelos-regreso .card  .card-list-bundle > .bundle-container:nth-child(1)';
    this._firstReturnFlightFareSelected =
      '#vuelos-regreso > div:nth-child(1) > div > div > div:nth-child(4) .mt-2.small .font-weight-bold';

    this._departureGoBasicAmount =
      '#vuelos-regreso .card  .card-list-bundle > .bundle-container:nth-child(1) .price-bundle';
    this._departureGoPlusAmount =
      '#vuelos-regreso .card  .card-list-bundle > .bundle-container:nth-child(2) .price-bundle';
    this._departureGoPremiumAmount =
      '#vuelos-regreso .card  .card-list-bundle > .bundle-container:nth-child(3) .price-bundle';

    this._buttonContinue = '.continue ,btn-continuar';

    this._actionsFactory = new ActionsFactory();
    this._supportFactory = new SupportFactory();
  }

  goTo(dataJson) {
    const formatDepartureDate = this._supportFactory.formatDate(
      dataJson.homePage.departureDate.date
    );
    const formatReturnDate = this._supportFactory.formatDate(
      dataJson.homePage.returnDate.date
    );
    this._actionsFactory.visit(
      `https://booking.wingo.com/es/search/${dataJson.homePage.departureCity}/${dataJson.homePage.returnCity}/${formatDepartureDate}/${formatReturnDate}/${dataJson.homePage.passangers}/0/0/0/COP/0/0`
    );
    this._actionsFactory.waitVisible(this._faresContent);
  }

  selectCheapestDepartureFlight() {
    this._actionsFactory.click(this._firstDepartureFlight);
    this._actionsFactory.click(this._departureGoBasicCard);
  }

  selectCheapestReturnFlight() {
    this._actionsFactory.click(this._firstReturnFlight);
    this._actionsFactory.click(this._returnGoBasicCard);
  }

  getFirstDepartureFlightFareSelected() {
    return this._actionsFactory.getElement(
      this._firstDepartureFlightFareSelected
    );
  }

  getFirstReturnFlightFareSelected() {
    return this._actionsFactory.getElement(this._firstReturnFlightFareSelected);
  }

  verifyIsDepartureGoBasicLessThanGoPlus() {
    this._actionsFactory.click(this._firstDepartureFlight);
    this._actionsFactory
      .getElement(this._departureGoBasicAmount)
      .invoke('text')
      .as('goBasicAmount');
    this._actionsFactory
      .getElement(this._departureGoPlusAmount)
      .invoke('text')
      .as('goPlusAmount');

    cy.get('@goBasicAmount').then((goBasicAmount) => {
      cy.get('@goPlusAmount').then((goPlusAmount) => {
        expect(this._supportFactory.formatAmount(goBasicAmount)).to.be.lessThan(
          this._supportFactory.formatAmount(goPlusAmount)
        );
      });
    });
  }

  verifyIsDepartureGoBasicLessThanGoPlus() {
    this._actionsFactory.verifyIseElementLessThan(
      this._departureGoBasicAmount,
      this._departureGoPlusAmount
    );
  }

  verifyIsDepartureGoPlusLessThanGoPremium() {
    this._actionsFactory.verifyIseElementLessThan(
      this._departureGoPlusAmount,
      this._departureGoPremiumAmount
    );
  }
}
