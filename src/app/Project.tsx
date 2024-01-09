import Image from "next/image"
import Link from "next/link"

const Project = ({ params }: {
  params: {
    image: string,
    name: string,
    description: string,
    timeline: string
  }
}) => {
  return (
    <Link href={params.image} className="flex flex-col w-80 bg-gray-900 rounded-lg shadow-md text-white" target="_blank">
      <Image src='/placeholder.png' alt={params.name} width={960} height={540} className="rounded-md" />
      <div className="flex flex-col m-2 gap-2">
        <h2>{params.name}</h2>
        <p className="text-sm text-gray-400">{params.description}</p>
        <p className="text-sm text-gray-400"><span className="font-bold">Timeline: </span>{params.timeline}</p>
      </div>
    </Link>
  )
}

export default Project