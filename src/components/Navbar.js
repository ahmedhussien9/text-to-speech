import { Link } from "gatsby"
import React from "react"

export default function Navbar() {
  return (
    <nav>
      <h2>Front-end</h2>
      <div className="links">
        <Link to="/">Home</Link>
      </div>
    </nav>
  )
}
