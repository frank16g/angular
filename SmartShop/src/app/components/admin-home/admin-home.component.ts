import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions,ChartType } from 'chart.js';
import { Color, Label,MultiDataSet } from 'ng2-charts';
import { FirebaseServiceService } from '../../services/firebase-service.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { catchError, finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

  constructor(
    private router: Router,
    private firebaseServiceService: FirebaseServiceService,
    private storage: AngularFireStorage
  ) { }

  ngOnInit(): void {
    this.cargarListaCategorias();
    this.cargarProductos();
    this.cargarDatosGenerales();
  }


  //general
  
  //

  categoria: any[]=[];  

  barChartLabels: Label[] = [];
  cantidadProductos: any[]=[];
  cargarListaCategorias() {
    this.firebaseServiceService.getCategorias().subscribe(data => {
      this.categoria.length = 0;
        data.forEach((d)=>{
          this.categoria.push( d.payload.doc.data()['tipo']);
      });
      this.barChartLabels=this.categoria;
     
    });

  }
  
  collectionProductos: any[] = [];
  cargarProductos(){
    this.firebaseServiceService.getProductos().subscribe(data => {
      this.collectionProductos.length = 0;
      data.forEach((d)=>{
        this.collectionProductos.push( d.payload.doc.data()['categoria']);
    });
    let lacteos = 0, bebidas = 0, cereales = 0, cuidado = 0, hogar = 0, carnes = 0, frut = 0;
    this.collectionProductos.forEach((e)=>{
      if(e == "Lácteos"){
        lacteos++;
      }else if(e == "Bebidas"){
        bebidas++;
      }else if(e == "Cereales"){
        cereales++;
      }else if(e == "Cuidado Personal"){
        cuidado++;
      }else if(e == "Hogar y Limpieza"){
        hogar++;
      }else if(e == "Carnes"){
        carnes++;
      }else{
        frut++;
      }
    })
      
      this.cantidadProductos.push(bebidas);
      this.cantidadProductos.push(cereales);
      this.cantidadProductos.push(lacteos);
      this.cantidadProductos.push(cuidado);
      this.cantidadProductos.push(hogar);
      this.cantidadProductos.push(carnes);
      this.cantidadProductos.push(frut);

    },
      error => {
        console.error(error);
      }
    );
  }
  
 
  // segunda grafica
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  
  //barChartLabels: Label[] = ['Carnes', 'Verduras', 'Frutas', 'Cereales', 'Snacks', 'Lacteos'];
   barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

   barChartData: ChartDataSets[] = [
     { data: this.cantidadProductos, label: 'Cantidad de productos por categorias' }
   ];

   lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(39,112,231,2,20)',
    },
  ];
  //segunda grafica-----------------------------------------------------------------------------
  barChartOptionss: ChartOptions = {
    responsive: true,
  };
  barChartLabelss: Label[] = ['Clientes', 'Repartidores', 'Productos', 'Caregorias', 'Pedidos'];
  barChartTypes: ChartType = 'bar';
  barChartLegends = true;
  barChartPluginss = [];

 
  //Datos
  collecctionClientes: any[]=[];
  collecctionRepartidores: any[]=[];
  collecctionProductos: any[]=[];
  collecctionCaregorias: any[]=[];
  collecctionPedidos: any[]=[];
  collectionTotals: any[] =[];

  cargarDatosGenerales(){
    let usurios=0, repartidores = 0, pedidos = 0, productos = 0, categorias = 0;
    this.firebaseServiceService.getCategorias().subscribe(data => {
      this.collecctionCaregorias.length = 0;
        data.forEach((d)=>{
          this.collecctionCaregorias.push( d.payload.doc.data()['tipo']);
      });
      //
      this.firebaseServiceService.getProductos().subscribe(data => {
        this.collecctionProductos.length = 0;
          data.forEach((d)=>{
            this.collecctionProductos.push( d.payload.doc.data()['nombre']);
        });
        //REPARTIDORES
        this.firebaseServiceService.getRepartidores().subscribe(data => {
          this.collecctionRepartidores.length = 0;
            data.forEach((d)=>{
              this.collecctionRepartidores.push( d.payload.doc.data()['nombre']);
          });
          repartidores = this.collecctionRepartidores.length
           //USUARIOS
          this.firebaseServiceService.getUsuarios().subscribe(data => {
            this.collecctionClientes.length = 0;
              data.forEach((d)=>{
                this.collecctionClientes.push( d.payload.doc.data()['nombre']);
            });
            //PEDIDOS
            this.firebaseServiceService.getPedidos().subscribe(data => {
              this.collecctionPedidos.length = 0;
                data.forEach((d)=>{
                  this.collecctionPedidos.push( d.payload.doc.data()['id_repartidor']);
              });
              usurios = this.collecctionClientes.length; 
              repartidores = this.collecctionRepartidores.length; 
              pedidos = this.collecctionPedidos.length; 
              productos = this.collecctionProductos.length; 
              categorias = this.collecctionCaregorias.length;
              this.collectionTotals.push(usurios, repartidores,productos ,categorias ,  pedidos)
              console.log(usurios, repartidores,productos ,categorias ,  pedidos)
            });
          });
        });
      });
      
      
     
      //
      
      
      //
    });
    //
    
    
    
  }


  barChartDatas: ChartDataSets[] = [
    { data: this.collectionTotals, label: 'vista general' }
  ];
  ineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(39,112,231,2,20)',
    },
  ];

}
