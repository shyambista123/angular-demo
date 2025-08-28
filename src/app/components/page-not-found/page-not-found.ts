import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Header } from "../header/header";

@Component({
  selector: 'app-page-not-found',
  imports: [RouterLink, Header],
  templateUrl: './page-not-found.html',
  styles: ``
})
export class PageNotFound {

}
