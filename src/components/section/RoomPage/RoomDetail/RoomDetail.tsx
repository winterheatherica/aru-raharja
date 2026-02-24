"use client";

type Props = {
  title: string;
  description: string;
  capacity: number;
  floor: number;
  facilities: string[];
};

export default function RoomDetail({
  title,
  description,
  capacity,
  floor,
  facilities,
}: Props) {
  return (
    <section className="space-y-8">
      <div className="bg-bumn-gradient-white-4 rounded-2xl shadow-bumn-2 p-6 md:p-8 space-y-6">
        <h3 className="text-lg font-semibold text-bumnblue-1">
          {title}
        </h3>

        <p className="text-sm text-bumnslate-8 leading-relaxed">
          {description}
        </p>

        <div className="flex flex-wrap gap-6 pt-2">
          <div className="space-y-1">
            <span className="block text-xs text-bumnslate-8">
              Capacity
            </span>
            <span className="text-sm font-medium text-bumnslate-6">
              {capacity} People
            </span>
          </div>

          <div className="space-y-1">
            <span className="block text-xs text-bumnslate-8">
              Floor
            </span>
            <span className="text-sm font-medium text-bumnslate-6">
              Floor {floor}
            </span>
          </div>
        </div>
      </div>

      {facilities.length > 0 && (
        <div className="bg-bumn-gradient-white-4 rounded-2xl shadow-bumn-2 p-6 md:p-8 space-y-4">
          <h4 className="text-sm font-semibold text-bumnblue-1">
            Facilities
          </h4>

          <ul className="flex flex-wrap gap-3">
            {facilities.map((item) => (
              <li
                key={item}
                className="
                  inline-block
                  text-xs font-medium
                  px-3 py-1
                  rounded-full
                  bg-bumncyan-1 text-bumnblue-2
                "
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}


