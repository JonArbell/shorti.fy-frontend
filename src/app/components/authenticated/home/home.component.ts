import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ShortenUrlService } from './shorten-url.service';
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

  shortenUrlService = inject(ShortenUrlService);

  longUrl : string = "";

  shortenUrl () : void{

    console.log(`Long url : ${this.longUrl}`);

    this.shortenUrlService.shortenUrl(this.longUrl)
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
