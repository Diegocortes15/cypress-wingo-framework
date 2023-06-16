import {ActionsFactory} from '../utils/actions-factory.utils';
import {SupportFactory} from '../utils/support-factory.utils';

export class CuztomizePageMethods {
  constructor() {
    this._actionsFactory = new ActionsFactory();
    this._supportFactory = new SupportFactory();
    this._inputPassengerName = '#name-1-${value}';
    this._inputPassengerLastName = '#lastname-1-${value}';
    this._selectPassengerGender = '#sex-input-1-${value}';
    this._inputPassengerEmail = '#email-1-${value}';
    this._inputPassengerEmailConfirm = '#email-confirm-1-${value}';
    this._inputPassengerPhone = '#phone-1-${value}';
    this._inputPassengerId = '#numero-1-${value}';
    this._inputPassengerBirthYear =
      '.passengers-page .content > div:nth-child(${value}) [name="year"]';
    this._inputPassengerBirthMonth =
      '.passengers-page .content > div:nth-child(${value}) [name="month"]';
    this._inputPassengerBirthDay =
      '.passengers-page .content > div:nth-child(${value}) [name="day"]';
    this._errorMessage = '.servicios .custom-experience ~ .ng-star-inserted';
  }

  fillPassengerName(passengerNumber, strValue) {
    this._actionsFactory.fillInputText(
      this._inputPassengerName.replace('${value}', passengerNumber),
      strValue
    );
  }

  fillPassengerLastName(passengerNumber, strValue) {
    this._actionsFactory.fillInputText(
      this._inputPassengerLastName.replace('${value}', passengerNumber),
      strValue
    );
  }

  fillPassengerLastName(passengerNumber, strValue) {
    this._actionsFactory.fillInputText(
      this._inputPassengerLastName.replace('${value}', passengerNumber),
      strValue
    );
  }

  selectPassengerGender(passengerNumber, strValue) {
    this._actionsFactory.selectByOption(
      this._selectPassengerGender.replace('${value}', passengerNumber),
      strValue
    );
  }

  fillPassengerEmail(passengerNumber, strValue) {
    this._actionsFactory.fillInputText(
      this._inputPassengerEmail.replace('${value}', passengerNumber),
      strValue
    );
  }

  fillPassengerEmailConfirmation(passengerNumber, strValue) {
    this._actionsFactory.fillInputText(
      this._inputPassengerEmailConfirm.replace('${value}', passengerNumber),
      strValue
    );
  }

  fillPassengerPhone(passengerNumber, strValue) {
    this._actionsFactory.fillInputText(
      this._inputPassengerPhone.replace('${value}', passengerNumber),
      strValue
    );
  }

  fillPassengerID(passengerNumber, strValue) {
    this._actionsFactory.fillInputText(
      this._inputPassengerId.replace('${value}', passengerNumber),
      strValue
    );
  }

  fillPassengerID(passengerNumber, strValue) {
    this._actionsFactory.fillInputText(
      this._inputPassengerId.replace('${value}', passengerNumber),
      strValue
    );
  }

  selectBirthDate(passengerNumber, birthDateString) {
    const parts = birthDateString.split('/'); // Split the date string by '/'
    const day = parseInt(parts[0], 10); // Parse the day as an integer
    const month = parseInt(parts[1], 10) - 1; // Parse the month as an integer
    const year = parseInt(parts[2], 10); // Parse the year as an integer

    this._actionsFactory.selectByOption(
      this._inputPassengerBirthYear.replace('${value}', passengerNumber + 1),
      year.toString()
    );
    this._actionsFactory.selectByOption(
      this._inputPassengerBirthMonth.replace('${value}', passengerNumber + 1),
      month.toString()
    );
    this._actionsFactory.selectByOption(
      this._inputPassengerBirthDay.replace('${value}', passengerNumber + 1),
      day.toString()
    );
  }

  fillPassengerData(passengerNumber, {customizePage: {passengers: data}}) {
    this.fillPassengerName(
      passengerNumber,
      data[passengerNumber - 1].firstName
    );
    this.fillPassengerLastName(
      passengerNumber,
      data[passengerNumber - 1].lastName
    );
    this.selectPassengerGender(
      passengerNumber,
      data[passengerNumber - 1].gender
    );
    this.selectBirthDate(passengerNumber, data[passengerNumber - 1].birthdate);
    this.fillPassengerID(passengerNumber, data[passengerNumber - 1].id);

    if (passengerNumber == 1) {
      this.fillPassengerEmail(passengerNumber, data[passengerNumber - 1].email);
      this.fillPassengerEmailConfirmation(
        passengerNumber,
        data[passengerNumber - 1].email
      );
      this.fillPassengerPhone(passengerNumber, data[passengerNumber - 1].phone);
    }
  }

  getErrorMessage() {
    return this._actionsFactory.getElement(this._errorMessage);
  }
}
