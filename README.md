# angular-disable-browser-back-button

This Angular module generated using **@angular/cli** version 8.2.14.
Module developed to help Angular developers to disable the browser back button.

## Install

Copy the following command to your command line or terminal to install the package.

```bash
npm install --save angular-disable-browser-back-button
```

## How to use

Import the **BackButtonDisableModule** to your project app.module.ts file and add it to imports list

```typescript
import { NgModule } from '@angular/core';
import { BackButtonDisableModule } from 'angular-disable-browser-back-button';

@NgModule({
  ...
  imports: [
    ...
    BackButtonDisableModule.forRoot()
  ],
  ...
})
export class AppModule {}
```

Module will prevent browser backspace navigation and return user to the same page by preserving all states.  
The issue of the prevented backspace navigation is that it will move user to the webpage top. So you can use module configuration to preserve scroll position as well.

```typescript
import { NgModule } from '@angular/core';
import { BackButtonDisableModule } from 'angular-disable-browser-back-button';

@NgModule({
  ...
  imports: [
    ...
    BackButtonDisableModule.forRoot({
      preserveScrollPosition: true
    })
  ],
  ...
})
export class AppModule {}
```

## Improve the results

Run your application by typing the **ng serve** or **ng build** commands in your command line or terminal, and see the results: The browser back button will be disabled for whole the application.

> ### **Note**: Module doesn't work per-module and isn't tested with *Angular Universal*.

 > ### **Note**: Since version 75 Chrome requires at least one user interction to trigger **popstate** event on back button click. More about Chrome issue you can read in the discussion of [chrome issue about user interactions](https://support.google.com/chrome/thread/8721521?hl=en).

## License

### [MIT](https://github.com/Zatikyan/angular-disable-browser-back-button/blob/c3a519c04915124b6aed2b5a143f9fa58a51f228/LICENSE)