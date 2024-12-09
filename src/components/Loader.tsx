
type LoaderProps = {
    classProps: string
}

export default function Loader({ classProps = "" } : LoaderProps) {
  return (
    <span className={`loader ${classProps}`}></span>
  )
}
