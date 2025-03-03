
type LoaderProps = {
    classProps: string
}

export default function Loader({ classProps = "w-6 h-6 border-2 border-black" } : LoaderProps) {
  return (
    <span className={`loader ${classProps}`}></span>
  )
}
