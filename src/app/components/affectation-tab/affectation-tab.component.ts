import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AffectationTab } from 'src/app/models/AffectionTab';

@Component({
    selector: 'app-affectation-tab',
    templateUrl: './affectation-tab.component.html',
    styleUrls: ['./affectation-tab.component.scss'],
})
export class AffectationTabComponent implements OnInit {
    @Input('affectationTab') affectationTab!: AffectationTab;
    @Output('resolveAffectation') resolveAffectation: EventEmitter<AffectationTab> = new EventEmitter();

    constructor() {}

    async ngOnInit() {}

    onResolve() {
        this.resolveAffectation.emit();
    }
}
