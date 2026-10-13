import { WellnessNote } from "@/components/WellnessNote";
import { BottomNav } from "./BottomNav";

/** Signed-in app screens: a phone-width column with a bottom tab bar. */
export default function AppLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <main className="mx-auto w-full max-w-md flex-1 px-5 pb-28 pt-8 sm:px-6">
        {children}
        <WellnessNote className="mt-12" />
      </main>
      <BottomNav />
    </>
  );
}
