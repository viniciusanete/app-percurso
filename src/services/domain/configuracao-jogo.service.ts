import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
@Injectable()
export class ConfiguracaoJogoService {
  constructor(public http: HttpClient) {
  }


  cadastrarConfiguracoesGerais(obj) {
    console.log('cadastrarConfiguracoesGerais',obj);

    return this.http.post(`${API_CONFIG.baseUrl}/config`, obj, {
      observe: "response",
      responseType: "text"
    });
  }
  cadastrarTema(obj) {
    //console.log('cadastrarConfiguracoesGerais',obj);

    return this.http.post(`${API_CONFIG.baseUrl}/tema`, obj, {
      observe: "response",
      responseType: "text"
    });
  }

  cadastrarQuestao(obj) {

    return this.http.post(`${API_CONFIG.baseUrl}/questoes`, obj, {
      observe: "response",
      responseType: "text"
    });
  }

  iniciarJogo(obj) {
//    console.log('cadastrarConfiguracoesGerais',obj);

    return this.http.post(`${API_CONFIG.baseUrl}/jogo`, obj, {
      observe: "response",
      responseType: "text"
    });
  }
  obterTemas():Observable<any>{
    return this.http.get(`${API_CONFIG.baseUrl}/tema/temas`)
  }
  obterCores():Observable<any>{
    return this.http.get(`${API_CONFIG.baseUrl}/config/cores`)
  }
  obterDificuldades():Observable<any>{
    return this.http.get(`${API_CONFIG.baseUrl}/questoes/dificuldades`)
  }
}
