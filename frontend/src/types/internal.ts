import type { Jogo, Plataforma, Categoria } from "./api";

export type PlataformasOptions = "playstation" | "nintendo" | "xbox" | "windows" | "macos" | "linux" | "mobile";

export type JogoDetails = Jogo & {
    plataformas: Plataforma[];
    categorias: Categoria[];
    ranking?: number;
    rating: number;
    totalUserRatings: number;
};