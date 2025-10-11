"use client";

import * as React from "react";

export type BookingSlot = {
  id: string;
  start: string;
  end: string;
  capacity?: number;
  booked?: number;
  label?: string;
};

export type BookingAvailability = Record<string, BookingSlot[]>;

type Props = {
  title?: string;
  description?: string;
  timezone?: string;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: string[];
  availability: BookingAvailability;
  defaultDate?: string;
  requireContact?: boolean;
  className?: string;
  onSubmit?: (payload: {
    date: string;
    slotId: string;
    contact?: { name?: string; email?: string; phone?: string; note?: string; attendees?: number };
  }) => void;
};

export default function Booking({
  title,
  description,
  timezone = "WIB (UTC+7)",
  minDate,
  maxDate,
  disabledDates = [],
  availability,
  defaultDate,
  requireContact = true,
  className = "",
  onSubmit,
}: Props) {
  const today = stripTime(minDate ?? new Date());
  const [viewMonth, setViewMonth] = React.useState<number>(
    (defaultDate ? new Date(defaultDate) : today).getMonth()
  );
  const [viewYear, setViewYear] = React.useState<number>(
    (defaultDate ? new Date(defaultDate) : today).getFullYear()
  );

  const [selectedDate, setSelectedDate] = React.useState<string | null>(
    defaultDate ?? iso(today)
  );
  const [selectedSlot, setSelectedSlot] = React.useState<string | null>(null);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [note, setNote] = React.useState("");
  const [attendees, setAttendees] = React.useState<number>(1);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  const slots = React.useMemo<BookingSlot[]>(() => {
    if (!selectedDate) return [];
    return availability[selectedDate] || [];
  }, [availability, selectedDate]);

  const canGoPrev = React.useMemo(() => {
    const prev = new Date(viewYear, viewMonth - 1, 1);
    return !minDate || startOfMonth(prev) >= startOfMonth(minDate);
  }, [viewMonth, viewYear, minDate]);

  const canGoNext = React.useMemo(() => {
    const next = new Date(viewYear, viewMonth + 1, 1);
    return !maxDate || startOfMonth(next) <= startOfMonth(maxDate);
  }, [viewMonth, viewYear, maxDate]);

  const calendar = React.useMemo(() => buildCalendar(viewYear, viewMonth), [viewYear, viewMonth]);

  const isDisabledDate = (d: Date) => {
    const isBeforeMin = minDate ? d < stripTime(minDate) : false;
    const isAfterMax = maxDate ? d > stripTime(maxDate) : false;
    const inDisabledList = disabledDates.includes(iso(d));
    const noSlots = !(availability[iso(d)] && availability[iso(d)].length > 0);
    return isBeforeMin || isAfterMax || inDisabledList || noSlots;
  };

  const onPickDate = (d: Date) => {
    if (isDisabledDate(d)) return;
    const i = iso(d);
    setSelectedDate(i);
    setSelectedSlot(null);
  };

  const onPickSlot = (slotId: string) => {
    setSelectedSlot(slotId);
  };

  const submit = () => {
    setError(null);
    setSuccess(null);

    if (!selectedDate) {
      setError("Pilih tanggal terlebih dahulu.");
      return;
    }
    if (!selectedSlot) {
      setError("Pilih salah satu slot waktu.");
      return;
    }

    if (requireContact) {
      if (!name.trim()) return setError("Nama wajib diisi.");
      const hasEmail = email.trim().length > 0;
      const hasPhone = phone.trim().length > 0;
      if (!hasEmail && !hasPhone) return setError("Isi salah satu: email atau nomor telepon.");
    }

    onSubmit?.({
      date: selectedDate,
      slotId: selectedSlot,
      contact: requireContact
        ? { name, email, phone, note, attendees }
        : undefined,
    });

    setSuccess("Permintaan booking terkirim. Kami akan menghubungi Anda segera.");
  };

  return (
    <section className={`w-full ${className}`}>
      {(title || description) && (
        <header className="mb-4 space-y-1">
          {title && <h3 className="text-xl font-semibold text-bumnblue-2">{title}</h3>}
          {description && <p className="text-sm text-bumnslate-6">{description}</p>}
        </header>
      )}

      <div className="grid gap-4 md:grid-cols-[minmax(280px,360px)_1fr]">
        <aside className="rounded-2xl border border-bumnslate-10 bg-white p-3 shadow-bumn-2">
          <div className="mb-2 flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                if (!canGoPrev) return;
                const m = viewMonth - 1;
                if (m < 0) {
                  setViewMonth(11);
                  setViewYear(viewYear - 1);
                } else {
                  setViewMonth(m);
                }
              }}
              className={`rounded-lg border px-2 py-1 text-sm ${canGoPrev ? "border-bumnslate-10 hover:border-bumnblue-5" : "border-bumnslate-10/60 text-bumnslate-6/60 cursor-not-allowed"}`}
              aria-disabled={!canGoPrev}
            >
              <ChevronLeft />
            </button>

            <div className="text-sm font-medium text-bumnblue-2">
              {monthName(viewMonth)} {viewYear}
            </div>

            <button
              type="button"
              onClick={() => {
                if (!canGoNext) return;
                const m = viewMonth + 1;
                if (m > 11) {
                  setViewMonth(0);
                  setViewYear(viewYear + 1);
                } else {
                  setViewMonth(m);
                }
              }}
              className={`rounded-lg border px-2 py-1 text-sm ${canGoNext ? "border-bumnslate-10 hover:border-bumnblue-5" : "border-bumnslate-10/60 text-bumnslate-6/60 cursor-not-allowed"}`}
              aria-disabled={!canGoNext}
            >
              <ChevronRight />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-xs text-bumnslate-6">
            {["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"].map((d) => (
              <div key={d} className="py-1">{d}</div>
            ))}
          </div>

          <div className="mt-1 grid grid-cols-7 gap-1">
            {calendar.map(({ date, currentMonth }, idx) => {
              const disabled = !currentMonth || isDisabledDate(date);
              const selected = selectedDate === iso(date);
              const hasSlots = availability[iso(date)]?.length > 0;

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => onPickDate(date)}
                  className={`aspect-square rounded-lg text-sm
                    ${disabled ? "bg-bumnwhite-3 text-bumnslate-6 cursor-not-allowed" : "bg-white hover:border-bumnblue-5"}
                    ${selected ? "ring-2 ring-bumnblue-5" : "border border-bumnslate-10"}
                    ${!currentMonth ? "opacity-40" : ""}
                  `}
                  aria-disabled={disabled}
                  title={hasSlots ? `${availability[iso(date)].length} slot` : "Tidak ada slot"}
                >
                  <div className="flex h-full w-full items-center justify-center">
                    {date.getDate()}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-2 text-center text-[11px] text-bumnslate-6">
            Zona waktu: <b className="text-bumnblue-2">{timezone}</b>
          </div>
        </aside>

        <div className="space-y-3">
          <div className="rounded-2xl border border-bumnslate-10 bg-white p-3 shadow-bumn-2">
            <div className="mb-2 text-sm font-medium text-bumnblue-2">
              Pilih Slot Waktu {selectedDate ? `— ${formatDateHuman(selectedDate)}` : ""}
            </div>

            {slots.length === 0 ? (
              <div className="rounded-xl border border-dashed border-bumnslate-10 p-4 text-center text-sm text-bumnslate-6">
                Tidak ada slot tersedia pada tanggal ini.
              </div>
            ) : (
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {slots.map((s) => {
                  const cap = s.capacity ?? null;
                  const booked = s.booked ?? 0;
                  const left = cap != null ? Math.max(0, cap - booked) : null;
                  const full = left === 0;
                  const active = selectedSlot === s.id;

                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => !full && onPickSlot(s.id)}
                      className={`flex flex-col items-start rounded-xl border p-3 text-left transition
                        ${active ? "border-bumnblue-5 ring-2 ring-bumnblue-5" : "border-bumnslate-10 hover:border-bumnblue-5"}
                        ${full ? "opacity-60 cursor-not-allowed" : "bg-white"}
                      `}
                      aria-pressed={active}
                      aria-disabled={full}
                      title={full ? "Slot penuh" : undefined}
                    >
                      <div className="text-sm font-semibold text-bumnblue-2">
                        {s.start}–{s.end}
                      </div>
                      {s.label && <div className="text-xs text-bumnslate-6">{s.label}</div>}
                      {cap != null && (
                        <div className="mt-1 text-[11px] text-bumnslate-6">
                          {full ? "Penuh" : `Sisa kuota: ${left}`}
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-bumnslate-10 bg-white p-3 shadow-bumn-2">
            <div className="mb-2 text-sm font-medium text-bumnblue-2">Detail Kontak</div>

            <div className="grid gap-3 md:grid-cols-2">
              <div className="grid gap-1">
                <label className="text-xs text-bumnslate-6">Nama*</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nama lengkap"
                  className="rounded-lg border border-bumnslate-10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-bumnblue-5"
                />
              </div>

              <div className="grid gap-1">
                <label className="text-xs text-bumnslate-6">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@contoh.com"
                  className="rounded-lg border border-bumnslate-10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-bumnblue-5"
                />
              </div>

              <div className="grid gap-1">
                <label className="text-xs text-bumnslate-6">Telepon</label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="08xxxxxxxxxx"
                  className="rounded-lg border border-bumnslate-10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-bumnblue-5"
                />
              </div>

              <div className="grid gap-1">
                <label className="text-xs text-bumnslate-6">Jumlah peserta</label>
                <input
                  type="number"
                  min={1}
                  value={attendees}
                  onChange={(e) => setAttendees(Math.max(1, Number(e.target.value || 1)))}
                  className="rounded-lg border border-bumnslate-10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-bumnblue-5"
                />
              </div>

              <div className="md:col-span-2 grid gap-1">
                <label className="text-xs text-bumnslate-6">Catatan</label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Contoh: butuh proyektor, layout 20 kursi, dsb."
                  className="min-h-[72px] rounded-lg border border-bumnslate-10 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-bumnblue-5"
                />
              </div>
            </div>

            {error && (
              <div className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                {error}
              </div>
            )}
            {success && (
              <div className="mt-3 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-xs text-green-700">
                {success}
              </div>
            )}

            <div className="mt-3 flex items-center justify-end">
              <button
                type="button"
                onClick={submit}
                className="rounded-xl bg-bumn-gradient-primary-10 px-4 py-2 text-sm font-semibold text-white hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-bumnblue-5"
              >
                Ajukan Booking
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function stripTime(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}
function iso(d: Date) {
  return d.toISOString().slice(0, 10);
}
function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
function monthName(m: number) {
  const id = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
  return id[m] || "";
}
function buildCalendar(year: number, month: number) {
  const first = new Date(year, month, 1);
  const startDay = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const cells: { date: Date; currentMonth: boolean }[] = [];
  for (let i = 0; i < startDay; i++) {
    const d = new Date(year, month, -i);
    cells.unshift({ date: stripTime(d), currentMonth: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: stripTime(new Date(year, month, d)), currentMonth: true });
  }
  while (cells.length < 42) {
    const last = cells[cells.length - 1].date;
    const next = new Date(last);
    next.setDate(last.getDate() + 1);
    cells.push({ date: stripTime(next), currentMonth: false });
  }
  return cells;
}
function formatDateHuman(isoDate: string) {
  const d = new Date(isoDate + "T00:00:00");
  const day = d.getDate();
  const month = monthName(d.getMonth());
  const year = d.getFullYear();
  const wd = ["Min","Sen","Sel","Rab","Kam","Jum","Sab"][(d.getDay()+6)%7];
  return `${wd}, ${day} ${month} ${year}`;
}

function ChevronLeft(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" {...props} aria-hidden>
      <path d="M12 5l-5 5 5 5" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ChevronRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 20 20" fill="none" {...props} aria-hidden>
      <path d="M8 5l5 5-5 5" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
