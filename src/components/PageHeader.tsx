export default function PageHeader({ title, accent, text }: { title: string; accent: string; text?: string }) {
  return (
    <section className="bg-paper px-6 pb-16 pt-36 text-center sm:pt-40">
      <h1 className="font-display text-5xl font-bold tracking-tight text-navy md:text-7xl">
        <span className="text-deodar">{accent}</span> {title}
      </h1>
      {text && <p className="mx-auto mt-6 max-w-xl text-navy/70">{text}</p>}
    </section>
  );
}
