type Props = {
  title: string;
  description: string;
};

export default function Description({ title, description }: Props) {
  return (
    <section className="space-y-3">
      <h2 className="text-2xl lg:text-4xl font-semibold leading-snug">
        {title}
      </h2>
      <p className="text-bumnslate-5 text-base lg:text-lg">
        {description}
      </p>
    </section>
  );
}
