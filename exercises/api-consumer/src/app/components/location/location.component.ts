import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {Locations} from "../../../models/locations.model";
import {LocationService} from "../../../services/location.service";

@Component({
    selector: 'app-location',
    standalone: true,
    imports: [CommonModule, FormsModule, HttpClientModule],
    templateUrl: './location.component.html',
    styleUrls: ['./location.component.sass']
})
export class LocationComponent implements OnInit {
    locations: Locations[] = [];
    selectedId: number | null = null;

    constructor(private locationService: LocationService) {
    }

    ngOnInit(): void {
        this.fetchLocations();
    }

    async fetchLocations(): Promise<void> {
        this.locations = await this.locationService.getAllLocations();
    }

    async fetchLocationById(): Promise<void> {
        if (this.selectedId !== null) {
            const location: Locations | undefined = await this.locationService.getLocationById(Number(this.selectedId));
            if (location) {
                this.locations = [location];
            } else {
                alert('Localização não encontrada.');
                this.locations = [];
            }
        }
    }

    async deleteLocation(id: number): Promise<void> {
        const confirmDelete = window.confirm(`Certeza que deseja deletar? ${id}?`);
        if (confirmDelete) {
            await this.locationService.deleteLocation(id);
            console.log(`Localização de ID ${id} deletada com sucesso.`);
            this.fetchLocations();
        }
    }

}
