import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tittle',
  templateUrl: './tittle.component.html',
  styleUrls: ['./tittle.component.scss']
})
export class TittleComponent implements OnInit {

  words: string[] = ['NUESTROS PLANES!', 'ULTRA RAPIDOS!', 'IDEAL PARA VOS!'];
  id: string = 'text';
  colors: string[] = ['#fff', '#fff', '#fff'];

  constructor() { this.colors = ['#fff', '#fff', '#fff'];}

  ngOnInit(): void {
    this.consoleText(this.words, this.id, this.colors);
  }

  consoleText(words: string[], id: string, colors: string[]) { 
    if (!colors) colors = ['#fff'];
    let visible = true;
    const target = document.getElementById(id);
    if (!target) return; 
  
    target.setAttribute('style', 'color:' + (colors[0] || '#fff')); // Verificación de nulidad aquí
    let letterCount = 1;
    let x = 1;
    let waiting = false;
  
    setInterval(() => {
      if (letterCount === 0 && waiting === false) {
        waiting = true;
        target.innerHTML = words[0].substring(0, letterCount);
        setTimeout(() => {
          const usedColor = colors!.shift(); 
          colors!.push(usedColor!); 
          const usedWord = words.shift()!;
          words.push(usedWord);
          x = 1;
          target.setAttribute('style', 'color:' + (colors[0] || '#fff')); // Verificación de nulidad aquí
          letterCount += x;
          waiting = false;
        }, 1000);
      } else if (letterCount === words[0].length + 1 && waiting === false) {
        waiting = true;
        setTimeout(() => {
          x = -1;
          letterCount += x;
          waiting = false;
        }, 1000);
      } else if (waiting === false) {
        target.innerHTML = words[0].substring(0, letterCount);
        letterCount += x;
      }
    }, 120);
  
    setInterval(() => {
      const con = document.getElementById('console');
      if (!con) return; 
      if (visible === true) {
        con.className = 'console-underscore hidden';
        visible = false;
      } else {
        con.className = 'console-underscore';
        visible = true;
      }
    }, 400);
  }
}