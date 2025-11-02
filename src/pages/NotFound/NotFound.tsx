import { Link } from "react-router";

export function NotFound() {
  return (
    <>
    <h1>NotFound</h1>
    <Link to={"/"}> На главную</Link>
    </>
  )
}
