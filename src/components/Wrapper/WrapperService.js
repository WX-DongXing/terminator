import { Subject } from 'rxjs'

export default class WrapperService {
  constructor () {
    if (!WrapperService.prototype.instance) {
      this.change = new Subject()
      this.change$ = this.change.asObservable()
      WrapperService.prototype.instance = this
    }
    return WrapperService.prototype.instance
  }

  next (event) {
    this.change.next(event)
  }
}
