import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  public linkTheme = document.querySelector('#theme');    
  constructor() {
    
    let thema = localStorage.getItem('theme') || './assets/css/colors/megna.css';    
    this.linkTheme?.setAttribute('href', thema);      
  }
  cahngeTheme(theme:string){
    const url = `./assets/css/colors/${theme}.css`;    
    this.linkTheme?.setAttribute('href', url);
    localStorage.setItem('theme', url);

    this.checkCurrentTheme();

  }
  checkCurrentTheme(){    
    let links = document.querySelectorAll('.selector');
    links.forEach(element =>{
      element.classList.remove('working');
      const btnTheme = element.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = this.linkTheme?.getAttribute('href');   
      if(btnThemeUrl === currentTheme){       
        element.classList.add('working');
      }

    });
  }
}
