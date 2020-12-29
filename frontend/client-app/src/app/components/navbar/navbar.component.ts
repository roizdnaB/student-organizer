import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // Determine if navbar should colapse on mobile devices
  navbarOpen = false;

  constructor() { }

  ngOnInit(): void {
  }

  // Change the bool value
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
}
