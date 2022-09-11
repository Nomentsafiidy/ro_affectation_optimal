import { Component, Input, OnInit } from '@angular/core';
import { AffectationTab } from 'src/app/models/AffectionTab';

@Component({
    selector: 'app-affectation-tab',
    templateUrl: './affectation-tab.component.html',
    styleUrls: ['./affectation-tab.component.scss'],
})
export class AffectationTabComponent implements OnInit {
    @Input('affectationTab') affectationTab!: AffectationTab;

    constructor() {}

    async ngOnInit() {
        console.log('this.affectationTab', this.affectationTab);
    }
}
