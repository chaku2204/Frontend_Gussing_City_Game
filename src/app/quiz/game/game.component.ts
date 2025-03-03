import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommonService } from 'src/app/services/common.service';
import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ScoreDialogComponent } from 'src/app/score-dialog/score-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';

 // Ensure it runs




export interface Option {
  city: string;
  cityId: number;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  ClueList: any[] = [];
  CityList: Option[] = [];
  cityControl = new FormControl();
  resultMessage: string = '';
  filteredOptions!: Observable<Option[]>;
  score: number = 0; // Correct answer count
  wrongAnswers: number = 0; // Wrong answer count
  funFact:any = [];
  dissablebutton:boolean = false;
  isCorrectanswe = false;
  username:any = "";


  constructor(private quizService: CommonService, public dialog: MatDialog,private router: Router,private route: ActivatedRoute) {}

  ngOnInit(): void {
    // this.route.queryParams.subscribe(params => {
    //   if (params['username'] && params['score']) {
    //      const username = params['username'];
    //     const score = (params['score']);
    //     this.dialog.open(ShareDialog, {
    //       data: { "username": username, "score": score},disableClose: true
    //     });
    //     return;
    //   }

    // });
    this.startGame();

  }

  startGame() {
    this.dissablebutton = false;
    const user =this.quizService.getUser();
    this.username = user?user?.sub:"";

    this.quizService.startgame().subscribe((data) => {
      this.ClueList = data?.cluelist;
      this.CityList = data?.cityList || [];
      this.score = 0; // Reset correct score
      this.wrongAnswers = 0; // Reset wrong score

      this.filteredOptions = this.cityControl.valueChanges.pipe(
        startWith(''),
        map((value: string | Option | null) => {
          if (typeof value === 'string') {
            return this.CityList.filter((option: Option) =>
              option.city.toLowerCase().includes(value.trim().toLowerCase())
            );
          }
          return this.CityList;
        })
      );
    });
  }

  checkAnswer() {
    let citydetail: any = this.cityControl.value;
    if (citydetail && typeof citydetail === 'object' && 'city' in citydetail && 'cityId' in citydetail) {
      let City: any = this.cityControl.value;
      if (this.ClueList.length > 0) {
        let clueid = this.ClueList[0].id;
        let body = { clueId: clueid, cityId: City.cityId };

        this.quizService.checkanswer(body).subscribe((data) => {
         this.funFact = data['funFacts'];
         console.log(this.funFact);
         this.dissablebutton = true;
         
          if (data['answer']) {
            this.resultMessage = '✅ Correct answer!';
            this.isCorrectanswe = true;
            this.score++; 
          } else {
            this.resultMessage = '❌ Wrong answer!';
            this.isCorrectanswe = false;
           this.wrongAnswers++;
          }
          console.log(this.isCorrectanswe);
        });
      }
    }
  }

  displayCity(city: { city: string; cityId: number } | null): string {
    return city ? city.city : '';
  }

  trackByIdFn(option: Option) {
    return option.cityId;
  }
  nextDestination(){
    this.dissablebutton = false;
    this.cityControl.setValue('');
    this.quizService.getRandomCity().subscribe((data)=>{
     this.ClueList = data;
    });  }

  // Open Score Popup
  openScoreDialog() {
    this.dialog.open(ScoreDialogComponent, {
      data: { heading: "Your Final Score", content: "🎯 You scored: "+this.score },
    });
  }
  logout(){
    this.quizService.logout();
    this.router.navigate(['/auth/login']); 
  }

  generateShareableLink() {
    const shareUrl = `${window.location.origin}/auth/login?username=${this.username}&score=${this.score}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert('Shareable link copied to clipboard!');
    }).catch(err => console.error('Error copying to clipboard', err));
  }
 
 
}

@Component({
  selector: 'app-share-dialog',
  templateUrl: './share-dialog.component.html',
  styleUrls: ['./share-dialog.component.css'],
})

export class ShareDialog{
 
   constructor(@Inject(MAT_DIALOG_DATA) public data: any, private dialogRef: MatDialogRef<ShareDialog>,private router: Router) {}
   redirectToSignup(){
    this.router.navigate(['auth/signup']);
    this.dialogRef.close();
  }
  redirectToLogin(){
    this.router.navigate(['auth/login']);
    this.dialogRef.close();
  }

}