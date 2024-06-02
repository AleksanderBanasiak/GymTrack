import {Component, Injectable, OnInit} from '@angular/core';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class MenuComponent implements OnInit{



  isMenuClosed: boolean = false;



  isSidebarClosed: boolean = true  ;

  toggleSidebar() {
    this.isSidebarClosed = !this.isSidebarClosed;
  }
  toggleMenu() {
    this.isMenuClosed = !this.isMenuClosed;
  }


  logout(){
    localStorage.removeItem('token');
    window.location.reload();
  }


  ngOnInit(): void {
    const linkColor = document.querySelectorAll('.navv');
    linkColor.forEach(link => {
      if (window.location.href.endsWith(link.getAttribute('href') || '')) {
        link.classList.add('active');
      }
      link.addEventListener('click', () => {
        linkColor.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      })
    });
  }

  //9:09:54
}
