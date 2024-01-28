import Image from "next/image";
import './component.css'
import Link from "next/link";
import Badge from "../Badge";
import { text } from "stream/consumers";

interface WebsiteProps {
  link: string,
  imageURL: string,
  title: string,
  techStack: string[]
}

export default function Website({ link, imageURL, title, techStack }: WebsiteProps) {
  return (
    <Link
      href={link}
      className="website-card"
      target="_blank"
    >
      <Image
        src={imageURL}
        alt={title}
        width={1600}
        height={900}
        className="website-image"
      />
      <div className="website-overlay">
        <div className="badges">
          {techStack.map(
            tech => <Badge key={tech} text={tech} />
          )}
        </div>
      </div>
    </Link>
  )
}
