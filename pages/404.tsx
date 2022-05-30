import { Error } from "../components/error/error";
import { NGColor } from "../types/colors";

export default function Custom404() {
    return <Error errorText="Upps, diese Seite konnten wir nicht finden." errorType="Error 404"/>
  }

  Custom404.footerClass = 'c-bg--blue'
  Custom404.headerColor = NGColor.petrol