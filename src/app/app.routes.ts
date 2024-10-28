import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ReportsComponent } from './reports/reports.component';
import { DirectorsReportComponent } from './directors-report/directors-report.component';
import { DrivingScoreCardComponent } from './driving-score-card/driving-score-card.component';
import { VehicleHealthComponent } from './vehicle-health/vehicle-health.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    {path:"", component:HomeComponent},
    {path:"home", component:HomeComponent},
    {path:"health", component:VehicleHealthComponent},
    {path:"score-card", component:DrivingScoreCardComponent},
    {path:"dir-report", component:DirectorsReportComponent},
    {path:"login", component:LoginComponent},
    {path:"reports", component:ReportsComponent},
    {path:"**", component:NotFoundComponent}
];
