import Image from 'next/image'

export default function Home() {
  return (
      <div className="flex w-[60%] justify-self-center">
        <Image className="w-full"
          src={"carousel/Carousel_1.svg"}
          alt={"Carousel1"}
          width={0}
          height={0}
          />
      </div>
  )
}