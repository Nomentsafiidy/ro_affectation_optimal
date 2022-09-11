import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomePageRoutingModule } from "./home-routing.module";
import { HomePage } from "./home.page";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HeaderComponentModule } from "src/app/components/header/header.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HomePageRoutingModule,
    ReactiveFormsModule,
    HeaderComponentModule,
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
