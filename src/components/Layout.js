import React from "react"
import "../styles/global.css"

export default function Layout({ children }) {
  return (
    <section className="layout">
      {/* <Navbar /> */}
      <div className="content">{children}</div>
      <footer>
        Made with love{" "}
        <a
          href="http://www.ahmedhussien.me/"
          className="footerLink"
          target="_blank"
        >
          Ahmed Khattab
        </a>{" "}
      </footer>
    </section>
  )
}
