import { AfterViewInit, ContentChild, ContentChildren, Directive, QueryList } from '@angular/core';
import { createSingleton } from 'tippy.js';
import { ToolTipDirective } from './tool-tip.directive';
@Directive({
  selector: '[appToolTipSingleton]'
})
export class ToolTipSingletonDirective implements AfterViewInit {

  @ContentChildren(ToolTipDirective, { descendants: true }) 
  elementsWithToolTips: QueryList<ToolTipDirective>

  singletoneInstance: any

  constructor() { }

  ngAfterViewInit() {
   this.singletoneInstance = createSingleton(this.getTippyInstances(), {
      delay: [200, 0], //[doua valori], entry delay, exit delay
      moveTransition: 'transform 0.2s ease-out'
    })

    this.elementsWithToolTips.changes.subscribe(() => {
      this.singletoneInstance.setInstances(this.getTippyInstances())
    })
  }
  
  getTippyInstances(){
   return this.elementsWithToolTips.toArray().map((t) => {
     return t.tippyInstance
   })
  }
}
