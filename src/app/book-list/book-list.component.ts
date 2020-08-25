import { Component, OnDestroy, OnInit } from '@angular/core';
import { BooksService } from '../services/books.service';
import { Book } from '../models/book.model';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  books:Book[];
  bookSubscription: Subscription;
   // BooksService: any;
  
    constructor(private booksService:BooksService, private router:Router) { }
  
    ngOnInit() {
      console.log(this.books)
   this.bookSubscription=this.booksService.booksSubject.subscribe(
     (books:Book[])=> {
     this.books=this.books;
   }
   );
  
//  this.booksService.emitBooks();
  this.getBooks() ;
  console.log('this.booksService.getBooks() ;', this.booksService.getBooks())
   }
  
  onNewBook(){
    this.router.navigate(['books/new'])
  }
  onDeleteBook(book:Book){
    this.booksService.removeBook(book);
  
  }
  getBooks() {
    firebase.database().ref('/books')
  
      .on('value', (data) => {
        console.log('dataon service', data)
          this.books = data.val() ? data.val() : [];
          console.log('this.books ts', this.books)
       //   this.booksSubject.next(this.books);
        return this.books
        }
      );
  }
  onViewBook(id:number){
    this.router.navigate(['books/view', id]);
  }
  ngOnDestroy(){
  this.bookSubscription.unsubscribe();
  }

  
}
