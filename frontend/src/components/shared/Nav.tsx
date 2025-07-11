import React from 'react';
import Logo from './Logo';
import UserIcon from '../../assets/user-icon.png';

const aClass = "flex items-center justify-center h-full text-2xl font-light text-white no-underline"

function Nav() {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado') || 'null');

    return (
        <nav className="flex justify-between items-center p-10 text-white h-[100px]">
            <div className="nav-left flex items-center gap-5">
                <a href="/">
                    <Logo size="text-4xl" />
                </a>
            </div>
           
            <div className="flex gap-5 items-center justify-center h-full">
                <a className={ aClass } href="/games">Games</a>
                {!usuarioLogado && (
                    <>
                        <a className={aClass} href="/sign-in">Sign In</a>
                        <a className={aClass} href="/login">Login</a>
                    </>
                )}
                
                {usuarioLogado && (
                    <a className={aClass} href="/profile">
                        <img src={usuarioLogado.imagem || UserIcon} alt="User Icon" className="w-10 h-10 rounded-full" />
                    </a>
                )}
                {/* <a className={ aClass } href="/create-list">Create List</a> */}
                {/* <a className={ aClass } href="/user-lists">User Lists</a> */}
                {/* <a className={ aClass } href="/public-lists">Public Lists</a> */}
                {/* <a className={ aClass } href="/profile"> */}
                    {/* <img src={UserIcon} alt="User Icon" /> */}
                {/* </a> */}
            </div>
        </nav>
    );
}

export default Nav;