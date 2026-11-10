export default function PageHeader({ title, accent, text }: { title: string; accent: string; text?: string }) {
  return (
    <section className="bg-charcoal px-6 pb-16 pt-40 text-center">
      <h1 className="font-display text-5xl font-bold uppercase tracking-tight md:text-7xl">
        <span className="text-crimson">{accent}</span> {title}
      </h1>
      {text && <p className="mx-auto mt-6 max-w-xl text-white/70">{text}</p>}
    </section>
  );
}
