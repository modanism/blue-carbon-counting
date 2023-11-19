import Button from "../button/Button"

const Hero = () => {
    return (<>
    <section className="flex flex-col justify-center items-center min-h-screen px-[271px] bg-[#EFF2F6]">
        <h1 className="text-neutral-10 text-[60px] font-[700] text-center mb-[16px]">Lorem Ipsum is simply dummy</h1>
        <p className="text-neutral-7 text-[20px] font-[400] text-center mb-[100px]">Welcome to Burger Bliss, where we take your cravings to a whole new level! Our mouthwatering burgers are made from 100% beef and are served on freshly baked buns. </p>
        <Button text="Explore"/>
    </section>    
    </>)
}

export default Hero