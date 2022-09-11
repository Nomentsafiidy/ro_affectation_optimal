import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AffectationTabComponent } from './affectation-tab.component';
@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [AffectationTabComponent],
    exports: [AffectationTabComponent],
})
export class AffectationTabComponentModule {}
