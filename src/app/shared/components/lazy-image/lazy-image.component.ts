import { Component, Input } from '@angular/core';

@Component({
  selector: 'share-lazy-image',
  templateUrl: './lazy-image.component.html',
})
export class LazyImageComponent {

  @Input()
  public url!: string
  @Input()
  public alt: String = ""

  public hasLoaded: boolean = false;

  ngOnInit(): void {
    if (!this.url) throw new Error("URL property is required")
  }

  onLoad() {
    setTimeout(() => {
      this.hasLoaded = true;
    }, 500)
  }



}
