import "../styles/snapshot.css";

type SnapshotItem = {
  index: string;
  href?: string;
  metaHref?: string;
  label: string;
  value: string;
  meta: string;
};

const SNAPSHOT_ITEMS: SnapshotItem[] = [
  {
    index: "01",
    href: "#contact",
    label: "Based in",
    value: "Hyderabad, India",
    meta: "India / IST",
  },
  {
    index: "02",
    label: "Role",
    value: "Associate Software Engineer",
    meta: "TECHNOMOLD IT SOLUTIONS PVT LTD",
    metaHref: "https://moldite.com/",
  },
  {
    index: "03",
    href: "#skills",
    label: "Focus",
    value: "Software + Machine Learning",
    meta: "Systems · AI/ML · Full Stack",
  },
  {
    index: "04",
    href: "#work",
    label: "Selected work",
    value: "Ambulance First · HRMS",
    meta: "Production systems",
  },
  {
    index: "05",
    label: "Hobbies",
    value: "Rubik's Cubes + Story Writing",
    meta: "Creative problem-solving",
  },
];

function Snapshot() {
  return (
    <section className="snapshot" aria-label="Professional snapshot">
      {SNAPSHOT_ITEMS.map((item) => {
        const content = (
          <>
            <span className="snapshot-index">{item.index}</span>
            <span className="snapshot-copy">
              <strong>{item.label}</strong>
              <span>{item.value}</span>
              {item.metaHref ? (
                <a
                  className="snapshot-company-link"
                  href={item.metaHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  {item.meta}
                </a>
              ) : (
                <small>{item.meta}</small>
              )}
            </span>
          </>
        );

        return item.href ? (
          <a className="snapshot-item" href={item.href} key={item.index}>
            {content}
          </a>
        ) : (
          <div className="snapshot-item" key={item.index}>
            {content}
          </div>
        );
      })}
    </section>
  );
}

export default Snapshot;
