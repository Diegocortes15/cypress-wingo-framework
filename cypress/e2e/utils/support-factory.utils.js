export class SupportFactory {
  formatDate(dateString) {
    var parts = dateString.split('/');
    var formattedDate = parts[2] + '-' + parts[1] + '-' + parts[0];
    return formattedDate;
  }

  formatAmount(amount) {
    const numericString = amount.replace(/\D/g, '');
    const numericValue = parseInt(numericString, 10);
    return numericValue;
  }
}
