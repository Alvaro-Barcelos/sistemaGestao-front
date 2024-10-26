import { Routes } from '@angular/router';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { AgendaComponent } from './components/agenda/agenda.component';
import { ProdutolistComponent } from './components/produtos/produtolist/produtolist.component';
import { ProdutodetailsComponent } from './components/produtos/produtodetails/produtodetails.component';
import { ClienteslistComponent } from './components/clientes/clienteslist/clienteslist.component';
import { ClientesdetailsComponent } from './components/clientes/clientesdetails/clientesdetails.component';

export const routes: Routes = [
    { path: '', redirectTo: 'principal', pathMatch: 'full' },  

    {
        path: 'principal',
        component: PrincipalComponent,  
        children: [
            { path: 'agenda', component: AgendaComponent },
            { path: 'produtos', component: ProdutolistComponent },
            { path: 'produtos/new', component: ProdutodetailsComponent },
            { path: 'produtos/new/:id', component: ProdutodetailsComponent },
            { path: 'clientes', component: ClienteslistComponent },
            { path: 'clientes/new', component: ClientesdetailsComponent },
            { path: 'clientes/new/:id', component: ClientesdetailsComponent }
        ]
    }
];
