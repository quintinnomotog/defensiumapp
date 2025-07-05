import { CategoriaCredencialModel } from "./categoria-credencial.model";
import { PessoaModel } from "./pessoa.model";

// FIXME: Substituir os objetos por atributos ID
export interface CredencialModel {
    categoriaCredencialEntity: CategoriaCredencialModel,
    pessoaEntity: PessoaModel,
    identificador: string,
    senha: string,
    descricao: string,
    link: string,
    observacao: string,
    databaseHostname: string,
    databasePorta: string,
    databaseNome: string,
    databaseUsuario: string,
}