import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen: boolean = false;

  constructor() {}

  @HostListener('click') toggleOpen() {
    this.isOpen = !this.isOpen;
  }
}
