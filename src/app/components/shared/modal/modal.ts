import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  styles: ``
})
export class Modal {
  title = input<string>('Modal Title');
  isOpen = input<boolean>(false);

  closed = output<void>();
  confirmed = output<void>();

  close() {
    this.closed.emit();
  }

  confirm() {
    this.confirmed.emit();
  }
}
