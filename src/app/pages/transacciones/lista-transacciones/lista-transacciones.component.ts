import { Component, OnInit } from '@angular/core';
import { fadeInUpAnimation } from 'src/app/core/animations/fade-in-up.animation';
import { TransaccionesService } from 'src/app/shared/services/transacciones.service';

@Component({
  selector: 'app-lista-transacciones',
  templateUrl: './lista-transacciones.component.html',
  styleUrls: ['./lista-transacciones.component.scss'],
  animations: [fadeInUpAnimation]
})
export class ListaTransaccionesComponent implements OnInit {

  listaTransacciones: any[] = [];
  filteredTransacciones: any[] = [];
  paginatedTransacciones: any[] = [];
  searchTerm: string = '';
  startDate: string = '';
  endDate: string = '';
  pageSizeOptions: number[] = [10, 20, 50, 100];
  pageSize: number = 10;
  currentPage: number = 0;
  totalRecords: number = 0;
  totalPages: number = 0;
  isLoading: boolean = false;

  constructor(private tranService: TransaccionesService) { }

  ngOnInit(): void {
    this.obtenerTransacciones();
  }

  obtenerTransacciones() {
    this.isLoading = true;
    this.tranService.obtenerTransacciones().subscribe(
      (res: any) => {
        this.listaTransacciones = res.transacciones;
        this.filteredTransacciones = [...this.listaTransacciones];
        this.totalRecords = this.listaTransacciones.length;
        this.updateTotalPages();
        this.filterTransacciones();
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al obtener transacciones:', error);
        this.isLoading = false;
      }
    );
  }

  filterTransacciones() {
    this.filteredTransacciones = this.listaTransacciones.filter(transaccion => {
      const searchMatch = transaccion.TipoTransaccion.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
                          transaccion.IdMonedero.toString().includes(this.searchTerm);

      const startDateMatch = !this.startDate || new Date(transaccion.FechaHora) >= new Date(this.startDate);
      const endDateMatch = !this.endDate || new Date(transaccion.FechaHora) <= new Date(this.endDate);

      return searchMatch && startDateMatch && endDateMatch;
    });

    this.totalRecords = this.filteredTransacciones.length;
    this.updateTotalPages();
    this.updatePaginatedTransacciones();
  }

  updateTotalPages(): void {
    this.totalPages = Math.ceil(this.totalRecords / this.pageSize);
  }

  updatePaginatedTransacciones(): void {
    const startIndex = this.startIndex;
    const endIndex = this.endIndex;
    this.paginatedTransacciones = this.filteredTransacciones.slice(startIndex, endIndex);
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
    this.filterTransacciones();
  }

  onNextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.updatePaginatedTransacciones();
    }
  }

  onPreviousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updatePaginatedTransacciones();
    }
  }

  showInfo(id: any): void {
    console.log('Mostrar información de la transacción con ID:', id);
  }
}
