import { Component, inject, OnInit, TemplateRef, Type, viewChild, ViewContainerRef } from "@angular/core";
import { WidgetComponent } from "./widget/widget.component";
import { NgComponentOutlet } from "@angular/common";
import { WeatherContentComponent } from "./widget/weather-content.component";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs";
import { toSignal } from "@angular/core/rxjs-interop";

interface WidgetKeys {
  [key: string]: Type<any>
}
interface WidgetConfig {
  widgetKey: string;
  content: Node[][];
  inputs: Record<string, any>
}
@Component({
  selector: "app-root",
  standalone: true,
  template: `
    <h1 class="page-title">ngContentOutlet Demo</h1>
    <main id="content">
      @for (widget of widgets(); track $index) {
        <ng-container
          [ngComponentOutlet]="widget.widgetKey"
          [ngComponentOutletInputs]="widget.inputs"
          [ngComponentOutletContent]="widget.content"></ng-container>
      }
    </main>
  `,
  imports: [NgComponentOutlet, WeatherContentComponent]
})
export class AppComponent implements OnInit {

  http = inject(HttpClient);
  widgetKeys: WidgetKeys = {
    reqularWidget: WidgetComponent
  }
  vcr = inject(ViewContainerRef);
  contentTpl = viewChild<TemplateRef<unknown>>('contentTpl')
  protected content: Node[][] = [];


  widgets = toSignal(this.http.get<WidgetConfig[]>(`./widgets-config.json`).pipe(
    map(config => config.map(
      c => ({
        ...c, widgetKey: this.widgetKeys[c.widgetKey],
      })))
  ))

  ngOnInit(): void {
    
  }
}