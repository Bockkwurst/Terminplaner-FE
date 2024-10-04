import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {
  CalendarA11y,
  CalendarDateFormatter,
  CalendarEventTitleFormatter,
  CalendarUtils,
  DateAdapter
} from 'angular-calendar';
import {routes} from './app.routes';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideHttpClient} from "@angular/common/http";
import {adapterFactory} from "angular-calendar/date-adapters/date-fns";
import {I18nPluralPipe} from "@angular/common";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(),
    CalendarUtils,
    CalendarA11y,
    I18nPluralPipe,
    {provide: DateAdapter, useFactory: adapterFactory},
    CalendarDateFormatter,
    CalendarEventTitleFormatter,
  ]
};
