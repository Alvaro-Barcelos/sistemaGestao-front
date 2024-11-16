import { Routes } from '@angular/router';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { AgendaComponent } from './components/agenda/agenda.component';
import { ProdutolistComponent } from './components/produtos/produtolist/produtolist.component';
import { ProdutodetailsComponent } from './components/produtos/produtodetails/produtodetails.component';
import { ClientelistComponent } from './components/clientes/clientelist/clientelist.component';
import { ClientedetailsComponent } from './components/clientes/clientedetails/clientedetails.component';
import { FuncionariolistComponent } from './components/funcionarios/funcionariolist/funcionariolist.component';
import { FuncionariodetailsComponent } from './components/funcionarios/funcionariodetails/funcionariodetails.component';
import { VendalistComponent } from './components/venda/vendalist/vendalist.component';
import { VendadetailsComponent } from './components/venda/vendadetails/vendadetails.component';
import { AtendimentolistComponent } from './components/atendimentos/atendimentolist/atendimentolist.component';
import { AtendimentodetailsComponent } from './components/atendimentos/atendimentodetails/atendimentodetails.component';
import { TipoatendimentolistComponent } from './components/tipoatendimento/tipoatendimentolist/tipoatendimentolist.component';
import { TipoatendimentodetailsComponent } from './components/tipoatendimento/tipoatendimentodetails/tipoatendimentodetails.component';


export const routes: Routes = [
    { path: '', redirectTo: 'principal/atendimentos', pathMatch: 'full' },  

    {
        path: 'principal',
        component: PrincipalComponent,  
        children: [
            {path: 'atendimentos', component: AtendimentolistComponent},
            {path: 'atendimentos/new',component: AtendimentodetailsComponent},
            {path: 'atendimentos/new/:id', component: AtendimentodetailsComponent},
            {path: 'tipoatendimento', component: TipoatendimentolistComponent},
            {path: 'tipoatendimento/new',component: TipoatendimentodetailsComponent},
            {path: 'tipoatendimento/new/:id', component: TipoatendimentodetailsComponent},
            {path: 'agenda', component: AgendaComponent },
            {path: 'produtos', component: ProdutolistComponent },
            {path: 'produtos/new', component: ProdutodetailsComponent },
            {path: 'produtos/new/:id', component: ProdutodetailsComponent },
            {path: 'clientes', component: ClientelistComponent},
            {path: 'clientes/new',component: ClientedetailsComponent},
            {path: 'clientes/new/:id', component:ClientedetailsComponent},
            {path: 'funcionarios', component: FuncionariolistComponent},
            {path: 'funcionarios/new',component: FuncionariodetailsComponent},
            {path: 'funcionarios/new/:id', component: FuncionariodetailsComponent},
            {path: 'venda', component: VendalistComponent},
            {path: 'venda/new', component: VendadetailsComponent},
            {path: 'venda/new/:id', component: VendalistComponent}
            ]   
    }
];
