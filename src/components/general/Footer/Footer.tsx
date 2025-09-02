import Image from "next/image";

export default function Footer() {
    return (
        <footer className="footer p-10 flex-col items-center bottom-0 bg-gray-300">
            <div className="flex justify-center items-center w-full mb-8">
                <Image
                    src={"/footer/Desc.svg"}
                    alt={"Desc"}
                    width={400}
                    height={0}
                />
            </div>
            <div className="flex justify-center items-center gap-40 w-full">
                <Image
                    src={"/footer/Address.svg"}
                    alt={"Desc"}
                    width={240}
                    height={0}
                />
                <Image
                    src={"/footer/ContactUs.svg"}
                    alt={"Desc"}
                    width={150}
                    height={0}
                />
            </div>
        </footer>
    )
}