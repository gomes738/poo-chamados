import { ICallController } from "../funcionalidade/iCallController";
import { ICallUI } from "./iCallUI";

/**
 * Interface de usuário textual (prompt/alert) para interação com o sistema de chamados.
 * Permite abrir chamados, listar e marcar como concluídos via menu simples.
 */
export class TextCallUI implements ICallUI {

    callController: ICallController;

    /**
     * Inicializa a UI com um controlador de chamados.
     * @param callController instância responsável pelas regras de negócio
     */
    constructor(callController: ICallController) {
        this.callController = callController;
    }

    /**
     * Inicia o loop de interação com o usuário via prompt.
     * Opções: 1) Cadastrar, 2) Listar, 3) Marcar como concluído, 0) Sair.
     * Observação: As opções de listagem e marcação podem ser expandidas pelos alunos.
     */
    start(): void {
        let op = 1;
        while (op != 0) {
            op = Number(prompt('Escolha uma opção\n1- Cadastrar\n2- Listar\n3- Marcar como concluido\n0- Sair'
));
            switch (op) {
                case 1:
                    let nome: string = prompt('Digite seu nome')!;
                    let descricao: string = prompt('Digite a descrição do problema')!;
                    let deuCerto: boolean = this.callController.abrirChamado(nome, descricao);
                    if (deuCerto) {
                        alert('Chamado cadastrado');
                    } else {
                        alert('Não foi possível cadastrar o chamado');
                    }
                    break;

                case 2:
                    const chamados = this.callController.listarChamado();
                    if (chamados.length === 0) {
                        alert('Nenhum chamado cadastrado');
                        break;
                    }

                    let texto = 'Chamados:\n\n';

                    chamados.forEach((c, i) => {
                        texto += `${i} - ${c.solicitante}\n`;
                        texto += `Descrição: ${c.descricao}\n`;
                        texto += `Status: ${c.status ? 'Atendido' : 'Aberto'}\n\n`;
                    });

                    alert(texto);
                    break;


                case 3:
                    const lista = this.callController.listarChamado();

                    if (lista.length === 0) {
                        alert('Não há chamados para atender');
                        break;
                    }

                    const indice = Number(prompt('Digite o índice do chamado'));

                    if (isNaN(indice) || !lista[indice]) {
                        alert('Índice inválido');
                        break;
                    }

                    const sucesso = this.callController.marcarComoAtendido(lista[indice]);

                    if (sucesso) {
                        alert('Chamado marcado como atendido');
                    } else {
                        alert('Erro ao atualizar chamado');
                    }
                       break;

                case 0:
                    break;
                default:
                    alert('Opcao Inválida');
            }
        }
    }

}
