import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation
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
export class EoTimePicker2Component implements ControlValueAccessor, OnInit, AfterViewInit {

  @ViewChild('timePicker', {static: false}) timePicker;

  @Input() inputValue = '';
  @Input() placeholder = 'Время';
  @Input() minHour = 0;
  @Input() maxHour = 23;
  @Input() errors;
  @Output() timeChange: EventEmitter<string> = new EventEmitter<string>();

  disabled = false;

  hourIndex = 0;
  minuteIndex = 0;
  amountHours = 0;
  amountMinutes = 0;
  currTranslHours = [];
  currTranslMinutes = [];
  private translationComplete = true;
  moveOffset = 0;
  showTimePicker = false;
  hours = [];
  minutes = [];
  selectedHour = '00';
  selectedMinute = '00';
  timeValue = '00:00';

  constructor(private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    for (let i = 0; i < 60; i++) {
      // if (i % 5 === 0) {
      if (i < 10) {
        this.minutes.push('0' + i);
      } else {
        this.minutes.push('' + i);
      }
      // }
    }
    for (let i = this.minHour; i <= this.maxHour; i++) {
      if (i < 10) {
        this.hours.push('0' + i);
      } else {
        this.hours.push('' + i);
      }
    }
  }

  ngAfterViewInit(): void {
    this.moveOffset = parseInt(window.getComputedStyle(
      this.elementRef.nativeElement.querySelector('.hour-slide')).height, 10
    );

    const hoursCarousel = this.elementRef.nativeElement.querySelector('#hours-carousel');
    const hourSlides = this.elementRef.nativeElement.querySelectorAll('.hour-slide');
    this.amountHours = hourSlides.length;

    hoursCarousel.style.width = (this.amountHours * this.moveOffset) + 'px';
    for (let i = 0; i < this.amountHours; i++) {
      this.currTranslHours[i] = -this.moveOffset;
      hourSlides[i].addEventListener('transitionend', this.transitionCompleted.bind(this), true);
      hourSlides[i].addEventListener('webkitTransitionEnd', this.transitionCompleted.bind(this), true);
      hourSlides[i].addEventListener('oTransitionEnd', this.transitionCompleted.bind(this), true);
      hourSlides[i].addEventListener('MSTransitionEnd', this.transitionCompleted.bind(this), true);
    }
    hoursCarousel.insertBefore(hoursCarousel.children[hourSlides.length - 1], hoursCarousel.children[0]);

    const minutesCarousel = this.elementRef.nativeElement.querySelector('#minutes-carousel');
    const minuteSlides = this.elementRef.nativeElement.querySelectorAll('.minute-slide');
    this.amountMinutes = minuteSlides.length;

    minutesCarousel.style.width = (this.amountMinutes * this.moveOffset) + 'px';
    for (let i = 0; i < this.amountMinutes; i++) {
      this.currTranslMinutes[i] = -this.moveOffset;
      minuteSlides[i].addEventListener('transitionend', this.transitionCompleted.bind(this), true);
      minuteSlides[i].addEventListener('webkitTransitionEnd', this.transitionCompleted.bind(this), true);
      minuteSlides[i].addEventListener('oTransitionEnd', this.transitionCompleted.bind(this), true);
      minuteSlides[i].addEventListener('MSTransitionEnd', this.transitionCompleted.bind(this), true);
    }
    minutesCarousel.insertBefore(minutesCarousel.children[minuteSlides.length - 1], minutesCarousel.children[0]);
  }

  registerOnChange(fn: any): void {
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState(isDisabled: boolean): void {
  }

  writeValue(time: string): void {
    this.inputValue = time;
  }

  onTimeSet(time) {
    this.inputValue = time;
    this.timeChange.emit(this.inputValue);
  }

  transitionCompleted() {
    this.translationComplete = true;
  }

  prevHour() {
    if (this.translationComplete) {
      this.translationComplete = false;
      this.hourIndex--;
      if (this.hourIndex === -1) {
        this.hourIndex = this.amountHours - 1;
      }
      const hourSlides = this.elementRef.nativeElement.querySelectorAll('.hour-slide');
      const outerIndex = (this.hourIndex) % this.amountHours;
      for (let i = 0; i < this.amountHours; i++) {
        const slide = hourSlides[i];
        slide.style.opacity = '1';
        slide.style.transform = 'translateY(' + (this.currTranslHours[i] + this.moveOffset) + 'px)';
        this.currTranslHours[i] = this.currTranslHours[i] + this.moveOffset;
      }
      const outerSlide = hourSlides[outerIndex];
      outerSlide.style.transform = 'translateY(' + (this.currTranslHours[outerIndex] - (this.moveOffset * this.amountHours)) + 'px)';
      outerSlide.style.opacity = '0';
      this.currTranslHours[outerIndex] = this.currTranslHours[outerIndex] - this.moveOffset * (this.amountHours);
    }
  }

  nextHour() {
    if (this.translationComplete) {
      this.translationComplete = false;
      const outerIndex = (this.hourIndex) % this.amountHours;
      this.hourIndex++;
      const slides = this.elementRef.nativeElement.querySelectorAll('.hour-slide');
      for (let i = 0; i < this.amountHours; i++) {
        const slide = slides[i];
        slide.style.opacity = '1';
        slide.style.transform = 'translateY(' + (this.currTranslHours[i] - this.moveOffset) + 'px)';
        this.currTranslHours[i] = this.currTranslHours[i] - this.moveOffset;
      }

      const outerSlide = slides[outerIndex];
      outerSlide.style.transform = 'translateY(' + (this.currTranslHours[outerIndex] + (this.moveOffset * this.amountHours)) + 'px)';
      outerSlide.style.opacity = '0';
      this.currTranslHours[outerIndex] = this.currTranslHours[outerIndex] + this.moveOffset * (this.amountHours);
    }
  }

  prevMinute() {
    if (this.translationComplete) {
      this.translationComplete = false;
      this.minuteIndex--;
      if (this.minuteIndex === -1) {
        this.minuteIndex = this.amountMinutes - 1;
      }
      const minuteSlides = this.elementRef.nativeElement.querySelectorAll('.minute-slide');
      const outerIndex = (this.minuteIndex) % this.amountMinutes;
      for (let i = 0; i < this.amountMinutes; i++) {
        const slide = minuteSlides[i];
        slide.style.opacity = '1';
        slide.style.transform = 'translateY(' + (this.currTranslMinutes[i] + this.moveOffset) + 'px)';
        this.currTranslMinutes[i] = this.currTranslMinutes[i] + this.moveOffset;
      }

      const outerSlide = minuteSlides[outerIndex];
      outerSlide.style.transform = 'translateY(' + (this.currTranslMinutes[outerIndex] - (this.moveOffset * this.amountMinutes)) + 'px)';
      outerSlide.style.opacity = '0';
      this.currTranslMinutes[outerIndex] = this.currTranslMinutes[outerIndex] - this.moveOffset * (this.amountMinutes);
    }
  }

  nextMinute() {
    if (this.translationComplete) {
      this.translationComplete = false;
      const outerIndex = (this.minuteIndex) % this.amountMinutes;
      this.minuteIndex++;
      const minuteSlides = this.elementRef.nativeElement.querySelectorAll('.minute-slide');
      for (let i = 0; i < this.amountMinutes; i++) {
        const slide = minuteSlides[i];
        slide.style.opacity = '1';
        slide.style.transform = 'translateY(' + (this.currTranslMinutes[i] - this.moveOffset) + 'px)';
        this.currTranslMinutes[i] = this.currTranslMinutes[i] - this.moveOffset;
      }

      const outerSlide = minuteSlides[outerIndex];
      outerSlide.style.transform = 'translateY(' + (this.currTranslMinutes[outerIndex] + (this.moveOffset * this.amountMinutes)) + 'px)';
      outerSlide.style.opacity = '0';
      this.currTranslMinutes[outerIndex] = this.currTranslMinutes[outerIndex] + this.moveOffset * (this.amountMinutes);
    }
  }

  onFocus() {
    this.timePicker.nativeElement.style.display = 'block';
    this.showTimePicker = true;
  }


  onBlur(event: FocusEvent) {
    // this.timePicker.nativeElement.style.display = 'none';
    // this.showTimePicker = false;

    // this.inputValue = event.target.value;
    // this.propagateChange(this.inputValue);
    // this.valueChanges.emit(this.inputValue);
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

  selectMinute(minute: string) {
    this.selectedMinute = minute;
  }

  selectHour(hour: string) {
    this.selectedHour = hour;
  }

  okButtonClick() {

  }

  cancelButtonClick() {
  }

  onHourWheel($event: any) {
    if ($event.deltaY > 0) {
      this.nextHour();
    }
    if ($event.deltaY < 0) {
      this.prevHour();
    }
  }

  onMinuteWheel($event: any) {
    if ($event.deltaY > 0) {
      this.nextMinute();
    }
    if ($event.deltaY < 0) {
      this.prevMinute();
    }
  }


}
