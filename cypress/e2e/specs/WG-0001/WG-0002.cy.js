import {HomePageMethods} from '../../pages/home-methods.pages';

const storyParentId = 'WG-0001';

describe('WG-0001: DatePicker', () => {
  let TestCase_1;
  before(() => {
    cy.fixture(`${storyParentId}/WG-0002.json`).then((data) => {
      TestCase_1 = data;
    });
  });

  it(`Test case: WG-0002 |
  Description: Verify flight information tab given have been displayed |
  Tags: @regression @sprint1 @wg-0001 @wg-0002`, () => {
    const data = TestCase_1;
    const homePageMethods = new HomePageMethods();

    homePageMethods.goTo();
    homePageMethods.passangersToTravel(data.homePage.passangers);
    homePageMethods.selectDepartureFrom(data.homePage.departureCity);
    homePageMethods.selectReturnFrom(data.homePage.returnCity);
    homePageMethods.selectFlightDate(
      data.homePage.departureDate.date,
      data.homePage.departureDate.type
    );
    homePageMethods.selectFlightDate(
      data.homePage.returnDate.date,
      data.homePage.returnDate.type
    );

    homePageMethods
      .getDepartureCityText()
      .should('include.text', data.homePage.departureCity);
    homePageMethods
      .getReturnCityText()
      .should('include.text', data.homePage.returnCity);
    homePageMethods
      .getPassangersText()
      .should('include.text', data.homePage.passangers);
    homePageMethods
      .getDepartureDateText()
      .should('include.text', data.homePage.departureDate.date);
    homePageMethods
      .getReturnDateText()
      .should('include.text', data.homePage.returnDate.date);
  });
});
