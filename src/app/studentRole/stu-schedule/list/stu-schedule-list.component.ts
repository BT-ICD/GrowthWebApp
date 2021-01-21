import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-stu-schedule-list',
  templateUrl: './stu-schedule-list.component.html',
  styleUrls: ['./stu-schedule-list.component.css']
})
export class StuScheduleListComponent implements OnInit {

  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe((data)=>{
      let resolveData = data['resolveData'];
      console.log(resolveData);
    })
  }

}
