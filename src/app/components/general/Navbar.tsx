import Image from "next/image";

export function Navbar() {
    return (
        <nav className="p-5 flex items-center justify-between">
            <div className="flex items-center gap-6">
                <Image
                    src={"navbar/Danantara-Indonesia-Logo.svg"}
                    alt={"Brand Logo"}
                    width={200}
                    height={0}
                />
            </div>
            <div className="flex items-center gap-6 justify-end">
                <Image
                    src={"navbar/BurgerBar.svg"}
                    alt={"BurgerBar"}
                    width={40}
                    height={0}
                />
                <Image
                    src={"navbar/AruLogo.svg"}
                    alt={"AruLogo"}
                    width={80}
                    height={0}
                />
            </div>
        </nav>
    )
}