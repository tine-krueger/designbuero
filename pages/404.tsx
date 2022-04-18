import { Error } from "../components/error/error";

export default function Custom404() {
    return <Error errorText="Upps, diese Seite konnten wir nicht finden." errorType="Error 404"/>
  }