import { Sub } from "../../entity";

function SubLink({ sub }: { sub: Sub }) {
  let text = sub.description;
  let url = sub.subUrl;
  if (text === null) {
    if (url.match(/^https?:\/\/nekocap\.com/)) {
      text = "Nekocap"
    } else if (url.match(/^https?:\/\/www\.youtube\.com/)) {
      text = "YouTube"
    } else {
      text = "Sub"
    }
  }
  return (
    <a href={url} target="_blank">
      {`[${text}]`}
    </a>
  )
}

export default SubLink;