import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef, HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'eo-time-picker2',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EoTimePicker2Component),
      multi: true,
    },
  ],
  templateUrl: './eo-time-picker2.component.html',
  styleUrls: ['./eo-time-picker2.component.css'],
})
export class EoTimePicker2Component implements ControlValueAccessor, OnInit {

  @Input() inputValue = '';
  @Input() placeholder = 'Время';
  @Input() errors;
  @Output() valueChanges: EventEmitter<string> = new EventEmitter<string>();

  disabled = false;

  timePickerIsVisible = false;
  visibleHours = [];
  visibleMinutes = [];
  selectedHour: number;
  selectedMinute: number;

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.hideTimePicker();
    }
  }

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    this.resetPickers();
  }

  resetPickers() {
    this.selectedHour = this.inputValue ? +this.inputValue.split(':')[0] : 12;
    this.selectedMinute = this.inputValue ? +this.inputValue.split(':')[1] : 0;
    this.setVisibleHours(this.selectedHour);
    this.setVisibleMinutes(this.selectedMinute);
  }

  setVisibleHours(selectedValue: number) {
    for (let i = 0; i < 5; i++) {
      let value = selectedValue - 2 + i;
      if (value < 0) {
        value = value + 24;
      }
      if (value > 23) {
        value = value - 24;
      }
      this.visibleHours[i] = value;
    }
  }

  setVisibleMinutes(selectedValue: number) {
    for (let i = 0; i < 5; i++) {
      let value = selectedValue - 2 + i;
      if (value < 0) {
        value = value + 60;
      }
      if (value > 59) {
        value = value - 60;
      }
      this.visibleMinutes[i] = value;
    }
  }

  timeChange = (_: any) => {
  };

  registerOnChange(fn: any): void {
    this.timeChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(time: string): void {
    this.inputValue = time;
    this.resetPickers();
  }

  onTimeSet(time) {
    this.inputValue = time;
    this.timeChange(this.inputValue);
    this.valueChanges.emit(this.inputValue);
  }

  maskFn(rawValue) {
    const mask = [/[0-2]/, /\d/, ':', /[0-5]/, /\d/];

    if (!rawValue) {
      return mask;
    }

    if (rawValue[0] === '2') {
      mask[1] = /[0-3]/;
    }

    return mask;
  }

  selectHour(hour: number) {
    let newValue = hour;
    if (newValue > 23) newValue = newValue - 24;
    if (newValue < 0) newValue = newValue + 24;
    this.selectedHour = newValue;
    this.setVisibleHours(this.selectedHour);
  }

  selectMinute(minute: number) {
    let newValue = minute;
    if (newValue > 59) newValue = newValue - 60;
    if (newValue < 0) newValue = newValue + 60;
    this.selectedMinute = newValue;
    this.setVisibleMinutes(this.selectedMinute);

  }

  okButtonClick() {
    const hours = this.selectedHour > 9 ? this.selectedHour : '0' + this.selectedHour;
    const minutes = this.selectedMinute > 9 ? this.selectedMinute : '0' + this.selectedMinute;
    this.onTimeSet(hours + ':' + minutes);
    this.hideTimePicker();
  }

  onHourWheel($event: any) {
    if ($event.deltaY > 0) {
      this.selectHour(this.selectedHour + 1);
    }
    if ($event.deltaY < 0) {
      this.selectHour(this.selectedHour - 1);
    }
  }

  onMinuteWheel($event: any) {
    if ($event.deltaY > 0) {
      this.selectMinute(this.selectedMinute + 1);
    }
    if ($event.deltaY < 0) {
      this.selectMinute(this.selectedMinute - 1);
    }
  }

  showTimePicker() {
    this.timePickerIsVisible = true;
  }

  hideTimePicker() {
    this.timePickerIsVisible = false;
  }

  onBlur(event) {
    this.inputValue = event.target.value;
    this.timeChange(this.inputValue);
    this.valueChanges.emit(this.inputValue);
  }

  shiftHours(value: number) {
    this.selectHour(this.selectedHour + value);
  }

  shiftMinutes(value: number) {
    this.selectMinute(this.selectedMinute + value);
  }
}
