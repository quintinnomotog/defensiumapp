import { CategoriaCredencialModel } from "./categoria-credencial.model";
import { PessoaModel } from "./pessoa.model";

export interface CredencialModel {
    categoriaCredencialEntity: CategoriaCredencialModel,
    pessoaEntity: PessoaModel,
    identificador: string;
    senha: string;
    descricao: string,
    link: string,
    observacao: string,
}