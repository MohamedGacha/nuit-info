import React from 'react'
import CorpseCSS from "./Corpse.module.css"
import CorpseSVG from "../assets/human-body-silhouette-with-focus-on-the-head-svgrepo-com.svg"

const Corpse = () => {
  return (
    <div className={CorpseCSS.container}>
        <div className={CorpseCSS.imgContainer}>

            <img src={CorpseSVG} className={CorpseCSS.corpseImg} alt="" />
        </div>

        <div className={CorpseCSS.label}>
            <p>
            Lorem ipsum odor amet, consectetuer adipiscing elit. Semper praesent magna torquent; faucibus fringilla elit ridiculus quisque vivamus. Consectetur fames himenaeos lobortis malesuada ipsum nunc phasellus vehicula. Potenti suspendisse varius primis montes praesent sed. Urna in suspendisse dignissim fusce feugiat aenean habitant ultricies. Sem placerat scelerisque mus phasellus facilisis magna aliquet. Mattis risus placerat platea urna tincidunt blandit. Himenaeos fringilla vestibulum fermentum platea ultricies laoreet himenaeos. Tristique finibus per malesuada ipsum; metus quis. Himenaeos augue varius senectus magnis nunc potenti per montes. Eu nullam rutrum proin egestas efficitur eleifend consectetur.
            </p>
        </div>

    </div>   
  )
}

export default Corpse