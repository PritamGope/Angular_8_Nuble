import { Component, OnInit, Input } from "@angular/core";
import { HostListener } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { interval } from "rxjs";
import { Stopwatch } from "ts-stopwatch";

export enum KEY_CODE {
  LEFT_ARROW = 37,
  UP_ARROW = 38,
  RIGHT_ARROW = 39,
  DOWN_ARROW = 40
}
@Component({
  selector: "app-ground",
  templateUrl: "./ground.component.html",
  styleUrls: ["./ground.component.scss"]
})
export class GroundComponent implements OnInit {
  array1: any[] = [];
  array2D: any[] = [];
  array: any[] = [[1, 2, 3], [4, 5, 6], [7, 8, null]];
  rowNum: number;
  customVal: number;
  isGridConfigured: false;
  rw: any;
  cl: any;
  countMove: number = 0;
  movesArray: any = [];
  min: number = 0;
  sec: number = 0;
  hr: number = 0;
  numb: number;
  interval;
  timeTaken;
  stopwatch;

  constructor() {}

  ngOnInit() {}

  cofigureGrid = function(num: any) {
    const vm = this;
    vm.numb = num;
    vm.array = [];
    vm.array1 = [];
    vm.rw = num - 1;
    vm.cl = num - 1;
    // tslint:disable-next-line: triple-equals
    if (num != undefined) {
      vm.size = num * num;
      console.log("Number Passing", num);
      while (vm.array1.length < vm.size - 1) {
        // Generating random Numbers and push to the array1.
        let r = Math.floor(Math.random() * vm.size - 1) + 1; //Math.floor(Math.random() * (max - min + 1)) + min;
        // tslint:disable-next-line: triple-equals
        if (vm.array1.indexOf(r) == -1 && r != 0) {
          vm.array1.push(r);
        }
      }
      vm.array1.push(null);
      // tslint:disable-next-line: triple-equals
      if (vm.checkSolvable(vm.array1) != true) {
        // Check if Solveable
        let valll = vm.checkSolvable(vm.array1);
        vm.array1 = [];
        vm.cofigureGrid(num);
        console.log("re num", num);
      } else {
        vm.twoDArrayConverter(vm.array1, num);
      }
      vm.isGridConfigured = true;
      this.startTimer();
    }
  };

  twoDArrayConverter = function(arr, leN) {
    let k = 0;
    this.array2D = [];
    for (let i = 0; i < leN; i++) {
      // Coverting 1D to 2D Array;
      this.array2D[i] = [];
      for (let j = 0; j < leN; j++) {
        this.array2D[i][j] = arr[k++];
      }
    }
    console.log(this.array2D);
    this.array = this.array2D;
    this.movesArray =[];
    this.stopwatch = new Stopwatch();
    this.stopwatch.start(true);
  };

  startTimer() {
    this.interval = setInterval(() => {
      this.sec++;
      // tslint:disable-next-line: triple-equals
      if (this.sec == 60) {
        this.sec = 0;
        ++this.min;
      }
      if (this.min == 60) {
        this.min = 0;
        ++this.hr;
      }
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.interval);
  }

  // tslint:disable-next-line: only-arrow-functions
  checkSolvable = function(pList: any[][]) {
    // console.log("checkSolvable called with : " + pList);
    let countSwap = 0;

    for (let i = 0; i < pList.length; i++) {
      for (let j = i + 1; j < pList.length; j++) {
        if (pList[j] > pList[i]) {
          countSwap++;
        }
      }
    }
    // console.log("Steps to solve", countSwap);
    if (countSwap % 2 == 1) {
      // console.log("It's Unsolvable");
      return false;
    } else {
      // console.log("It's Solvable");
      return true;
    }
  };

  customCofigGrid = function() {
    // Set the configuration of grid for custom selection.
    // tslint:disable-next-line: triple-equals
    if (this.customVal == undefined) {
    } else if (this.customVal < 6) {
      alert("Enter a valid Number");
    } else {
      this.cofigureGrid(this.customVal);
    }
  };

  @HostListener("window:keyup", ["$event"])
  keyEvent(event: KeyboardEvent) {
    console.log(event, this.isGridConfigured, "Detail",this.rw,this.cl);
    // tslint:disable-next-line: deprecation
    const vm = this;
    if (event.keyCode == KEY_CODE.LEFT_ARROW && this.isGridConfigured) {
      if (vm.cl < this.array[0].length - 1) {
        this.countMove++;
      console.log("Left Arrow");


        const temp = this.array[vm.rw][vm.cl + 1];
        const temp1 = this.array[vm.rw][vm.cl];
        this.array[vm.rw][vm.cl++] = temp;
        this.array[vm.rw][vm.cl] = temp1;
        vm.movesArray.push("TILE " + temp + " TO " + (vm.rw+1) + "," + vm.cl);
      }
    }
    // tslint:disable-next-line: deprecation
    // tslint:disable-next-line: triple-equals
    if (event.keyCode == KEY_CODE.UP_ARROW && this.isGridConfigured) {
      
      if (vm.rw < this.array[0].length - 1) {
        this.countMove++;
        console.log("Up Arrow");

        const temp = vm.array[vm.rw + 1][vm.cl];
        const temp1 = vm.array[vm.rw][vm.cl];
        vm.array[vm.rw++][vm.cl] = temp;
        vm.array[vm.rw][vm.cl] = temp1;
        vm.movesArray.push("TILE " + temp + " TO " + vm.rw + "," + (vm.cl+1));
      }
    }
    // tslint:disable-next-line: deprecation
    if (event.keyCode == KEY_CODE.RIGHT_ARROW && this.isGridConfigured) {
      if (vm.cl > 0) {
        this.countMove++;
      console.log("Right Arrow");


        const temp = vm.array[vm.rw][vm.cl - 1];
        const temp1 = vm.array[vm.rw][vm.cl];
        vm.array[vm.rw][vm.cl--] = temp;
        vm.array[vm.rw][vm.cl] = temp1;
        vm.movesArray.push("TILE " + temp + " TO " + (vm.rw+1) + "," + (vm.cl+2));
      }
    }
    // tslint:disable-next-line: deprecation
    if (event.keyCode == KEY_CODE.DOWN_ARROW && this.isGridConfigured) {
      if (vm.rw > 0) {
        this.countMove++;
      console.log("Down Arrow");


        const temp = vm.array[vm.rw - 1][vm.cl];
        const temp1 = vm.array[vm.rw][vm.cl];
        vm.array[vm.rw--][vm.cl] = temp;
        vm.array[vm.rw][vm.cl] = temp1;
        vm.movesArray.push("TILE " + temp + " TO " + (vm.rw + 2) + "," + (vm.cl+1));
      }
    }
    this.checkIfSolved(this.array, false);
  }

  checkIfSolved = function(arrChk, flag) {
    let len = arrChk[0].length;
    let checkArray = [];
    for (let i = 0; i < len; i++) {
      checkArray = checkArray.concat(arrChk[i]);
    }
    let checkFinal = checkArray.slice();
    checkArray.sort();
    console.log("checkA", checkArray, "FinalArray", checkFinal);
    if (
      JSON.stringify(checkArray) === JSON.stringify(checkFinal) &&
      !flag &&
      this.isGridConfigured
    ) {
      alert("Congratulations!!! Puzzle Solved :-)");
      this.pauseTimer();
      const secc=this.sec;
      const minn=this.min;
      const hrr = this.hr;
      this.timeTaken=''+hrr+':'+minn+':'+secc;
      this.setFinalTime(this.timeTaken/1000);
    } else if (flag) {
      this.twoDArrayConverter(checkArray, len);
      this.pauseTimer();
    }
  };

  // tslint:disable-next-line: only-arrow-functions
  undoSteps = function() {
    alert("Once Done can't return. Sorry!!! Undo is not available");
  };
}
