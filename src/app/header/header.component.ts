import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  displayLoginBox: boolean = false;
  displaySignupBox: boolean = false;
  constructor() { }

  showDialog(boxType) {
    if(boxType == 'login' ){
     this.displayLoginBox = true;
    }else if (boxType == 'signup'){
     this.displaySignupBox = true;
    }
  }

  ngOnInit() {
  }

}
