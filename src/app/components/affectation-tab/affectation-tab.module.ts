import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AffectationTabComponent } from './affectation-tab.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
    imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
    declarations: [AffectationTabComponent],
    exports: [AffectationTabComponent],
})
export class AffectationTabComponentModule {}
