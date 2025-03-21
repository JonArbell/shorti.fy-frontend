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

    if(!localStorage.getItem('jwtToken'))
      window.location.href = '/';

  }

  urlHomeService = inject(UrlHomeService);

  longUrl : string = "";

  result = signal("result here");

  shortenUrl () : void{

    console.log(`Long url : ${this.longUrl}`);

    this.urlHomeService.shortenUrl(this.longUrl)
    .subscribe({
      next : (response : any) =>{
        this.result.set(response.shortUrl);
      },
      error : (err : any) =>{
        console.error(JSON.stringify(err));
      }
    });
    
  }


  public isClicked = false;

  private timeOutId : any;

  public copyLink() : void{

    if(this.timeOutId)
      clearTimeout(this.timeOutId);
    
    this.isClicked = true;

    this.timeOutId = setTimeout(()=>{
      
      this.isClicked = false;

      if(this.result() === 'result here')
        return;

      this.result.set('result here');
    },2000);

  }

}
