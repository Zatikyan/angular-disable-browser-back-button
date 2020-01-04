import { NgModule, Injectable, ModuleWithProviders, Inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

function _window(): any {
  return window;
}

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

  private window: Window;
  private scrollX = 0;
  private scrollY = 0;

  constructor(
    private router: Router,
    private windowRef: WindowRef,
    @Inject('preserveScrollPosition') private preserveScrollPosition: boolean
  ) {
    this.window = this.windowRef.nativeWindow
    this.disableBackButton();
    this.addPopStateEventListener();
  }

  static forRoot(config?: { preserveScrollPosition: boolean }): ModuleWithProviders {
    return {
      ngModule: BackButtonDisableModule,
      providers: [
        {
          provide: 'preserveScrollPosition',
          useValue: config && 'preserveScrollPosition' in config ? config.preserveScrollPosition : false
        }
      ]
    }
  }

  private addPopStateEventListener(): void {
    this.window.addEventListener('popstate', () => {
      if (this.preserveScrollPosition) this.getScrollCoordinates();
      this.window.history.pushState(null, null, null);
      if (this.preserveScrollPosition) setTimeout(this.scrollToThePreviousPosition.bind(this));
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
