import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  public messages: string[] = [];

  constructor() {}

  /**
   * メッセージを追加する。
   * @param message 
   * @returns {void}
   */
  add(message: string): void{
    this.messages.push(message);
  }

  /**
   * メッセージを空にする。
   * @returns {void}
   */
  clear(): void{
    this.messages = [];
  }

}
