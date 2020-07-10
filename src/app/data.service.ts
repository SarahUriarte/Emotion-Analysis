// @ts-ignore
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from './enviroment/environment';
declare var require: any;

@Injectable()
export class DataService {
  constructor(private response: HttpClient) {
  }
  private _API_ROOT: string = environment.API_ROOT;
  private url: string = environment.FACE_URL;
  registrar(identificador, usuario, contraseña, nombre, apellidos, rol, primeraVez) {
    const headers = { }; // let
    const params = {Identificador: identificador, Usuario: usuario, Contraseña: contraseña,
                    Nombre: nombre, Apellidos: apellidos, Rol: rol, PrimeraVez: primeraVez};
    return this.response.post(this._API_ROOT + '/registrar', {headers, params});
  }
  iniciarSesion(dataQuery: JSON) {
    const headers = { }; // let
    return this.response.post(this._API_ROOT + '/iniciarSesion',dataQuery, {headers});
  }
  getCursosEstudiate(carne) {
    const headers = { };
    const params = {identification: carne};
    return this.response.get(this._API_ROOT + '/getCursosEstudiante', {headers, params});
  }
  getCursos() {
    const headers = { };
    return this.response.get(this._API_ROOT + '/getCursos', {headers});
  }
  getEmociones(carne) {
    const headers = { };
    const params = {Carne: carne};
    return this.response.get(this._API_ROOT + '/getEmociones', {headers, params});
  }
  uploadImage(image) {
    const headers = { };
    const params = {Image: image};
    return this.response.post(this._API_ROOT + '/uploadImage', {headers, params});
  }
  ingresarDatos(telefono, curso) {
    const headers = { };
    const params = {Telefono: telefono, Curso: curso};
    return this.response.post(this._API_ROOT + '/ingresarDatos', {headers, params});
  }
  registrarProfesores(cedula, nombre, apellido) {
    const headers = { };
    const params = {Cedula: cedula, Nombre: nombre, Apellido: apellido};
    return this.response.post(this._API_ROOT + '/registrarProfesores', {headers, params});
  }
  registrarCurso(curso:JSON) {
    const headers = {'content-type': 'application/json'};
    return this.response.post(this._API_ROOT + '/registrarCursoEstudiante', curso,{headers});
    //return this.response.post(this._API_ROOT + '/registrarCursoEstudiante',dataQuery, {headers});
  }
  registrarCursos(dataquery : JSON) {
    const headers = { };
    return this.response.post(this._API_ROOT + '/registrarCursos', {headers});
  }
  registrarEmociones(id, emocion, profesorCursoFK, idEstudianteFK, fechaYHora) {
    const headers = { };
    const params = {Id: id, Emocion: emocion, ProfesorCursoFK: profesorCursoFK,
                    IdEstudianteFK: idEstudianteFK, FechaYHora: fechaYHora};
    return this.response.post(this._API_ROOT + '/registrarEmociones', {headers, params});
  }
  getEmocionesCurso(nombreCurso) {
    const headers = { };
    const params = {NombreCurso: nombreCurso};
    return this.response.get(this._API_ROOT + '/getEmocionesCurso', {headers, params});
  }
  getEmocionesProfesor(cedula) {
    const headers = { };
    const params = {Cedula: cedula};
    return this.response.get(this._API_ROOT + '/getEmocionesProfesor', {headers, params});
  }
  getProfesors() {
    const headers = { };
    return this.response.get(this._API_ROOT + '/getProfessors', {headers});
  }

  getPersonEmotion(imageURL:String){
    const headers = {
      'Content-Type': 'application/json', 
      'Ocp-Apim-Subscription-Key': environment.SUBSCRIPTION_KEY
    };

    //const blob = this.makeblob(imageURL);
   return this.response.post(this.url, {url:imageURL},{headers})
  }
  /*
  private makeblob(dataURL) {
    const BASE64_MARKER = ';base64,';
    const parts = dataURL.split(BASE64_MARKER);
    const contentType = parts[0].split(':')[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array]);
  }*/
}








