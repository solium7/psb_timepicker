import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EoTimePicker2Component} from './eo-time-picker2.component';
import {
  MatAutocompleteModule, MatBadgeModule, MatButtonModule, MatButtonToggleModule, MatCardModule,
  MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatDividerModule, MatExpansionModule,
  MatFormFieldModule, MatIconModule,
  MatInputModule, MatListModule,
  MatMenuModule, MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule,
  MatSelectModule, MatSidenavModule, MatSlideToggleModule, MatSortModule, MatTableModule, MatTabsModule, MatTooltipModule, MatTreeModule
} from '@angular/material';
import {TextMaskModule} from 'angular2-text-mask';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


@NgModule({
  declarations: [EoTimePicker2Component],
  imports: [
    CommonModule,
    // material
    MatCheckboxModule,
    MatMenuModule,
    MatSelectModule,
    MatInputModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatChipsModule,
    MatDialogModule,
    MatTreeModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatDividerModule,
    MatSidenavModule,
    MatCardModule,
    MatRadioModule,
    MatListModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatTableModule,
    MatSortModule,
    MatTabsModule,
    MatTooltipModule,
    MatBadgeModule,
    TextMaskModule,
    BrowserAnimationsModule,
  ],
  exports: [EoTimePicker2Component]
})
export class EoTimePicker2Module {
}
