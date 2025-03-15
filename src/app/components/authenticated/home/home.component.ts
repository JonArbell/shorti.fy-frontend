import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { UrlHomeService } from './url-home.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule ],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit{
  ngOnInit(): void {
    // localStorage.removeItem('jwtToken');
  }

  urlHomeService = inject(UrlHomeService);

  longUrl : string = "";

  shortenUrl () : void{

    console.log(`Long url : ${this.longUrl}`);

    this.urlHomeService.shortenUrl(this.longUrl)
    .subscribe({
      next : (response : any) =>{

        console.log(JSON.stringify(response));

      },
      error : (err : any) =>{
        console.error(JSON.stringify(err));
      }
    });
    
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
