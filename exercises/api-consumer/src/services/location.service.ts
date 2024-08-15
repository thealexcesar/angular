import {Injectable} from '@angular/core';
import {Locations} from "../models/locations.model";

@Injectable({
    providedIn: 'root'
})
export class LocationService {
    private url = 'http://localhost:3000/locations';

    async getAllLocations(): Promise<Locations[]> {
        const response = await fetch(this.url);
        return await response.json() ?? [];
    }

    async getLocationById(id: number): Promise<Locations | undefined> {
        const response = await fetch(`${this.url}/${id}`);
        return await response.json() ?? {};
    }

    async deleteLocation(id: number): Promise<void> {
        await fetch(`${this.url}/${id}`, {
            method: 'DELETE'
        });
    }
}
