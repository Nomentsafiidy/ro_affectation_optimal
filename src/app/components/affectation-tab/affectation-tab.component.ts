import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AffectationTab } from 'src/app/models/AffectionTab';

@Component({
    selector: 'app-affectation-tab',
    templateUrl: './affectation-tab.component.html',
    styleUrls: ['./affectation-tab.component.scss'],
})
export class AffectationTabComponent implements OnInit {
    @Input('affectationTab') affectationTab!: AffectationTab;
    @Input('isDisplay') isDisplay!: boolean;
    @Output('resolveAffectation') resolveAffectation: EventEmitter<AffectationTab> = new EventEmitter();
    @Output('maxChange') maxChange: EventEmitter<number> = new EventEmitter();

    typeAffectations = [' Affectation Minimal', 'Affectation Maximal'];
    constructor() {}

    async ngOnInit() {}

    onResolve() {
        this.resolveAffectation.emit(this.affectationTab);
    }

    cellValueChange() {
        this.maxChange.emit(Math.max(...this.affectationTab.cells.map((cell) => cell.value)));
    }
}
