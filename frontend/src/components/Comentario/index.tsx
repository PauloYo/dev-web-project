import { useState } from "react"

function Comentario() {
  const [comentario, setComentario] = useState<string>('')

  return (
    <div>
      <input value={comentario} type="text" />
    </div>
  )
}

export default Comentario