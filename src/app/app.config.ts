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
import {HTTP_INTERCEPTORS, provideHttpClient} from "@angular/common/http";
import {adapterFactory} from "angular-calendar/date-adapters/date-fns";
import {I18nPluralPipe} from "@angular/common";
import {JwtInterceptor} from "../services/jwt-interceptor.service";
import {AuthService} from "../services/Auth.service";

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
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, deps: [AuthService], multi: true},
  ]
};
