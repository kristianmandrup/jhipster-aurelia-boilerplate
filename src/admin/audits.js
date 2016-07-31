import {inject} from 'aurelia-framework';
import $ from 'utils';
import AuditsService from '../services/audits_service'
import ParseLinks from 'parse_links';

@inject(AuditsService, ParseLinks)
export default class Audits {

  constructor(auditsService, parseLinks) {
    this.loadPage = loadPage;
    this.onChangeDate = onChangeDate;
    this.page = 1;
    this.previousMonth = previousMonth;
    this.today = today;
    this.today();
    this.previousMonth();
    this.onChangeDate();
  }

  // See $.filter at https://docs.angularjs.org/api/ng/filter/filter
  onChangeDate () {
      var dateFormat = 'yyyy-MM-dd';
      var fromDate = $.filter('date')(this.fromDate, dateFormat);
      var toDate = $.filter('date')(this.toDate, dateFormat);

      this.auditsService.query({page: this.page -1, size: 20, fromDate: fromDate, toDate: toDate}, function(result, headers){
          this.audits = result;
          this.links = this.parseLinks.parse(headers('link'));
          this.totalItems = headers('X-Total-Count');
      });
  }

  // Date picker configuration
  today () {
      // Today + 1 day - needed if the current day must be included
      var today = new Date();
      this.toDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
  }

  previousMonth () {
      var fromDate = new Date();
      if (fromDate.getMonth() === 0) {
          fromDate = new Date(fromDate.getFullYear() - 1, 11, fromDate.getDate());
      } else {
          fromDate = new Date(fromDate.getFullYear(), fromDate.getMonth() - 1, fromDate.getDate());
      }

      this.fromDate = fromDate;
  }

  loadPage (page) {
      this.page = page;
      this.onChangeDate();
  }
}
