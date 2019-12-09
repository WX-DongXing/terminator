import { Subject } from 'rxjs'

export default class ViewService {
  constructor () {
    if (!ViewService.instance) {
      this.change = new Subject()
      this.change$ = this.change.asObservable()
      ViewService.instance = this
    }
    return ViewService.instance
  }

  next (event) {
    this.change.next(event)
  }
}
