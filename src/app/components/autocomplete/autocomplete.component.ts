import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IGenericModel } from 'src/app/models/generic.model';
import { IMarketDetails } from 'src/app/models/market.model';
import { IPagedResponse } from 'src/app/models/paged-response.model';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {
  searchTerm: string;
  resultData = [];
  selectedResult: IGenericModel;
  markets: IMarketDetails[] = [];
  selectedMarket: string;
  resultsPresent = false;

  constructor(private _searchService: SearchService) { }

  searchForm: FormGroup;

  ngOnInit(): void {
    this._searchService.getMarkets().subscribe(res => {
      this.markets = res.sort((a, b) => {
        const aname = a.state.toLowerCase();
        const bname = b.state.toLowerCase();
        if (aname > bname) return 1;
        if (aname < bname) return -1;

        return 0;
      });
    });
  }

  autoSearch(): void {
    if (this.searchTerm) {
      this._searchService.get({
        query: this.searchTerm,
        market: this.selectedMarket,
        pageIndex: 1,
        pageSize: 45
      }).subscribe((res: IPagedResponse<IGenericModel>) => {
        this.resultData = res.items;
        this.resultsPresent = this.resultData.length > 0;
      });
    }
  }

  selectChangeHandler(event: any): void {
    this.selectedMarket = event.target.value;
    if (this.searchTerm) {
      this.autoSearch();
    }
  }

  resultClickHandler(property: IGenericModel): void {
    this.selectedResult = property;
    this.searchTerm = property.name;
    this.resultsPresent = false;
  }

  clear(): void {
    this.searchTerm = '';
    this.resultsPresent = false;
  }

}
