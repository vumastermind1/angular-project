import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import { Location, PopStateEvent } from '@angular/common';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import 'rxjs/add/operator/filter';
import PerfectScrollbar from 'perfect-scrollbar';
import { AnimationService } from '../../services';

@Component({
  selector: 'flikshop-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit, AfterViewInit {
  private lastPoppedUrl: string;
  private yScrollStack: number[] = [];

  constructor(
    public location: Location,
    private router: Router,
    private renderer: Renderer2,
    private animationService: AnimationService
  ) { }

  ngOnInit() {
    const isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;

    if (isWindows && !document.body.classList.contains('sidebar-mini')) {
      // if we are on windows OS we activate the perfectScrollbar function
      document.body.classList.add('perfect-scrollbar-on');
    } else {
      document.body.classList.remove('perfect-scrollbar-off');
    }

    const elemMainPanel = document.querySelector('.main-panel') as HTMLElement;
    const elemSidebar = document.querySelector('.sidebar .sidebar-wrapper') as HTMLElement;

    this.location.subscribe((ev: PopStateEvent) => {
      this.lastPoppedUrl = ev.url;
    });

    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        if (event.url !== this.lastPoppedUrl) {
          this.yScrollStack.push(window.scrollY);
        }
      } else if (event instanceof NavigationEnd) {
        if (event.url === this.lastPoppedUrl) {
          this.lastPoppedUrl = undefined;
          window.scrollTo(0, this.yScrollStack.pop());
        } else {
          window.scrollTo(0, 0);
        }
      }
    });

    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      let ps = new PerfectScrollbar(elemMainPanel);
      ps = new PerfectScrollbar(elemSidebar);
    }

    const windowWidth = window.innerWidth;
    const $sidebar: HTMLElement = document.querySelector('.sidebar');
    const $sidebarResponsive: HTMLElement = document.querySelector('body > .navbar-collapse');
    const $sidebarImgContainer: HTMLElement = $sidebar && $sidebar.querySelector('.sidebar-background');

    if (windowWidth > 767) {
      const dropdown = document.querySelector('.fixed-plugin .dropdown');
      if (dropdown && dropdown.classList.contains('show-dropdown')) {
        this.renderer.addClass(dropdown, 'open');
      }
    }

    Array.from(document.querySelectorAll('.fixed-plugin a')).forEach(el => {
      el.addEventListener('click', event => {
        // Alex if we click on switch, stop propagation of the event, so the dropdown will not be hide,
        // otherwise we set the section active
        if ((event.target as HTMLElement).classList.contains('switch-trigger')) {
          event.stopPropagation();
        }
      });
    });

    Array.from(document.querySelectorAll('.fixed-plugin .badge')).forEach(el => {
      el.addEventListener('click', event => {
        const $this = event.target as HTMLElement;

        Array.from($this.parentElement.children).forEach(childEl => {
          this.renderer.removeClass(childEl, 'active');
        });
        this.renderer.addClass($this, 'active');

        const newColor = $this.dataset.color;

        if ($sidebar) {
          $sidebar.setAttribute('data-color', newColor);
        }

        if ($sidebarResponsive) {
          $sidebarResponsive.setAttribute('data-color', newColor);
        }
      });
    });

    Array.from(document.querySelectorAll('.fixed-plugin .img-holder')).forEach(el => {
      el.addEventListener('click', event => {
        const $this = event.target as HTMLElement;
        const $fullPageBackground: HTMLElement = document.querySelector('.full-page-background');

        Array.from($this.parentElement.children).forEach(childEl => {
          this.renderer.removeClass(childEl, 'active');
        });
        this.renderer.addClass($this, 'active');

        const newImage = $this.querySelector('img') && $this.querySelector('img').getAttribute('src');

        if ($sidebarImgContainer) {
          this.animationService.fadeOut($sidebarImgContainer, 'fast', () => {
            this.renderer.setStyle($sidebarImgContainer, 'background-image', `url("${newImage}")`);
            this.animationService.fadeIn($sidebarImgContainer, 'fast');
          });
        }

        if ($fullPageBackground) {
          this.animationService.fadeOut($fullPageBackground, 'fast', () => {
            this.renderer.setStyle($fullPageBackground, 'background-image', `url("${newImage}")`);
            this.animationService.fadeIn($fullPageBackground, 'fast');
          });
        }

        if ($sidebarResponsive) {
          this.renderer.setStyle($sidebarResponsive, 'background-image', `url("${newImage}")`);
        }
      });
    });
  }

  ngAfterViewInit(): void {
    this.runOnRouteChange();
  }

  isMaps(path: string): boolean {
    let titlee = this.location.prepareExternalUrl(this.location.path());
    titlee = titlee.slice(1);

    return path === titlee;
  }

  runOnRouteChange(): void {
    if (window.matchMedia(`(min-width: 960px)`).matches && !this.isMac()) {
      const elemMainPanel = document.querySelector('.main-panel') as HTMLElement;
      const ps = new PerfectScrollbar(elemMainPanel);
      ps.update();
    }
  }

  isMac(): boolean {
    let bool = false;
    if (navigator.platform.toUpperCase().indexOf('MAC') >= 0 || navigator.platform.toUpperCase().indexOf('IPAD') >= 0) {
      bool = true;
    }
    return bool;
  }
}
