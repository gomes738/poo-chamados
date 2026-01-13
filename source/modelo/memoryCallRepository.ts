import { Chamado } from "./chamado";
import { ICallRepository } from "./iCallRepository";

/**
 * Implementação de repositório em memória para a entidade Chamado.
 * Deve manter uma coleção interna (ex.: Array) para armazenar os registros durante a execução.
 */
export class MemoryCallRepository implements ICallRepository {

    // coleção interna em memória
    private chamados: Chamado[] = [];

    /**
     * Cria e armazena um novo chamado na coleção em memória.
     * @param chamado instância a ser adicionada
     * @returns true se adicionado com sucesso, false caso contrário
     */
    criarNovoChamado(chamado: Chamado): boolean {
        this.chamados.push(chamado);
        return true;
    }

    /**
     * Atualiza um chamado existente na coleção em memória.
     * A identificação do registro é feita por referência de objeto.
     * @param chamado instância contendo os dados atualizados
     * @returns true se atualizado com sucesso, false caso contrário
     */
    atualizarChamado(chamado: Chamado): boolean {
        const index = this.chamados.indexOf(chamado);

        if (index === -1) {
            return false;
        }

        this.chamados[index] = chamado;
        return true;
    }

    /**
     * Retorna todos os chamados armazenados atualmente na coleção em memória.
     * @returns lista de chamados
     */
    listarChamados(): Array<Chamado> {
        return this.chamados;
    }
}
