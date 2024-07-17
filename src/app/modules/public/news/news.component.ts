import { Component, inject, OnInit } from '@angular/core';
import { SectionService } from '../../services/sections/section.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit{
  private sectionServices = inject(SectionService);
  public section: any;
  public tittles: string [] = [];
  public infos:string [] = [];
  
  constructor(){
  
     this.sectionServices.getSection('news').subscribe({
      next: (data: any) => {
        if (data.metadata[0].codigo == "00") {
          this.section = data.sectionsWebResponse.sectionsWeb[0];
         for(let t of this.section.texts) {
          if(t.accessKey.includes("tittle")){
            this.tittles.push(t.text);
          } else {
            this.infos.push(t.text);
          }
         }
        }
      },
      error: (error: any) => {
        console.log("Error", error);
      }
    });
  
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
