import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <p>© 2026 Cofrinho</p>

      <div className="footer-links">
        <a
          href="https://github.com/AlmeidaGeovanna"
          target="_blank"
          rel="noreferrer"
        >
          <FaGithub size={20} />
        </a>

        <a
          href="https://www.linkedin.com/in/geovanna-almeida-308230255/"
          target="_blank"
          rel="noreferrer"
        >
          <FaLinkedin size={20} />
        </a>
      </div>
    </footer>
  );
}