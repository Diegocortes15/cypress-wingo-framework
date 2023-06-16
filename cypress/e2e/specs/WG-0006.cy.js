import {BookingPageMethods} from '../pages/booking-methods.pages';
import {CuztomizePageMethods} from '../pages/customize-methods.pages';

const storyParentId = 'WG-0006';

describe('WG-0006: Verify passengers information', () => {
  let TestCase_1;
  before(() => {
    cy.fixture(`${storyParentId}/WG-0007.json`).then((data) => {
      TestCase_1 = data;
    });
  });

  it(`Test case: WG-0007 |
  Description: Verify that the information of all passengers has been completed successfully |
  Tags: @regression @sprint2 @wg-0006 @wg-0007`, () => {
    const data = TestCase_1;
    const bookingPageMethods = new BookingPageMethods();
    const customizePageMethods = new CuztomizePageMethods();
    bookingPageMethods.goTo(data);
    bookingPageMethods.selectCheapestDepartureFlight();
    bookingPageMethods.selectCheapestReturnFlight();
    bookingPageMethods
      .getFirstDepartureFlightFareSelected()
      .should('include.text', data.bookingPage.fee);
    bookingPageMethods
      .getFirstReturnFlightFareSelected()
      .should('include.text', data.bookingPage.fee);
    bookingPageMethods.clickButtonContinue();
    customizePageMethods.fillPassengerData(1, data);
    customizePageMethods.fillPassengerData(2, data);
    customizePageMethods.getErrorMessage().should('not.exist');
  });
});
