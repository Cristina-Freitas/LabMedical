import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideEnvironmentNgxMask } from 'ngx-mask';

import { EstatisticaComponent } from './estatistica.component';

describe('EstatisticaComponent', () => {
  let component: EstatisticaComponent;
  let fixture: ComponentFixture<EstatisticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstatisticaComponent],
      providers: [provideRouter([]), provideHttpClient(), provideNoopAnimations(), provideEnvironmentNgxMask()],
    }).compileComponents();

    fixture = TestBed.createComponent(EstatisticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
