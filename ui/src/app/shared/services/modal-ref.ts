export class ModalRef<T = unknown> {

  constructor(private readonly closeFn: (result?: T) => void) {}

  close(result?: T): void {
    this.closeFn(result);
  }
}
