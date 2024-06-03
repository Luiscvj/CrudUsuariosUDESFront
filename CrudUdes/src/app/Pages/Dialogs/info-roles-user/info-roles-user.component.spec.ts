import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoRolesUserComponent } from './info-roles-user.component';

describe('InfoRolesUserComponent', () => {
  let component: InfoRolesUserComponent;
  let fixture: ComponentFixture<InfoRolesUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoRolesUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoRolesUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
