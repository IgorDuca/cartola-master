// This file has all the interface that are used on the program, the interfaces are how typescript recognize types on responses (promises or static).
// All the interfaces are exported to be used in other files.
export interface marketStatusInterface {
    rodada_atual: number,
    status_mercado: number,
    esquema_default_id: number,
    cartoleta_inicial: number,
    max_ligas_free: number,
    max_ligas_pro: number,
    max_ligas_matamata_free: number,
    max_ligas_matamata_pro: number,
    max_ligas_patrocinadas_free: number,
    max_ligas_patrocinadas_pro_num: number,
    game_over: boolean,
    temporada: number,
    reativar: boolean,
    exibe_sorteio_pro: boolean,
    fechamento: {
      dia: number,
      mes: number,
      ano: number,
      hora: number,
      minuto: number,
      timestamp: number
    },
    limites_competicao: {
      total_confronto_pro: number,
      total_confronto_free: number,
      criacao_confronto_pro: number,
      criacao_confronto_free: number
    },
    times_escalados: number,
    mercado_pos_rodada: boolean,
    novo_mes_ranking: boolean
}

export interface trendingPlayersInterface {
    posicao: string,
    posicao_abreviacao: string,
    clube: string,
    clube_nome: string,
    escudo_clube: string,
    Atleta: {
      nome: string,
      apelido: string,
      apelido_abreviado: string,
      foto: string,
      atleta_id: number,
      preco_editorial: string
    },
    clube_id: number,
    escalacoes: number
}

// Positions
// 1 -> gol
// 2 -> lat
// 3 -> zag 
// 4 -> mei
// 5 -> ata
// 6 -> tec

export interface schemasInterface {
    esquema_id: number,
    nome: string,
    posicoes: {
      ata: number,
      gol: number,
      lat: number,
      mei: number,
      tec: number,
      zag: number
    }
}

// Status
// 2 -> Dúvida
// 3 -> Suspenso
// 5 -> Contundido
// 6 -> Nulo
// 7 -> Provável

export interface allPlayersInterface {
  atletas: [
    {
      scout: {
        A: number,
        CA: number,
        DS: number,
        FC: number,
        FD: number,
        FF: number,
        FS: number,
        G: number,
        I: number,
        PI: number
      },
      atleta_id: number,
      rodada_id: number,
      clube_id: number,
      posicao_id: number,
      status_id: number,
      pontos_num: number,
      preco_num: number,
      variacao_num: number,
      media_num: number,
      jogos_num: number,
      slug: string,
      apelido: string,
      apelido_abreviado: string,
      nome: string,
      foto: string
    },
  ]
}

export interface responsePlayerInterface {
  scout: {
    A: number,
    CA: number,
    DS: number,
    FC: number,
    FD: number,
    FF: number,
    FS: number,
    G: number,
    I: number,
    PI: number
  },
  atleta_id: number,
  rodada_id: number,
  clube_id: number,
  posicao_id: number,
  status_id: number,
  pontos_num: number,
  preco_num: number,
  variacao_num: number,
  media_num: number,
  jogos_num: number,
  slug: string,
  apelido: string,
  apelido_abreviado: string,
  nome: string,
  foto: string
}

export interface clubInterface {
  nome: string,
  abreviacao: string,
  nome_fantasia: string,
  id: number
}

export interface formattedPlayerInterface {
  id: string,
  name: string,
  club_id: number,
  club_name: string,
  position: number,
  capitain?: boolean
}