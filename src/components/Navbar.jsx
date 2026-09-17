export default function NavBar() {
  const links = [
    { sectionId: "home", label: "Home" },
    { sectionId: "about", label: "About" },
    { sectionId: "projects", label: "Projects" },
  ];

  const externalLinks = [
    {
      url: "https://www.linkedin.com/in/03karenxu/",
      label: "LinkedIn",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="-mb-3 size-8"
        >
          <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
        </svg>
      ),
    },
    {
      url: "https://github.com/03karenxu",
      label: "GitHub",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6"
        >
          <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.57.1.78-.25.78-.55v-1.93c-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.75 2.7 1.25 3.36.95.1-.75.4-1.25.73-1.53-2.55-.29-5.24-1.28-5.24-5.68 0-1.25.45-2.28 1.18-3.08-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.73.8 1.18 1.83 1.18 3.08 0 4.41-2.7 5.38-5.27 5.67.42.36.78 1.08.78 2.18v3.23c0 .3.21.66.79.55A10.99 10.99 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
        </svg>
      ),
    },
  ];

  return (
    <nav className="text-charcoal fixed z-20 flex w-full justify-end gap-4 px-10 py-8 text-xl font-semibold tracking-wide md:text-lg lg:px-14 lg:py-10">
      {links.map(({ sectionId, label }) => {
        return (
          <a
            key={sectionId}
            href={`#${sectionId}`}
            className="hover:text-aqua hidden transition-colors duration-150 ease-in md:block"
          >
            {label}
          </a>
        );
      })}
      <a
        href="/resume.pdf"
        target="_blank"
        className="hover:text-aqua hidden transition-colors duration-100 ease-in md:block"
      >
        CV
      </a>
      {externalLinks.map(({ url, label, icon }) => {
        return (
          <a
            key={url}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="hover:text-aqua flex items-center transition-colors duration-150 ease-in"
          >
            <span className="md:hidden">{icon}</span>
            <span className="hidden md:inline">{label}</span>
          </a>
        );
      })}
    </nav>
  );
}
