// import React, { useEffect, useState } from 'react';
// import Nav from '../components/shared/Nav';
// import Title from '../components/shared/Title';
// import logoImage from '../assets/logo-image.png';
// import { JogosService } from '../services/jogos';
// import type { JogoDetails } from '../types/internal';
// import Footer from '../components/shared/Footer'

// function SelectedGame() {
//     const [jogo, setJogo] = useState<JogoDetails | null>(null);
//     const [mensagem, setMensagem] = useState('');

//     useEffect(() => {
//         const fetchJogo =  async () => {
//             try {
//                 const id = IdJogo;
//                 const jogo = await JogosService.getByIdWithDetails(id);
//                 setJogo({
//                     id: jogo.id,
//                     nome: jogo.nome,
//                     descricao: jogo.descricao,
//                     imagem: jogo.imagem,
//                     categorias: jogo.categorias,
//                     plataformas: jogo.plataformas 

//                 });

//             } catch (err) {
//                 setMensagem('Erro ao carregar jogo.');
//             }
//         }

//     })
//     return (
//         <>
//         <Nav />
//         <div></div>

//         <Footer />
//         </>
//     )
// }

// export default SelectedGame;
