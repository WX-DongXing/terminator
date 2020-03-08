import { Subject } from 'rxjs'

export default class ViewService {
  constructor () {
    if (!ViewService.prototype.instance) {
      this.change = new Subject()
      this.change$ = this.change.asObservable()
      ViewService.prototype.instance = this
    }
    return ViewService.prototype.instance
  }

  next (event) {
    this.change.next(event)
  }
}
