import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FaIconLibrary, FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {HomeComponent} from "./components/home/home.component";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        RouterOutlet,
        HomeComponent,
        FontAwesomeModule
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.sass'
})
export class AppComponent {
    title = 'api-consumer';
    constructor(library: FaIconLibrary) {
        library.addIconPacks(fas)
    }
}
