import {ActionsFactory} from '../utils/actions-factory.utils';
import {SupportFactory} from '../utils/support-factory.utils';

export class HomePageMethods {
  _homeContent;
  _selectPassengers;
  _buttonAddPassengers;
  _selectFlightFrom;
  _optionFlightFrom;
  _selectFlightTo;
  _optionFlightTo;
  _calendarDay;
  _selectDate;
  _actionsFactory;
  _supportFactory;

  constructor() {
    this._pageURL = 'https://www.wingo.com/';
    this._homeContent = '.content-home';
    this._selectPassengers = '#selectPasj';
    this._buttonAddPassengers = '.passenger #adultos ~ .bts-add .plus';
    this._selectFlightFrom = '.input-origen .styledSelectOrigen';
    this._optionFlightFrom = '#comboOrigen li[data-cod="${value}"]';
    this._selectFlightTo = '.input-destino .select-drop .select';
    this._optionFlightTo = '#comboDestino li[data-cod="${value}"]';
    this._selectDate = '.${value}';
    this._calendarDay =
      '//*[contains(@class, "${flightTypeValue}")]/div[contains(@class, "cont-calendar")]//table[contains(@class, "month1")]//div[contains(@class, "day") and not(contains(@class, "invalid"))][contains(text(),"${dayValue}")]';
    this._calendarYear =
      '.${flightTypeValue} .cont-calendar .month1 .select-wrapper:nth-child(2)';
    this._calendarMonth =
      '.${flightTypeValue} .cont-calendar .month1 .select-wrapper:nth-child(1)';
    this._calendarNextMonth =
      '.${flightTypeValue} .cont-calendar .month2 .next';
    this._buttonSearchFlight = '.btn-search';

    this._departureCityText = '.input-origen .styledSelectOrigen';
    this._returnCityText = '.input-destino .styledSelectDestino';
    this._passengersText = '#tPasajeros';
    this._departureDateText = '.info-select-start';
    this._returnDateText = '.info-select-end';

    this._actionsFactory = new ActionsFactory();
    this._supportFactory = new SupportFactory();
  }

  goTo() {
    cy.visit(this._pageURL);
    this._actionsFactory.waitVisible(this._homeContent);
  }

  passengersToTravel(passengersNumber) {
    if (passengersNumber < 2) return;
    this._actionsFactory.click(this._selectPassengers);
    for (let i = 0; i < passengersNumber - 1; i++) {
      this._actionsFactory.click(this._buttonAddPassengers);
    }
  }

  selectDepartureFrom(departureCityString) {
    this._actionsFactory.click(this._selectFlightFrom);
    this._actionsFactory.clickByArgument(
      this._optionFlightFrom,
      departureCityString
    );
  }

  selectReturnFrom(returnCityString) {
    this._actionsFactory.click(this._selectFlightTo);
    this._actionsFactory.clickByArgument(
      this._optionFlightTo,
      returnCityString
    );
  }

  selectFlightDate(dateString, type) {
    const scheduleTypes = ['departure', 'return'];
    const scheduleSelectorType =
      type.toLowerCase() == scheduleTypes[0] ? 'input-ida' : 'input-regreso';
    const parts = dateString.split('/'); // Split the date string by '/'
    const day = parseInt(parts[0], 10); // Parse the day as an integer
    const month = parseInt(parts[1], 10); // Parse the month as an integer
    const year = parseInt(parts[2], 10); // Parse the year as an integer

    const getMonthName = (monthNumber) => {
      const months = [
        'enero',
        'febrero',
        'marzo',
        'abril',
        'mayo',
        'junio',
        'julio',
        'augosto',
        'septiembre',
        'octubre',
        'noviembre',
        'diciembre',
      ];
      return months[monthNumber - 1].toString();
    };

    const selectDay = (day) => {
      cy.xpath(
        this._calendarDay
          .replace('${flightTypeValue}', scheduleSelectorType)
          .replace('${dayValue}', day)
      ).click({force: true});
    };

    const selectYear = (targetYear) => {
      cy.get(
        this._calendarYear.replace('${flightTypeValue}', scheduleSelectorType)
      ).then(($year) => {
        if (year === +$year.text()) {
          return;
        }
        cy.get(
          this._calendarNextMonth.replace(
            '${flightTypeValue}',
            scheduleSelectorType
          )
        )
          .parent()
          .click({
            force: true,
          });
        selectYear(targetYear);
      });
    };

    const selectMonth = (targetMonth) => {
      cy.get(
        this._calendarMonth.replace('${flightTypeValue}', scheduleSelectorType)
      ).then(($month) => {
        if (
          $month
            .text()
            .toLowerCase()
            .trim()
            .includes(getMonthName(+targetMonth).trim())
        ) {
          return;
        }
        cy.get(
          this._calendarNextMonth.replace(
            '${flightTypeValue}',
            scheduleSelectorType
          )
        )
          .parent()
          .click({
            force: true,
          });
        selectMonth(targetMonth);
      });
    };

    this._actionsFactory.click(
      this._selectDate.replace('${value}', scheduleSelectorType)
    );
    selectYear(year);
    selectMonth(month);
    selectDay(day);
  }

  getDepartureCityText() {
    return this._actionsFactory.getElement(this._departureCityText);
  }

  getReturnCityText() {
    return this._actionsFactory.getElement(this._returnCityText);
  }

  getPassengersText() {
    return this._actionsFactory.getElement(this._passengersText);
  }

  getDepartureDateText() {
    return this._actionsFactory.getElement(this._departureDateText);
  }

  getReturnDateText() {
    return this._actionsFactory.getElement(this._returnDateText);
  }
}
