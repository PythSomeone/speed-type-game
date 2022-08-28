import {Component, ViewEncapsulation, ElementRef, Input, OnInit, OnDestroy, Output, EventEmitter} from '@angular/core';

import { ModalService } from './modal.service';

@Component({
    selector: 'jw-modal',
    templateUrl: 'modal.component.html',
    styleUrls: ['modal.component.less'],
    encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit, OnDestroy {
    @Output() finishedLoading: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Input() id: string | undefined;
    private element: any;

    constructor(private modalService: ModalService, private el: ElementRef) {
        this.element = el.nativeElement;
    }

    ngOnInit(): void {
        if (!this.id) {
            console.error('modal must have an id');
            return;
        }

        document.body.appendChild(this.element);

        this.element.addEventListener('click', (el: { target: { className: string; }; }) => {
            if (el.target.className === 'jw-modal') {
                this.close();
            }
        });

        this.modalService.add(this);
    }

    ngOnDestroy(): void {
        this.modalService.remove(this.id);
        this.element.remove();
    }

    ngAfterViewChecked() {
      // you could also do this after a service call of some sort
      this.finishedLoading.emit(true);
    }
    open(): void {
        this.element.style.display = 'block';
        document.body.classList.add('jw-modal-open');
    }

    close(): void {
        this.element.style.display = 'none';
        document.body.classList.remove('jw-modal-open');
    }
}
