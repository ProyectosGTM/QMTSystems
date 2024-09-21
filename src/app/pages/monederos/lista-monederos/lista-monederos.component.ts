import { Component, OnInit } from '@angular/core';
import { fadeInUpAnimation } from 'src/app/core/animations/fade-in-up.animation';
import { MonederosServices } from 'src/app/shared/services/monederos.service';

@Component({
  selector: 'app-lista-monederos',
  templateUrl: './lista-monederos.component.html',
  styleUrls: ['./lista-monederos.component.scss'],
  animations: [fadeInUpAnimation]
})
export class ListaMonederosComponent implements OnInit {

  listaMonederos: any[] = [];
  filteredMonederos: any[] = [];
  paginatedMonederos: any[] = [];
  searchTerm: string = '';
  startDate: string = '';
  endDate: string = '';
  pageSizeOptions: number[] = [10, 20, 50, 100];
  pageSize: number = 10;
  currentPage: number = 0;
  totalRecords: number = 0;
  totalPages: number = 0;
  isLoading: boolean = false;

  constructor(private moneService: MonederosServices) { }

  ngOnInit(): void {
    this.obtenerMonederos();
  }

  obtenerMonederos() {
    this.isLoading = true;
    this.moneService.obtenerMonederos().subscribe(
      (res: any) => {
        this.listaMonederos = res.monederos;
        this.filteredMonederos = [...this.listaMonederos];
        this.totalRecords = this.listaMonederos.length;
        this.updateTotalPages();
        this.filterMonederos();
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al obtener monederos:', error);
        this.isLoading = false;
      }
    );
  }

  filterMonederos() {
    this.filteredMonederos = this.listaMonederos.filter(mon => {
      const searchMatch = mon.NumeroSerie.toLowerCase().includes(this.searchTerm.toLowerCase());

      const startDateMatch = !this.startDate || new Date(mon.FechaActivacion) >= new Date(this.startDate);
      const endDateMatch = !this.endDate || new Date(mon.FechaActivacion) <= new Date(this.endDate);

      return searchMatch && startDateMatch && endDateMatch;
    });

    this.totalRecords = this.filteredMonederos.length;
    this.updateTotalPages();
    this.updatePaginatedMonederos();
  }

  updateTotalPages(): void {
    this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
  }

  updatePaginatedMonederos(): void {
    const startIndex = this.startIndex;
    const endIndex = this.endIndex;
    this.paginatedMonederos = this.filteredMonederos.slice(startIndex, endIndex);
  }

  get startIndex(): number {
    return this.currentPage * this.pageSize;
  }

  get endIndex(): number {
    return Math.min((this.currentPage + 1) * this.pageSize, this.totalRecords);
  }

  onPageSizeChange(): void {
    this.currentPage = 0;
    this.updateTotalPages();
    this.filterMonederos();
  }

  onNextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.updatePaginatedMonederos();
    }
  }

  onPreviousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updatePaginatedMonederos();
    }
  }

  showInfo(id: any): void {
    console.log('Mostrar información del monedero con ID:', id);
  }
}
