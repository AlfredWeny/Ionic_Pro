import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GooMapsPage } from './goo-maps.page';

describe('GooMapsPage', () => {
  let component: GooMapsPage;
  let fixture: ComponentFixture<GooMapsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GooMapsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GooMapsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
