import React from "react";
import './Modal.css';
import { useState, useEffect } from "react"
  
const Modal = (props) => {

    const { open, close, header } = props;

    // useEffect(() => {
    //   document.body.style.cssText = `
    //   position: fixed; 
    //   top: -${window.scrollY}px;
    //   overflow-y: scroll;
    //   width: 100%;`;
    //   return () => {
    //     const scrollY = document.body.style.top;
    //     document.body.style.cssText = '';
    //     window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    //   };
    // }, [])

    return (
      <div className={open ? 'openModal modal' : 'modal'}>
        {open ? (
          <section>
            <header>
              <div>
              {header}
              </div>
              <div>
              <button className="close" onClick={close}>
                &times;
              </button>
                </div>
            </header>
            <main>{props.children}</main>
            <footer>
              {/* <button className="close" onClick={close}>
                close
              </button> */}
            </footer>
          </section>
        ) : null}
      </div>
    );
  }

export default Modal;