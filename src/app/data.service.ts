// @ts-ignore
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './enviroment/environment';
declare var require: any;

@Injectable()
export class DataService {
  constructor(private response: HttpClient) {
  }
  private _API_ROOT: string = environment.API_ROOT;
  registrar(usuario:JSON) {
    const headers = {'content-type': 'application/json'};
    
    return this.response.post(this._API_ROOT + '/registro', usuario,{headers});
  }
  iniciarSesion(username, contraseña) {
    const headers = { }; // let
    const params = {Username: username, Contraseña: contraseña};
    return this.response.post(this._API_ROOT + 'general/iniciarSesion', {headers, params});
  }
  getCursosEstudiate(carne) {
    const headers = { };
    const params = {Carne: carne};
    return this.response.get(this._API_ROOT + 'estudiantes/getCursosEstudiante', {headers, params});
  }
  getCursos() {
    const headers = { };
    return this.response.get(this._API_ROOT + '/getCursos', {headers});
  }
  getEmociones(id) {
    const headers = { };
    const params = {identification: id};
    console.log(this._API_ROOT + '/filtrarEstudiante'+"?identification ="+id);
    return this.response.get(this._API_ROOT + '/filtrarEstudiante'+"?identification ="+id, {headers, params});
  }
  uploadImage(image) {
    const headers = { };
    const params = {Image: image};
    return this.response.post(this._API_ROOT + 'estudiantes/uploadImage', {headers, params});
  }
  ingresarDatos(telefono, curso) {
    const headers = { };
    const params = {Telefono: telefono, Curso: curso};
    return this.response.post(this._API_ROOT + 'estudiantes/ingresarDatos', {headers, params});
  }
  registrarProfesores(cedula, nombre, apellido) {
    const headers = { };
    const params = {Cedula: cedula, Nombre: nombre, Apellido: apellido};
    return this.response.post(this._API_ROOT + 'computacion/registrarProfesores', {headers, params});
  }

  registrarCursos(codigo, cantEst, cantCred, profesorFK, numGrupo) {
    const headers = { };
    const params = {Codigo: codigo, CantEst: cantEst, CantCred: cantCred, ProfesorFK: profesorFK, NumGrupo: numGrupo};
    return this.response.post(this._API_ROOT + 'computacion/registrarCursos', {headers, params});
  }
  registrarEmociones(id, emocion, profesorCursoFK, idEstudianteFK, fechaYHora) {
    const headers = { };
    const params = {Id: id, Emocion: emocion, ProfesorCursoFK: profesorCursoFK,
                    IdEstudianteFK: idEstudianteFK, FechaYHora: fechaYHora};
    return this.response.post(this._API_ROOT + 'estudiantes/registrarEmociones', {headers, params});
  }
  getEmocionesCurso(nombreCurso) {
    const headers = { };
    const params = {NombreCurso: nombreCurso};
    return this.response.get(this._API_ROOT + 'computacion/getEmocionesCurso', {headers, params});
  }
  getEmocionesProfesor(cedula) {
    const headers = { };
    const params = {Cedula: cedula};
    return this.response.get(this._API_ROOT + 'computacion/getEmocionesProfesor', {headers, params});
  }
}








