import { NgModule, Injectable, ModuleWithProviders, InjectionToken, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

const _window = (): Window => window;
const SCROLL_TOKEN = new InjectionToken('preserveScroll')

@Injectable()
export class WindowRef {
  get nativeWindow(): any {
    return _window();
  }
}

@NgModule({
  providers: [WindowRef]
})
export class BackButtonDisableModule {

  private preserveScroll = inject(SCROLL_TOKEN) || false;
  private window: Window;
  private scrollX = 0;
  private scrollY = 0;

  constructor(
    private router: Router,
    private windowRef: WindowRef,
  ) {
    this.window = this.windowRef.nativeWindow
    this.disableBackButton();
    this.addPopStateEventListener();
  }

  static forRoot(config?: { preserveScroll: boolean }): ModuleWithProviders<BackButtonDisableModule> {
    return {
      ngModule: BackButtonDisableModule,
      providers: [
        {
          provide: SCROLL_TOKEN,
          useValue: config?.preserveScroll || false,
        }
      ]
    }
  }

  private addPopStateEventListener(): void {
    this.window.addEventListener('popstate', () => {
      if (this.preserveScroll) this.getScrollCoordinates();
      this.window.history.pushState(null, null, null);
      if (this.preserveScroll) setTimeout(this.scrollToThePreviousPosition.bind(this));
    });
  }

  private scrollToThePreviousPosition(): void {
    this.window.scrollTo(this.scrollX, this.scrollY);
  }

  private getScrollCoordinates(): void {
    this.scrollX = this.window.scrollX;
    this.scrollY = this.window.scrollY;
  }

  private disableBackButton(): void {
    this.window.history.pushState(null, null, null);
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.window.history.pushState(null, null, null);
      };
    });
  }
}
