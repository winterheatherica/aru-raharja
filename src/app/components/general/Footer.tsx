import Image from "next/image";

export function Footer() {
    return (
        <footer className="footer p-10 flex-col items-center bottom-0 bg-gray-300 w-full">
            <div className="flex justify-center w-full mb-8">
                <Image
                    src={"/footer/Desc.svg"}
                    alt={"Desc"}
                    width={400}
                    height={0}
                />
            </div>
            <div className="flex w-full items-center justify-between">
                <div className="flex w-full items-center justify-center">
                    <Image
                        src={"/footer/Address.svg"}
                        alt={"Desc"}
                        width={240}
                        height={0}
                    />
                </div>
                <div className="flex w-full items-center justify-center">
                    <Image
                        src={"/footer/ContactUs.svg"}
                        alt={"Desc"}
                        width={150}
                        height={0}
                    />
                </div>
            </div>
        </footer>
    )
}