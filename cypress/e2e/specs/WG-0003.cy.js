import {BookingPageMethods} from '../pages/booking-methods.pages';

const storyParentId = 'WG-0003';

describe('WG-0003: Verify flights amounts stage', () => {
  let TestCase_1;
  let TestCase_2;
  before(() => {
    cy.fixture(`${storyParentId}/WG-0004.json`).then((data) => {
      TestCase_1 = data;
    });
    cy.fixture(`${storyParentId}/WG-0005.json`).then((data) => {
      TestCase_2 = data;
    });
  });

  it(`Test case: WG-0004 |
  Description: Verify GoBasic fee has been selected |
  Tags: @regression @sprint1 @wg-0003 @wg-0004`, () => {
    const data = TestCase_1;
    const bookingPageMethods = new BookingPageMethods();
    bookingPageMethods.goTo(data);
    bookingPageMethods.selectCheapestDepartureFlight();
    bookingPageMethods.selectCheapestReturnFlight();
    bookingPageMethods
      .getFirstDepartureFlightFareSelected()
      .should('include.text', data.bookingPage.fee);
    bookingPageMethods
      .getFirstReturnFlightFareSelected()
      .should('include.text', data.bookingPage.fee);
  });

  it(`Test case: WG-0005 |
  Description: Verify GoBasic fee is the cheapest fee |
  Tags: @regression @sprint2 @wg-0003 @wg-0005`, () => {
    const data = TestCase_2;
    const bookingPageMethods = new BookingPageMethods();
    bookingPageMethods.goTo(data);
    bookingPageMethods.selectCheapestDepartureFlight();
    bookingPageMethods.selectCheapestReturnFlight();
    bookingPageMethods.verifyIsDepartureGoBasicLessThanGoPlus();
    bookingPageMethods.verifyIsDepartureGoPlusLessThanGoPremium();
  });
});
