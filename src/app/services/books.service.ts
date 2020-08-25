import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Book } from '../models/book.model';
import * as firebase from 'firebase';

@Injectable()
export class BooksService {
  constructor() {
    this.getBooks();
}

  books: Book[] = [];
  booksSubject = new Subject<Book[]>();

  emitBooks() { //cette fct pour faire emettre le subject
    this.booksSubject.next(this.books);
  }
  saveBooks() {
    firebase.database().ref('/books').set(this.books);
}
getBooks() {
  firebase.database().ref('/books')

    .on('value', (data) => {
      console.log('dataon service', data)
        this.books = data.val() ? data.val() : [];
        console.log('this.books on service', this.books)
     //   this.booksSubject.next(this.books);
        this.emitBooks();
      }
    );
}

getSingleBook(id: number) {
  return new Promise(
    (resolve, reject) => {
      firebase.database().ref('/books/' + id).once('value').then(
        (data) => {
          resolve(data.val());
        }, (error) => {
          reject(error);
        }
      );
    }
  );
}

createNewBook(newBook: Book) {
  this.books.push(newBook);
  this.saveBooks();
  this.emitBooks();
}

removeBook(book: Book) {
  if(book.photo) {
    const storageRef = firebase.storage().refFromURL(book.photo);
    storageRef.delete().then(
      () => {
        console.log('Photo removed!');
      },
      (error) => {
        console.log('Could not remove photo! : ' + error);
      }
    );
  }
  const bookIndexToRemove = this.books.findIndex(
    (bookEl) => {
      if(bookEl === book) {
        return true;
      }
    }
  );
  this.books.splice(bookIndexToRemove, 1);
  this.saveBooks();
  this.emitBooks();
}
uploadFile(file: File) {
  return new Promise(
    (resolve, reject) => {
      const almostUniqueFileName = Date.now().toString();
      const upload = firebase.storage().ref()
        .child('images/' + almostUniqueFileName + file.name).put(file);
      upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
        () => {
          console.log('Chargement…');
        },
        (error) => {
          console.log('Erreur de chargement ! : ' + error);
          reject();
        },
        () => {
          resolve(upload.snapshot.ref.getDownloadURL());
        }
      );
    }
  );
}

}