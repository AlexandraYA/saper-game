import { makeAutoObservable } from 'mobx'


class TimerStore {

  seconds: number = 0
  minutes: number = 0
  hours: number = 0
  timerId: any = 0

  constructor() {
    makeAutoObservable(this)

    this.setTimer = this.setTimer.bind(this)
    this.startTimer = this.startTimer.bind(this)
    this.stopTimer = this.stopTimer.bind(this)
  }

  setTimer() {
    if (this.seconds < 60) {
      this.seconds++
    }

    if (this.seconds === 60) {
      this.seconds = 0
      this.minutes++
    }

    if (this.minutes === 60) {
      this.minutes = 0
      this.hours++
    }
  }

  startTimer() {
    this.seconds = 0
    this.minutes = 0
    this.hours = 0

    this.stopTimer()

    let _timerId = setInterval(() => {
      this.setTimer()
    }, 1000)

    this.timerId = !this.timerId ? _timerId : this.timerId
  }

  stopTimer() {
    if (!!this.timerId)
      clearInterval(this.timerId)
    
    this.timerId = 0    
  }
}


const timerStore = new TimerStore()
export default timerStore
