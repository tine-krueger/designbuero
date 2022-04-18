import { Error } from "../components/error/error";

export default function Custom500() {
    return <Error errorText="Es scheint ein Server-Propblem zu geben. Bitte kontaktieren Sie den Administrator." errorType="Error 500"/>
  }