// @ts-ignore
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpRequest } from "@angular/common/http";
import { environment } from "./enviroment/environment";
declare var require: any;

@Injectable()
export class DataService {
  constructor(private response: HttpClient) {}
  private _API_ROOT: string = environment.API_ROOT;
  private url: string = environment.FACE_URL;

  registrar(usuario: JSON) {
    const headers = { "content-type": "application/json" };

    return this.response.post(this._API_ROOT + "/registro", usuario, {headers});
  }
  iniciarSesion(dataQuery: JSON) {
    const headers = { "content-type": "application/json" }; // let
    return this.response.post(this._API_ROOT + "/iniciarSesion", dataQuery, {headers});
  }
  getCursosEstudiante(carne) {
    const headers = {};
    const params = { identification: carne };
    return this.response.get(this._API_ROOT + "/getCursosEstudiante", {
      headers,
      params,
    });
  }
  getCursos() {
    const headers = {};
    return this.response.get(this._API_ROOT + "/getCursos", { headers });
  }
  getEmociones(id) {
    const headers = { };
    const params = {identification: id};
    console.log(this._API_ROOT + '/filtrarEstudiante'+"?identification ="+id);
    return this.response.get(this._API_ROOT + '/filtrarEstudiante'+"?identification ="+id, {headers, params});
  }
  uploadImage(image) {
    const headers = {};
    const params = { Image: image };
    return this.response.post(this._API_ROOT + "/uploadImage", {
      headers,
      params,
    });
  }
  ingresarDatos(telefono, curso) {
    const headers = {};
    const params = { Telefono: telefono, Curso: curso };
    return this.response.post(this._API_ROOT + "/ingresarDatos", {
      headers,
      params,
    });
  }
  registrarProfesores(profesor: JSON) {
    const headers = { "content-type": "application/json" };
    return this.response.post(
      this._API_ROOT + "/registrarProfesor",profesor,
      { headers }
    );
  }
  registrarCurso(curso: JSON) {
    const headers = { "content-type": "application/json" };
    return this.response.post(
      this._API_ROOT + "/registrarCursoEstudiante",curso,{ headers }
    );
    
  }
  registrarCursos(dataquery: JSON) {
    const headers = {};
    return this.response.post(this._API_ROOT + "/registrarCursos", { headers });
  }
  registrarEmociones(emociones:JSON) {
    const headers = {'content-type': 'application/json'};
    const params = {};
    return this.response.post(this._API_ROOT + '/registrarEmociones',emociones,{headers});
  }
  getEmocionesCurso(nombreCurso) {
    const headers = {};
    const params = { NombreCurso: nombreCurso };
    return this.response.get(this._API_ROOT + "/getEmocionesCurso", {
      headers,
      params,
    });
  }
  getEmocionesProfesor(cedula) {
    const headers = {};
    const params = { Cedula: cedula };
    return this.response.get(this._API_ROOT + "/getEmocionesProfesor", {
      headers,
      params,
    });
  }
  getProfesors() {
    const headers = {};
    return this.response.get(this._API_ROOT + "/getProfessors", { headers });
  }

  getPersonEmotion(image) {
    const headers = {
      "Content-Type": "application/octet-stream",
      "Ocp-Apim-Subscription-Key": environment.SUBSCRIPTION_KEY,
    };

    //const blob = this.makeblob(imageURL);
    return this.response.post(this.url, image, { headers });
  }
}
