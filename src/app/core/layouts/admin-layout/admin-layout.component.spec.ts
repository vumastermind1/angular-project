import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AdminLayoutComponent } from './admin-layout.component';
import { NavbarComponent } from '../../singletons/navbar/navbar.component';
import { SidebarComponent } from '../../singletons/sidebar/sidebar.component';
import { FooterComponent } from '../../singletons/footer/footer.component';

describe('AdminLayoutComponent', () => {
  let component: AdminLayoutComponent;
  let fixture: ComponentFixture<AdminLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AdminLayoutComponent, SidebarComponent, NavbarComponent, FooterComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
