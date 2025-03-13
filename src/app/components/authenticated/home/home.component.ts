import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit{
  ngOnInit(): void {
    // localStorage.removeItem('jwtToken');
  }

  public isClicked = false;

  private timeOutId : any;

  public changeStyle() : void{

    if(this.timeOutId)
      clearTimeout(this.timeOutId);
    
    this.isClicked = true;

    this.timeOutId = setTimeout(()=>{
      this.isClicked = false;
    },2000);

  }

}
