import {
  Component,
  OnInit,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
} from "@angular/core";
import swal from 'sweetalert2';
import { Observable, Subject } from "rxjs";

import { DataService } from "../data.service";
import { Subscription } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSelect } from "@angular/material/select";

import { WebcamImage } from "./modules/webcam/domain/webcam-image";
import { WebcamUtil } from "./modules/webcam/util/webcam.util";
import { WebcamInitError } from "./modules/webcam/domain/webcam-init-error";
import { DatePipe } from "@angular/common";
@Component({
  selector: "app-estudiantes",
  templateUrl: "./estudiantes.component.html",
  styleUrls: ["./estudiantes.component.css"],
  providers: [DatePipe],
})
export class EstudiantesComponent implements OnInit, OnDestroy {
  //-------------------------------------------
  //-------------------------------------------
  //-------------------------------------------
  time;
  interval;

  iniciarGrabacion() {
    if (this.grabar) {
      this.grabar = false;
      this.interval = setInterval(() => {
        this.time = this.triggerSnapshot(); //set time variable with current date
      }, 10000);
    } else {
      this.grabar = true;
      clearInterval(this.interval);
    }
  }
  // toggle webcam on/off
  public showWebcam = true;
  public allowCameraSwitch = true;
  public multipleWebcamsAvailable = false;
  public deviceId: string;
  public facingMode: string = "environment";
  public errors: WebcamInitError[] = [];

  // latest snapshot
  public webcamImage: WebcamImage = null;

  // webcam snapshot trigger
  private trigger: Subject<void> = new Subject<void>();
  // switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
  private nextWebcam: Subject<boolean | string> = new Subject<
    boolean | string
  >();

  public triggerSnapshot(): void {
    this.trigger.next();
  }

  public toggleWebcam(): void {
    this.showWebcam = !this.showWebcam;
  }

  public showNextWebcam(directionOrDeviceId: boolean | string): void {
    // true => move forward through devices
    // false => move backwards through devices
    // string => move to device with given deviceId
    this.nextWebcam.next(directionOrDeviceId);
  }
  public handleInitError(error: WebcamInitError): void {
    if (
      error.mediaStreamError &&
      error.mediaStreamError.name === "NotAllowedError"
    ) {
      console.warn("Camera access was not allowed by user!");
    }
    this.errors.push(error);
  }
  public handleImage(webcamImage: WebcamImage) {
    console.log('received webcam image', webcamImage);
    fetch(webcamImage.imageAsDataUrl).then(res => res.blob()).then(blobData => {this.getPersonEmotion(blobData)})
    
  }

  public cameraWasSwitched(deviceId: string): void {
    console.log("active device: " + deviceId);
    this.deviceId = deviceId;
  }

  public get triggerObservable(): Observable<void> {
    return this.trigger.asObservable();
  }

  public get nextWebcamObservable(): Observable<boolean | string> {
    return this.nextWebcam.asObservable();
  }

  public get videoOptions(): MediaTrackConstraints {
    const result: MediaTrackConstraints = {};
    if (this.facingMode && this.facingMode !== "") {
      result.facingMode = { ideal: this.facingMode };
    }

    return result;
  }

  //-------------------------------------------------
  //----------------------------------------------------
  //---------------------------------------------
  private subscription: Subscription = new Subscription();
  listaCursosE;
  listaCursos;
  listaProfesores;
  grabacion = true;
  grabar = true;
  nameuser = localStorage.getItem('username');
  
  pass = null;
  nombreC = null;
  codigoC = null;
  creditosC = null;
  serverRes;
  carne = localStorage.getItem('identification');
  numGrupo;
  idProfesor;
  idCurso;
  idCursoEm;
  idEstudiante =  localStorage.getItem('user_id');
  private curso;
  private emocionesEnviar;
  
  myDate = new Date();
  testDay: String;
  @Input() showResponse: Array<any>;
  @Output() passRender: EventEmitter<boolean>;

  private emotionResponse;
  constructor(private dataService: DataService, private datePipe: DatePipe) {
    this.passRender = new EventEmitter();
    this.testDay = this.datePipe.transform(this.myDate, "yyyy-MM-dd");
    console.log(this.testDay);
  }
  displayedColumns: string[] = ["position", "name", "weight", "symbol"];
  dataSource = new MatTableDataSource<cursos>(ELEMENT_DATA);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  ngOnInit() {
    WebcamUtil.getAvailableVideoInputs().then(
      (mediaDevices: MediaDeviceInfo[]) => {
        this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
      }
    );
    this.getCursos();
    this.getProfesores();
    this.getCursosEstudiante();
    console.log(localStorage)
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  @ViewChild("matProfesor") matProfesor: MatSelect;
  @ViewChild("matCurso") matCurso: MatSelect;
  @ViewChild("matCursoEmocion") matCursoEmocion: MatSelect;
  //Reference Variable //variable Name //Type

  ngAfterViewInit() {
    this.matProfesor.valueChange.subscribe((value) => {
      this.idProfesor = value;
    });
    this.matCurso.valueChange.subscribe((value) => {
      this.idCurso = value;
    });
    this.matCursoEmocion.valueChange.subscribe((value) => {
      this.idCursoEm = value;
    });
  }
  misCursos = true;
  miPerfil = false;
  registrarCursos = true;
  siguiente = false;
  changeClient(value) {
    console.log(value);
  }
  siguienteF() {
    if(this.numGrupo=="" || this.nombreC==""){
      swal.fire(
        'Error!',
        'Espacios en blanco!',
        'error'
      );
    }else{
      if (this.siguiente == true) {
        this.siguiente = false;
      } else {
        this.siguiente = true;
      }
    }
    
  }
  insertarCursos(listaCursosE) {
    for (let i in listaCursosE) {
      ELEMENT_DATA.push(listaCursosE[i]);
    }
  }
  changeValue(value) {
    console.log(value);
  }
  private sesion;
  modificar() {
    this.sesion = { username: "jaffo98", password: "123" };
    this.subscription.add(
      this.dataService.iniciarSesion(this.sesion).subscribe(
        ///aaa
        (data) => {
          console.log(data);
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Error del lado del cliente");
          } else {
            console.log("Error del lado del servidor");
          }
        }
      )
    );
  }
  registrarCurso() {
    this.curso = {
      professor_id: this.idProfesor,
      course_id: this.idCurso,
      student_id: this.idEstudiante,
      group_number: this.numGrupo,
    };
    this.subscription.add(
      this.dataService.registrarCurso(this.curso).subscribe(
        ///aaa
        (data) => {
          this.serverRes = data;
          this.serverRes = this.serverRes.response;
          console.log(this.serverRes);
          if("ok"==this.serverRes){
            this.getCursos();
            this.getProfesores();
            this.getCursosEstudiante();
            swal.fire(
              'Perfecto!',
              'Registrado con exito!',
              'success'
            );
            this.changeView(0);
            this.siguiente=false;
          }else{
            swal.fire(
              'Error!',
              'No se ha registrado!',
              'error'
            );
          }

        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Error del lado del cliente");
          } else {
            console.log("Error del lado del servidor");
          }
        }
      )
    );
  }
  changeView(valor) {
    if (valor == 0) {
      this.misCursos = true;
      this.grabacion = true;
      this.registrarCursos = true;
      this.miPerfil = false;
    }
    if (valor == 1) {
      this.misCursos = false;
      this.grabacion = true;
      this.registrarCursos = true;
      this.miPerfil = true;
    }
    if (valor == 2) {
      this.misCursos = true;
      this.grabacion = true;
      this.registrarCursos = false;
      this.miPerfil = true;
    }
    if (valor == 3) {
      this.misCursos = true;
      this.grabacion = false;
      this.registrarCursos = true;
      this.miPerfil = true;
    }
  }
  getCursos() {
    this.subscription.add(
      this.dataService.getCursos().subscribe(
        ///aaa
        (data) => {
          this.listaCursos = data;
          this.listaCursos = this.listaCursos.response;
          this.paginator._intl.itemsPerPageLabel = "Curso por pagina";
          this.dataSource.paginator = this.paginator;
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Error del lado del cliente");
          } else {
            console.log("Error del lado del servidor");
          }
        }
      )
    );
  }
  getCursosEstudiante() {
    console.log('El # de cedula es ',this.carne)
    this.subscription.add(
      this.dataService.getCursosEstudiante(this.carne).subscribe(
        ///aaa
        (data) => {
          this.listaCursosE = data;
          this.listaCursosE = this.listaCursosE.response;
          this.insertarCursos(this.listaCursosE);
          this.paginator._intl.itemsPerPageLabel = "Curso por pagina";
          this.dataSource.paginator = this.paginator;
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Error del lado del cliente");
          } else {
            console.log("Error del lado del servidor");
          }
        }
      )
    );
  }
  getProfesores() {
    this.subscription.add(
      this.dataService.getProfesors().subscribe(
        ///aaa
        (data) => {
          this.listaProfesores = data;
          this.listaProfesores = this.listaProfesores.response;
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Error del lado del cliente");
          } else {
            console.log("Error del lado del servidor");
          }
        }
      )
    );
  }
  getPersonEmotion(image) {
    this.subscription.add(
      this.dataService.getPersonEmotion(image).subscribe(
        ///aaa
        (data) => {
          this.emotionResponse = data;
          console.log("data", this.emotionResponse);
          if (this.emotionResponse.length == 0) {
            console.log("Error, no existe nada que leer");
          } else {
            var emotions = data[0]["faceAttributes"]["emotion"];
            for (let emotion in emotions) {
              if (emotions[emotion] > 0.5) {
                this.emocionesEnviar = {
                  student_id: this.idEstudiante,
                  emotion: emotion,
                  course_id: this.idCursoEm,
                  fecha: this.testDay,
                };
                console.log("EMOCIONES", this.emocionesEnviar);
                this.subscription.add(
                  this.dataService
                    .registrarEmociones(this.emocionesEnviar)
                    .subscribe(
                      ///aaa
                      (data) => {
                        this.listaProfesores = data;
                        this.listaProfesores = this.listaProfesores.response;
                        console.log("Profesores", this.listaProfesores);
                      },
                      (err: HttpErrorResponse) => {
                        if (err.error instanceof Error) {
                          console.log("Error del lado del cliente");
                        } else {
                          console.log("Error del lado del servidor");
                        }
                      }
                    )
                );
              }
            }
          }
        },
        (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log("Error del lado del cliente");
          } else {
            console.log("Error del lado del servidor");
          }
        }
      )
    );
  }
}

export interface cursos {
  codigo: string;
  id: number;
  nombre: string;
  creditos: number;
}
var ELEMENT_DATA: cursos[] = [];

