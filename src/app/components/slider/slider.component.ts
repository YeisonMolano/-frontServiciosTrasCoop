import { Component } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent {
  automobiles : string[]

  constructor(){
    this.automobiles = ['https://previews.123rf.com/images/drogatnev/drogatnev1608/drogatnev160800107/61936441-veh%C3%ADculo-taxi-amarillo-icono-de-taxis-el-concepto-de-taxi-llamada-ilustraci%C3%B3n-vectorial-en-el.jpg',
  'https://cdnwordpresstest-f0ekdgevcngegudb.z01.azurefd.net/es/wp-content/uploads/2021/09/taxis-de-medellin.jpg',
  'https://assets.volvo.com/is/image/VolvoInformationTechnologyAB/1860x1050-volvo-9800-on-road-1?size=1280,720&scl=1']
  }
}
