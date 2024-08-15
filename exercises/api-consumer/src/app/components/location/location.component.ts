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
    filterText: string = '';
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
            const location = await this.locationService.getLocationById(Number(this.selectedId));
            this.locations = location ? [location] : [];
        }
    }

    async deleteLocation(id: number): Promise<void> {
        const confirmDelete = window.confirm(`Certeza que deseja deletar? ${id}?`);
        if (confirmDelete) {
            await this.locationService.deleteLocation(id);
            alert(`Localização de ID ${id} deletada com sucesso.`);
            this.fetchLocations();
        }
    }

    filterLocations(): void {
        if (this.filterText) {
            this.locations = this.locations.filter(location =>
                location.name.toLowerCase().includes(this.filterText.toLowerCase()) ||
                location.city.toLowerCase().includes(this.filterText.toLowerCase()) ||
                location.state.toLowerCase().includes(this.filterText.toLowerCase())
            );
        } else {
            this.fetchLocations();
        }
    }
}
