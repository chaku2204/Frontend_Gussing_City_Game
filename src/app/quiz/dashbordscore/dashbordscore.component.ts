import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dashbordscore',
  templateUrl: './dashbordscore.component.html',
  styleUrls: ['./dashbordscore.component.css']
})
export class DashbordscoreComponent implements OnInit {

  dataSource = [{ 'position': 1, 'username': 'nirav', 'email': 'niravbutani@gmail.com', 'score': 20 }];
  displayedColumns: string[] = ['position', 'username', 'email', 'score'];
  number:FormControl = new FormControl(0);
  constructor() {

  }
  ngOnInit(): void {
    this.genratedata();
    console.log(this.dataSource);
  }

  genratedata() {
    for (let i = 0; i < 100; i++) {
      const temp = { 'position': i + 1, 'username': Math.random() + "nirav", 'email': Math.random() + "xyz" + '@gmail.com', 'score': Math.random() * 3 };
      this.dataSource.push(temp);
    }
  }
  announceSortChange(event: any) {
    console.log(event);
    this.sortfunction(event);
  }

  sortfunction(event: any) {

    if (event['active'] == 'score') {
      if (event['direction'] == 'asc') { this.dataSource = this.dataSource.sort((item1, item2) => item1.score - item2.score); }
      else if (event['direction'] == 'desc') { this.dataSource = this.dataSource.sort((item1, item2) => item2.score - item1.score); }

      this.dataSource = [...this.dataSource];


    }
    // else if(event['active']=='username'){
    //   if (event['direction'] == 'asc') { this.dataSource = this.dataSource.sort((item1, item2) => item1.username - item2.username); }
    //   else if (event['direction'] == 'desc') { this.dataSource = this.dataSource.sort((item1, item2) => item2['username'] - item1.username); }

    //   this.dataSource = [...this.dataSource];
    // }



  }
  sortbygivennumber(event:any){
    event.preventDefault()
    console.log(event);
    // this.dataSource = this.dataSource.filter(item=>{item.score>=value})
    // this.dataSource = [...this.dataSource];
  }




}
//1000-> 50-> onscroll -> throtlink ->50, 2s contextapi
